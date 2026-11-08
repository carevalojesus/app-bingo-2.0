// Lógica pura de una sala en línea (sin E/S): el Durable Object solo guarda,
// programa la alarma y difunde lo que devuelven estas funciones.
// Las acciones mutan el estado y devuelven una lista de eventos `{ tipo, ...datos, para? }`
// (`para`: jugadorId si el evento es solo para ese jugador). Si la acción no es válida
// lanzan ErrorJuego antes de tocar nada. El reloj (`ahora`) y el azar se inyectan.
// Protocolo: docs/en-linea.md

import { generarCarton, verificar, PATRONES } from '../src/carton.js';
import { nuevaSemilla, compromisoDe, combinarSemillas, serieDePartida, ordenDeBolas } from '../src/justo.js';

export const ALFABETO_CODIGO = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
export const LARGO_CODIGO = 6;
export const MAX_JUGADORES = 100;
export const TOTAL_BOLAS = 75;
export const INTERVALOS = [4000, 6000, 8000, 12000];

const TIEMPOS = {
    normal: { ventana: 4000, pausaPremio: 6000 },
    prueba: { ventana: 300, pausaPremio: 400 },
};

export const CONFIG_POR_DEFECTO = {
    nombre: '',
    cartones: 60,
    precioCarton: 10,
    maxCartonesPorJugador: 4,
    fichasIniciales: 100,
    intervalo: 8000,
    premios: [
        { modalidad: 'linea', porcentaje: 30 },
        { modalidad: 'lleno', porcentaje: 70 },
    ],
    pozoExtra: 0,
};

export class ErrorJuego extends Error {}
const fallar = (mensaje) => { throw new ErrorJuego(mensaje); };

// ---------- Azar ----------
// La partida es verificable (src/justo.js): la serie y el orden de las bolas salen de la semilla
// secreta del servidor y las de los jugadores. Las pruebas pueden inyectar `serie` y `orden`.
function hex(largo) {
    const bytes = new Uint8Array(Math.ceil(largo / 2));
    globalThis.crypto.getRandomValues(bytes);
    return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('').slice(0, largo);
}

export const AZAR = {
    hex,
    semilla: () => nuevaSemilla(),
    serie: serieDePartida,
    orden: (semillaServidor, semillaClientes) => ordenDeBolas(semillaServidor, semillaClientes),
};

// Código de sala con muestreo por rechazo (sin sesgo de módulo)
export function generarCodigo() {
    const n = ALFABETO_CODIGO.length;
    const techo = 256 - (256 % n);
    const byte = new Uint8Array(1);
    let codigo = '';
    while (codigo.length < LARGO_CODIGO) {
        globalThis.crypto.getRandomValues(byte);
        if (byte[0] < techo) codigo += ALFABETO_CODIGO[byte[0] % n];
    }
    return codigo;
}

export const codigoValido = (codigo) =>
    typeof codigo === 'string' && codigo.length === LARGO_CODIGO && [...codigo].every((c) => ALFABETO_CODIGO.includes(c));

// ---------- Configuración ----------
const limpiarTexto = (texto) => String(texto ?? '').replace(/[<>]/g, '').trim();

function leerEntero(valor, min, max, etiqueta) {
    const n = typeof valor === 'string' && valor.trim() !== '' ? Number(valor) : valor;
    if (!Number.isInteger(n) || n < min || n > max) fallar(`${etiqueta} debe ser un número entero entre ${min} y ${max}.`);
    return n;
}

export function intervaloValido(intervalo, prueba = false) {
    if (INTERVALOS.includes(intervalo)) return true;
    return prueba && Number.isInteger(intervalo) && intervalo >= 150 && intervalo <= 12000;
}

