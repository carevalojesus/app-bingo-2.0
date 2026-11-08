// Bingo Show — lógica del juego y orquestación de la interfaz.
import { gsap } from 'gsap';
import { crearEscenario } from './escenario.js';
import { anunciarBola, celebrarBingo, detenerCelebracion, estampar, confeti, sacudirUI } from './anuncio.js';
import * as sfx from './efectos.js';
import { generarCarton, verificar, parsearCodigo, PATRONES, normalizarSerie, serieValida } from './carton.js';
import { htmlCarton } from './carton-html.js';

const LETRAS = [
    { letra: 'B', color: '#ff5a36' },
    { letra: 'I', color: '#ffc43d' },
    { letra: 'N', color: '#19c3a0' },
    { letra: 'G', color: '#3d6bff', textoClaro: true },
    { letra: 'O', color: '#ff4fa3' },
];
const COLORES = LETRAS.map((l) => l.color);
const TOTAL = 75;
const MAX_HISTORIAL = 5;
const VELOCIDADES = [4000, 6000, 8000, 12000];
const reducirMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const $ = (id) => document.getElementById(id);
const columnaDe = (n) => LETRAS[Math.floor((n - 1) / 15)];

// ---------- Preferencias ----------
function leerPreferencia(clave, porDefecto) {
    try {
        const v = localStorage.getItem('bingoshow.' + clave);
        return v === null ? porDefecto : JSON.parse(v);
    } catch {
        return porDefecto;
    }
}
function guardarPreferencia(clave, valor) {
    try { localStorage.setItem('bingoshow.' + clave, JSON.stringify(valor)); } catch { /* sin almacenamiento */ }
}

// ---------- Estado ----------
const estado = {
    bolas: [],
    indice: -1,
    salidas: new Set(),
    jugando: false,
    terminado: false,
    intervalo: VELOCIDADES.includes(leerPreferencia('intervalo', 8000)) ? leerPreferencia('intervalo', 8000) : 8000,
    sonido: leerPreferencia('sonido', true),
    patron: PATRONES[leerPreferencia('patron', 'linea')] ? leerPreferencia('patron', 'linea') : 'linea',
    tiempoAcumulado: 0,
    inicioTramo: 0,
};
let proximaBola = null;
let relojTiempo = null;
let ultimaCasilla = null;
let escenario = null;
let tlFicha = null;
let finPendiente = null;
// Sube en cada reinicio: los callbacks de una bola de la partida anterior se ignoran
let partida = 0;

function mezclar(arreglo) {
    for (let i = arreglo.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arreglo[i], arreglo[j]] = [arreglo[j], arreglo[i]];
    }
    return arreglo;
}
const ritmo = () => gsap.utils.clamp(0.6, 1, estado.intervalo / 7000);

// ---------- Pizarra ----------
function construirPizarra() {
    const tablero = $('tablero');
    const fragmento = document.createDocumentFragment();
    LETRAS.forEach(({ letra, color, textoClaro }, columna) => {
        const cabecera = document.createElement('div');
        cabecera.className = 'mb-1 grid place-items-center rounded-lg border-[2.5px] border-tinta py-1 shadow-duro-sm';
        cabecera.style.background = color;
        cabecera.style.color = textoClaro ? '#fff3df' : '#14112b';
        cabecera.innerHTML = `<span class="font-display text-lg leading-none sm:text-xl">${letra}</span>` +
            `<span class="font-ui text-[10px] font-black leading-none opacity-80" data-cuenta="${letra}">0/15</span>`;
        fragmento.appendChild(cabecera);

        for (let k = 1; k <= 15; k++) {
            const n = columna * 15 + k;
            const casilla = document.createElement('div');
            casilla.className = 'casilla';
            casilla.id = 'num' + n;
            casilla.innerHTML =
                `<div class="casilla-giro"><div class="casilla-cara casilla-frente">${n}</div>` +
                `<div class="casilla-cara casilla-dorso" style="--c:${color};color:${textoClaro ? '#fff3df' : '#14112b'}">${n}</div></div>`;
            fragmento.appendChild(casilla);
        }
    });
    tablero.appendChild(fragmento);
}

