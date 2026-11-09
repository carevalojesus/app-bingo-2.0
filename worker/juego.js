// Lógica pura de una sala en línea (sin E/S): el Durable Object solo guarda,
// programa la alarma y difunde lo que devuelven estas funciones.
// Las acciones mutan el estado y devuelven una lista de eventos `{ tipo, ...datos, para? }`
// (`para`: jugadorId si el evento es solo para ese jugador). Si la acción no es válida
// lanzan ErrorJuego antes de tocar nada. El reloj (`ahora`) y el azar se inyectan.
// Protocolo: docs/en-linea.md

import { generarCarton, verificar, PATRONES } from '../src/carton.js';
import {
    TOTAL_FILAS, MODALIDAD_FILA, MODALIDAD_ELIGE, esModoFila, esModoElige, esModoAuto, filaCompleta, limpiarJugada,
} from '../src/filas.js';
import { nuevaSemilla, compromisoDe, combinarSemillas, serieDePartida, ordenDeBolas, bolaDoradaDe } from '../src/justo.js';

export const ALFABETO_CODIGO = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
export const LARGO_CODIGO = 6;
export const MAX_JUGADORES = 100;
export const TOTAL_BOLAS = 75;
export const INTERVALOS = [4000, 6000, 8000, 12000];

// Planes: el gratis tiene límites; con un código Pro (src/codigos.js) se desbloquea todo
export const PLANES = {
    gratis: { jugadores: 15, premios: 1 },
    pro: { jugadores: MAX_JUGADORES, premios: 3 },
};
const PREMIO_GRATIS = [{ modalidad: 'lleno', porcentaje: 100 }];

// Cuenta atrás (3, 2, 1, ¡ya!) entre pulsar «Empezar» y la primera bola, para que todos estén atentos
export const CUENTA_INICIO = 4000;
// Cómo se marca (solo bingo clásico): libre = cada jugador elige; auto = se marcan solos;
// manual = cada uno marca y el ¡Bingo! se comprueba con lo que marcó (si no lo marcó, no cuenta)
export const MARCADOS = ['libre', 'auto', 'manual'];

const TIEMPOS = {
    // finRonda: de «terminada» a la siguiente ronda; lobbyAuto: cuenta atrás del lobby en rondas seguidas
    normal: { ventana: 4000, pausaPremio: 6000, finRonda: 12000, lobbyAuto: 30000 },
    prueba: { ventana: 300, pausaPremio: 400, finRonda: 500, lobbyAuto: 600 },
};

// Reacciones rápidas que un jugador puede lanzar al show
export const REACCIONES = ['😱', '🔥', '👏', '😂', '🙏', '🍀'];

export const TIPOS = ['carton', 'fila', 'elige'];

