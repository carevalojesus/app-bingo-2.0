// Vista del jugador en el móvil (jugar.html). Ver docs/en-linea.md
// Todo se dibuja a partir de la última instantánea `estado`; los eventos (bola, ganador,
// bingoRechazado, aviso) solo disparan animaciones, sonidos y avisos.
import { conectarSala, consultarSala, CLAVES, normalizarCodigo } from './en-linea/cliente.js';
import { htmlCarton } from './carton-html.js';
import * as sfx from './efectos.js';
import { crearPanelSonido } from './volumen.js';
import { cuentaAtras } from './cuenta.js';
import { nuevaSemilla, verificarPartida } from './justo.js';
import { esModoFila, esModoElige, esModoAuto, analizarJugada, numerosDeFila } from './filas.js';
import {
    COLORES, TOTAL_BOLAS, columnaDe, nombreBola, esc, fmt, fichas, nombreModalidad, detalleModalidad,
    limpiarApodo, leerPreferencia, guardarPreferencia, miJugador, misCartones, apodoDe, vendidos,
    pozoDe, premiosDe, premioActual, gananciasDe, analizarCarton, unidad,
} from './jugador/utiles.js';

const $ = (id) => document.getElementById(id);
const ESPERA_CANTAR = 2500; // ms con el botón «¡Bingo!» bloqueado tras pulsarlo
const NOMBRES_ESTADO = { lobby: 'Eligiendo cartones', jugando: 'Jugando', pausa: 'En pausa', terminada: 'Terminada' };

const app = {
    codigo: '',
    apodo: '',
    conexion: null,
    estadoConexion: 'cerrado',
    sala: null, // última instantánea `estado`
    miId: null,
    bienvenido: false,
    pendientes: new Set(), // cartones del lobby con una petición en curso
    cantando: new Map(), // cartón → hasta cuándo está bloqueado su botón «¡Bingo!»
    completos: new Set(), // cartones que ya avisaron de que están completos
    animarBola: false,
    marcarSolo: leerPreferencia('marcarSolo', true),
    sonido: leerPreferencia('sonido', true),
    marcas: { serie: null, cartones: {} }, // marcas a mano: { [cartón]: [números] }
    temporizadorCelebracion: null,
    verificacion: null, // { clave, valida, errores } del botón «Verificar partida»
    borrador: new Set(), // «Elige tus 5»: números marcados para la próxima jugada
    falta1: new Set(), // cartones/filas que ya avisaron de que les falta 1
    pedido: null, // { cantidad, en }: fichas pedidas al anfitrión que aún no llegan
};

// Números de una fila («Fila de 5») o de una jugada («Elige tus 5»)
const numerosDe = (sala, n) => (esModoFila(sala?.config) ? numerosDeFila(n) : sala?.jugadas?.[n] ?? []);
const segundosHasta = (t) => Math.max(0, Math.ceil((t - Date.now()) / 1000));
const REACCIONES = ['😱', '🔥', '👏', '😂', '🙏', '🍀'];

// ---------- Almacenamiento ----------
const leerToken = (codigo) => { try { return localStorage.getItem(CLAVES.jugador(codigo)); } catch { return null; } };
const guardarToken = (codigo, token) => { try { localStorage.setItem(CLAVES.jugador(codigo), token); } catch { /* */ } };
const borrarToken = (codigo) => { try { localStorage.removeItem(CLAVES.jugador(codigo)); } catch { /* */ } };
const leerApodo = () => { try { return localStorage.getItem(CLAVES.apodo) || ''; } catch { return ''; } };
const guardarApodo = (apodo) => { try { localStorage.setItem(CLAVES.apodo, apodo); } catch { /* */ } };

// Semilla del jugador para la partida verificable: una por sala, siempre la misma (docs/en-linea.md)
function semillaDe(codigo) {
    const clave = `bingoshow.semilla.${codigo}`;
    try {
        const guardada = localStorage.getItem(clave);
        if (guardada && /^[0-9a-f]{16,64}$/i.test(guardada)) return guardada;
        const nueva = nuevaSemilla(16);
        localStorage.setItem(clave, nueva);
        return nueva;
    } catch {
        // Sin almacenamiento: al menos la misma durante esta visita
        app.semillaTemporal ??= nuevaSemilla(16);
        return app.semillaTemporal;
    }
}

function cargarMarcas(serie) {
    const guardadas = leerPreferencia('marcas.' + app.codigo, null);
    app.marcas = guardadas?.serie === serie ? guardadas : { serie, cartones: {} };
}
const guardarMarcas = () => guardarPreferencia('marcas.' + app.codigo, app.marcas);

// ---------- Utilidades de interfaz ----------
// Reemplaza el contenido sin perder el foco del teclado (los elementos llevan data-foco)
function pintar(contenedor, html) {
    const foco = document.activeElement?.dataset?.foco;
    const abiertos = [...contenedor.querySelectorAll('details[data-abierto]')].filter((d) => d.open).map((d) => d.dataset.abierto);
    contenedor.innerHTML = html;
    for (const clave of abiertos) contenedor.querySelector(`details[data-abierto="${CSS.escape(clave)}"]`)?.setAttribute('open', '');
    if (foco) contenedor.querySelector(`[data-foco="${CSS.escape(foco)}"]`)?.focus({ preventScroll: true });
}

function mostrarVista(nombre) {
    for (const vista of ['vistaEntrar', 'vistaSala', 'vistaExpulsado']) $(vista).hidden = vista !== nombre;
}

function avisar(texto, tipo = 'info', duracion = 3500) {
    const aviso = document.createElement('div');
    const fondo = { info: 'bg-crema', error: 'bg-tomate', exito: 'bg-menta', bingo: 'bg-girasol' }[tipo] ?? 'bg-crema';
    aviso.className = `aviso-entra pointer-events-auto rounded-xl border-[3px] border-tinta ${fondo} px-4 py-3 text-sm font-black text-tinta shadow-duro`;
    if (tipo === 'error') aviso.setAttribute('role', 'alert');
    aviso.textContent = texto;
    const lista = $('avisos');
    lista.append(aviso);
    while (lista.children.length > 3) lista.firstElementChild.remove();
    setTimeout(() => aviso.remove(), duracion);
}

function vibrar(patron) {
    try { navigator.vibrate?.(patron); } catch { /* sin vibración */ }
}

function sonar(efecto) {
    if (!app.sonido) return;
    try { sfx[efecto]?.(); } catch { /* sin audio */ }
}

function htmlFicha(n, clases = 'h-11 w-11') {
    const { letra, color } = columnaDe(n);
    return `<span class="ficha ${clases}" style="--c:${color}" aria-label="${letra} ${n}">` +
        `<span class="ficha-centro"><span class="text-center leading-none">` +
        `<span class="block text-[0.45em]">${letra}</span><span>${n}</span></span></span></span>`;
}

function enviar(mensaje) {
    if (app.conexion?.enviar(mensaje)) return true;
    avisar('Sin conexión. Reintentando…', 'error');
    return false;
}

// ---------- Conexión ----------
const ESTILOS_CONEXION = {
    conectando: { texto: 'Conectando…', punto: 'bg-girasol punto-reconectando' },
    conectado: { texto: 'En línea', punto: 'bg-menta' },
    reconectando: { texto: 'Reconectando…', punto: 'bg-tomate punto-reconectando' },
    cerrado: { texto: 'Sin conectar', punto: 'bg-papel' },
};

function dibujarConexion() {
    const estilo = ESTILOS_CONEXION[app.estadoConexion] ?? ESTILOS_CONEXION.cerrado;
    $('textoConexion').textContent = estilo.texto;
    $('puntoConexion').className = `h-2.5 w-2.5 rounded-full border-2 border-tinta ${estilo.punto}`;
    // Con la conexión caída lo que se ve puede estar desfasado: se avisa bien visible
    const banda = $('bandaConexion');
    const caida = app.estadoConexion === 'reconectando' && app.bienvenido;
    banda.textContent = caida ? 'Se perdió la conexión. Reconectando… (lo que ves puede no estar al día)' : '';
    banda.classList.toggle('hidden', !caida);
}

function conectar() {
    app.conexion?.cerrar();
    app.bienvenido = false;
    app.sala = null;
    app.miId = null;
    app.completos.clear();
    const codigo = app.codigo;

    $('codigoSala').textContent = `Sala ${codigo}`;
    history.replaceState(null, '', `${location.pathname}?sala=${encodeURIComponent(codigo)}`);
    mostrarVista('vistaSala');
    pintar($('avisoSala'), htmlCargando('Entrando a la sala…'));
    for (const vista of ['vistaLobby', 'vistaJuego', 'vistaFin']) $(vista).hidden = true;

    app.conexion = conectarSala(codigo, {
        hola: () => {
            const token = leerToken(codigo);
            const hola = { rol: 'jugador', apodo: app.apodo, semilla: semillaDe(codigo) };
            if (token) hola.token = token;
            return hola;
        },
        alMensaje: (mensaje) => {
            if (app.codigo === codigo) recibir(mensaje);
        },
        alCambiarConexion: (estado) => {
            if (app.codigo !== codigo) return;
            app.estadoConexion = estado;
            dibujarConexion();
        },
    });
}

function salir({ olvidar = false } = {}) {
    app.conexion?.cerrar();
    app.conexion = null;
    app.estadoConexion = 'cerrado';
    if (olvidar) borrarToken(app.codigo);
    dibujarConexion();
    cerrarCelebracion();
}

function htmlCargando(texto) {
    return `<div class="carta p-5 text-center font-black" role="status">${esc(texto)}</div>`;
}