export function validarConfig(entrada = {}, { prueba = false } = {}) {
    if (entrada === null || typeof entrada !== 'object' || Array.isArray(entrada)) fallar('La configuración no es válida.');
    const valor = (clave) => (entrada[clave] === undefined || entrada[clave] === null ? CONFIG_POR_DEFECTO[clave] : entrada[clave]);

    if (typeof valor('nombre') !== 'string') fallar('El nombre debe ser texto.');
    const nombre = limpiarTexto(valor('nombre'));
    if (nombre.length > 40) fallar('El nombre puede tener como máximo 40 caracteres.');

    const config = {
        nombre,
        cartones: leerEntero(valor('cartones'), 10, 300, 'El número de cartones'),
        precioCarton: leerEntero(valor('precioCarton'), 0, 1000, 'El precio del cartón'),
        maxCartonesPorJugador: leerEntero(valor('maxCartonesPorJugador'), 1, 12, 'El máximo de cartones por jugador'),
        fichasIniciales: leerEntero(valor('fichasIniciales'), 0, 100000, 'Las fichas iniciales'),
        intervalo: leerEntero(valor('intervalo'), 0, 60000, 'El intervalo'),
        premios: null,
        pozoExtra: leerEntero(valor('pozoExtra'), 0, 100000, 'El pozo extra'),
    };
    if (!intervaloValido(config.intervalo, prueba)) fallar(`El intervalo debe ser ${INTERVALOS.join(', ')} ms.`);

    const premios = valor('premios');
    if (!Array.isArray(premios) || premios.length < 1 || premios.length > 3) fallar('Debe haber entre 1 y 3 premios.');
    config.premios = premios.map((premio) => {
        if (!premio || typeof premio !== 'object') fallar('Premio no válido.');
        if (!Object.hasOwn(PATRONES, premio.modalidad)) fallar(`Modalidad desconocida: ${String(premio.modalidad).slice(0, 20)}.`);
        return { modalidad: premio.modalidad, porcentaje: leerEntero(premio.porcentaje, 1, 100, 'El porcentaje del premio') };
    });
    if (new Set(config.premios.map((p) => p.modalidad)).size !== config.premios.length) fallar('No se pueden repetir modalidades.');
    if (config.premios.reduce((suma, p) => suma + p.porcentaje, 0) !== 100) fallar('Los porcentajes de los premios deben sumar 100.');
    return config;
}

// ---------- Sala ----------
export function crearSala(codigo, entrada, { prueba = false, azar = AZAR } = {}) {
    const config = validarConfig(entrada, { prueba });
    const sala = {
        codigo,
        tokenAnfitrion: azar.hex(32),
        prueba,
        config,
        estado: 'lobby',
        serie: null,
        bolas: [],
        registro: [],         // auditoría de la partida: [{ numero, indice, en }] (solo en storage)
        semillaServidor: null, // secreta hasta `terminada`
        orden: null,          // orden de las 75 bolas, fijado al iniciar (privado)
        justo: null,
        siguienteBolaEn: null,
        ventanaHasta: null,
        ventana: [],          // cantos válidos de la ventana abierta: [{ jugadorId, carton }]
        pozo: 0,
        premios: [],
        premioActual: null,
        jugadores: [],
        ocupados: {},
        anfitrionConectado: false,
    };
    recalcularPozo(sala);
    nuevoCompromiso(sala, azar);
    return sala;
}

// Lobby: semilla nueva del servidor y su compromiso público
function nuevoCompromiso(sala, azar) {
    sala.semillaServidor = azar.semilla();
    sala.orden = null;
    sala.justo = { compromiso: compromisoDe(sala.semillaServidor), semillasClientes: null, semillaClientes: null };
}

const semillaValida = (semilla) => typeof semilla === 'string' && /^[0-9a-f]{16,64}$/i.test(semilla);

const tiempos = (sala) => (sala.prueba ? TIEMPOS.prueba : TIEMPOS.normal);
const buscarJugador = (sala, id) => sala.jugadores.find((j) => j.id === id);
const jugadorOFallar = (sala, id) => buscarJugador(sala, id) ?? fallar('No estás en esta sala.');
const vendidos = (sala) => Object.keys(sala.ocupados).length;

// Reparte el pozo por porcentaje (división entera); lo que sobra va al último premio
function repartirPozo(pozo, premios) {
    const fichas = premios.map((p) => Math.floor((pozo * p.porcentaje) / 100));
    fichas[fichas.length - 1] += pozo - fichas.reduce((a, b) => a + b, 0);
    return fichas;
}