export const CONFIG_POR_DEFECTO = {
    tipo: 'carton',
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
    marcado: 'libre',
    admision: false,        // los jugadores esperan a que el anfitrión los admita y les asigne fichas
    mensajeFichas: '',      // lo que ve quien espera o pide fichas (lo escribe el anfitrión)
    rondasSeguidas: false,  // al terminar, nueva ronda sola y cuenta atrás para empezar
    bolaDorada: false,      // si sale antes de que haya ganador, el premio en juego se duplica
    botePorcentaje: 0,      // % de las ventas que va al bote acumulado (0 = sin bote)
    boteBolas: 0,           // el bote se lo lleva quien gane el último premio en estas bolas o menos
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
    dorada: bolaDoradaDe,
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

function leerBooleano(valor, etiqueta) {
    if (typeof valor !== 'boolean') fallar(`${etiqueta} debe ser sí o no.`);
    return valor;
}

function leerEntero(valor, min, max, etiqueta) {
    const n = typeof valor === 'string' && valor.trim() !== '' ? Number(valor) : valor;
    if (!Number.isInteger(n) || n < min || n > max) fallar(`${etiqueta} debe ser un número entero entre ${min} y ${max}.`);
    return n;
}

export function intervaloValido(intervalo, prueba = false) {
    if (INTERVALOS.includes(intervalo)) return true;
    return prueba && Number.isInteger(intervalo) && intervalo >= 150 && intervalo <= 12000;
}

export function validarConfig(entrada = {}, { prueba = false, pro = false } = {}) {
    if (entrada === null || typeof entrada !== 'object' || Array.isArray(entrada)) fallar('La configuración no es válida.');
    // En el plan gratis, si no se dicen los premios, se juega a cartón lleno
    const porDefecto = pro ? CONFIG_POR_DEFECTO : { ...CONFIG_POR_DEFECTO, premios: PREMIO_GRATIS };
    const valor = (clave) => (entrada[clave] === undefined || entrada[clave] === null ? porDefecto[clave] : entrada[clave]);

    if (typeof valor('nombre') !== 'string') fallar('El nombre debe ser texto.');
    const nombre = limpiarTexto(valor('nombre'));
    if (nombre.length > 40) fallar('El nombre puede tener como máximo 40 caracteres.');

    const tipo = valor('tipo');
    if (!TIPOS.includes(tipo)) fallar('El tipo de juego no es válido.');
    const fila = tipo === 'fila';
    const elige = tipo === 'elige';

    const config = {
        tipo,
        nombre,
        // En «Fila de 5» el tablero es fijo: 15 filas. En «Elige tus 5», `cartones` es el máximo de jugadas.
        cartones: fila ? TOTAL_FILAS : leerEntero(valor('cartones'), 10, 300, elige ? 'El máximo de jugadas' : 'El número de cartones'),
        precioCarton: leerEntero(valor('precioCarton'), 0, 1000, 'El precio del cartón'),
        maxCartonesPorJugador: leerEntero(valor('maxCartonesPorJugador'), 1, 12, 'El máximo de cartones por jugador'),
        fichasIniciales: leerEntero(valor('fichasIniciales'), 0, 100000, 'Las fichas iniciales'),
        intervalo: leerEntero(valor('intervalo'), 0, 60000, 'El intervalo'),
        premios: null,
        pozoExtra: leerEntero(valor('pozoExtra'), 0, 100000, 'El pozo extra'),
        // En Fila de 5 y Elige tus 5 todo es automático
        marcado: fila || elige ? 'auto' : valor('marcado'),
        admision: leerBooleano(valor('admision'), 'La admisión de jugadores'),
        mensajeFichas: typeof valor('mensajeFichas') === 'string' ? limpiarTexto(valor('mensajeFichas')).slice(0, 200) : fallar('El mensaje debe ser texto.'),
        rondasSeguidas: leerBooleano(valor('rondasSeguidas'), 'Las rondas seguidas'),
        bolaDorada: leerBooleano(valor('bolaDorada'), 'La bola dorada'),
        botePorcentaje: leerEntero(valor('botePorcentaje'), 0, 50, 'El porcentaje para el bote'),
        boteBolas: 0,
    };
    if (!MARCADOS.includes(config.marcado)) fallar('La forma de marcar no es válida.');
    if (config.botePorcentaje > 0) config.boteBolas = leerEntero(valor('boteBolas'), 5, 75, 'Las bolas para ganar el bote');
    if (!intervaloValido(config.intervalo, prueba)) fallar(`El intervalo debe ser ${INTERVALOS.join(', ')} ms.`);
    if (fila || elige) {
        config.premios = [{ modalidad: fila ? MODALIDAD_FILA : MODALIDAD_ELIGE, porcentaje: 100 }];
        return config;
    }

    const premios = valor('premios');
    if (!Array.isArray(premios) || premios.length < 1 || premios.length > 3) fallar('Debe haber entre 1 y 3 premios.');
    config.premios = premios.map((premio) => {
        if (!premio || typeof premio !== 'object') fallar('Premio no válido.');
        if (!Object.hasOwn(PATRONES, premio.modalidad)) fallar(`Modalidad desconocida: ${String(premio.modalidad).slice(0, 20)}.`);
        return { modalidad: premio.modalidad, porcentaje: leerEntero(premio.porcentaje, 1, 100, 'El porcentaje del premio') };
    });
    if (new Set(config.premios.map((p) => p.modalidad)).size !== config.premios.length) fallar('No se pueden repetir modalidades.');
    if (config.premios.reduce((suma, p) => suma + p.porcentaje, 0) !== 100) fallar('Los porcentajes de los premios deben sumar 100.');
    if (!pro && config.premios.length > PLANES.gratis.premios) {
        fallar(`El plan gratis incluye ${PLANES.gratis.premios} premio. Con un código Pro puedes encadenar hasta ${PLANES.pro.premios}.`);
    }
    return config;
}

// ---------- Sala ----------
// `pro`: { tipo, hasta } si la sala se creó con un código Pro válido; null en el plan gratis
// `cuenta`: ms de cuenta atrás antes de la primera bola (en modo prueba, 0)
export function crearSala(codigo, entrada, { prueba = false, azar = AZAR, pro = null, cuenta = prueba ? 0 : CUENTA_INICIO } = {}) {
    const config = validarConfig(entrada, { prueba, pro: Boolean(pro) });
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
        ronda: 1,
        bote: 0,               // bote acumulado entre rondas
        aporteRonda: 0,        // lo que esta ronda aporta al bote (se suma al iniciar)
        jugadas: {},           // «Elige tus 5»: { [id]: [5 números] }
        siguienteJugada: 1,
        dorada: null,          // bola dorada (privada hasta que sale o termina la partida)
        doradaSalio: false,
        siguienteRondaEn: null,
        inicioAutoEn: null,
        pro: pro ? { tipo: pro.tipo, hasta: pro.hasta } : null,
        cuentaInicio: cuenta,
        movimientos: [],       // fichas asignadas por el anfitrión: [{ en, jugadorId, apodo, cantidad }] (solo lo ve él)
        vinculo: null,         // { codigo, expira, fallos }: código de un solo uso para manejar la sala desde otro móvil
        logo: null,            // versión del logo del evento (solo Pro); la imagen se guarda aparte
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

// ¿Gana este cartón (o fila) la modalidad con estas bolas?
function gana(sala, numero, salidas, modalidad) {
    if (esModoFila(sala.config)) return filaCompleta(numero, salidas);
    if (esModoElige(sala.config)) return (sala.jugadas[numero] ?? []).every((n) => salidas.has(n)) && Boolean(sala.jugadas[numero]);
    return verificar(generarCarton(sala.serie, numero), salidas, modalidad).gana;
}

// Reparte el pozo por porcentaje (división entera); lo que sobra va al último premio
function repartirPozo(pozo, premios) {
    const fichas = premios.map((p) => Math.floor((pozo * p.porcentaje) / 100));
    fichas[fichas.length - 1] += pozo - fichas.reduce((a, b) => a + b, 0);
    return fichas;
}

// En el lobby el pozo y los premios son una vista previa que cambia con cada venta
function recalcularPozo(sala) {
    const ventas = vendidos(sala) * sala.config.precioCarton;
    sala.aporteRonda = Math.floor((ventas * (sala.config.botePorcentaje || 0)) / 100);
    sala.pozo = ventas - sala.aporteRonda + sala.config.pozoExtra;
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

export const limiteJugadores = (sala) => (sala.pro ? PLANES.pro.jugadores : PLANES.gratis.jugadores);

// Devuelve { jugador, nuevo }. Con token conocido reconecta (el apodo se ignora).
// Se conserva la primera semilla válida que mande cada jugador.
export function unirJugador(sala, { apodo, token, semilla } = {}, azar = AZAR) {
    const existente = typeof token === 'string' && token ? sala.jugadores.find((j) => j.token === token) : null;
    if (existente) {
        if (!existente.semilla && semillaValida(semilla)) existente.semilla = semilla;
        return { jugador: existente, nuevo: false };
    }

    if (sala.jugadores.length >= limiteJugadores(sala)) {
        fallar(sala.pro ? 'La sala está llena.' : `La sala está llena: el plan gratis admite ${PLANES.gratis.jugadores} jugadores.`);
    }
    const base = limpiarApodo(apodo);
    const usados = new Set(sala.jugadores.map((j) => j.apodo.toLowerCase()));
    let final = base;
    for (let n = 2; usados.has(final.toLowerCase()); n++) final = `${base} ${n}`;

    // Con admisión, entra «en espera» y sin fichas: las fichas al entrar se dan al admitirlo
    const admitido = !sala.config.admision;
    const jugador = {
        id: azar.hex(8),
        token: azar.hex(32),
        apodo: final,
        fichas: admitido ? sala.config.fichasIniciales : 0,
        admitido,
        solicitud: null,       // { cantidad, en }: fichas que ha pedido al anfitrión
        cartones: [],
        conectado: false,
        semilla: semillaValida(semilla) ? semilla : null,
        ganado: 0,       // fichas ganadas en todas las rondas (ranking de la noche)
        repetir: true,   // en rondas seguidas, volver a comprar lo mismo
        ultimos: null,   // lo que jugó en la última ronda
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
    if (esModoElige(sala.config)) {
        if (!Number.isInteger(numero) || !sala.jugadas[numero]) fallar('Esa jugada no existe.');
        return numero;
    }
    if (!Number.isInteger(numero) || numero < 1 || numero > sala.config.cartones) {
        fallar(`${esModoFila(sala.config) ? 'La fila' : 'El cartón'} debe ser un número del 1 al ${sala.config.cartones}.`);
    }
    return numero;
}

// «ese cartón» / «esa fila» para los mensajes
const palabras = (sala) => (esModoFila(sala.config) ? ['esa fila', 'filas']
    : esModoElige(sala.config) ? ['esa jugada', 'jugadas'] : ['ese cartón', 'cartones']);
const mayus = (texto) => texto[0].toUpperCase() + texto.slice(1);
const tuyo = (sala) => (esModoAuto(sala.config) ? 'tuya' : 'tuyo');

// En «Elige tus 5» `numero` se ignora: se manda `numeros` y el servidor le pone número a la jugada
export function elegirCarton(sala, jugadorId, numero, numeros) {
    const jugador = jugadorOFallar(sala, jugadorId);
    const [uno, varios] = palabras(sala);
    if (jugador.admitido === false) fallar('Espera a que el anfitrión te admita.');
    if (sala.estado !== 'lobby') fallar(`Solo se pueden elegir ${varios} antes de empezar.`);
    let jugada = null;
    if (esModoElige(sala.config)) {
        try {
            jugada = limpiarJugada(numeros);
        } catch (error) {
            fallar(error.message);
        }
        if (vendidos(sala) >= sala.config.cartones) fallar('Ya no quedan jugadas a la venta en esta ronda.');
        numero = sala.siguienteJugada;
    } else {
        numeroCarton(sala, numero);
        const dueno = sala.ocupados[numero];
        if (dueno === jugadorId) fallar(`${mayus(uno)} ya es ${tuyo(sala)}.`);
        if (dueno) fallar(`${mayus(uno)} ya tiene dueño.`);
    }
    if (jugador.cartones.length >= sala.config.maxCartonesPorJugador) {
        fallar(`Puedes tener como máximo ${sala.config.maxCartonesPorJugador} ${varios}.`);
    }
    if (jugador.fichas < sala.config.precioCarton) fallar('No tienes fichas suficientes.');

    if (jugada) {
        sala.jugadas[numero] = jugada;
        sala.siguienteJugada += 1;
    }
    jugador.fichas -= sala.config.precioCarton;
    jugador.cartones.push(numero);
    jugador.cartones.sort((a, b) => a - b);
    sala.ocupados[numero] = jugadorId;
    recalcularPozo(sala);
    return [];
}

export function soltarCarton(sala, jugadorId, numero) {
    const jugador = jugadorOFallar(sala, jugadorId);
    const [uno, varios] = palabras(sala);
    if (sala.estado !== 'lobby') fallar(`Solo se pueden soltar ${varios} antes de empezar.`);
    numeroCarton(sala, numero);
    if (sala.ocupados[numero] !== jugadorId) fallar(`${mayus(uno)} no es ${tuyo(sala)}.`);

    jugador.fichas += sala.config.precioCarton;
    jugador.cartones = jugador.cartones.filter((n) => n !== numero);
    delete sala.ocupados[numero];
    delete sala.jugadas[numero];
    recalcularPozo(sala);
    return [];
}

// Rondas seguidas: el jugador decide si se le vuelve a comprar lo mismo en la siguiente ronda
export function fijarRepetir(sala, jugadorId, valor) {
    const jugador = jugadorOFallar(sala, jugadorId);
    if (typeof valor !== 'boolean') fallar('Valor no válido.');
    jugador.repetir = valor;
    return [];
}

export function expulsar(sala, jugadorId) {
    const jugador = buscarJugador(sala, jugadorId) ?? fallar('Ese jugador no está en la sala.');
    // A quien está en espera se le puede rechazar en cualquier momento (no tiene cartones)
    if (sala.estado !== 'lobby' && jugador.admitido !== false) fallar('Solo se puede expulsar en el lobby.');
    for (const numero of jugador.cartones) {
        delete sala.ocupados[numero];
        delete sala.jugadas[numero];
    }
    jugador.fichas += jugador.cartones.length * sala.config.precioCarton;
    jugador.cartones = [];
    sala.jugadores = sala.jugadores.filter((j) => j !== jugador);
    recalcularPozo(sala);
    return [{ tipo: 'aviso', texto: `${jugador.apodo} salió de la sala.` }];
}

// ---------- Admisión y fichas asignadas por el anfitrión ----------
const MAX_MOVIMIENTOS = 1000;
const MAX_FICHAS = 1000000;

function apuntarMovimiento(sala, jugador, cantidad, ahora) {
    sala.movimientos.push({ en: ahora, jugadorId: jugador.id, apodo: jugador.apodo, cantidad });
    if (sala.movimientos.length > MAX_MOVIMIENTOS) sala.movimientos.splice(0, sala.movimientos.length - MAX_MOVIMIENTOS);
}

// El jugador pide fichas (solo en salas con admisión); el anfitrión decide cuántas le da
export function pedirFichas(sala, jugadorId, cantidad, ahora) {
    const jugador = jugadorOFallar(sala, jugadorId);
    if (!sala.config.admision) fallar('En esta sala las fichas se reparten solas al entrar.');
    if (!Number.isInteger(cantidad) || cantidad < 1 || cantidad > 100000) fallar('Pide entre 1 y 100.000 fichas.');
    jugador.solicitud = { cantidad, en: ahora };
    return [{ tipo: 'solicitud', jugadorId, apodo: jugador.apodo, cantidad, para: 'anfitrion' }];
}

export function admitir(sala, jugadorId, ahora) {
    const jugador = buscarJugador(sala, jugadorId) ?? fallar('Ese jugador no está en la sala.');
    if (jugador.admitido !== false) fallar(`${jugador.apodo} ya está admitido.`);
    jugador.admitido = true;
    const eventos = [{ tipo: 'admitido', para: jugadorId }, { tipo: 'aviso', texto: `${jugador.apodo} ya puede jugar.` }];
    if (sala.config.fichasIniciales > 0) eventos.push(...darFichas(sala, jugadorId, sala.config.fichasIniciales, ahora));
    return eventos;
}

// Suma (o, con cantidad negativa, corrige) fichas a un jugador. Si estaba en espera, lo admite.
export function darFichas(sala, jugadorId, cantidad, ahora) {
    const jugador = buscarJugador(sala, jugadorId) ?? fallar('Ese jugador no está en la sala.');
    if (!Number.isInteger(cantidad) || cantidad === 0 || Math.abs(cantidad) > 100000) fallar('La cantidad debe ser un entero distinto de 0 (hasta 100.000).');
    if (jugador.fichas + cantidad < 0) fallar(`${jugador.apodo} solo tiene ${jugador.fichas} fichas.`);
    if (jugador.fichas + cantidad > MAX_FICHAS) fallar('Demasiadas fichas para un jugador.');
    jugador.fichas += cantidad;
    jugador.admitido = true;
    if (cantidad > 0) jugador.solicitud = null;
    apuntarMovimiento(sala, jugador, cantidad, ahora);
    return [{ tipo: 'fichas', cantidad, saldo: jugador.fichas, para: jugadorId }];
}

// Código de 6 cifras para manejar la sala desde otro dispositivo: vale 2 minutos y un solo uso
const VIGENCIA_VINCULO = 2 * 60 * 1000;
export function crearVinculo(sala, ahora, azar = AZAR) {
    const codigo = String(parseInt(azar.hex(8), 16) % 1000000).padStart(6, '0');
    sala.vinculo = { codigo, expira: ahora + VIGENCIA_VINCULO, fallos: 0 };
    return [{ tipo: 'vinculo', codigo, expira: sala.vinculo.expira, para: 'anfitrion' }];
}

// Devuelve el token de anfitrión si el código es bueno. Tras 5 fallos el código deja de valer.
export function usarVinculo(sala, codigo, ahora) {
    const v = sala.vinculo;
    if (!v || ahora > v.expira) fallar('El código de vinculación caducó. Pide otro en el show.');
    if (String(codigo ?? '').replace(/\D/g, '') !== v.codigo) {
        v.fallos += 1;
        if (v.fallos >= 5) sala.vinculo = null;
        fallar('Código incorrecto.');
    }
    sala.vinculo = null;
    return sala.tokenAnfitrion;
}

// ---------- Partida ----------
export function iniciar(sala, ahora, azar = AZAR) {
    if (sala.estado !== 'lobby') fallar('La partida ya empezó.');
    if (vendidos(sala) === 0) fallar(`Hace falta al menos ${esModoFila(sala.config) ? 'una fila vendida' : 'un cartón vendido'} para empezar.`);

    recalcularPozo(sala);
    const semillasClientes = sala.jugadores
        .filter((j) => j.cartones.length > 0 && j.semilla)
        .map(({ apodo, semilla }) => ({ apodo, semilla }));
    const semillaClientes = combinarSemillas(semillasClientes);
    sala.justo = { ...sala.justo, semillasClientes, semillaClientes };
    sala.serie = azar.serie(sala.semillaServidor, semillaClientes);
    sala.orden = azar.orden(sala.semillaServidor, semillaClientes);
    sala.dorada = sala.config.bolaDorada ? (azar.dorada ?? AZAR.dorada)(sala.semillaServidor, semillaClientes) : null;
    sala.doradaSalio = false;
    sala.inicioAutoEn = null;
    sala.bote += sala.aporteRonda;
    // Lo jugado en esta ronda, para repetirlo en la siguiente
    for (const jugador of sala.jugadores) {
        jugador.ultimos = jugador.cartones.length
            ? jugador.cartones.map((n) => (esModoElige(sala.config) ? [...sala.jugadas[n]] : n))
            : null;
    }
    sala.bolas = [];
    sala.registro = [];
    sala.ventana = [];
    sala.ventanaHasta = null;
    sala.premioActual = 0;
    sala.estado = 'jugando';
    // Con cuenta atrás la primera bola sale al terminarla (la saca avanzar, como las demás)
    const cuenta = sala.cuentaInicio ?? 0;
    if (cuenta > 0) {
        sala.siguienteBolaEn = ahora + cuenta;
        return [{ tipo: 'aviso', texto: '¡Empieza la partida!' }, { tipo: 'cuenta', ms: cuenta }];
    }
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
    const eventos = [{ tipo: 'bola', numero, indice: sala.bolas.length - 1 }];
    if (numero === sala.dorada && sala.premioActual !== null && !sala.doradaSalio) {
        // Bola dorada antes de que haya ganador: el premio en juego se duplica (lo pone la casa)
        const premio = sala.premios[sala.premioActual];
        sala.doradaSalio = true;
        premio.fichas *= 2;
        premio.doble = true;
        eventos.push({ tipo: 'dorada', numero, modalidad: premio.modalidad, fichas: premio.fichas });
    } else if (numero === sala.dorada) {
        sala.doradaSalio = true;
    }
    if (esModoAuto(sala.config)) eventos.push(...comprobarAutomaticos(sala, ahora));
    return eventos;
}

// «Fila de 5» y «Elige tus 5»: nadie canta. Si con esta bola se completa alguna fila o jugada
// vendida, el servidor abre la ventana (unos segundos de suspense en el show) y al cerrarla entrega
// el premio (repartido si hay varias).
function comprobarAutomaticos(sala, ahora) {
    if (sala.premioActual === null || sala.ventanaHasta !== null) return [];
    const salidas = new Set(sala.bolas);
    const completas = Object.entries(sala.ocupados)
        .map(([fila, jugadorId]) => ({ jugadorId, carton: Number(fila) }))
        .filter((c) => gana(sala, c.carton, salidas))
        .sort((a, b) => a.carton - b.carton);
    if (!completas.length) return [];
    sala.ventana = completas;
    sala.ventanaHasta = ahora + tiempos(sala).ventana;
    sala.siguienteBolaEn = null;
    const unidad = esModoFila(sala.config) ? 'fila' : 'jugada';
    const nombres = completas.map((c) => `${buscarJugador(sala, c.jugadorId)?.apodo ?? '?'} (${unidad} ${c.carton})`).join(', ');
    return [{ tipo: 'aviso', texto: `¡${unidad === 'fila' ? 'Fila' : 'Jugada'} completa! ${nombres}` }];
}

const ganadorPublico = (sala, { jugadorId, carton }, fichas) =>
    ({ jugadorId, apodo: buscarJugador(sala, jugadorId)?.apodo ?? '?', carton, fichas });

// Reparte el premio en juego entre los cantos (el resto al primero) y pasa al siguiente
function adjudicar(sala, cantos) {
    const premio = sala.premios[sala.premioActual];
    const parte = Math.floor(premio.fichas / cantos.length);
    const resto = premio.fichas - parte * cantos.length;
    premio.ganadores = cantos.map((canto, i) => ganadorPublico(sala, canto, parte + (i === 0 ? resto : 0)));
    const siguiente = sala.premios[sala.premioActual + 1] ?? null;

    // Bote: se lo lleva quien gane el último premio dentro de las bolas fijadas
    let bote = 0;
    if (!siguiente && sala.bote > 0 && sala.config.botePorcentaje > 0 && sala.bolas.length <= sala.config.boteBolas) {
        bote = sala.bote;
        const parteBote = Math.floor(bote / cantos.length);
        premio.ganadores.forEach((g, i) => { g.bote = parteBote + (i === 0 ? bote - parteBote * cantos.length : 0); });
        premio.bote = bote;
        sala.bote = 0;
    }
    for (const ganador of premio.ganadores) {
        const jugador = buscarJugador(sala, ganador.jugadorId);
        if (!jugador) continue;
        jugador.fichas += ganador.fichas + (ganador.bote ?? 0);
        jugador.ganado = (jugador.ganado ?? 0) + ganador.fichas + (ganador.bote ?? 0);
    }

    sala.premioActual = siguiente ? sala.premioActual + 1 : null;
    return { tipo: 'ganador', modalidad: premio.modalidad, ganadores: premio.ganadores, siguiente: siguiente?.modalidad ?? null, bote };
}

// Con `ahora` y rondas seguidas, programa la siguiente ronda
function terminar(sala, ahora = null) {
    sala.estado = 'terminada';
    sala.siguienteRondaEn = sala.config.rondasSeguidas && ahora !== null ? ahora + tiempos(sala).finRonda : null;
    sala.premioActual = null;
    sala.siguienteBolaEn = null;
    sala.ventanaHasta = null;
    sala.ventana = [];
}

// En modo de marcado «manual», `marcas` son los números que el jugador marcó en ese cartón:
// el ¡Bingo! se comprueba solo con los marcados que de verdad salieron.
export function cantarBingo(sala, jugadorId, numero, ahora, marcas = null) {
    const jugador = jugadorOFallar(sala, jugadorId);
    if (sala.estado !== 'jugando' && sala.estado !== 'pausa') fallar('No hay ninguna partida en juego.');
    if (sala.premioActual === null) fallar('No quedan premios en juego.');
    if (esModoAuto(sala.config)) fallar(`En «${esModoFila(sala.config) ? 'Fila de 5' : 'Elige tus 5'}» no hace falta cantar: el premio se entrega solo.`);
    numeroCarton(sala, numero);
    if (sala.ocupados[numero] !== jugadorId) fallar('Ese cartón no es tuyo.');
    if (sala.ventana.some((c) => c.carton === numero)) fallar('Ese cartón ya cantó ¡Bingo!');

    const premio = sala.premios[sala.premioActual];
    let validas = new Set(sala.bolas);
    if (sala.config.marcado === 'manual') {
        if (!Array.isArray(marcas) || marcas.length > TOTAL_BOLAS) fallar('Faltan tus marcas del cartón.');
        validas = new Set(marcas.filter((n) => Number.isInteger(n) && validas.has(n)));
    }
    const resultado = verificar(generarCarton(sala.serie, numero), validas, premio.modalidad);
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
    if (sala.premioActual === null) terminar(sala, ahora);
    else sala.siguienteBolaEn = sala.estado === 'jugando' ? ahora + tiempos(sala).pausaPremio : null;
    return [evento];
}

// Sin bolas y con premios pendientes: se revisan todos los cartones vendidos
export function adjudicarAgotadas(sala, ahora = null) {
    const salidas = new Set(sala.bolas);
    const cartones = Object.entries(sala.ocupados)
        .map(([carton, jugadorId]) => ({ jugadorId, carton: Number(carton) }))
        .sort((a, b) => a.carton - b.carton);
    const eventos = [];
    while (sala.premioActual !== null) {
        const { modalidad } = sala.premios[sala.premioActual];
        const ganadores = cartones.filter((c) => gana(sala, c.carton, salidas, modalidad));
        if (ganadores.length) eventos.push(adjudicar(sala, ganadores));
        else sala.premioActual = sala.premios[sala.premioActual + 1] ? sala.premioActual + 1 : null;
    }
    terminar(sala, ahora);
    return eventos;
}

// Próximo instante en que el servidor tiene que hacer algo (para la alarma); null si nada
export function proximoEvento(sala) {
    if (sala.ventanaHasta !== null) return sala.ventanaHasta;
    if (sala.estado === 'jugando' && sala.siguienteBolaEn !== null) return sala.siguienteBolaEn;
    if (sala.estado === 'terminada' && sala.siguienteRondaEn != null) return sala.siguienteRondaEn;
    if (sala.estado === 'lobby' && sala.inicioAutoEn != null) return sala.inicioAutoEn;
    return null;
}

// Ejecuta el evento pendiente si ya le toca. Devuelve sus eventos o null si no había nada.
export function avanzar(sala, ahora) {
    if (sala.ventanaHasta !== null) return ahora >= sala.ventanaHasta ? cerrarVentana(sala, ahora) : null;
    if (sala.estado === 'terminada') {
        if (sala.siguienteRondaEn == null || ahora < sala.siguienteRondaEn) return null;
        return nuevaPartida(sala, AZAR, { ahora, repetir: true });
    }
    if (sala.estado === 'lobby') {
        if (sala.inicioAutoEn == null || ahora < sala.inicioAutoEn) return null;
        sala.inicioAutoEn = null;
        if (vendidos(sala) === 0) return [{ tipo: 'aviso', texto: 'Nadie eligió todavía: el anfitrión empezará la ronda cuando haya jugadores.' }];
        return iniciar(sala, ahora);
    }
    if (sala.estado !== 'jugando' || sala.siguienteBolaEn === null || ahora < sala.siguienteBolaEn) return null;
    if (sala.bolas.length >= TOTAL_BOLAS) return adjudicarAgotadas(sala, ahora);
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
        sala.bote = Math.max(0, (sala.bote ?? 0) - (sala.aporteRonda ?? 0));
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
    if (!TIPOS.includes(sala.config.tipo)) sala.config.tipo = 'carton';
    sala.cuentaInicio ??= CUENTA_INICIO;
    for (const [clave, valor] of Object.entries(CONFIG_POR_DEFECTO)) sala.config[clave] ??= structuredClone(valor);
    // Salas creadas antes de los planes: conservan lo que tenían (como Pro)
    if (sala.pro === undefined) sala.pro = { tipo: 'anterior', hasta: null };
    sala.logo ??= null;
    if (!Array.isArray(sala.movimientos)) sala.movimientos = [];
    sala.vinculo ??= null;
    sala.ronda ??= 1;
    sala.bote ??= 0;
    sala.aporteRonda ??= 0;
    sala.siguienteJugada ??= 1;
    sala.doradaSalio ??= false;
    if (!sala.jugadas || typeof sala.jugadas !== 'object') sala.jugadas = {};
    for (const clave of ['dorada', 'siguienteRondaEn', 'inicioAutoEn']) sala[clave] ??= null;
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

// Con `repetir`, a quien lo tenga activado se le vuelve a comprar lo de la ronda anterior.
// Con rondas seguidas y `ahora`, arranca la cuenta atrás del lobby.
export function nuevaPartida(sala, azar = AZAR, { ahora = null, repetir = false } = {}) {
    if (sala.estado !== 'lobby' && sala.estado !== 'terminada') fallar('Termina la partida antes de empezar otra.');
    const devolver = sala.estado === 'lobby';
    if (!devolver) sala.ronda = (sala.ronda ?? 1) + 1;
    for (const jugador of sala.jugadores) {
        if (devolver) jugador.fichas += jugador.cartones.length * sala.config.precioCarton;
        jugador.cartones = [];
    }
    sala.ocupados = {};
    sala.jugadas = {};
    sala.siguienteJugada = 1;
    sala.dorada = null;
    sala.doradaSalio = false;
    sala.siguienteRondaEn = null;
    sala.inicioAutoEn = null;
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

    let repetidos = 0;
    if (repetir && !devolver) {
        for (const jugador of sala.jugadores) {
            if (!jugador.repetir || !Array.isArray(jugador.ultimos)) continue;
            for (const ultimo of jugador.ultimos) {
                try {
                    if (esModoElige(sala.config)) elegirCarton(sala, jugador.id, null, ultimo);
                    else elegirCarton(sala, jugador.id, ultimo);
                    repetidos += 1;
                } catch (error) {
                    if (!(error instanceof ErrorJuego)) throw error; // sin fichas o ya ocupado: se salta
                }
            }
        }
    }
    if (sala.config.rondasSeguidas && ahora !== null) sala.inicioAutoEn = ahora + tiempos(sala).lobbyAuto;
    const [, varios] = palabras(sala);
    return [{ tipo: 'aviso', texto: `Ronda ${sala.ronda}: elige tus ${varios}.${repetidos ? ' Se repitieron las jugadas de la ronda anterior.' : ''}` }];
}

// Rondas seguidas: el anfitrión puede parar la cuenta atrás del lobby y empezar cuando quiera
export function detenerCuenta(sala) {
    if (sala.estado !== 'lobby') fallar('Solo en la sala de espera.');
    sala.inicioAutoEn = null;
    return [];
}

// ---------- Permisos ----------
export const ROL_DE_ACCION = {
    elegirCarton: 'jugador',
    soltarCarton: 'jugador',
    bingo: 'jugador',
    repetir: 'jugador',
    reaccion: 'jugador',
    pedirFichas: 'jugador',
    detenerCuenta: 'anfitrion',
    admitir: 'anfitrion',
    darFichas: 'anfitrion',
    vincular: 'anfitrion',
    iniciar: 'anfitrion',
    pausar: 'anfitrion',
    reanudar: 'anfitrion',
    nuevaPartida: 'anfitrion',
    velocidad: 'anfitrion',
    expulsar: 'anfitrion',
    cerrarSala: 'anfitrion',
};

export function comprobarPermiso(rol, tipo) {
    const necesario = ROL_DE_ACCION[tipo];
    if (!necesario) fallar(`Mensaje desconocido: ${String(tipo).slice(0, 30)}`);
    if (rol !== necesario) fallar(necesario === 'anfitrion' ? 'Solo el anfitrión puede hacer eso.' : 'Solo los jugadores pueden hacer eso.');
}

// ---------- Vista pública (nunca incluye tokens) ----------
// `anfitrion`: añade lo que solo ve el anfitrión (peticiones de fichas y registro de movimientos)
export function instantanea(sala, { anfitrion = false } = {}) {
    const vista = {
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
        jugadores: sala.jugadores.map(({ id, apodo, fichas, cartones, conectado, ganado = 0, repetir = true, admitido = true }) =>
            ({ id, apodo, fichas, cartones: [...cartones], conectado, ganado, repetir, admitido })),
        ocupados: { ...sala.ocupados },
        anfitrionConectado: sala.anfitrionConectado,
        ronda: sala.ronda,
        pro: Boolean(sala.pro),
        maxJugadores: limiteJugadores(sala),
        logo: sala.logo,
        bote: sala.bote,
        aporteRonda: sala.aporteRonda,
        jugadas: structuredClone(sala.jugadas ?? {}),
        // La bola dorada es secreta hasta que sale (o hasta el final)
        dorada: sala.doradaSalio || sala.estado === 'terminada' ? sala.dorada : null,
        doradaSalio: sala.doradaSalio,
        siguienteRondaEn: sala.siguienteRondaEn,
        inicioAutoEn: sala.inicioAutoEn,
        justo: {
            compromiso: sala.justo.compromiso,
            semillasClientes: sala.justo.semillasClientes?.map((s) => ({ ...s })) ?? null,
            semillaClientes: sala.justo.semillaClientes,
            // La semilla del servidor solo se revela al terminar
            semillaServidor: sala.estado === 'terminada' ? sala.semillaServidor : null,
        },
    };
    if (anfitrion) {
        vista.solicitudes = sala.jugadores.filter((j) => j.solicitud)
            .map((j) => ({ jugadorId: j.id, apodo: j.apodo, cantidad: j.solicitud.cantidad, en: j.solicitud.en }));
        vista.movimientos = (sala.movimientos ?? []).slice(-200).map((m) => ({ ...m }));
    }
    return vista;
}

export const resumen = (sala) => ({
    codigo: sala.codigo,
    nombre: sala.config.nombre,
    pro: Boolean(sala.pro),
    logo: sala.logo,
    estado: sala.estado,
    jugadores: sala.jugadores.length,
    config: structuredClone(sala.config),
});