// ---------- Mensajes del servidor ----------
function recibir(mensaje) {
    switch (mensaje.tipo) {
        case 'bienvenida': {
            app.bienvenido = true;
            if (mensaje.jugadorId) app.miId = mensaje.jugadorId;
            if (mensaje.token) guardarToken(app.codigo, mensaje.token);
            if (mensaje.estado && typeof mensaje.estado === 'object') nuevoEstado(mensaje.estado);
            break;
        }
        case 'estado':
            if (mensaje.estado && typeof mensaje.estado === 'object') nuevoEstado(mensaje.estado);
            break;
        case 'bola':
            app.animarBola = true;
            cerrarCelebracion();
            vibrar(60);
            sonar('campana');
            break;
        case 'ganador':
            celebrar(mensaje);
            break;
        case 'cuenta':
            cerrarCelebracion();
            cuentaAtras({
                ms: Number(mensaje.ms) || 4000,
                alTick: (n) => {
                    vibrar(n > 0 ? 60 : [120, 60, 120]);
                    sonar(n > 0 ? 'golpe' : 'campana');
                },
            });
            break;
        case 'dorada':
            avisar(`¡Bola dorada! Salió el ${nombreBola(mensaje.numero)}: el premio se duplica a ${fichas(mensaje.fichas)}.`, 'info', 6000);
            vibrar([100, 50, 100, 50, 200]);
            sonar('fanfarria');
            break;
        case 'reaccion':
            flotarReaccion(mensaje.emoji, mensaje.apodo);
            break;
        case 'admitido':
            avisar('¡El anfitrión te admitió! Ya puedes elegir.', 'info', 5000);
            vibrar([80, 60, 80]);
            sonar('campana');
            break;
        case 'fichas': {
            const n = Number(mensaje.cantidad) || 0;
            if (n > 0) app.pedido = null;
            avisar(n > 0 ? `Recibiste ${fichas(n)}. Saldo: ${fmt(mensaje.saldo)}.` : `El anfitrión corrigió tu saldo (${fmt(n)}). Saldo: ${fmt(mensaje.saldo)}.`, 'info', 5000);
            vibrar(n > 0 ? [60, 40, 120] : 60);
            if (n > 0) sonar('campana');
            break;
        }
        case 'bingoRechazado': {
            app.cantando.delete(Number(mensaje.carton));
            const faltan = (mensaje.faltan ?? []).map(nombreBola);
            avisar(faltan.length
                ? `Cartón ${mensaje.carton}: aún no es bingo. ${faltan.length === 1 ? 'Falta' : 'Faltan'} ${faltan.join(', ')}.`
                : `Cartón ${mensaje.carton}: aún no es bingo.`, 'error', 6000);
            vibrar([40, 60, 40]);
            dibujarCartones();
            break;
        }
        case 'aviso':
            if (mensaje.texto) avisar(String(mensaje.texto));
            break;
        case 'error':
            if (!app.bienvenido) {
                // Rechazado al entrar (apodo inválido, sala llena…): de vuelta al formulario
                salir({ olvidar: true });
                abrirEntrar(mensaje.mensaje || 'No se pudo entrar a la sala.');
                return;
            }
            app.pendientes.clear();
            avisar(mensaje.mensaje || 'Algo salió mal.', 'error', 4500);
            if (app.sala) dibujar();
            break;
        case 'expulsado':
            salir({ olvidar: true });
            $('nombreSala').textContent = 'Bingo Show';
            $('codigoSala').textContent = '';
            mostrarVista('vistaExpulsado');
            vibrar([80, 60, 80]);
            break;
        default:
            break; // pong y desconocidos
    }
}

function nuevoEstado(sala) {
    const anterior = app.sala;
    app.sala = sala;
    app.pendientes.clear();
    if (sala.serie && app.marcas.serie !== sala.serie) cargarMarcas(sala.serie);
    if (anterior?.estado !== sala.estado || anterior?.serie !== sala.serie) app.completos.clear();
    if (sala.estado === 'lobby') app.cantando.clear();
    if (anterior && anterior.estado !== 'terminada' && sala.estado === 'terminada') registrarHistorial(sala);
    if (anterior?.estado !== sala.estado) app.falta1.clear();
    dibujar();
}

// ---------- Admisión: espera y petición de fichas ----------
function htmlPedirFichas(sala, { titulo = '¿Necesitas fichas?' } = {}) {
    const mensaje = sala.config?.mensajeFichas;
    const pedido = app.pedido;
    return `<div class="carta mt-5 p-4">
        <h2 class="font-display text-xl">${titulo}</h2>
        ${mensaje ? `<p class="mt-2 rounded-xl border-[2.5px] border-tinta bg-papel px-3 py-2 text-sm font-black">${esc(mensaje)}</p>` : ''}
        ${pedido
        ? `<p class="mt-3 rounded-xl border-[2.5px] border-tinta bg-girasol px-3 py-2 text-sm font-black" role="status">Pediste ${fichas(pedido.cantidad)}. Espera a que el anfitrión te las asigne.</p>`
        : ''}
        <p class="mt-3 text-xs font-bold text-tinta/70">${pedido ? 'Puedes cambiar tu pedido:' : 'Pide al anfitrión las fichas que quieras:'}</p>
        <div class="mt-2 grid grid-cols-3 gap-2">${[20, 50, 100].map((n) =>
            `<button type="button" data-pedir="${n}" class="boton h-11 bg-crema text-sm">${n}</button>`).join('')}</div>
        <div class="mt-2 flex gap-2">
            <input id="cantidadPedida" type="number" inputmode="numeric" min="1" max="100000" placeholder="Otra cantidad" class="campo min-w-0 flex-1" aria-label="Otra cantidad de fichas">
            <button type="button" data-pedir="otra" class="boton h-12 shrink-0 bg-girasol px-4 text-sm">Pedir</button>
        </div>
    </div>`;
}

function htmlEspera(sala) {
    return `<div class="carta p-5 text-center">
        <p class="text-4xl" aria-hidden="true">⏳</p>
        <p class="mt-2 font-display text-2xl leading-tight">Esperando al anfitrión</p>
        <p class="mt-1 text-sm font-bold text-tinta/70">En esta sala el anfitrión admite a cada jugador y le asigna sus fichas. Cuando lo haga, podrás elegir.</p>
    </div>
    ${htmlPedirFichas(sala, { titulo: 'Pide tus fichas' })}`;
}

function pedirFichas(valor) {
    const cantidad = valor === 'otra' ? Number($('cantidadPedida')?.value) : Number(valor);
    if (!Number.isInteger(cantidad) || cantidad < 1 || cantidad > 100000) {
        avisar('Escribe una cantidad entre 1 y 100.000.', 'error');
        return;
    }
    if (!enviar({ tipo: 'pedirFichas', cantidad })) return;
    app.pedido = { cantidad, en: Date.now() };
    vibrar(20);
    avisar(`Pedido enviado: ${fichas(cantidad)}.`);
    dibujar();
}

// ---------- Historial del jugador (solo en este móvil) ----------
function registrarHistorial(sala) {
    const mios = misCartones(sala, app.miId);
    if (!mios.length) return;
    const lista = leerPreferencia('historial', []);
    const clave = `${sala.codigo}:${sala.ronda ?? 1}:${sala.serie}`;
    if (lista.some((h) => h.clave === clave)) return;
    lista.unshift({
        clave, en: Date.now(), sala: sala.codigo, nombre: sala.nombre || '', ronda: sala.ronda ?? 1,
        jugadas: mios.length, unidad: unidad(sala).varios, gastado: mios.length * (sala.config?.precioCarton ?? 0), ganado: gananciasDe(sala, app.miId),
    });
    guardarPreferencia('historial', lista.slice(0, 30));
}