function marcarCasilla(n) {
    const casilla = $('num' + n);
    ultimaCasilla?.classList.remove('ultima');
    casilla.classList.add('ultima');
    ultimaCasilla = casilla;
    gsap.to(casilla.firstElementChild, { rotationX: 180, duration: 0.8, ease: 'back.out(1.7)' });
    gsap.fromTo(casilla, { scale: 1.5, zIndex: 5 }, { scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.5)', clearProps: 'zIndex' });
}

function actualizarCuentas() {
    const cantadas = estado.salidas.size;
    $('contadorBolas').textContent = cantadas;
    $('pizarraCuenta').textContent = cantadas;
    gsap.to('#progreso', { width: `${(cantadas / TOTAL) * 100}%`, duration: 0.6, ease: 'power3.out' });
    LETRAS.forEach(({ letra }, columna) => {
        let cuenta = 0;
        estado.salidas.forEach((n) => { if (Math.floor((n - 1) / 15) === columna) cuenta++; });
        const el = document.querySelector(`[data-cuenta="${letra}"]`);
        const texto = `${cuenta}/15`;
        if (el.textContent !== texto) {
            el.textContent = texto;
            if (cuenta) gsap.fromTo(el.parentElement, { scale: 1.25 }, { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
        }
    });
    if (cantadas) gsap.fromTo('#contadorBolas', { scale: 1.6, color: '#ff5a36' }, { scale: 1, color: '#14112b', duration: 0.5, ease: 'back.out(3)' });
}

// ---------- Bola actual e historial ----------
function htmlFicha(n, grande = false) {
    const { letra } = columnaDe(n);
    return `<span class="ficha-centro"><span class="text-center leading-none">` +
        `<span class="block ${grande ? 'text-[9px]' : 'text-[7px]'}">${letra}</span>` +
        `<span class="${grande ? 'text-base sm:text-lg' : 'text-[11px]'}">${n}</span></span></span>`;
}

function mostrarActual(n) {
    const { letra, color } = columnaDe(n);
    const ficha = $('fichaActual');
    const anterior = estado.indice > 0 ? estado.bolas[estado.indice - 1] : null;

    tlFicha?.kill();
    tlFicha = gsap.timeline()
        .to(ficha, { rotationY: 90, duration: 0.15, ease: 'power2.in' })
        .call(() => {
            ficha.style.setProperty('--c', color);
            ficha.innerHTML = htmlFicha(n, true);
            $('textoActual').textContent = `${letra}-${n}`;
        })
        .to(ficha, { rotationY: 0, duration: 0.5, ease: 'back.out(3)' });
    gsap.fromTo('#textoActual', { x: -16, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: 'power3.out', delay: 0.15 });

    if (anterior) agregarHistorial(anterior);
}

function agregarHistorial(n) {
    const lista = $('historial');
    const item = document.createElement('li');
    item.className = 'ficha h-10 w-10 sm:h-11 sm:w-11';
    item.style.setProperty('--c', columnaDe(n).color);
    item.innerHTML = htmlFicha(n);
    item.setAttribute('aria-label', `${columnaDe(n).letra} ${n}`);
    lista.prepend(item);
    gsap.from(item, { x: -60, rotation: -270, scale: 0.3, duration: 0.7, ease: 'back.out(1.8)' });
    gsap.from([...lista.children].slice(1), { x: -46, duration: 0.5, ease: 'power3.out' });
    const items = lista.children;
    while (items.length > MAX_HISTORIAL) items[items.length - 1].remove();
}

// ---------- Tiempo ----------
const formatoTiempo = (ms) => {
    const s = Math.floor(ms / 1000);
    return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
};
const tiempoTranscurrido = () => estado.tiempoAcumulado + (estado.jugando ? performance.now() - estado.inicioTramo : 0);
const pintarTiempo = () => { $('tiempo').textContent = formatoTiempo(tiempoTranscurrido()); };

// ---------- Avisos ----------
let tlAviso = null;
function avisar(texto) {
    const aviso = $('aviso');
    aviso.textContent = texto;
    tlAviso?.kill();
    tlAviso = gsap.timeline()
        .fromTo(aviso, { xPercent: -50, y: -30, rotation: -4, opacity: 0 }, { y: 0, rotation: -2, opacity: 1, duration: 0.45, ease: 'back.out(2.5)' })
        .to(aviso, { y: -20, opacity: 0, duration: 0.3, delay: 1.8, ease: 'power2.in' });
}

function actualizarBotonPlay() {
    $('iconoPlay').classList.toggle('hidden', estado.jugando);
    $('iconoPausa').classList.toggle('hidden', !estado.jugando);
    const texto = estado.jugando ? 'Pausar' : estado.indice >= 0 ? 'Continuar' : 'Iniciar';
    $('playBtn').setAttribute('aria-label', texto);
    $('playBtn').disabled = estado.terminado;
}

// ---------- Juego ----------
function sacarBola() {
    if (estado.indice >= TOTAL - 1) return finDelJuego();
    estado.indice++;
    const n = estado.bolas[estado.indice];
    const info = { ...columnaDe(n), numero: n };
    estado.salidas.add(n);
    const f = ritmo();
    const id = partida;
    const vigente = () => id === partida;
    // Si se abre un modal (¡Bingo!, reiniciar) la bola se completa en silencio
    const enEscena = () => vigente() && !modalAbierto;

    if (estado.sonido) sfx.redoble(1.5 * f);
    escenario.sortear(n, {
        ritmo: f,
        onSalida: () => enEscena() && estado.sonido && sfx.silbido(0.8 * f),
        onRevelar: () => enEscena() && estado.sonido && sfx.campana(),
        onImpacto: () => {
            if (!vigente()) return;
            if (enEscena()) {
                if (estado.sonido) {
                    sfx.golpe();
                    gsap.delayedCall(0.35, () => enEscena() && estado.sonido && sfx.cantar(`${info.letra}, ${n}`));
                }
                anunciarBola(info, { ritmo: f, reducirMovimiento });
            }
            marcarCasilla(n);
            mostrarActual(n);
            actualizarCuentas();
            if (estado.indice >= TOTAL - 1) finPendiente = gsap.delayedCall(1.6, finDelJuego);
        },
    });

    if (estado.indice < TOTAL - 1) programarSiguiente();
}

function programarSiguiente() {
    proximaBola?.kill();
    proximaBola = gsap.delayedCall(estado.intervalo / 1000, sacarBola);
    if (!estado.jugando) proximaBola.pause();
}

function iniciar() {
    if (estado.jugando || estado.terminado) return;
    estado.jugando = true;
    estado.inicioTramo = performance.now();
    relojTiempo = setInterval(pintarTiempo, 250);
    if (proximaBola) proximaBola.resume();
    else sacarBola();
    actualizarBotonPlay();
}

function pausar() {
    if (!estado.jugando) return;
    estado.tiempoAcumulado = tiempoTranscurrido();
    estado.jugando = false;
    clearInterval(relojTiempo);
    proximaBola?.pause();
    sfx.callar();
    pintarTiempo();
    actualizarBotonPlay();
}

const alternarJuego = () => (estado.jugando ? pausar() : iniciar());

function finDelJuego() {
    if (estado.terminado) return;
    pausar();
    proximaBola?.kill();
    proximaBola = null;
    estado.terminado = true;
    actualizarBotonPlay();
    escenario.terminar();
    const fin = $('fin');
    fin.classList.replace('hidden', 'grid');
    estampar($('finSello'), { texto: '', fondo: '#ffc43d' }, reducirMovimiento);
    $('finSello').innerHTML = '<p class="font-display text-3xl sm:text-5xl">¡Se acabaron!</p><p class="etiqueta mt-1">Salieron las 75 bolas</p>';
    confeti(COLORES, { cantidad: reducirMovimiento ? 0 : 80 });
    if (estado.sonido) sfx.fanfarria();
}

function reiniciar() {
    partida++;
    pausar();
    proximaBola?.kill();
    proximaBola = null;
    finPendiente?.kill();
    finPendiente = null;
    tlFicha?.kill();
    sfx.callar();
    Object.assign(estado, {
        bolas: mezclar(Array.from({ length: TOTAL }, (_, i) => i + 1)),
        indice: -1,
        salidas: new Set(),
        terminado: false,
        tiempoAcumulado: 0,
    });
    ultimaCasilla?.classList.remove('ultima');
    ultimaCasilla = null;

    // Las casillas vuelven a girar en ola
    gsap.to('#tablero .casilla-giro', { rotationX: 0, duration: 0.5, ease: 'power3.inOut', stagger: { each: 0.012, from: 'end' } });

    const historial = [...$('historial').children];
    gsap.to(historial, {
        y: 80, rotation: 90, opacity: 0, duration: 0.4, stagger: 0.05, ease: 'power2.in',
        onComplete: () => historial.forEach((li) => li.remove()),
    });
    const ficha = $('fichaActual');
    ficha.style.setProperty('--c', '#3b2a6e');
    ficha.innerHTML = '<span class="ficha-centro">?</span>';
    $('textoActual').textContent = '—';
    $('fin').classList.replace('grid', 'hidden');

    escenario.reiniciar();
    actualizarCuentas();
    pintarTiempo();
    actualizarBotonPlay();
    avisar('¡Las bolas vuelven al bombo!');
}

// Anillo de cuenta atrás alrededor del botón de jugar
gsap.ticker.add(() => {
    const p = proximaBola && !estado.terminado ? proximaBola.progress() : 0;
    $('anillo').setAttribute('stroke-dashoffset', String(100 - p * 100));
});

// ---------- Modales ----------
let modalAbierto = null;
let focoPrevio = null;

function abrirModal(modal) {
    focoPrevio = document.activeElement;
    modalAbierto = modal;
    modal.classList.replace('hidden', 'flex');
    gsap.fromTo(modal.querySelector('.modal-fondo'), { opacity: 0 }, { opacity: 1, duration: 0.3 });
    if (modal.id === 'modalReset') {
        gsap.fromTo(modal.querySelector('.modal-caja'),
            { scale: 0.4, rotation: -10, opacity: 0 },
            { scale: 1, rotation: 0, opacity: 1, duration: 0.55, ease: 'elastic.out(1, 0.6)' });
    }
    (modal.querySelector('[data-autofoco]') ?? modal.querySelector('button:not([data-cerrar])'))?.focus({ preventScroll: true });
}

function cerrarModal() {
    const modal = modalAbierto;
    if (!modal) return;
    modalAbierto = null;
    detenerCelebracion();
    gsap.to(modal.querySelector('.modal-fondo'), { opacity: 0, duration: 0.25 });
    gsap.to(modal.querySelectorAll('.modal-caja, .letra-bingo'), {
        y: 60, scale: 0.85, opacity: 0, duration: 0.25, ease: 'power2.in', stagger: 0.02,
        onComplete: () => {
            modal.classList.replace('flex', 'hidden');
            gsap.set(modal.querySelectorAll('.modal-caja, .letra-bingo'), { clearProps: 'all' });
        },
    });
    focoPrevio?.focus?.({ preventScroll: true });
}

document.querySelectorAll('[data-cerrar]').forEach((b) => b.addEventListener('click', cerrarModal));

document.addEventListener('keydown', (e) => {
    if (!modalAbierto || e.key !== 'Tab') return;
    const enfocables = [...modalAbierto.querySelectorAll('button, textarea, input, summary')].filter((x) => x.offsetParent);
    const primero = enfocables[0];
    const ultimo = enfocables[enfocables.length - 1];
    if (e.shiftKey && document.activeElement === primero) { e.preventDefault(); ultimo.focus(); }
    else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primero.focus(); }
});

// ---------- ¡Bingo! ----------
function bingo() {
    if (estado.salidas.size === 0) {
        avisar('Aún no ha salido ninguna bola');
        gsap.fromTo('#bingoBtn', { rotation: -8 }, { rotation: 0, duration: 0.6, ease: 'elastic.out(1, 0.25)', clearProps: 'transform' });
        return;
    }
    pausar();
    $('bingoBolas').textContent = estado.salidas.size;
    $('bingoBolasPalabra').textContent = estado.salidas.size === 1 ? 'bola' : 'bolas';
    $('bingoTiempo').textContent = formatoTiempo(tiempoTranscurrido());
    $('codigoCarton').value = '';
    $('numerosCarton').value = '';
    $('aMano').open = false;
    $('resultado').classList.add('hidden');
    $('sello').classList.add('hidden');
    ultimaVerificacion = null;
    aplicarPatron();
    pintarSerie();
    abrirModal($('modalBingo'));
    celebrarBingo({ colores: COLORES, reducirMovimiento });
    escenario.celebrar();
    if (estado.sonido) {
        sfx.fanfarria();
        sfx.cantar('¡Bingo!');
    }
}

// Repite la última verificación al cambiar de modalidad
let ultimaVerificacion = null;

function serieRecordada() {
    const serie = normalizarSerie(leerPreferencia('serie', ''));
    return serieValida(serie) ? serie : null;
}
function pintarSerie() {
    $('serieActual').textContent = serieRecordada() ?? '—';
}

function aplicarPatron() {
    document.querySelectorAll('#patrones [data-patron]').forEach((b) => {
        b.setAttribute('aria-checked', String(b.dataset.patron === estado.patron));
    });
}

function limpiarResultado() {
    $('resultado').classList.remove('hidden');
    $('resultadoCarton').innerHTML = '';
    $('resultadoChips').innerHTML = '';
}

function mostrarAviso(texto) {
    $('resultadoTexto').textContent = texto;
    $('resultadoTexto').className = 'mb-3 text-center font-ui font-black text-tinta/60';
    $('sello').classList.add('hidden');
}

// Mensaje, sello y sonido del veredicto
function veredicto(valido, texto) {
    const resultadoTexto = $('resultadoTexto');
    resultadoTexto.textContent = texto;
    resultadoTexto.className = `mb-3 text-center font-ui font-black ${valido ? 'text-tinta' : 'text-tomate'}`;
    if (valido) {
        estampar($('sello'), { texto: '¡Válido!', fondo: '#19c3a0' }, reducirMovimiento);
        gsap.delayedCall(0.4, () => {
            confeti(COLORES, { cantidad: reducirMovimiento ? 0 : 70 });
            if (estado.sonido) sfx.golpe(0.8);
        });
    } else {
        estampar($('sello'), { texto: 'No vale', fondo: '#ff5a36', color: '#fff3df' }, reducirMovimiento);
        gsap.delayedCall(0.4, () => estado.sonido && sfx.golpe(0.6));
    }
}

const listaNumeros = (numeros) => numeros.map((n) => columnaDe(n).letra + n).join(', ');
const textoFaltan = (faltan) => `${faltan.length === 1 ? 'falta 1 número' : `faltan ${faltan.length} números`}: ${listaNumeros(faltan)}`;

// Verificación por código: el cartón se reconstruye a partir de la serie
function verificarCodigo() {
    ultimaVerificacion = verificarCodigo;
    limpiarResultado();
    const codigo = parsearCodigo($('codigoCarton').value, serieRecordada());
    if (codigo.error) return mostrarAviso(codigo.error);

    guardarPreferencia('serie', codigo.serie);
    pintarSerie();
    const carton = generarCarton(codigo.serie, codigo.numero);
    const r = verificar(carton, estado.salidas, estado.patron);
    const { nombre } = PATRONES[estado.patron];

    $('resultadoCarton').innerHTML = htmlCarton(carton, { marcadas: r.marcadas, clave: r.figura, faltan: r.faltan });
    gsap.from('#resultadoCarton .carton-celda', {
        scale: 0, duration: 0.35, ease: 'back.out(2.5)', stagger: { amount: 0.35, grid: [5, 5], from: 'center' },
    });
    const texto = r.gana
        ? `Cartón ${carton.codigo}: ¡${nombre}!`
        : `Cartón ${carton.codigo}: para ${nombre.toLowerCase()} le ${textoFaltan(r.faltan)}`;
    veredicto(r.gana, texto);
}

// Verificación a mano: comprueba que los números escritos ya salieron
function verificarNumeros() {
    ultimaVerificacion = null;
    limpiarResultado();
    const texto = $('numerosCarton').value;
    const numeros = [...new Set((texto.match(/\d+/g) || []).map(Number))].filter((n) => n >= 1 && n <= TOTAL);
    if (numeros.length === 0) return mostrarAviso('Escribe números del 1 al 75.');

    const chips = $('resultadoChips');
    numeros.forEach((n) => {
        const salio = estado.salidas.has(n);
        const chip = document.createElement('span');
        chip.className = 'ficha h-14 w-14' + (salio ? '' : ' opacity-40 grayscale');
        chip.style.setProperty('--c', columnaDe(n).color);
        chip.innerHTML = htmlFicha(n, true);
        if (!salio) chip.title = 'Aún no ha salido';
        chips.appendChild(chip);
    });
    gsap.from(chips.children, { scale: 0, rotation: -180, duration: 0.5, stagger: 0.05, ease: 'back.out(2.5)' });

    const faltan = numeros.filter((n) => !estado.salidas.has(n));
    if (faltan.length === 0) veredicto(true, `Los ${numeros.length} números ya salieron.`);
    else {
        const t = textoFaltan(faltan);
        veredicto(false, t[0].toUpperCase() + t.slice(1));
    }
}

// ---------- Pizarra en móvil ----------
function alternarPizarra(abrir) {
    const pizarra = $('pizarra');
    const fondo = $('pizarraFondo');
    const abierta = abrir ?? !pizarra.classList.contains('abierta');
    pizarra.classList.toggle('abierta', abierta);
    $('pizarraBtn').setAttribute('aria-expanded', String(abierta));
    if (abierta) {
        fondo.classList.remove('hidden');
        gsap.fromTo(fondo, { opacity: 0 }, { opacity: 1, duration: 0.3 });
        gsap.from('#tablero > div', { scale: 0.5, opacity: 0, duration: 0.35, stagger: { amount: 0.4, grid: 'auto', from: 'start' }, ease: 'back.out(2)', delay: 0.15 });
    } else {
        gsap.to(fondo, { opacity: 0, duration: 0.25, onComplete: () => fondo.classList.add('hidden') });
    }
}

// ---------- Controles ----------
function pedirReinicio() {
    if (estado.salidas.size === 0) return avisar('La partida aún no ha empezado');
    pausar();
    abrirModal($('modalReset'));
}

function aplicarSonido() {
    const btn = $('sonidoBtn');
    btn.setAttribute('aria-pressed', String(estado.sonido));
    btn.setAttribute('aria-label', estado.sonido ? 'Sonido y voz activados' : 'Sonido y voz desactivados');
    $('iconoSonidoOn').classList.toggle('hidden', !estado.sonido);
    $('iconoSonidoOff').classList.toggle('hidden', estado.sonido);
}

function aplicarVelocidad() {
    const s = estado.intervalo / 1000;
    $('velocidadBtn').textContent = `${s}s`;
    $('velocidadBtn').setAttribute('aria-label', `Velocidad: una bola cada ${s} segundos`);
}

$('playBtn').addEventListener('click', alternarJuego);
$('resetBtn').addEventListener('click', pedirReinicio);
$('bingoBtn').addEventListener('click', bingo);
$('verificarBtn').addEventListener('click', verificarCodigo);
$('codigoCarton').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); verificarCodigo(); }
});
$('verificarNumerosBtn').addEventListener('click', verificarNumeros);
$('numerosCarton').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); verificarNumeros(); }
});
$('patrones').addEventListener('click', (e) => {
    const boton = e.target.closest('[data-patron]');
    if (!boton || boton.dataset.patron === estado.patron) return;
    estado.patron = boton.dataset.patron;
    guardarPreferencia('patron', estado.patron);
    aplicarPatron();
    if (ultimaVerificacion && $('codigoCarton').value.trim()) ultimaVerificacion();
});
$('seguirBtn').addEventListener('click', () => { cerrarModal(); iniciar(); });
$('nuevaPartidaBtn').addEventListener('click', () => { cerrarModal(); reiniciar(); });
$('confirmarResetBtn').addEventListener('click', () => { cerrarModal(); reiniciar(); });
$('pizarraBtn').addEventListener('click', () => alternarPizarra());
$('cerrarPizarra').addEventListener('click', () => alternarPizarra(false));
$('pizarraFondo').addEventListener('click', () => alternarPizarra(false));