// En el lobby el pozo y los premios son una vista previa que cambia con cada venta
function recalcularPozo(sala) {
    sala.pozo = vendidos(sala) * sala.config.precioCarton + sala.config.pozoExtra;
    const fichas = repartirPozo(sala.pozo, sala.config.premios);
    sala.premios = sala.config.premios.map((p, i) => ({ modalidad: p.modalidad, porcentaje: p.porcentaje, fichas: fichas[i], ganadores: [] }));
}

export const esAnfitrion = (sala, token) => typeof token === 'string' && token.length > 0 && token === sala.tokenAnfitrion;

// ---------- Jugadores ----------
export function limpiarApodo(apodo) {
    const limpio = limpiarTexto(typeof apodo === 'string' ? apodo : '').slice(0, 20).trim();
    if (!limpio) fallar('Escribe un apodo (1 a 20 caracteres).');
    return limpio;
}

// Devuelve { jugador, nuevo }. Con token conocido reconecta (el apodo se ignora).
// Se conserva la primera semilla válida que mande cada jugador.
export function unirJugador(sala, { apodo, token, semilla } = {}, azar = AZAR) {
    const existente = typeof token === 'string' && token ? sala.jugadores.find((j) => j.token === token) : null;
    if (existente) {
        if (!existente.semilla && semillaValida(semilla)) existente.semilla = semilla;
        return { jugador: existente, nuevo: false };
    }

    if (sala.jugadores.length >= MAX_JUGADORES) fallar('La sala está llena.');
    const base = limpiarApodo(apodo);
    const usados = new Set(sala.jugadores.map((j) => j.apodo.toLowerCase()));
    let final = base;
    for (let n = 2; usados.has(final.toLowerCase()); n++) final = `${base} ${n}`;

    const jugador = {
        id: azar.hex(8),
        token: azar.hex(32),
        apodo: final,
        fichas: sala.config.fichasIniciales,
        cartones: [],
        conectado: false,
        semilla: semillaValida(semilla) ? semilla : null,
    };
    sala.jugadores.push(jugador);
    return { jugador, nuevo: true };
}

// Marca quién tiene una conexión abierta. Devuelve true si algo cambió.
export function marcarConexiones(sala, idsConectados, anfitrionConectado) {
    let cambio = sala.anfitrionConectado !== anfitrionConectado;
    sala.anfitrionConectado = anfitrionConectado;
    for (const jugador of sala.jugadores) {
        const conectado = idsConectados.has(jugador.id);
        if (jugador.conectado !== conectado) cambio = true;
        jugador.conectado = conectado;
    }
    return cambio;
}

function numeroCarton(sala, numero) {
    if (!Number.isInteger(numero) || numero < 1 || numero > sala.config.cartones) {
        fallar(`El cartón debe ser un número del 1 al ${sala.config.cartones}.`);
    }
    return numero;
}

export function elegirCarton(sala, jugadorId, numero) {
    const jugador = jugadorOFallar(sala, jugadorId);
    if (sala.estado !== 'lobby') fallar('Solo se pueden elegir cartones antes de empezar.');
    numeroCarton(sala, numero);
    const dueno = sala.ocupados[numero];
    if (dueno === jugadorId) fallar('Ese cartón ya es tuyo.');
    if (dueno) fallar('Ese cartón ya tiene dueño.');
    if (jugador.cartones.length >= sala.config.maxCartonesPorJugador) {
        fallar(`Puedes tener como máximo ${sala.config.maxCartonesPorJugador} cartones.`);
    }
    if (jugador.fichas < sala.config.precioCarton) fallar('No tienes fichas suficientes.');

    jugador.fichas -= sala.config.precioCarton;
    jugador.cartones.push(numero);
    jugador.cartones.sort((a, b) => a - b);
    sala.ocupados[numero] = jugadorId;
    recalcularPozo(sala);
    return [];
}