function htmlHistorial(limite = 5) {
    const lista = leerPreferencia('historial', []);
    if (!Array.isArray(lista) || !lista.length) return '';
    const balance = lista.reduce((t, h) => t + (h.ganado || 0) - (h.gastado || 0), 0);
    const fecha = (t) => new Date(t).toLocaleString('es', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
    return `<details data-abierto="historial" class="carta p-4">
        <summary class="flex cursor-pointer items-center justify-between gap-2">
            <span class="font-display text-xl">Tu historial</span>
            <span class="text-xs font-black">${lista.length} ${lista.length === 1 ? 'partida' : 'partidas'} · balance ${balance >= 0 ? '+' : ''}${fmt(balance)}</span>
        </summary>
        <ul class="mt-3 grid gap-1.5">${lista.slice(0, limite).map((h) => `
            <li class="flex items-center justify-between gap-2 rounded-xl border-[2.5px] border-tinta ${h.ganado ? 'bg-girasol' : 'bg-white'} px-3 py-1.5 text-sm">
                <span class="min-w-0"><span class="block truncate font-black">${esc(h.nombre || `Sala ${h.sala}`)} · ronda ${esc(h.ronda)}</span>
                    <span class="text-xs font-bold text-tinta/70">${fecha(h.en)} · ${esc(h.jugadas)} ${esc(h.unidad || 'jugadas')} · gastaste ${fmt(h.gastado)}</span></span>
                <span class="shrink-0 font-display">${h.ganado ? `+${fmt(h.ganado)}` : '—'}</span>
            </li>`).join('')}</ul>
        <p class="mt-2 text-[11px] font-bold text-tinta/60">Se guarda solo en este móvil.</p>
    </details>`;
}

// ---------- Reacciones ----------
function htmlReacciones() {
    return `<div class="mt-3 flex justify-between gap-1.5" role="group" aria-label="Reacciones para el show">${REACCIONES.map((emoji) =>
        `<button type="button" data-reaccion="${emoji}" class="boton h-11 flex-1 bg-crema px-0 text-xl" aria-label="Enviar ${emoji} al show">${emoji}</button>`).join('')}</div>`;
}

function reaccionar(emoji) {
    if (enviar({ tipo: 'reaccion', emoji })) vibrar(10);
}

function flotarReaccion(emoji, apodo) {
    if (!REACCIONES.includes(emoji) || document.hidden) return;
    const el = document.createElement('span');
    el.className = 'reaccion-flotante';
    el.textContent = emoji;
    el.title = apodo ?? '';
    el.style.left = `${10 + Math.random() * 80}%`;
    document.body.append(el);
    setTimeout(() => el.remove(), 2600);
}

// ---------- Rondas seguidas y extras ----------
function htmlRonda(sala) {
    const config = sala.config ?? {};
    if (!config.rondasSeguidas) return '';
    const yo = miJugador(sala, app.miId);
    const cuenta = sala.estado === 'lobby' && sala.inicioAutoEn
        ? `<p class="font-black">Empieza en <span class="font-display text-lg" data-hasta="${sala.inicioAutoEn}">${segundosHasta(sala.inicioAutoEn)}</span> s</p>`
        : sala.estado === 'terminada' && sala.siguienteRondaEn
            ? `<p class="font-black">Siguiente ronda en <span class="font-display text-lg" data-hasta="${sala.siguienteRondaEn}">${segundosHasta(sala.siguienteRondaEn)}</span> s</p>`
            : '';
    return `<div class="mt-4 rounded-2xl border-[3px] border-tinta bg-menta px-4 py-3 shadow-duro-sm">
        <div class="flex items-center justify-between gap-2">
            <p class="font-display text-lg leading-tight">Ronda ${fmt(sala.ronda ?? 1)}</p>
            ${cuenta}
        </div>
        ${yo ? `<label class="mt-2 flex cursor-pointer items-center gap-2 text-sm font-black">
            <input type="checkbox" data-repetir class="h-5 w-5 accent-[#14112b]" ${yo.repetir !== false ? 'checked' : ''}>
            Repetir mis ${unidad(sala).varios} en la siguiente ronda</label>` : ''}
    </div>`;
}

function htmlExtras(sala) {
    const config = sala.config ?? {};
    let html = '';
    if (config.botePorcentaje > 0) {
        html += `<div class="flex items-center justify-between gap-2 rounded-xl border-[2.5px] border-tinta bg-fucsia px-3 py-2">
            <span><span class="block font-black">Bote acumulado</span>
            <span class="text-xs font-bold">Para quien gane el último premio en ${fmt(config.boteBolas)} bolas o menos</span></span>
            <span class="shrink-0 font-display text-xl">${fmt((sala.bote ?? 0) + (sala.estado === 'lobby' ? sala.aporteRonda ?? 0 : 0))}</span></div>`;
    }
    if (config.bolaDorada) {
        html += `<div class="flex items-center justify-between gap-2 rounded-xl border-[2.5px] border-tinta bg-girasol px-3 py-2">
            <span><span class="block font-black">Bola dorada</span>
            <span class="text-xs font-bold">${sala.doradaSalio ? 'Ya salió' : 'Si sale antes del ganador, el premio se duplica'}</span></span>
            <span class="shrink-0 font-display text-xl">${sala.dorada ? nombreBola(sala.dorada) : '¿?'}</span></div>`;
    }
    return html ? `<div class="mt-3 grid gap-2">${html}</div>` : '';
}

// Cuentas atrás de rondas (cualquier elemento con data-hasta)
function actualizarCuentas() {
    document.querySelectorAll('[data-hasta]').forEach((el) => { el.textContent = String(segundosHasta(Number(el.dataset.hasta))); });
}

// ---------- Dibujo general ----------
function dibujar() {
    const sala = app.sala;
    if (!sala) return;
    $('nombreSala').textContent = sala.nombre || 'Bingo Show';
    const estado = sala.estado === 'lobby' ? `Eligiendo ${unidad(sala).varios}` : NOMBRES_ESTADO[sala.estado] ?? '';
    $('codigoSala').textContent = `Sala ${sala.codigo || app.codigo} · ${estado}`;
    document.title = `${sala.nombre || 'Jugar'} · Bingo Show`;
    // Logo del evento (Pro) en lugar del de Bingo Show
    const logo = sala.logo ? `/api/salas/${encodeURIComponent(sala.codigo || app.codigo)}/logo?v=${encodeURIComponent(sala.logo)}` : '';
    if ($('logoSala').dataset.src !== logo) {
        $('logoSala').dataset.src = logo;
        if (logo) $('logoSala').src = logo;
        $('logoSala').alt = logo ? `Logo de ${sala.nombre || 'la sala'}` : '';
        $('logoSala').classList.toggle('hidden', !logo);
        $('logoBingo').classList.toggle('hidden', Boolean(logo));
    }

    pintar($('avisoSala'), htmlResumen());

    const enJuego = sala.estado === 'jugando' || sala.estado === 'pausa';
    // Sala con admisión: hasta que el anfitrión lo admita, el jugador solo ve la espera
    const yoAhora = miJugador(sala, app.miId);
    if (yoAhora && yoAhora.admitido === false) {
        $('codigoSala').textContent = `Sala ${sala.codigo || app.codigo} · En espera`;
        $('vistaLobby').hidden = false;
        $('vistaJuego').hidden = true;
        $('vistaFin').hidden = true;
        pintar($('vistaLobby'), htmlEspera(sala));
        return;
    }
    $('vistaLobby').hidden = sala.estado !== 'lobby';
    $('vistaJuego').hidden = !enJuego;
    $('vistaFin').hidden = sala.estado !== 'terminada';

    if (sala.estado === 'lobby') dibujarLobby();
    else if (enJuego) dibujarJuego();
    else if (sala.estado === 'terminada') dibujarFin();
}

function htmlResumen() {
    const sala = app.sala;
    const yo = miJugador(sala, app.miId);
    if (!yo) {
        return `<div class="carta mb-4 p-3 text-sm font-bold">Conectado como observador: aún no apareces en la lista de jugadores.</div>`;
    }
    return `<div class="mb-4 flex items-center justify-between gap-3 rounded-2xl border-[3px] border-tinta bg-crema px-4 py-2.5 shadow-duro">
        <div class="min-w-0">
            <p class="etiqueta text-tinta/70">Jugando como</p>
            <p class="truncate font-display text-lg leading-tight">${esc(yo.apodo)}</p>
        </div>
        <div class="text-right">
            <p class="etiqueta text-tinta/70">Tus fichas</p>
            <p class="font-display text-2xl leading-tight" aria-label="${fichas(yo.fichas)}">${fmt(yo.fichas)}</p>
        </div>
    </div>`;
}

function htmlPremios(premios, { conGanadores = false } = {}) {
    return `<ul class="mt-2 grid gap-2">${premios.map((p, i) => {
        const ganado = p.ganadores.length > 0;
        const marca = p.enJuego ? 'bg-girasol' : ganado ? 'bg-papel' : 'bg-white';
        const estado = p.enJuego ? 'En juego' : ganado ? 'Entregado' : '';
        const ganadores = conGanadores || ganado
            ? p.ganadores.map((g) => {
                const yo = g.jugadorId === app.miId;
                return `<li class="${yo ? 'font-black text-tinta' : ''}">${esc(g.apodo)}${yo ? ' (tú)' : ''} · ${unidad(app.sala).uno} ${esc(g.carton)} · ${fichas(g.fichas)}${g.bote ? ` + bote ${fmt(g.bote)}` : ''}</li>`;
            }).join('')
            : '';
        return `<li class="rounded-xl border-[2.5px] border-tinta ${marca} px-3 py-2">
            <div class="flex items-center justify-between gap-2">
                <p class="font-black"><span class="mr-1 text-tinta/60">${i + 1}.</span>${esc(nombreModalidad(p.modalidad))}${p.doble ? ' <span class="rounded bg-girasol px-1 text-xs">×2</span>' : ''}
                    <span class="font-bold text-tinta/60">· ${esc(p.porcentaje)} %</span></p>
                <p class="shrink-0 font-display">${fmt(p.fichas)}<span class="ml-1 font-ui text-xs font-black">fichas</span></p>
            </div>
            <p class="text-xs font-bold text-tinta/70">${esc(detalleModalidad(p.modalidad))}${estado ? ` · <span class="font-black text-tinta">${estado}</span>` : ''}</p>
            ${ganadores ? `<ul class="mt-1 text-xs font-bold text-tinta/80">${ganadores}</ul>` : ''}
        </li>`;
    }).join('')}</ul>`;
}

// ---------- Lobby ----------
function dibujarLobby() {
    const sala = app.sala;
    const config = sala.config ?? {};
    const yo = miJugador(sala, app.miId);
    const mios = misCartones(sala, app.miId);
    const max = config.maxCartonesPorJugador ?? 0;
    const precio = config.precioCarton ?? 0;
    const total = config.cartones ?? 0;
    const pozo = pozoDe(sala);
    const u = unidad(sala);
    const modoFila = esModoFila(config);
    const modoElige = esModoElige(config);

    let botones = '';
    for (let n = 1; n <= (modoElige ? 0 : total); n++) {
        const dueno = sala.ocupados?.[n] ?? sala.ocupados?.[String(n)];
        const mio = dueno && dueno === app.miId;
        const pendiente = app.pendientes.has(n);
        let clases;
        let etiqueta;
        let titulo;
        const numeros = modoFila ? ` (${numerosDeFila(n).map(nombreBola).join(', ')})` : '';
        if (mio) {
            clases = 'bg-girasol shadow-duro-sm';
            etiqueta = `${u.Uno} ${n}${numeros}, ${u.tuyo}. Toca para soltar${modoFila ? 'la' : 'lo'}.`;
            titulo = u.tuyo[0].toUpperCase() + u.tuyo.slice(1);
        } else if (dueno) {
            const apodo = apodoDe(sala, dueno) ?? 'otro jugador';
            clases = 'border-tinta/60 bg-[#3b2a6e] text-crema/60 line-through';
            etiqueta = `${u.Uno} ${n}${numeros}, ${modoFila ? 'ocupada' : 'ocupado'} por ${apodo}.`;
            titulo = `De ${apodo}`;
        } else {
            clases = 'bg-white';
            etiqueta = `${u.Uno} ${n}${numeros}, libre. Toca para elegir${modoFila ? 'la' : 'lo'} por ${fichas(precio)}.`;
            titulo = 'Libre';
        }
        if (modoFila) {
            // Fila: número de fila y sus 5 bolas, a lo ancho (ocupada: atenuada, sin tachar)
            if (dueno && !mio) clases = 'border-tinta/60 bg-[#3b2a6e] text-crema/70';
            botones += `<button type="button" data-elegir="${n}" data-foco="c${n}" title="${esc(titulo)}" aria-label="${esc(etiqueta)}"` +
                `${mio ? ' aria-pressed="true"' : dueno ? ' aria-disabled="true"' : ' aria-pressed="false"'}` +
                ` class="fila-venta flex w-full items-center gap-2 rounded-xl border-[2.5px] border-tinta px-2 py-1.5 text-left ${clases}${pendiente ? ' animate-pulse opacity-60' : ''}` +
                ` focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-girasol">` +
                `<span class="w-7 shrink-0 text-center font-display text-lg">${n}</span>` +
                `<span class="flex flex-1 justify-between gap-1 ${dueno && !mio ? 'opacity-40' : ''}" aria-hidden="true">${numerosDeFila(n).map((x) => htmlFicha(x, 'h-11 w-11 text-base')).join('')}</span>` +
                `<span class="w-14 shrink-0 truncate text-right text-[10px] font-black uppercase leading-tight">${esc(mio ? 'Tuya' : dueno ? titulo : 'Libre')}</span>` +
                `</button>`;
            continue;
        }
        botones += `<button type="button" data-elegir="${n}" data-foco="c${n}" title="${esc(titulo)}" aria-label="${esc(etiqueta)}"` +
            `${mio ? ' aria-pressed="true"' : dueno ? ' aria-disabled="true"' : ' aria-pressed="false"'}` +
            ` class="numero-carton rounded-lg border-[2.5px] border-tinta font-display text-base ${clases}${pendiente ? ' animate-pulse opacity-60' : ''}` +
            ` focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-girasol">${n}</button>`;
    }

    const jugadores = [...(sala.jugadores ?? [])].sort((a, b) =>
        (b.id === app.miId) - (a.id === app.miId) || (b.conectado - a.conectado) || a.apodo.localeCompare(b.apodo));

    pintar($('vistaLobby'), `
        <div class="carta p-4">
            <p class="font-display text-xl leading-tight">Esperando a que el anfitrión empiece</p>
            <p class="mt-1 text-sm font-bold text-tinta/75">${modoFila
                ? 'Elige tus filas: cada una tiene 5 números, uno de cada letra. Gana la primera fila que complete sus 5 números y se lleva todo el pozo. No hace falta cantar: el premio se entrega solo.'
                : modoElige
                    ? 'Arma tus jugadas: elige 5 números del 1 al 75 (o pide unos al azar). Gana quien complete sus 5 primero; si empatan, el pozo se reparte. No hace falta cantar.'
                    : 'Elige tus cartones por número. Los números de cada cartón se revelan cuando empieza la partida: así nadie puede elegir «el bueno».'}</p>
            ${htmlRonda(sala)}
            ${sala.anfitrionConectado === false ? '<p class="mt-2 rounded-lg border-2 border-tinta bg-papel px-2 py-1 text-xs font-black">El anfitrión no está conectado ahora mismo.</p>' : ''}
            <dl class="mt-4 grid grid-cols-3 gap-2 text-center">
                <div class="rounded-xl border-[2.5px] border-tinta bg-white px-1 py-2"><dt class="etiqueta">${u.Uno}</dt><dd class="font-display text-lg">${fmt(precio)}</dd><dd class="text-[10px] font-black uppercase">fichas</dd></div>
                <div class="rounded-xl border-[2.5px] border-tinta bg-white px-1 py-2"><dt class="etiqueta">Máximo</dt><dd class="font-display text-lg">${fmt(max)}</dd><dd class="text-[10px] font-black uppercase">por jugador</dd></div>
                <div class="rounded-xl border-[2.5px] border-tinta bg-girasol px-1 py-2"><dt class="etiqueta">Pozo</dt><dd class="font-display text-lg">${fmt(pozo)}</dd><dd class="text-[10px] font-black uppercase">fichas</dd></div>
            </dl>
            ${htmlExtras(sala)}
            <h2 class="etiqueta mt-4">Premios</h2>
            ${htmlPremios(premiosDe(sala))}
            ${htmlCompromiso(sala)}
        </div>

        ${modoElige ? htmlElige(sala, mios, max, precio) : `<div class="carta mt-5 p-4">
            <div class="flex items-baseline justify-between gap-2">
                <h2 class="font-display text-xl">${u.Varios}</h2>
                <p class="text-sm font-black" aria-live="polite">Tienes ${mios.length} de ${max}</p>
            </div>
            <p class="mt-1 text-xs font-bold text-tinta/70">${modoFila
                ? `${vendidos(sala)} de ${total} vendidas · toca una fila libre para elegirla y una tuya para soltarla (te devuelve las fichas).`
                : `${vendidos(sala)} de ${total} vendidos · toca un número libre para elegirlo y uno tuyo para soltarlo (te devuelve las fichas).`}</p>
            ${mios.length ? `<p class="mt-2 text-sm font-black">Tus ${u.varios}: ${mios.join(', ')}${yo ? ` · gastaste ${fichas(mios.length * precio)}` : ''}</p>` : ''}
            <ul class="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-black uppercase tracking-wide" aria-hidden="true">
                <li class="flex items-center gap-1.5"><span class="h-3.5 w-3.5 rounded border-2 border-tinta bg-white"></span>Libre</li>
                <li class="flex items-center gap-1.5"><span class="h-3.5 w-3.5 rounded border-2 border-tinta bg-girasol"></span>${modoFila ? 'Tuya' : 'Tuyo'}</li>
                <li class="flex items-center gap-1.5"><span class="h-3.5 w-3.5 rounded border-2 border-tinta bg-[#3b2a6e]"></span>${modoFila ? 'Ocupada' : 'Ocupado'}</li>
            </ul>
            <div class="mt-3 ${modoFila ? 'grid gap-1.5' : 'grid grid-cols-[repeat(auto-fill,minmax(2.75rem,1fr))] gap-1.5'}" role="group" aria-label="${u.Varios} a la venta">${botones}</div>
        </div>`}

        ${config.admision ? htmlPedirFichas(sala) : ''}

        ${esModoAuto(config) ? '' : `<div class="carta mt-5 p-4">
            <h2 class="font-display text-xl">${marcadoSala() === 'libre' ? '¿Cómo quieres marcar?' : 'Cómo se marca'}</h2>
            ${marcadoSala() === 'libre' ? '<p class="mt-1 text-xs font-bold text-tinta/70">Puedes cambiarlo cuando quieras, también durante la partida.</p>' : ''}
            <div class="mt-3">${htmlModoMarcado()}</div>
        </div>`}

        <div class="carta mt-5 p-4">
            <h2 class="font-display text-xl">Jugadores <span class="font-ui text-base font-black text-tinta/60">(${jugadores.length})</span></h2>
            <ul class="mt-2 grid gap-1.5">${jugadores.map((j) => `
                <li class="flex items-center gap-2 text-sm font-bold ${j.conectado ? '' : 'text-tinta/50'}">
                    <span class="h-2.5 w-2.5 shrink-0 rounded-full border-2 border-tinta ${j.conectado ? 'bg-menta' : 'bg-papel'}" aria-hidden="true"></span>
                    <span class="min-w-0 flex-1 truncate ${j.id === app.miId ? 'font-black text-tinta' : ''}">${esc(j.apodo)}${j.id === app.miId ? ' (tú)' : ''}${j.conectado ? '' : ' · desconectado'}</span>
                    <span class="shrink-0 text-xs font-black">${(j.cartones ?? []).length} ${(j.cartones ?? []).length === 1 ? u.uno : u.varios}</span>
                </li>`).join('')}</ul>
        </div>`);
}

// ---------- «Elige tus 5» en el lobby ----------
function htmlElige(sala, mios, max, precio) {
    const total = sala.config?.cartones ?? 0;
    const elegidos = app.borrador;
    const lleno = mios.length >= max;
    const misJugadas = mios.map((id) => `
        <li class="flex items-center gap-2 rounded-xl border-[2.5px] border-tinta bg-girasol px-2 py-1.5">
            <span class="w-7 shrink-0 text-center font-display">${id}</span>
            <span class="flex flex-1 justify-between gap-1" aria-label="Jugada ${id}: ${numerosDe(sala, id).map(nombreBola).join(', ')}">${numerosDe(sala, id).map((x) => htmlFicha(x, 'h-10 w-10 text-sm')).join('')}</span>
            <button type="button" data-soltar="${id}" class="boton h-9 shrink-0 bg-crema px-2 text-[11px] ${app.pendientes.has(id) ? 'animate-pulse opacity-60' : ''}" aria-label="Soltar la jugada ${id}">Soltar</button>
        </li>`).join('');
    let rejilla = '';
    for (let f = 0; f < 15; f++) {
        for (let c = 0; c < 5; c++) {
            const n = c * 15 + f + 1;
            const activo = elegidos.has(n);
            rejilla += `<button type="button" data-num="${n}" aria-pressed="${activo}" aria-label="${nombreBola(n)}"
                class="grid h-9 place-items-center rounded-lg border-[2.5px] border-tinta font-display text-sm ${activo ? 'text-tinta shadow-duro-sm' : 'bg-white'}"
                ${activo ? `style="background:${columnaDe(n).color}"` : ''}>${n}</button>`;
        }
    }
    return `<div class="carta mt-5 p-4">
        <div class="flex items-baseline justify-between gap-2">
            <h2 class="font-display text-xl">Tus jugadas</h2>
            <p class="text-sm font-black" aria-live="polite">Tienes ${mios.length} de ${max}</p>
        </div>
        <p class="mt-1 text-xs font-bold text-tinta/70">${vendidos(sala)} de ${total} jugadas vendidas en la sala · cada una cuesta ${fichas(precio)}.</p>
        ${misJugadas ? `<ul class="mt-3 grid gap-1.5">${misJugadas}</ul>` : ''}
        ${lleno ? '<p class="mt-3 text-sm font-black">Ya tienes el máximo de jugadas. Suelta una para armar otra.</p>' : `
        <h3 class="etiqueta mt-4">Nueva jugada · <span aria-live="polite">${elegidos.size}/5</span></h3>
        <div class="mt-2 grid grid-cols-5 gap-1 text-center font-display text-sm" aria-hidden="true">${['B', 'I', 'N', 'G', 'O'].map((l, i) =>
            `<span class="rounded-md border-2 border-tinta text-tinta" style="background:${COLORES[i]}">${l}</span>`).join('')}</div>
        <div class="mt-1 grid grid-cols-5 gap-1" role="group" aria-label="Elige 5 números">${rejilla}</div>
        <div class="mt-3 grid grid-cols-2 gap-2">
            <button type="button" data-azar class="boton h-11 bg-crema text-sm">🎲 Al azar</button>
            <button type="button" data-borrar class="boton h-11 bg-crema text-sm" ${elegidos.size ? '' : 'disabled'}>Borrar</button>
        </div>
        <button type="button" data-comprar class="boton mt-2 h-12 w-full bg-girasol" ${elegidos.size === 5 ? '' : 'disabled'}>
            ${elegidos.size === 5 ? `Comprar jugada · ${fichas(precio)}` : `Elige ${5 - elegidos.size} más`}</button>`}
    </div>`;
}

function tocarNumero(n) {
    if (app.borrador.has(n)) app.borrador.delete(n);
    else if (app.borrador.size < 5) app.borrador.add(n);
    else {
        avisar('Ya elegiste 5 números. Quita uno o compra la jugada.');
        return;
    }
    vibrar(8);
    dibujarLobby();
}

function numerosAlAzar() {
    const bolsa = Array.from({ length: 75 }, (_, i) => i + 1);
    const elegidos = [];
    const azar = new Uint32Array(5);
    crypto.getRandomValues(azar);
    for (let i = 0; i < 5; i++) elegidos.push(bolsa.splice(azar[i] % bolsa.length, 1)[0]);
    app.borrador = new Set(elegidos);
    dibujarLobby();
}

function comprarJugada() {
    const sala = app.sala;
    if (!sala || sala.estado !== 'lobby' || app.borrador.size !== 5) return;
    const yo = miJugador(sala, app.miId);
    if (yo && yo.fichas < (sala.config?.precioCarton ?? 0)) {
        avisar(`No tienes fichas suficientes: la jugada cuesta ${fichas(sala.config.precioCarton)}.`, 'error');
        return;
    }
    if (enviar({ tipo: 'elegirCarton', numeros: [...app.borrador] })) {
        app.borrador = new Set();
        vibrar(30);
    }
}

function soltarJugada(id) {
    if (!app.sala || app.sala.estado !== 'lobby' || app.pendientes.has(id)) return;
    if (enviar({ tipo: 'soltarCarton', numero: id })) app.pendientes.add(id);
    dibujarLobby();
}

function tocarCartonLobby(n) {
    const sala = app.sala;
    if (!sala || sala.estado !== 'lobby' || app.pendientes.has(n)) return;
    const dueno = sala.ocupados?.[n] ?? sala.ocupados?.[String(n)];
    const config = sala.config ?? {};
    const u = unidad(sala);
    if (dueno && dueno !== app.miId) {
        avisar(`${u.la === 'la' ? 'La' : 'El'} ${u.uno} ${n} ya es de ${apodoDe(sala, dueno) ?? 'otro jugador'}.`);
        return;
    }
    if (dueno === app.miId) {
        if (enviar({ tipo: 'soltarCarton', numero: n })) app.pendientes.add(n);
    } else {
        const yo = miJugador(sala, app.miId);
        const mios = misCartones(sala, app.miId);
        if (mios.length >= (config.maxCartonesPorJugador ?? Infinity)) {
            avisar(`Como máximo ${config.maxCartonesPorJugador} ${u.varios} por jugador. Suelta ${u.una === 'una' ? 'una para elegir otra' : 'uno para elegir otro'}.`, 'error');
            return;
        }
        if (yo && yo.fichas < (config.precioCarton ?? 0)) {
            avisar(`No tienes fichas suficientes: ${u.la} ${u.uno} cuesta ${fichas(config.precioCarton)}.`, 'error');
            return;
        }
        if (enviar({ tipo: 'elegirCarton', numero: n })) app.pendientes.add(n);
    }
    dibujarLobby();
}

// ---------- Jugando / pausa ----------
function dibujarJuego() {
    const sala = app.sala;
    const bolas = sala.bolas ?? [];
    const ultima = bolas.at(-1);
    const previas = bolas.slice(-6, -1).reverse();
    const premio = premioActual(sala);
    const intervalo = sala.config?.intervalo ?? 8000;

    const bolaGrande = ultima
        ? htmlFicha(ultima, `ficha-grande text-3xl ${app.animarBola ? 'bola-nueva' : ''}`)
        : `<span class="ficha ficha-grande text-3xl" style="--c:#3b2a6e"><span class="ficha-centro">?</span></span>`;
    app.animarBola = false;

    pintar($('panelBola'), `
        <div class="carta flex items-center gap-4 p-4">
            ${bolaGrande}
            <div class="min-w-0 flex-1">
                <p class="etiqueta text-tinta/70">Última bola</p>
                <p class="font-display text-3xl leading-none" aria-live="assertive" aria-atomic="true">${ultima ? `${columnaDe(ultima).letra}-${ultima}` : '—'}</p>
                <p class="mt-1 text-sm font-black"><span class="font-display">${bolas.length}</span>/${TOTAL_BOLAS} bolas</p>
                <ol class="mt-2 flex gap-1.5" aria-label="Bolas anteriores">${previas.map((n) => `<li>${htmlFicha(n, 'h-9 w-9 text-xs')}</li>`).join('')}</ol>
            </div>
            <div class="relative grid h-16 w-16 shrink-0 place-items-center" aria-hidden="true">
                <svg viewBox="0 0 48 48" class="absolute inset-0 h-full w-full -rotate-90">
                    <circle cx="24" cy="24" r="20" fill="#fff" stroke-width="5" class="anillo-fondo"/>
                    <circle id="anillo" cx="24" cy="24" r="20" fill="none" stroke-width="5" class="anillo-avance"
                            stroke-dasharray="125.66" stroke-dashoffset="125.66"/>
                </svg>
                <span id="cuentaAtras" class="relative font-display text-lg"></span>
            </div>
        </div>
        <p id="textoCuenta" class="sr-only" aria-live="off"></p>`);

    const premios = premiosDe(sala);
    pintar($('panelPremio'), `
        <div class="carta mt-4 p-4">
            <div class="flex items-center justify-between gap-2">
                <div>
                    <p class="etiqueta text-tinta/70">Premio en juego</p>
                    <p class="font-display text-xl leading-tight">${premio ? esc(nombreModalidad(premio.modalidad)) : '—'}${premio?.doble ? ' <span class="rounded-md border-2 border-tinta bg-girasol px-1 text-sm">×2</span>' : ''}</p>
                    ${premio ? `<p class="text-xs font-bold text-tinta/70">${esc(detalleModalidad(premio.modalidad))}</p>` : ''}
                </div>
                <p class="shrink-0 rounded-xl border-[2.5px] border-tinta bg-girasol px-3 py-1.5 text-center">
                    <span class="block font-display text-xl leading-none">${fmt(premio?.fichas ?? 0)}</span>
                    <span class="text-[10px] font-black uppercase">fichas</span>
                </p>
            </div>
            ${htmlExtras(sala)}
            ${htmlSemillaIncluida(sala)}
            ${premios.length > 1 ? `<details data-abierto="premios" class="mt-2"><summary class="cursor-pointer text-xs font-black uppercase tracking-wide">Todos los premios · pozo ${fmt(pozoDe(sala))}</summary>${htmlPremios(premios)}</details>` : ''}
        </div>
        ${htmlReacciones()}`);

    dibujarCartones();
    actualizarReloj(intervalo);
}

// Selector «¿Cómo quieres marcar?»: se ofrece en el lobby y durante la partida
// Forma de marcar en vigor: la que fija el anfitrión o, si la deja libre, la que eligió el jugador
const marcadoSala = () => app.sala?.config?.marcado ?? 'libre';
function marcaSolo() {
    const marcado = marcadoSala();
    return marcado === 'auto' ? true : marcado === 'manual' ? false : app.marcarSolo;
}

function htmlModoMarcado() {
    const marcado = marcadoSala();
    if (marcado === 'auto') {
        return `<p class="rounded-2xl border-[3px] border-tinta bg-menta px-4 py-3 text-sm font-black shadow-duro-sm">
            El anfitrión eligió <b>marcado automático</b>: tus cartones se marcan solos. Tú solo cantas ¡Bingo!</p>`;
    }
    if (marcado === 'manual') {
        return `<p class="rounded-2xl border-[3px] border-tinta bg-girasol px-4 py-3 text-sm font-black shadow-duro-sm">
            El anfitrión eligió <b>marcar a mano</b>: toca cada número que salga. Si no lo marcas, no cuenta para tu ¡Bingo!</p>`;
    }
    const opcion = (modo, titulo, detalle) => {
        const activo = (modo === 'auto') === app.marcarSolo;
        return `<button type="button" role="radio" aria-checked="${activo}" data-modo="${modo}"
            class="opcion flex h-auto min-h-[3.25rem] flex-col items-center justify-center gap-0.5 px-2 py-2 text-center normal-case">
            <span class="text-[13px] uppercase tracking-wide">${titulo}</span>
            <span class="text-[11px] font-bold normal-case tracking-normal opacity-80">${detalle}</span>
        </button>`;
    };
    return `<div class="rounded-2xl border-[3px] border-tinta bg-crema p-1.5 shadow-duro-sm">
        <div role="radiogroup" aria-label="Cómo quieres marcar tus cartones" class="grid grid-cols-2 gap-1.5">
            ${opcion('auto', 'Automático', 'se marcan solos')}
            ${opcion('manual', 'Yo marco', 'toco cada número')}
        </div>
    </div>`;
}

function cambiarModoMarcado(automatico) {
    if (app.marcarSolo === automatico) return;
    app.marcarSolo = automatico;
    guardarPreferencia('marcarSolo', app.marcarSolo);
    // Al pasar a marcar a mano se parte de lo que ya estaba marcado
    if (!app.marcarSolo && app.sala?.serie) {
        const salidas = app.sala.bolas ?? [];
        for (const n of misCartones(app.sala, app.miId)) {
            if (!app.marcas.cartones[n]) app.marcas.cartones[n] = [...salidas];
        }
        guardarMarcas();
    }
    if (app.sala?.estado === 'lobby') dibujarLobby();
    else dibujarCartones();
    avisar(app.marcarSolo ? 'Marcado automático: tus cartones se marcan solos.' : 'Marcas tú: toca los números que vayan saliendo.');
}

function marcasDe(carton, salidas) {
    if (marcaSolo()) return salidas;
    const mias = (app.marcas.cartones[carton] ?? []).filter((n) => salidas.has(n));
    return new Set(mias);
}

function dibujarCartones() {
    const sala = app.sala;
    if (!sala || !(sala.estado === 'jugando' || sala.estado === 'pausa')) return;
    const mios = misCartones(sala, app.miId);
    const salidas = new Set(sala.bolas ?? []);
    const premio = premioActual(sala);
    const modalidad = premio?.modalidad ?? 'lleno';
    $('tituloMios').textContent = `Tus ${unidad(sala).varios}`;
    if (esModoAuto(sala.config)) return dibujarAutos(mios, salidas);

    pintar($('modoMarcadoJuego'), htmlModoMarcado());
    // Si el anfitrión fijó la forma de marcar, el aviso de arriba ya lo explica
    $('ayudaMarcar').textContent = marcadoSala() !== 'libre'
        ? ''
        : marcaSolo()
        ? 'Cada bola que sale se marca sola en tus cartones. Tú solo cantas ¡Bingo!'
        : 'Toca los números que ya salieron para marcarlos. Aunque se te pase alguno, tu ¡Bingo! se comprueba con las bolas reales.';

    if (!sala.serie) {
        pintar($('cartones'), htmlCargando('Preparando los cartones…'));
        return;
    }
    if (!mios.length) {
        pintar($('cartones'), `<div class="carta p-4 text-sm font-bold">No tienes cartones en esta partida. Sigue el show y elige en la siguiente.</div>`);
        return;
    }

    const ahora = Date.now();
    let nuevoCompleto = false;
    const casi = [];
    const html = mios.map((n) => {
        const r = analizarCarton(sala.serie, n, marcasDe(n, salidas), modalidad);
        const clave = `${sala.serie}:${n}:${sala.premioActual}`;
        if (r.completo && !app.completos.has(clave)) {
            app.completos.add(clave);
            nuevoCompleto = true;
        }
        if (!r.completo && r.faltan.length === 1 && !app.falta1.has(clave)) {
            app.falta1.add(clave);
            casi.push(`cartón ${n} (${nombreBola(r.faltan[0])})`);
        }
        const bloqueado = (app.cantando.get(n) ?? 0) > ahora;
        const estado = r.completo
            ? `<span class="rounded-md border-2 border-tinta bg-girasol px-1.5 py-0.5 text-tinta">¡${esc(nombreModalidad(modalidad))}!</span>`
            : `Te ${r.faltan.length === 1 ? 'falta' : 'faltan'} ${r.faltan.length}`;
        const boton = r.completo
            ? `bg-girasol h-16 text-2xl font-display normal-case ${bloqueado ? '' : 'boton-cantar-listo'}`
            : 'bg-crema h-12 text-base';
        return `<section class="carta p-3 ${r.completo ? 'completo' : ''}" aria-labelledby="titulo-carton-${n}">
            <div class="mb-2 flex items-center justify-between gap-2 px-1">
                <h3 id="titulo-carton-${n}" class="font-display text-lg">Cartón ${n}</h3>
                <p class="text-xs font-black uppercase tracking-wide">${estado}</p>
            </div>
            <div class="carton-movil flex justify-center" data-carton="${n}">${htmlCarton(r.carton, { marcadas: r.marcadas, clave: r.clave })}</div>
            <button type="button" data-bingo="${n}" data-foco="bingo-${n}" class="boton mt-3 w-full ${boton}" ${bloqueado ? 'disabled' : ''}
                    aria-label="Cantar ¡Bingo! con el cartón ${n}${r.completo ? ' (completo)' : ''}">
                ${bloqueado ? 'Comprobando…' : '¡Bingo!'}</button>
        </section>`;
    }).join('');

    pintar($('cartones'), html);
    prepararCeldas(mios, salidas);

    if (nuevoCompleto && sala.estado === 'jugando') {
        vibrar([120, 80, 120]);
        sonar('fanfarria');
    } else avisarFalta1(casi);
}

// «¡Te falta 1!»: vibración y redoble la primera vez que un cartón o fila se queda a un número
function avisarFalta1(casi) {
    if (!casi.length || app.sala?.estado !== 'jugando') return;
    avisar(`¡Te falta 1! ${casi.join(' · ')}`, 'info', 4000);
    vibrar([60, 40, 60, 40, 60]);
    sonar('redoble');
}

// «Fila de 5» y «Elige tus 5»: se marcan solas y el servidor entrega el premio, sin botón de cantar
function dibujarAutos(mios, salidas) {
    const u = unidad(app.sala);
    pintar($('modoMarcadoJuego'), '');
    $('ayudaMarcar').textContent = `Tus ${u.varios} se marcan solas. Cuando una complete sus 5 números, el premio se entrega automáticamente.`;
    if (!mios.length) {
        pintar($('cartones'), `<div class="carta p-4 text-sm font-bold">No tienes ${u.varios} en esta partida. Sigue el show y elige en la siguiente.</div>`);
        return;
    }
    const filas = mios.map((n) => ({ n, ...analizarJugada(numerosDe(app.sala, n), salidas) })).sort((a, b) => a.faltan.length - b.faltan.length || a.n - b.n);
    let nuevoCompleto = false;
    const casi = [];
    const html = filas.map(({ n, numeros, faltan, completa }) => {
        const clave = `${app.sala.serie}:${u.uno}${n}`;
        if (completa && !app.completos.has(clave)) {
            app.completos.add(clave);
            nuevoCompleto = true;
        }
        if (!completa && faltan.length === 1 && !app.falta1.has(clave)) {
            app.falta1.add(clave);
            casi.push(`${u.uno} ${n} (${nombreBola(faltan[0])})`);
        }
        const estado = completa
            ? '<span class="rounded-md border-2 border-tinta bg-girasol px-1.5 py-0.5 text-tinta">¡Completa!</span>'
            : faltan.length === 1 ? '<span class="rounded-md border-2 border-tinta bg-tomate px-1.5 py-0.5 text-crema">¡Te falta 1!</span>'
            : `Te faltan ${faltan.length}`;
        return `<section class="carta p-3 ${completa ? 'completo' : ''}" aria-label="${u.Uno} ${n}: ${completa ? 'completa' : `faltan ${faltan.map(nombreBola).join(', ')}`}">
            <div class="mb-2 flex items-center justify-between gap-2 px-1">
                <h3 class="font-display text-lg">${u.Uno} ${n}</h3>
                <p class="text-xs font-black uppercase tracking-wide">${estado}</p>
            </div>
            <div class="flex justify-between gap-1.5">${numeros.map((x) => {
                const salio = salidas.has(x);
                return `<span class="relative ${salio ? '' : 'opacity-35 grayscale'}">${htmlFicha(x, 'h-12 w-12 text-sm sm:h-14 sm:w-14')}${salio
                    ? '<span class="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full border-2 border-tinta bg-menta text-[11px] font-black" aria-hidden="true">✓</span>' : ''}</span>`;
            }).join('')}</div>
        </section>`;
    }).join('');
    pintar($('cartones'), html);
    if (nuevoCompleto && app.sala.estado === 'jugando') {
        vibrar([120, 80, 120]);
        sonar('fanfarria');
    } else avisarFalta1(casi);
}

// Etiqueta las celdas de los cartones; sin «Marcar solo» se vuelven botones para marcar
function prepararCeldas(mios, salidas) {
    const sala = app.sala;
    for (const n of mios) {
        const contenedor = document.querySelector(`#cartones [data-carton="${n}"]`);
        if (!contenedor) continue;
        const columnas = analizarCarton(sala.serie, n, new Set(), 'linea').carton.columnas;
        const celdas = contenedor.querySelectorAll('.carton-fila:last-of-type .carton-celda');
        const marcas = marcasDe(n, salidas);
        celdas.forEach((celda, i) => {
            const numero = columnas[i % 5][Math.floor(i / 5)];
            if (numero === null) return;
            const marcada = marcas.has(numero);
            if (marcaSolo()) {
                celda.setAttribute('aria-label', `${nombreBola(numero)}${marcada ? ', salió' : ''}`);
                return;
            }
            celda.dataset.n = numero;
            celda.dataset.foco = `celda-${n}-${numero}`;
            celda.setAttribute('role', 'button');
            celda.tabIndex = 0;
            celda.setAttribute('aria-pressed', String(marcada));
            celda.setAttribute('aria-label', nombreBola(numero));
        });
    }
}

function tocarCelda(carton, numero) {
    const sala = app.sala;
    if (!sala || marcaSolo()) return;
    if (!(sala.bolas ?? []).includes(numero)) {
        avisar(`El ${nombreBola(numero)} todavía no ha salido.`);
        vibrar(30);
        return;
    }
    const lista = new Set(app.marcas.cartones[carton] ?? []);
    if (lista.has(numero)) lista.delete(numero);
    else lista.add(numero);
    app.marcas.cartones[carton] = [...lista];
    guardarMarcas();
    vibrar(15);
    dibujarCartones();
}

function cantar(numero) {
    const sala = app.sala;
    if (!sala || !(sala.estado === 'jugando' || sala.estado === 'pausa')) return;
    if ((app.cantando.get(numero) ?? 0) > Date.now()) return;
    // Con marcado manual obligatorio el servidor comprueba con lo que marcaste
    const marcas = marcadoSala() === 'manual' ? (app.marcas.cartones[numero] ?? []) : undefined;
    if (!enviar({ tipo: 'bingo', numero, marcas })) return;
    app.cantando.set(numero, Date.now() + ESPERA_CANTAR);
    vibrar(50);
    dibujarCartones();
}

// Cuenta atrás de la siguiente bola y ventana de ¡Bingo! (se refresca varias veces por segundo)
function actualizarReloj(intervalo = app.sala?.config?.intervalo ?? 8000) {
    const sala = app.sala;
    if (!sala || !(sala.estado === 'jugando' || sala.estado === 'pausa')) return;
    const ahora = Date.now();
    // La ventana sigue abierta mientras el servidor no mande otra instantánea; los segundos se
    // acotan (1–4) porque `ventanaHasta` viene en hora del servidor y el reloj del móvil puede ir desfasado
    const ventana = sala.ventanaHasta ? Math.min(4, Math.max(1, Math.ceil((sala.ventanaHasta - ahora) / 1000))) : 0;

    let avisos = '';
    if (sala.estado === 'pausa') {
        avisos += `<div class="mt-4 rounded-2xl border-[3px] border-tinta bg-cobalto px-4 py-3 text-crema shadow-duro" role="status">
            <p class="font-display text-lg leading-tight">Partida en pausa</p>
            <p class="text-sm font-bold">El anfitrión detuvo el sorteo. Seguirá en cuanto lo reanude.</p></div>`;
    }
    if (ventana) {
        avisos += esModoAuto(sala.config)
            ? `<div class="mt-4 rounded-2xl border-[3px] border-tinta bg-fucsia px-4 py-3 shadow-duro" role="alert">
                <p class="font-display text-lg leading-tight">¡Hay ${unidad(sala).una} ${unidad(sala).uno} completa!</p>
                <p class="text-sm font-black">Comprobando… <span id="segundosVentana">${ventana}</span> s.</p></div>`
            : `<div class="mt-4 rounded-2xl border-[3px] border-tinta bg-fucsia px-4 py-3 shadow-duro" role="alert">
            <p class="font-display text-lg leading-tight">¡Alguien cantó bingo! ¿Tú también?</p>
            <p class="text-sm font-black">Si tu cartón está completo, canta ahora: quedan <span id="segundosVentana">${ventana}</span> s.</p></div>`;
    }
    // Solo se reescribe al cambiar qué avisos hay (para no repetir el anuncio del lector de pantalla)
    const contenedor = $('avisosJuego');
    const tipo = `${sala.estado === 'pausa'}:${Boolean(ventana)}`;
    if (contenedor.dataset.tipo !== tipo) {
        contenedor.dataset.tipo = tipo;
        contenedor.innerHTML = avisos;
    }
    const segundos = $('segundosVentana');
    if (segundos) segundos.textContent = String(ventana);

    const anillo = $('anillo');
    const cuenta = $('cuentaAtras');
    if (anillo && cuenta) {
        let fraccion = 0;
        let texto = '';
        if (sala.estado === 'pausa') texto = 'II';
        else if (ventana) texto = '!';
        else if (sala.siguienteBolaEn) {
            const restante = Math.max(0, Math.min(intervalo, sala.siguienteBolaEn - ahora));
            fraccion = restante / intervalo;
            texto = String(Math.ceil(restante / 1000));
        }
        anillo.setAttribute('stroke-dashoffset', String(125.66 * (1 - fraccion)));
        cuenta.textContent = texto;
    }

    // Desbloquea los botones «¡Bingo!» cuya espera terminó
    let liberado = false;
    for (const [n, hasta] of app.cantando) {
        if (hasta <= ahora) {
            app.cantando.delete(n);
            liberado = true;
        }
    }
    if (liberado) dibujarCartones();
}

// ---------- Terminada ----------
function dibujarFin() {
    const sala = app.sala;
    const yo = miJugador(sala, app.miId);
    const ganado = gananciasDe(sala, app.miId);
    pintar($('vistaFin'), `
        <div class="carta p-5 text-center">
            <p class="etiqueta text-tinta/70">Partida terminada</p>
            <p class="mt-1 font-display text-2xl leading-tight">${ganado ? `¡Ganaste ${fichas(ganado)}!` : 'Esta vez no hubo suerte'}</p>
            ${yo ? `<p class="mt-2 font-bold">Tu saldo: <span class="font-display">${fmt(yo.fichas)}</span> fichas</p>` : ''}
            <p class="mt-1 text-sm font-bold text-tinta/70">${(sala.bolas ?? []).length} bolas · pozo de ${fichas(pozoDe(sala))}</p>
        </div>
        <div class="carta mt-5 p-4">
            <h2 class="font-display text-xl">Resultados</h2>
            ${htmlPremios(premiosDe(sala), { conGanadores: true })}
        </div>
        ${htmlRanking(sala)}
        ${sala.config?.admision ? htmlPedirFichas(sala, { titulo: '¿Quieres más fichas?' }) : ''}
        ${sala.config?.rondasSeguidas ? `<div class="carta mt-5 p-4">${htmlRonda(sala)}</div>` : ''}
        ${htmlVerificar(sala)}
        <div class="mt-5">${htmlHistorial()}</div>
        <div class="mt-5 rounded-2xl border-[3px] border-tinta bg-papel px-4 py-3 text-center shadow-duro" role="status">
            <p class="font-display text-lg">Esperando nueva partida…</p>
            <p class="text-sm font-bold">Cuando el anfitrión la abra podrás elegir ${unidad(sala).varios} otra vez. Tu saldo se conserva.</p>
        </div>`);
}

// Ranking de la noche: fichas ganadas en todas las rondas de esta sala
function htmlRanking(sala) {
    const lista = [...(sala.jugadores ?? [])].filter((j) => (j.ganado ?? 0) > 0).sort((a, b) => b.ganado - a.ganado).slice(0, 10);
    if (!lista.length) return '';
    const medallas = ['🥇', '🥈', '🥉'];
    return `<div class="carta mt-5 p-4">
        <h2 class="font-display text-xl">Ranking de la noche</h2>
        <p class="text-xs font-bold text-tinta/70">Fichas ganadas en todas las rondas · ronda ${fmt(sala.ronda ?? 1)}</p>
        <ol class="mt-2 grid gap-1.5">${lista.map((j, i) => `
            <li class="flex items-center justify-between gap-2 rounded-xl border-[2.5px] border-tinta ${j.id === app.miId ? 'bg-girasol' : 'bg-white'} px-3 py-1.5">
                <span class="min-w-0 truncate font-black"><span class="mr-1" aria-hidden="true">${medallas[i] ?? `${i + 1}.`}</span>${esc(j.apodo)}${j.id === app.miId ? ' (tú)' : ''}</span>
                <span class="shrink-0 font-display">+${fmt(j.ganado)}</span>
            </li>`).join('')}</ol>
    </div>`;
}

// ---------- Partida verificable ----------
function htmlCompromiso(sala) {
    const compromiso = sala.justo?.compromiso;
    if (!compromiso) return '';
    return `<details data-abierto="compromiso" class="mt-4 text-xs font-bold text-tinta/75">
        <summary class="flex min-h-[2.75rem] cursor-pointer list-none items-center gap-2">
            <span class="grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 border-tinta bg-white font-display text-[11px] text-tinta" aria-hidden="true">i</span>
            <span>Partida verificable · compromiso <code class="font-mono text-tinta">${esc(compromiso.slice(0, 12))}…</code></span>
        </summary>
        <p class="mt-1">El servidor ya eligió en secreto su semilla y publicó esta huella: no puede cambiarla. Al iniciar se mezcla con las semillas de los jugadores (también la tuya) para decidir las bolas y los cartones, y al terminar la revela para que lo compruebes.</p>
        <p class="mt-1 break-all font-mono text-[11px] text-tinta">${esc(compromiso)}</p>
    </details>`;
}

function semillaIncluida(sala) {
    const lista = sala.justo?.semillasClientes;
    if (!Array.isArray(lista)) return null;
    const yo = miJugador(sala, app.miId);
    const semilla = semillaDe(app.codigo).toLowerCase();
    return lista.some((s) => String(s.semilla).toLowerCase() === semilla && (!yo || s.apodo === yo.apodo));
}

function htmlSemillaIncluida(sala) {
    const incluida = semillaIncluida(sala);
    if (incluida === null) return '';
    return incluida
        ? '<p class="mt-2 text-xs font-black text-tinta">Tu semilla está incluida <span aria-hidden="true">✓</span></p>'
        : `<p class="mt-2 text-xs font-bold text-tinta/70">Tu semilla no está incluida${misCartones(sala, app.miId).length ? '' : ' (solo cuentan las de quien tiene cartones)'}.</p>`;
}

function datosVerificacion(sala) {
    const j = sala.justo ?? {};
    return {
        compromiso: j.compromiso, semillaServidor: j.semillaServidor, semillasClientes: j.semillasClientes ?? [],
        semillaClientes: j.semillaClientes, serie: sala.serie, bolas: sala.bolas ?? [],
        dorada: sala.config?.bolaDorada ? sala.dorada ?? null : null,
    };
}

function htmlVerificar(sala) {
    const j = sala.justo;
    if (!j?.compromiso) return '';
    if (!j.semillaServidor) {
        return '<p class="mt-5 text-center text-xs font-bold text-crema/70">Esta partida no publicó la semilla del servidor: no se puede verificar.</p>';
    }
    const datos = datosVerificacion(sala);
    const clave = `${datos.serie}:${datos.semillaServidor}`;
    const r = app.verificacion?.clave === clave ? app.verificacion : null;
    const resultado = !r ? '' : r.valida
        ? `<p class="mt-3 rounded-xl border-[2.5px] border-tinta bg-menta px-3 py-2 text-sm font-black" role="status"><span aria-hidden="true">✓ </span>Partida verificada: el orden de las bolas y los cartones salen de las semillas comprometidas.</p>`
        : `<div class="mt-3 rounded-xl border-[2.5px] border-tinta bg-tomate px-3 py-2 text-sm font-black" role="alert"><p>La verificación falló:</p>
            <ul class="mt-1 list-disc pl-5 font-bold">${r.errores.map((e) => `<li>${esc(e)}</li>`).join('')}</ul></div>`;
    const fila = (titulo, valor, partir = 'break-all') => `<dt class="etiqueta mt-2">${titulo}</dt><dd class="${partir} font-mono text-[11px]">${esc(valor ?? '—')}</dd>`;
    return `<div class="carta mt-5 p-4">
        <h2 class="font-display text-xl">Partida verificable</h2>
        <p class="mt-1 text-sm font-bold text-tinta/75">Comprueba en tu móvil que nadie cambió las bolas ni los cartones después de empezar.</p>
        <button type="button" id="botonVerificar" data-foco="verificar" class="boton mt-3 h-12 w-full bg-girasol">Verificar partida</button>
        ${resultado}
        <details data-abierto="semillas" class="mt-3 text-sm">
            <summary class="cursor-pointer py-3 font-black">Ver detalles (semillas completas)</summary>
            <dl>
                ${fila('Compromiso (SHA-256 de la semilla del servidor)', datos.compromiso)}
                ${fila('Semilla del servidor', datos.semillaServidor)}
                ${fila('Semilla combinada de los jugadores', datos.semillaClientes)}
                ${fila('Serie de los cartones', datos.serie)}
                ${fila('Bolas en orden', datos.bolas.join(', '), 'break-words')}
                <dt class="etiqueta mt-2">Semillas de los jugadores</dt>
                <dd><ul class="font-mono text-[11px]">${datos.semillasClientes.map((s) =>
                    `<li class="break-all"><b class="font-ui">${esc(s.apodo)}</b>: ${esc(s.semilla)}</li>`).join('') || '<li>—</li>'}</ul></dd>
            </dl>
            <p class="mt-2 text-xs font-bold text-tinta/70">Cálculo: src/justo.js (verificarPartida) en el código del juego.</p>
        </details>
    </div>`;
}

function verificar() {
    const sala = app.sala;
    if (!sala?.justo?.semillaServidor) return;
    const datos = datosVerificacion(sala);
    app.verificacion = { clave: `${datos.serie}:${datos.semillaServidor}`, ...verificarPartida(datos) };
    dibujarFin();
}

// ---------- Celebración ----------
function celebrar({ modalidad, ganadores = [], siguiente = null, bote = 0 }) {
    const mios = ganadores.filter((g) => g.jugadorId === app.miId);
    const total = mios.reduce((s, g) => s + (Number(g.fichas) || 0) + (Number(g.bote) || 0), 0);
    const titulo = mios.length ? '¡Ganaste!' : `¡${esc(nombreModalidad(modalidad))}!`;
    const u = unidad(app.sala);

    $('contenidoCelebracion').innerHTML = `
        <p class="etiqueta text-tinta/70">${esc(nombreModalidad(modalidad))}</p>
        <h2 id="tituloCelebracion" class="mt-1 font-display text-4xl leading-none">${titulo}</h2>
        ${mios.length ? `<p class="mt-3 rounded-xl border-[3px] border-tinta bg-girasol px-3 py-2 font-black">Te llevas ${fichas(total)} con ${mios.length === 1 ? `${u.la} ${u.uno} ${esc(mios[0].carton)}` : `${u.la === 'la' ? 'las' : 'los'} ${u.varios} ${mios.map((g) => esc(g.carton)).join(', ')}`}.</p>` : ''}
        ${bote ? `<p class="mt-3 rounded-xl border-[3px] border-tinta bg-fucsia px-3 py-2 font-black">¡Y se lleva el bote de ${fichas(bote)}!</p>` : ''}
        <ul class="mt-4 grid gap-1.5 text-left">${ganadores.map((g) => {
            const yo = g.jugadorId === app.miId;
            return `<li class="flex items-center justify-between gap-2 rounded-xl border-[2.5px] border-tinta ${yo ? 'bg-girasol' : 'bg-white'} px-3 py-2">
                <span class="min-w-0 truncate font-black">${esc(g.apodo)}${yo ? ' (tú)' : ''} <span class="font-bold text-tinta/70">· ${u.uno} ${esc(g.carton)}</span></span>
                <span class="shrink-0 font-display">${fmt(g.fichas)}</span></li>`;
        }).join('')}</ul>
        <p class="mt-4 text-sm font-bold">${siguiente ? `Sigue el juego: ahora va <b>${esc(nombreModalidad(siguiente))}</b>.` : 'No quedan premios: fin de la partida.'}</p>
        <button id="botonCerrarCelebracion" type="button" class="boton mt-5 h-12 w-full bg-menta">Seguir</button>`;

    const confetis = $('confetis');
    confetis.innerHTML = Array.from({ length: mios.length ? 36 : 16 }, (_, i) =>
        `<span class="confeti" style="left:${Math.random() * 100}%;background:${COLORES[i % 5]};animation-duration:${2 + Math.random() * 2.5}s;animation-delay:${Math.random() * 0.8}s"></span>`).join('');

    $('celebracion').classList.remove('hidden');
    $('botonCerrarCelebracion').focus({ preventScroll: true });
    clearTimeout(app.temporizadorCelebracion);
    app.temporizadorCelebracion = setTimeout(cerrarCelebracion, 12000);

    if (mios.length) {
        vibrar([150, 80, 150, 80, 300]);
        sonar('fanfarria');
    } else {
        vibrar(100);
        sonar('golpe');
    }
}

function cerrarCelebracion() {
    clearTimeout(app.temporizadorCelebracion);
    const capa = $('celebracion');
    if (capa.classList.contains('hidden')) return;
    capa.classList.add('hidden');
    $('confetis').innerHTML = '';
}

// ---------- Entrar ----------
let consultaEnCurso = 0;

async function mostrarInfoSala(codigo) {
    const info = $('infoSala');
    if (codigo.length !== 6) {
        info.textContent = '';
        return null;
    }
    const turno = ++consultaEnCurso;
    info.innerHTML = '<span class="text-tinta/60">Buscando la sala…</span>';
    try {
        const datos = await consultarSala(codigo);
        if (turno !== consultaEnCurso) return datos;
        const premios = (datos.config?.premios ?? []).map((p) => nombreModalidad(p.modalidad)).join(' + ');
        info.innerHTML = `<div class="rounded-xl border-[2.5px] border-tinta bg-white px-3 py-2">
            <p class="font-display text-base leading-tight">${esc(datos.nombre || `Sala ${datos.codigo}`)}</p>
            <p class="text-xs font-bold text-tinta/75">${esc(datos.estado === 'lobby' ? `Eligiendo ${unidad({ config: datos.config }).varios}` : NOMBRES_ESTADO[datos.estado] ?? datos.estado)} · ${fmt(datos.jugadores)} ${datos.jugadores === 1 ? 'jugador' : 'jugadores'}${datos.config ? ` · ${unidad({ config: datos.config }).uno} ${fichas(datos.config.precioCarton)}` : ''}${premios ? ` · ${esc(premios)}` : ''}</p>
            ${datos.estado && datos.estado !== 'lobby' ? `<p class="mt-1 text-xs font-black text-tomate">La partida ya empezó: podrás elegir ${unidad({ config: datos.config }).varios} en la siguiente.</p>` : ''}
        </div>`;
        return datos;
    } catch (error) {
        if (turno === consultaEnCurso) info.innerHTML = `<span class="font-black text-tomate">${esc(mensajeConsulta(error, codigo))}</span>`;
        throw error;
    }
}

const mensajeConsulta = (error, codigo) => (error instanceof TypeError
    ? 'No se pudo contactar con el servidor. Revisa tu conexión.'
    : `No hay ninguna sala con el código ${codigo}. Revisa el código en la pantalla del show.`);

function abrirEntrar(error = '') {
    mostrarVista('vistaEntrar');
    $('logoSala').classList.add('hidden');
    $('logoSala').dataset.src = '';
    $('logoBingo').classList.remove('hidden');
    $('nombreSala').textContent = 'Bingo Show';
    $('codigoSala').textContent = '';
    document.title = 'Jugar · Bingo Show';
    $('campoCodigo').value = app.codigo;
    $('campoApodo').value = app.apodo || leerApodo();
    mostrarErrorEntrar(error);
    pintar($('historialEntrar'), htmlHistorial(10));
    if (app.codigo.length === 6) mostrarInfoSala(app.codigo).catch(() => {});
    (app.codigo.length === 6 ? $('campoApodo') : $('campoCodigo')).focus({ preventScroll: true });
}

function mostrarErrorEntrar(texto) {
    const error = $('errorEntrar');
    error.textContent = texto;
    error.classList.toggle('hidden', !texto);
}

async function entrar(evento) {
    evento.preventDefault();
    const codigo = normalizarCodigo($('campoCodigo').value);
    const apodo = limpiarApodo($('campoApodo').value);
    $('campoCodigo').value = codigo;
    if (codigo.length !== 6) return mostrarErrorEntrar('El código de sala tiene 6 caracteres.');
    const token = leerToken(codigo);
    if (!apodo && !token) {
        $('campoApodo').focus();
        return mostrarErrorEntrar('Escribe un apodo (hasta 20 caracteres).');
    }
    mostrarErrorEntrar('');
    const boton = $('botonEntrar');
    boton.disabled = true;
    try {
        await mostrarInfoSala(codigo);
    } catch (error) {
        boton.disabled = false;
        return mostrarErrorEntrar(mensajeConsulta(error, codigo));
    }
    boton.disabled = false;
    app.codigo = codigo;
    app.apodo = apodo;
    if (apodo) guardarApodo(apodo);
    conectar();
}

// Al abrir con ?sala= y un token guardado: reconecta directamente
async function arrancar() {
    const parametro = normalizarCodigo(new URLSearchParams(location.search).get('sala'));
    app.codigo = parametro;
    app.apodo = leerApodo();
    dibujarSonido();
    dibujarConexion();
    if (parametro.length === 6 && leerToken(parametro)) {
        conectar();
        try {
            await consultarSala(parametro);
        } catch (error) {
            if (!(error instanceof TypeError) && app.codigo === parametro && !app.bienvenido) {
                salir({ olvidar: true });
                abrirEntrar(mensajeConsulta(error, parametro));
            }
        }
        return;
    }
    abrirEntrar();
}

// ---------- Sonido ----------
function dibujarSonido() {
    const boton = $('botonSonido');
    boton.setAttribute('aria-label', app.sonido ? 'Sonido activado: abrir controles de volumen' : 'Sonido apagado: abrir controles de volumen');
    $('ondasSonido').classList.toggle('hidden', !app.sonido);
    $('tachaSonido').classList.toggle('hidden', app.sonido);
}

// ---------- Eventos de la interfaz ----------
$('formEntrar').addEventListener('submit', entrar);
let esperaCodigo = null;
$('campoCodigo').addEventListener('input', () => {
    const campo = $('campoCodigo');
    const codigo = normalizarCodigo(campo.value);
    if (campo.value !== codigo) campo.value = codigo;
    mostrarErrorEntrar('');
    clearTimeout(esperaCodigo);
    esperaCodigo = setTimeout(() => mostrarInfoSala(codigo).catch(() => {}), 250);
});

$('vistaFin').addEventListener('click', (e) => {
    if (e.target.closest('#botonVerificar')) verificar();
});

$('vistaLobby').addEventListener('click', (e) => {
    const boton = e.target.closest('[data-elegir]');
    if (boton) return tocarCartonLobby(Number(boton.dataset.elegir));
    const num = e.target.closest('[data-num]');
    if (num) return tocarNumero(Number(num.dataset.num));
    if (e.target.closest('[data-azar]')) return numerosAlAzar();
    if (e.target.closest('[data-borrar]')) { app.borrador = new Set(); return dibujarLobby(); }
    if (e.target.closest('[data-comprar]')) return comprarJugada();
    const soltar = e.target.closest('[data-soltar]');
    if (soltar) soltarJugada(Number(soltar.dataset.soltar));
});

// Reacciones, «repetir» y pedir fichas (se pintan en varias vistas)
document.addEventListener('click', (e) => {
    const reaccion = e.target.closest('[data-reaccion]');
    if (reaccion) return reaccionar(reaccion.dataset.reaccion);
    const pedir = e.target.closest('[data-pedir]');
    if (pedir) pedirFichas(pedir.dataset.pedir);
});
document.addEventListener('change', (e) => {
    if (e.target.matches?.('[data-repetir]')) enviar({ tipo: 'repetir', valor: e.target.checked });
});

$('cartones').addEventListener('click', (e) => {
    const bingo = e.target.closest('[data-bingo]');
    if (bingo) return cantar(Number(bingo.dataset.bingo));
    const celda = e.target.closest('[data-n]');
    if (celda) tocarCelda(Number(celda.closest('[data-carton]').dataset.carton), Number(celda.dataset.n));
});
$('cartones').addEventListener('keydown', (e) => {
    const celda = e.target.closest?.('[data-n]');
    if (!celda || (e.key !== 'Enter' && e.key !== ' ')) return;
    e.preventDefault();
    tocarCelda(Number(celda.closest('[data-carton]').dataset.carton), Number(celda.dataset.n));
});

// Delegado: el selector se vuelve a pintar con cada instantánea (lobby y partida)
$('vistaSala').addEventListener('click', (e) => {
    const boton = e.target.closest('[data-modo]');
    if (boton) cambiarModoMarcado(boton.dataset.modo === 'auto');
});

// El altavoz abre el panel de sonido: silenciar y volumen de efectos y voz por separado
crearPanelSonido($('botonSonido'), {
    activo: () => app.sonido,
    alternar: () => {
        app.sonido = !app.sonido;
        if (!app.sonido) sfx.callar();
        guardarPreferencia('sonido', app.sonido);
        dibujarSonido();
    },
    probar: (que) => {
        if (que !== 'voz') sfx.campana();
        if (que !== 'efectos') setTimeout(() => sfx.cantar('B, 15'), que === 'todo' ? 400 : 0);
    },
});

$('botonSalir').addEventListener('click', () => {
    salir();
    abrirEntrar();
    avisar('Saliste de la sala. Tu sitio y tus fichas se conservan si vuelves a entrar desde este móvil.');
});

$('botonOtraSala').addEventListener('click', () => {
    app.codigo = '';
    history.replaceState(null, '', location.pathname);
    abrirEntrar();
});

$('celebracion').addEventListener('click', (e) => {
    if (e.target.id === 'botonCerrarCelebracion' || e.target === $('celebracion')) cerrarCelebracion();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') cerrarCelebracion();
});

// Los navegadores solo dejan sonar el audio tras un toque: lo desbloquea el primero
document.addEventListener('pointerdown', () => { if (app.sonido) sfx.golpe(0.0001); }, { once: true });

setInterval(() => {
    actualizarReloj();
    actualizarCuentas();
}, 250);
arrancar();