$('sonidoBtn').addEventListener('click', () => {
    estado.sonido = !estado.sonido;
    if (!estado.sonido) sfx.callar();
    guardarPreferencia('sonido', estado.sonido);
    aplicarSonido();
    avisar(estado.sonido ? 'Sonido y voz activados' : 'Sonido apagado');
});

$('velocidadBtn').addEventListener('click', () => {
    const i = VELOCIDADES.indexOf(estado.intervalo);
    estado.intervalo = VELOCIDADES[(i + 1) % VELOCIDADES.length];
    guardarPreferencia('intervalo', estado.intervalo);
    aplicarVelocidad();
    if (proximaBola) programarSiguiente();
    avisar(`Una bola cada ${estado.intervalo / 1000} segundos`);
});

document.addEventListener('keydown', (e) => {
    if (modalAbierto) {
        if (e.key === 'Escape') cerrarModal();
        return;
    }
    if (e.key === 'Escape' && $('pizarra').classList.contains('abierta')) return alternarPizarra(false);
    if (e.target.closest('textarea, input') || e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.code === 'Space' && !e.target.closest('button')) {
        e.preventDefault();
        if (!estado.terminado) alternarJuego();
    } else if (e.key.toLowerCase() === 'b') {
        e.preventDefault(); // si no, la "b" se escribe en el campo del código al abrir el modal
        bingo();
    } else if (e.key.toLowerCase() === 'r') {
        pedirReinicio();
    }
});