export function soltarCarton(sala, jugadorId, numero) {
    const jugador = jugadorOFallar(sala, jugadorId);
    if (sala.estado !== 'lobby') fallar('Solo se pueden soltar cartones antes de empezar.');
    numeroCarton(sala, numero);
    if (sala.ocupados[numero] !== jugadorId) fallar('Ese cartón no es tuyo.');

    jugador.fichas += sala.config.precioCarton;
    jugador.cartones = jugador.cartones.filter((n) => n !== numero);
    delete sala.ocupados[numero];
    recalcularPozo(sala);
    return [];
}

export function expulsar(sala, jugadorId) {
    if (sala.estado !== 'lobby') fallar('Solo se puede expulsar en el lobby.');
    const jugador = buscarJugador(sala, jugadorId) ?? fallar('Ese jugador no está en la sala.');
    for (const numero of jugador.cartones) delete sala.ocupados[numero];
    jugador.fichas += jugador.cartones.length * sala.config.precioCarton;
    jugador.cartones = [];
    sala.jugadores = sala.jugadores.filter((j) => j !== jugador);
    recalcularPozo(sala);
    return [{ tipo: 'aviso', texto: `${jugador.apodo} salió de la sala.` }];
}

// ---------- Partida ----------
export function iniciar(sala, ahora, azar = AZAR) {
    if (sala.estado !== 'lobby') fallar('La partida ya empezó.');
    if (vendidos(sala) === 0) fallar('Hace falta al menos un cartón vendido para empezar.');

    recalcularPozo(sala);
    const semillasClientes = sala.jugadores
        .filter((j) => j.cartones.length > 0 && j.semilla)
        .map(({ apodo, semilla }) => ({ apodo, semilla }));
    const semillaClientes = combinarSemillas(semillasClientes);
    sala.justo = { ...sala.justo, semillasClientes, semillaClientes };
    sala.serie = azar.serie(sala.semillaServidor, semillaClientes);
    sala.orden = azar.orden(sala.semillaServidor, semillaClientes);
    sala.bolas = [];
    sala.registro = [];
    sala.ventana = [];
    sala.ventanaHasta = null;
    sala.premioActual = 0;
    sala.estado = 'jugando';
    return [{ tipo: 'aviso', texto: '¡Empieza la partida!' }, ...sacarBola(sala, ahora)];
}

// La bola k es la k-ésima del orden comprometido al iniciar
export function sacarBola(sala, ahora) {
    if (sala.bolas.length >= TOTAL_BOLAS) fallar('Ya salieron todas las bolas.');
    if (!ordenValido(sala)) fallar('La partida no tiene un orden de bolas válido.');
    const numero = sala.orden[sala.bolas.length];
    sala.bolas.push(numero);
    sala.registro.push({ numero, indice: sala.bolas.length - 1, en: ahora });
    sala.siguienteBolaEn = ahora + sala.config.intervalo;
    return [{ tipo: 'bola', numero, indice: sala.bolas.length - 1 }];
}

const ganadorPublico = (sala, { jugadorId, carton }, fichas) =>
    ({ jugadorId, apodo: buscarJugador(sala, jugadorId)?.apodo ?? '?', carton, fichas });

// Reparte el premio en juego entre los cantos (el resto al primero) y pasa al siguiente
function adjudicar(sala, cantos) {
    const premio = sala.premios[sala.premioActual];
    const parte = Math.floor(premio.fichas / cantos.length);
    const resto = premio.fichas - parte * cantos.length;
    premio.ganadores = cantos.map((canto, i) => ganadorPublico(sala, canto, parte + (i === 0 ? resto : 0)));
    for (const ganador of premio.ganadores) {
        const jugador = buscarJugador(sala, ganador.jugadorId);
        if (jugador) jugador.fichas += ganador.fichas;
    }

    const siguiente = sala.premios[sala.premioActual + 1] ?? null;
    sala.premioActual = siguiente ? sala.premioActual + 1 : null;
    return { tipo: 'ganador', modalidad: premio.modalidad, ganadores: premio.ganadores, siguiente: siguiente?.modalidad ?? null };
}

function terminar(sala) {
    sala.estado = 'terminada';
    sala.premioActual = null;
    sala.siguienteBolaEn = null;
    sala.ventanaHasta = null;
    sala.ventana = [];
}

export function cantarBingo(sala, jugadorId, numero, ahora) {
    const jugador = jugadorOFallar(sala, jugadorId);
    if (sala.estado !== 'jugando' && sala.estado !== 'pausa') fallar('No hay ninguna partida en juego.');
    if (sala.premioActual === null) fallar('No quedan premios en juego.');
    numeroCarton(sala, numero);
    if (sala.ocupados[numero] !== jugadorId) fallar('Ese cartón no es tuyo.');
    if (sala.ventana.some((c) => c.carton === numero)) fallar('Ese cartón ya cantó ¡Bingo!');

    const premio = sala.premios[sala.premioActual];
    const resultado = verificar(generarCarton(sala.serie, numero), new Set(sala.bolas), premio.modalidad);
    if (!resultado.gana) {
        return [
            { tipo: 'bingoRechazado', carton: numero, faltan: resultado.faltan, para: jugadorId },
            { tipo: 'aviso', texto: `Bingo falso de ${jugador.apodo} (cartón ${numero}).` },
        ];
    }

    sala.ventana.push({ jugadorId, carton: numero });
    if (sala.ventanaHasta === null) {
        sala.ventanaHasta = ahora + tiempos(sala).ventana;
        sala.siguienteBolaEn = null;
    }
    return [{ tipo: 'aviso', texto: `¡Bingo! de ${jugador.apodo} (cartón ${numero}). Comprobando…` }];
}

export function cerrarVentana(sala, ahora) {
    if (sala.ventanaHasta === null) fallar('No hay ninguna ventana de ¡Bingo! abierta.');
    const evento = adjudicar(sala, sala.ventana);
    sala.ventana = [];
    sala.ventanaHasta = null;
    if (sala.premioActual === null) terminar(sala);
    else sala.siguienteBolaEn = sala.estado === 'jugando' ? ahora + tiempos(sala).pausaPremio : null;
    return [evento];
}

// Sin bolas y con premios pendientes: se revisan todos los cartones vendidos
export function adjudicarAgotadas(sala) {
    const salidas = new Set(sala.bolas);
    const cartones = Object.entries(sala.ocupados)
        .map(([carton, jugadorId]) => ({ jugadorId, carton: Number(carton) }))
        .sort((a, b) => a.carton - b.carton);
    const eventos = [];
    while (sala.premioActual !== null) {
        const { modalidad } = sala.premios[sala.premioActual];
        const ganadores = cartones.filter((c) => verificar(generarCarton(sala.serie, c.carton), salidas, modalidad).gana);
        if (ganadores.length) eventos.push(adjudicar(sala, ganadores));
        else sala.premioActual = sala.premios[sala.premioActual + 1] ? sala.premioActual + 1 : null;
    }
    terminar(sala);
    return eventos;
}

// Próximo instante en que el servidor tiene que hacer algo (para la alarma); null si nada
export function proximoEvento(sala) {
    if (sala.ventanaHasta !== null) return sala.ventanaHasta;
    if (sala.estado === 'jugando' && sala.siguienteBolaEn !== null) return sala.siguienteBolaEn;
    return null;
}

// Ejecuta el evento pendiente si ya le toca. Devuelve sus eventos o null si no había nada.
export function avanzar(sala, ahora) {
    if (sala.ventanaHasta !== null) return ahora >= sala.ventanaHasta ? cerrarVentana(sala, ahora) : null;
    if (sala.estado !== 'jugando' || sala.siguienteBolaEn === null || ahora < sala.siguienteBolaEn) return null;
    if (sala.bolas.length >= TOTAL_BOLAS) return adjudicarAgotadas(sala);
    if (!repararOrden(sala)) return interrumpir(sala, 'No se pudo recuperar el orden de las bolas.');
    return sacarBola(sala, ahora);
}