// ---------- Arranque ----------
async function arrancar() {
    // Las texturas de las bolas usan la fuente Bungee: hay que esperarla
    try {
        await Promise.race([document.fonts.load('48px Bungee'), new Promise((ok) => setTimeout(ok, 2500))]);
    } catch { /* se usa la fuente de respaldo */ }

    estado.bolas = mezclar(Array.from({ length: TOTAL }, (_, i) => i + 1));
    construirPizarra();
    aplicarSonido();
    aplicarVelocidad();
    actualizarBotonPlay();
    let con3D = true;
    try {
        escenario = crearEscenario($('escena'), { columnaDe, colores: COLORES, reducirMovimiento });
    } catch (error) {
        console.warn('No se pudo iniciar la escena 3D:', error);
        escenario = escenarioSin3D();
        $('escena').classList.add('hidden');
        con3D = false;
    }

    const escritorio = window.innerWidth >= 1024;
    const tl = gsap.timeline();
    tl.to('.telon-izq', { xPercent: -102, duration: 1.3, ease: 'power3.inOut' }, 0.25)
        .to('.telon-der', { xPercent: 102, duration: 1.3, ease: 'power3.inOut' }, 0.25)
        .set('#telon', { display: 'none' })
        .add(escenario.intro(), 0.2)
        .fromTo('.logo-ficha',
            { y: -160, rotation: () => gsap.utils.random(-120, 120), opacity: 0 },
            { y: 0, rotation: (i, el) => Number(el.dataset.rot), opacity: 1, duration: 1, ease: 'bounce.out', stagger: 0.09 }, 0.9)
        .from('#enVivo', { scale: 0, rotation: -30, duration: 0.6, ease: 'back.out(3)' }, 1.6)
        .from('#lema', { x: -20, opacity: 0, duration: 0.5 }, 1.75)
        .from('#stats > *', { y: -80, rotation: 8, opacity: 0, duration: 0.7, ease: 'back.out(2)', stagger: 0.1, clearProps: 'transform' }, 1.2)
        .from('#actual > div', { x: -140, rotation: -8, opacity: 0, duration: 0.8, ease: 'back.out(1.6)' }, 1.5)
        .from('#controles > *', { y: 120, opacity: 0, duration: 0.7, ease: 'back.out(2)', stagger: 0.07, clearProps: 'transform' }, 1.6);
    if (escritorio) {
        tl.from('#pizarra', { x: 480, rotation: 6, duration: 1, ease: 'power4.out', clearProps: 'transform' }, 1.1)
            .from('#tablero .casilla-giro', { rotationX: -100, opacity: 0, duration: 0.5, ease: 'back.out(2)', stagger: { amount: 1, from: 'start' } }, 1.5);
    }
    if (!con3D) tl.call(() => avisar('Modo sin 3D: el sorteo funciona igual'), null, 2.4);
}

// Sustituto de la escena cuando el navegador no tiene WebGL: misma interfaz,
// sin bombo, pero los callbacks del sorteo se siguen llamando.
function escenarioSin3D() {
    const vacio = () => gsap.timeline();
    let tlSorteo = null;
    return {
        intro: vacio,
        celebrar() { tlSorteo?.progress(1); return vacio(); },
        reiniciar() { tlSorteo?.progress(1); },
        terminar() {},
        sacudir() {},
        sortear(_numero, { onSalida, onRevelar, onImpacto } = {}) {
            tlSorteo?.progress(1);
            tlSorteo = gsap.timeline()
                .call(() => onSalida?.(), null, 0)
                .call(() => onRevelar?.(), null, 0.4)
                .call(() => onImpacto?.(), null, 0.6);
            return tlSorteo;
        },
    };
}

arrancar();