// ---------- Robustez: salas guardadas con otra forma ----------
// Un Durable Object puede despertar con una sala guardada por una versión anterior del servidor
// (p. ej. `jugando` sin `orden`). Estas funciones la dejan jugable o la terminan de forma limpia.

// `orden` es una permutación de 1..75 que empieza por las bolas ya salidas
function ordenValido(sala) {
    const { orden, bolas } = sala;
    if (!Array.isArray(orden) || orden.length !== TOTAL_BOLAS) return false;
    if (new Set(orden).size !== TOTAL_BOLAS || !orden.every((n) => Number.isInteger(n) && n >= 1 && n <= TOTAL_BOLAS)) return false;
    return bolas.every((n, i) => orden[i] === n);
}

// Si falta el orden, se recalcula con las semillas (es el mismo que se comprometió al iniciar).
// Devuelve true si la sala tiene (o ya tenía) un orden válido.
export function repararOrden(sala, azar = AZAR) {
    if (ordenValido(sala)) return true;
    const semillaClientes = sala.justo?.semillaClientes;
    if (!semillaValida(sala.semillaServidor) || typeof semillaClientes !== 'string') return false;
    try {
        sala.orden = azar.orden(sala.semillaServidor, semillaClientes);
    } catch {
        return false;
    }
    if (ordenValido(sala)) return true;
    sala.orden = null;
    return false;
}

// Termina la partida en curso sin repartir lo pendiente. Si aún no se había entregado ningún
// premio se devuelven las fichas de los cartones (nadie pierde nada por un fallo del servidor).
export function interrumpir(sala, motivo = '') {
    const ninguno = !sala.premios.some((p) => p.ganadores?.length);
    if (ninguno) {
        for (const jugador of sala.jugadores) jugador.fichas += jugador.cartones.length * sala.config.precioCarton;
    }
    terminar(sala);
    const texto = `La partida se interrumpió por un error del servidor${motivo ? ` (${motivo})` : ''}.`
        + `${ninguno ? ' Se devolvieron las fichas de los cartones.' : ''} El anfitrión puede empezar otra.`;
    return [{ tipo: 'aviso', texto }];
}

// Completa los campos que falten en una sala leída del storage y comprueba que la partida en
// curso se puede seguir. Devuelve los eventos a difundir (vacío si estaba bien).
export function sanear(sala) {
    sala.config ??= structuredClone(CONFIG_POR_DEFECTO);
    for (const clave of ['bolas', 'registro', 'ventana', 'premios', 'jugadores']) {
        if (!Array.isArray(sala[clave])) sala[clave] = [];
    }
    if (!sala.ocupados || typeof sala.ocupados !== 'object') sala.ocupados = {};
    for (const clave of ['siguienteBolaEn', 'ventanaHasta', 'premioActual', 'serie', 'orden', 'semillaServidor']) sala[clave] ??= null;
    if (!sala.justo || typeof sala.justo !== 'object') {
        sala.justo = { compromiso: null, semillasClientes: null, semillaClientes: null };
    }
    if (!['lobby', 'jugando', 'pausa', 'terminada'].includes(sala.estado)) sala.estado = 'lobby';
    if (sala.estado === 'lobby' && !semillaValida(sala.semillaServidor)) nuevoCompromiso(sala, AZAR);

    if (sala.estado !== 'jugando' && sala.estado !== 'pausa') return [];
    if (!sala.serie) return interrumpir(sala, 'faltan los datos de la partida');
    if (sala.premioActual === null || !sala.premios[sala.premioActual]) return interrumpir(sala, 'faltan los premios');
    if (sala.bolas.length < TOTAL_BOLAS && !repararOrden(sala)) return interrumpir(sala, 'no se pudo recuperar el orden de las bolas');
    return [];
}

export function pausar(sala) {
    if (sala.estado !== 'jugando') fallar('No hay ninguna partida en marcha.');
    sala.estado = 'pausa';
    sala.siguienteBolaEn = null;
    return [{ tipo: 'aviso', texto: 'Partida en pausa.' }];
}

export function reanudar(sala, ahora) {
    if (sala.estado !== 'pausa') fallar('La partida no está en pausa.');
    sala.estado = 'jugando';
    // Si hay una ventana de ¡Bingo! abierta, el sorteo sigue al cerrarla
    if (sala.ventanaHasta === null) sala.siguienteBolaEn = ahora + sala.config.intervalo;
    return [{ tipo: 'aviso', texto: '¡Seguimos!' }];
}

export function cambiarVelocidad(sala, intervalo, ahora) {
    if (!intervaloValido(intervalo, sala.prueba)) fallar(`El intervalo debe ser ${INTERVALOS.join(', ')} ms.`);
    sala.config.intervalo = intervalo;
    if (sala.estado === 'jugando' && sala.siguienteBolaEn !== null) sala.siguienteBolaEn = ahora + intervalo;
    return [];
}

export function nuevaPartida(sala, azar = AZAR) {
    if (sala.estado !== 'lobby' && sala.estado !== 'terminada') fallar('Termina la partida antes de empezar otra.');
    const devolver = sala.estado === 'lobby';
    for (const jugador of sala.jugadores) {
        if (devolver) jugador.fichas += jugador.cartones.length * sala.config.precioCarton;
        jugador.cartones = [];
    }
    sala.ocupados = {};
    sala.estado = 'lobby';
    sala.serie = null;
    sala.bolas = [];
    sala.registro = [];
    sala.siguienteBolaEn = null;
    sala.ventanaHasta = null;
    sala.ventana = [];
    sala.premioActual = null;
    recalcularPozo(sala);
    nuevoCompromiso(sala, azar);
    return [{ tipo: 'aviso', texto: 'Nueva partida: elige tus cartones.' }];
}

// ---------- Permisos ----------
export const ROL_DE_ACCION = {
    elegirCarton: 'jugador',
    soltarCarton: 'jugador',
    bingo: 'jugador',
    iniciar: 'anfitrion',
    pausar: 'anfitrion',
    reanudar: 'anfitrion',
    nuevaPartida: 'anfitrion',
    velocidad: 'anfitrion',
    expulsar: 'anfitrion',
};

export function comprobarPermiso(rol, tipo) {
    const necesario = ROL_DE_ACCION[tipo];
    if (!necesario) fallar(`Mensaje desconocido: ${String(tipo).slice(0, 30)}`);
    if (rol !== necesario) fallar(necesario === 'anfitrion' ? 'Solo el anfitrión puede hacer eso.' : 'Solo los jugadores pueden hacer eso.');
}

// ---------- Vista pública (nunca incluye tokens) ----------
export function instantanea(sala) {
    return {
        codigo: sala.codigo,
        nombre: sala.config.nombre,
        estado: sala.estado,
        config: structuredClone(sala.config),
        serie: sala.serie,
        bolas: [...sala.bolas],
        siguienteBolaEn: sala.siguienteBolaEn,
        ventanaHasta: sala.ventanaHasta,
        pozo: sala.pozo,
        premios: sala.premios.map((p) => ({ ...p, ganadores: p.ganadores.map((g) => ({ ...g })) })),
        premioActual: sala.premioActual,
        jugadores: sala.jugadores.map(({ id, apodo, fichas, cartones, conectado }) => ({ id, apodo, fichas, cartones: [...cartones], conectado })),
        ocupados: { ...sala.ocupados },
        anfitrionConectado: sala.anfitrionConectado,
        justo: {
            compromiso: sala.justo.compromiso,
            semillasClientes: sala.justo.semillasClientes?.map((s) => ({ ...s })) ?? null,
            semillaClientes: sala.justo.semillaClientes,
            // La semilla del servidor solo se revela al terminar
            semillaServidor: sala.estado === 'terminada' ? sala.semillaServidor : null,
        },
    };
}

export const resumen = (sala) => ({
    codigo: sala.codigo,
    nombre: sala.config.nombre,
    estado: sala.estado,
    jugadores: sala.jugadores.length,
    config: structuredClone(sala.config),
});
