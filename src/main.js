// Bingo 3D — lógica del juego e interfaz.
import { gsap } from 'gsap';
import { crearBola } from './bola3d.js';
import { crearFondo } from './fondo3d.js';
import { sonidoBola, sonidoBingo, cantar, callar, confeti } from './efectos.js';

const LETRAS = [
    { letra: 'B', color: '#f5365c' },
    { letra: 'I', color: '#ffd600', textoOscuro: true },
    { letra: 'N', color: '#2dce89' },
    { letra: 'G', color: '#5e72e4' },
    { letra: 'O', color: '#8965e0' },
];
const COLORES = LETRAS.map((l) => l.color);
const TOTAL = 75;
const MAX_HISTORIAL = 6;
const reducirMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const $ = (id) => document.getElementById(id);
const el = {
    estado: $('estado'),
    aura: $('aura'),
    finJuego: $('finJuego'),
    cantoLetra: $('cantoLetra'),
    cantoNumero: $('cantoNumero'),
    siguiente: $('siguiente'),
    contador: $('contadorBolas'),
    tiempo: $('tiempo'),
    progreso: $('progreso'),
    barraProgreso: $('barraProgreso'),
    playBtn: $('playBtn'),
    playTexto: $('playTexto'),
    iconoPlay: $('iconoPlay'),
    iconoPausa: $('iconoPausa'),
    resetBtn: $('resetBtn'),
    bingoBtn: $('bingoBtn'),
    sonidoBtn: $('sonidoBtn'),
    historial: $('historial'),
    historialVacio: $('historialVacio'),
    tablero: $('tablero'),
    modalBingo: $('modalBingo'),
    modalReset: $('modalReset'),
    aviso: $('aviso'),
};

// ---------- Preferencias (se recuerdan en este navegador) ----------
function leerPreferencia(clave, porDefecto) {
    try {
        const v = localStorage.getItem('bingo.' + clave);
        return v === null ? porDefecto : JSON.parse(v);
    } catch {
        return porDefecto;
    }
}
function guardarPreferencia(clave, valor) {
    try { localStorage.setItem('bingo.' + clave, JSON.stringify(valor)); } catch { /* sin almacenamiento */ }
}

// ---------- Estado ----------
const estado = {
    bolas: [],
    indice: -1,
    salidas: new Set(),
    jugando: false,
    terminado: false,
    intervalo: leerPreferencia('intervalo', 8000),
    sonido: leerPreferencia('sonido', true),
    tiempoAcumulado: 0,
    inicioTramo: 0,
};
let proximaBola = null; // gsap.delayedCall
let relojTiempo = null;
let ultimaCelda = null;

const columnaDe = (n) => LETRAS[Math.floor((n - 1) / 15)];

function mezclar(arreglo) {
    for (let i = arreglo.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arreglo[i], arreglo[j]] = [arreglo[j], arreglo[i]];
    }
    return arreglo;
}

// ---------- 3D ----------
const fondo = crearFondo($('fondo'), COLORES, { reducirMovimiento });
const bola3d = crearBola($('bola'), { reducirMovimiento });

// ---------- Tablero ----------
function construirTablero() {
    const fragmento = document.createDocumentFragment();
    LETRAS.forEach(({ letra, color, textoOscuro }, columna) => {
        const cabecera = document.createElement('div');
        cabecera.className = 'celda font-display !text-lg ring-0';
        cabecera.style.background = color;
        cabecera.style.color = textoOscuro ? '#111827' : '#fff';
        cabecera.textContent = letra;
        fragmento.appendChild(cabecera);

        for (let k = 1; k <= 15; k++) {
            const n = columna * 15 + k;
            const celda = document.createElement('div');
            celda.className = 'celda';
            celda.id = 'num' + n;
            celda.textContent = n;
            fragmento.appendChild(celda);
        }
    });
    el.tablero.appendChild(fragmento);

    // Resumen por letra
    const resumen = $('porLetra');
    LETRAS.forEach(({ letra, color }) => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'rounded-2xl bg-white/[0.04] p-2 sm:p-3';
        tarjeta.innerHTML =
            `<div class="flex items-baseline justify-between gap-1">` +
            `<span class="font-display text-lg" style="color:${color}">${letra}</span>` +
            `<span class="text-xs font-bold text-white/50 sm:text-sm"><span data-cuenta="${letra}" class="text-white">0</span>/15</span></div>` +
            `<div class="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">` +
            `<div data-barra="${letra}" class="h-full w-0 rounded-full" style="background:${color}"></div></div>`;
        resumen.appendChild(tarjeta);
    });
}

function actualizarPorLetra() {
    LETRAS.forEach(({ letra }, columna) => {
        let cuenta = 0;
        estado.salidas.forEach((n) => { if (Math.floor((n - 1) / 15) === columna) cuenta++; });
        const texto = document.querySelector(`[data-cuenta="${letra}"]`);
        if (texto.textContent !== String(cuenta)) {
            texto.textContent = cuenta;
            if (cuenta > 0) gsap.fromTo(texto, { scale: 1.6 }, { scale: 1, duration: 0.4, ease: 'back.out(3)' });
        }
        gsap.to(`[data-barra="${letra}"]`, { width: `${(cuenta / 15) * 100}%`, duration: 0.6, ease: 'power2.out' });
    });
}

function marcarCelda(n) {
    const { color, textoOscuro } = columnaDe(n);
    const celda = $('num' + n);
    ultimaCelda?.classList.remove('ring-2', 'ring-white');
    celda.classList.add('ring-2', 'ring-white');
    ultimaCelda = celda;
    celda.style.background = color;
    celda.style.color = textoOscuro ? '#111827' : '#fff';
    celda.style.boxShadow = `0 0 18px ${color}99`;
    gsap.fromTo(celda,
        { scale: 1.9, zIndex: 2 },
        { scale: 1, zIndex: 0, duration: 0.7, ease: 'back.out(3)', clearProps: 'zIndex' });
}

// ---------- Historial ----------
function agregarHistorial(n) {
    const { letra, color, textoOscuro } = columnaDe(n);
    el.historialVacio?.remove();
    const item = document.createElement('li');
    item.className = 'grid h-14 w-14 shrink-0 place-items-center rounded-full font-display leading-none shadow-lg';
    item.style.background = `radial-gradient(circle at 30% 28%, #ffffffaa, ${color} 42%, ${color})`;
    item.style.color = textoOscuro ? '#111827' : '#fff';
    item.innerHTML = `<span class="text-center"><span class="block text-[10px] opacity-80">${letra}</span><span class="text-xl">${n}</span></span>`;
    el.historial.prepend(item);
    gsap.from(item, { scale: 0, x: -40, rotation: -180, duration: 0.6, ease: 'back.out(2)' });

    const items = el.historial.querySelectorAll('li');
    if (items.length > MAX_HISTORIAL) {
        const sobra = items[items.length - 1];
        gsap.to(sobra, { scale: 0, opacity: 0, duration: 0.3, onComplete: () => sobra.remove() });
    }
}

// ---------- Interfaz ----------
function ponerEstado(texto) {
    el.estado.textContent = texto;
}

function actualizarProgreso() {
    const cantadas = estado.salidas.size;
    actualizarPorLetra();
    el.contador.textContent = cantadas;
    el.barraProgreso.setAttribute('aria-valuenow', cantadas);
    gsap.to(el.progreso, { width: `${(cantadas / TOTAL) * 100}%`, duration: 0.6, ease: 'power2.out' });
    gsap.fromTo(el.contador, { scale: 1.4 }, { scale: 1, duration: 0.4, ease: 'back.out(3)' });
}

function mostrarCanto(n) {
    const { letra, color } = columnaDe(n);
    el.cantoLetra.textContent = letra;
    el.cantoNumero.textContent = n;
    el.cantoLetra.style.color = color;
    el.cantoNumero.style.color = '#fff';
    el.cantoLetra.classList.remove('text-white/30');
    el.cantoNumero.classList.remove('text-white/30');
    gsap.fromTo([el.cantoLetra, el.cantoNumero],
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'back.out(2)', delay: 0.35 });

    el.aura.style.background = color;
    gsap.fromTo(el.aura, { opacity: 0.9, scale: 1.3 }, { opacity: 0.35, scale: 1, duration: 1.4, ease: 'power2.out' });
}

function formatoTiempo(ms) {
    const total = Math.floor(ms / 1000);
    return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
}
function tiempoTranscurrido() {
    return estado.tiempoAcumulado + (estado.jugando ? performance.now() - estado.inicioTramo : 0);
}
function pintarTiempo() {
    el.tiempo.textContent = formatoTiempo(tiempoTranscurrido());
}

let avisoTween = null;
function avisar(texto) {
    el.aviso.textContent = texto;
    avisoTween?.kill();
    avisoTween = gsap.timeline()
        .fromTo(el.aviso, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' })
        .to(el.aviso, { opacity: 0, y: 10, duration: 0.35, delay: 2.2 });
}

function actualizarBotonPlay() {
    el.iconoPlay.classList.toggle('hidden', estado.jugando);
    el.iconoPausa.classList.toggle('hidden', !estado.jugando);
    const texto = estado.jugando ? 'Pausar' : estado.indice >= 0 ? 'Continuar' : 'Iniciar';
    el.playTexto.textContent = texto;
    el.playBtn.setAttribute('aria-label', texto);
    el.playBtn.disabled = estado.terminado;
}

// ---------- Juego ----------
function sacarBola() {
    if (estado.indice >= TOTAL - 1) {
        finDelJuego();
        return;
    }
    estado.indice++;
    const n = estado.bolas[estado.indice];
    const info = columnaDe(n);
    estado.salidas.add(n);

    bola3d.mostrar({ ...info, numero: n });
    fondo.pulso(info.color);
    marcarCelda(n);
    agregarHistorial(n);
    mostrarCanto(n);
    actualizarProgreso();

    if (estado.sonido) {
        sonidoBola();
        gsap.delayedCall(0.5, () => estado.jugando && cantar(`${info.letra}, ${n}`));
    }

    if (estado.indice >= TOTAL - 1) {
        finDelJuego();
    } else {
        programarSiguiente();
    }
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
    ponerEstado('Jugando');
    if (proximaBola) {
        proximaBola.resume(); // continúa la cuenta donde se quedó
    } else {
        sacarBola(); // la primera bola sale al instante
    }
    actualizarBotonPlay();
}

function pausar() {
    if (!estado.jugando) return;
    estado.tiempoAcumulado = tiempoTranscurrido();
    estado.jugando = false;
    clearInterval(relojTiempo);
    proximaBola?.pause();
    callar();
    pintarTiempo();
    ponerEstado('En pausa');
    actualizarBotonPlay();
}

function alternarJuego() {
    estado.jugando ? pausar() : iniciar();
}

function finDelJuego() {
    pausar();
    proximaBola?.kill();
    proximaBola = null;
    estado.terminado = true;
    ponerEstado('Terminado');
    el.finJuego.classList.replace('hidden', 'grid');
    gsap.from(el.finJuego, { scale: 0.6, opacity: 0, duration: 0.6, ease: 'back.out(2)', delay: 1.2 });
    actualizarBotonPlay();
    avisar('¡Salieron las 75 bolas!');
}

function reiniciar() {
    pausar();
    proximaBola?.kill();
    proximaBola = null;
    callar();
    Object.assign(estado, {
        bolas: mezclar(Array.from({ length: TOTAL }, (_, i) => i + 1)),
        indice: -1,
        salidas: new Set(),
        terminado: false,
        tiempoAcumulado: 0,
    });
    ultimaCelda = null;

    const celdas = el.tablero.querySelectorAll('[id^="num"]');
    gsap.to(celdas, {
        scale: 0.6, duration: 0.15, stagger: { amount: 0.3, from: 'random' },
        onComplete() {
            celdas.forEach((c) => {
                c.removeAttribute('style');
                c.classList.remove('ring-2', 'ring-white');
            });
            gsap.to(celdas, { scale: 1, duration: 0.3, ease: 'back.out(2)' });
        },
    });

    el.historial.innerHTML = '';
    el.historialVacio = document.createElement('li');
    el.historialVacio.className = 'text-sm text-white/30';
    el.historialVacio.innerHTML = 'Aún no sale ninguna bola. Pulsa <strong class="text-white/60">Iniciar</strong>.';
    el.historial.appendChild(el.historialVacio);

    el.cantoLetra.textContent = '—';
    el.cantoNumero.textContent = '';
    el.cantoLetra.removeAttribute('style');
    el.cantoLetra.classList.add('text-white/30');
    gsap.to(el.aura, { opacity: 0, duration: 0.4 });
    el.finJuego.classList.replace('grid', 'hidden');

    bola3d.reiniciar();
    actualizarProgreso();
    pintarTiempo();
    ponerEstado('Listo');
    actualizarBotonPlay();
}

// Barra "siguiente bola"
gsap.ticker.add(() => {
    const p = proximaBola && !estado.terminado ? proximaBola.progress() : 0;
    el.siguiente.style.width = `${p * 100}%`;
});

// ---------- Modales ----------
let modalAbierto = null;
let focoPrevio = null;

function abrirModal(modal) {
    focoPrevio = document.activeElement;
    modalAbierto = modal;
    modal.classList.replace('hidden', 'flex');
    gsap.fromTo(modal.querySelector('.modal-fondo'), { opacity: 0 }, { opacity: 1, duration: 0.3 });
    gsap.fromTo(modal.querySelector('.modal-caja'),
        { scale: 0.85, y: 30, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.8)' });
    modal.querySelector('button, textarea')?.focus({ preventScroll: true });
}

function cerrarModal() {
    const modal = modalAbierto;
    if (!modal) return;
    modalAbierto = null;
    gsap.to(modal.querySelector('.modal-fondo'), { opacity: 0, duration: 0.2 });
    gsap.to(modal.querySelector('.modal-caja'), {
        scale: 0.9, opacity: 0, duration: 0.2, ease: 'power2.in',
        onComplete: () => modal.classList.replace('flex', 'hidden'),
    });
    focoPrevio?.focus?.({ preventScroll: true });
}

document.querySelectorAll('[data-cerrar]').forEach((b) => b.addEventListener('click', cerrarModal));

// Atrapa el foco del teclado dentro del modal abierto
document.addEventListener('keydown', (e) => {
    if (!modalAbierto || e.key !== 'Tab') return;
    const enfocables = [...modalAbierto.querySelectorAll('button, textarea')].filter((x) => x.offsetParent);
    const primero = enfocables[0];
    const ultimo = enfocables[enfocables.length - 1];
    if (e.shiftKey && document.activeElement === primero) { e.preventDefault(); ultimo.focus(); }
    else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primero.focus(); }
});

// ---------- ¡Bingo! ----------
function bingo() {
    if (estado.salidas.size === 0) {
        avisar('Aún no ha salido ninguna bola');
        gsap.fromTo(el.bingoBtn, { x: -8 }, { x: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
        return;
    }
    pausar();
    $('bingoBolas').textContent = estado.salidas.size;
    $('bingoTiempo').textContent = formatoTiempo(tiempoTranscurrido());
    $('numerosCarton').value = '';
    $('resultado').classList.add('hidden');
    abrirModal(el.modalBingo);
    gsap.fromTo('.titulo-letra',
        { y: -90, rotation: () => gsap.utils.random(-40, 40), opacity: 0 },
        { y: 0, rotation: 0, opacity: 1, duration: 0.9, stagger: 0.07, ease: 'bounce.out' });
    confeti(COLORES);
    if (estado.sonido) {
        sonidoBingo();
        cantar('¡Bingo!');
    }
}

function verificarCarton() {
    const texto = $('numerosCarton').value;
    const numeros = [...new Set((texto.match(/\d+/g) || []).map(Number))].filter((n) => n >= 1 && n <= TOTAL);
    const resultado = $('resultado');
    const textoResultado = $('resultadoTexto');
    const chips = $('resultadoChips');
    resultado.classList.remove('hidden');
    chips.innerHTML = '';

    if (numeros.length === 0) {
        textoResultado.textContent = 'Escribe números del 1 al 75.';
        textoResultado.className = 'mb-3 text-center font-bold text-white/60';
        return;
    }

    const faltan = numeros.filter((n) => !estado.salidas.has(n));
    numeros.forEach((n) => {
        const salio = estado.salidas.has(n);
        const chip = document.createElement('span');
        chip.className = 'grid h-10 min-w-10 place-items-center rounded-full px-2 font-display ' +
            (salio ? 'bg-bn text-white' : 'bg-bb/20 text-bb line-through ring-1 ring-bb/50');
        chip.textContent = `${columnaDe(n).letra}${n}`;
        chips.appendChild(chip);
    });
    gsap.from(chips.children, { scale: 0, duration: 0.35, stagger: 0.04, ease: 'back.out(3)' });

    if (faltan.length === 0) {
        textoResultado.textContent = `✔ Los ${numeros.length} números ya salieron. ¡Bingo válido!`;
        textoResultado.className = 'mb-3 text-center font-bold text-bn';
        confeti(COLORES, 80);
    } else {
        textoResultado.textContent = `✖ ${faltan.length === 1 ? 'Falta 1 número' : `Faltan ${faltan.length} números`}: ${faltan.join(', ')}`;
        textoResultado.className = 'mb-3 text-center font-bold text-bb';
        gsap.fromTo(textoResultado, { x: -10 }, { x: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' });
    }
}

// ---------- Controles ----------
function pedirReinicio() {
    if (estado.salidas.size === 0) {
        avisar('La partida aún no ha empezado');
        return;
    }
    pausar(); // que no salga una bola mientras se confirma
    abrirModal(el.modalReset);
}

function aplicarSonido() {
    el.sonidoBtn.setAttribute('aria-pressed', String(estado.sonido));
    el.sonidoBtn.setAttribute('aria-label', estado.sonido ? 'Sonido y voz activados' : 'Sonido y voz desactivados');
    $('iconoSonidoOn').classList.toggle('hidden', !estado.sonido);
    $('iconoSonidoOff').classList.toggle('hidden', estado.sonido);
}

function aplicarVelocidad() {
    document.querySelectorAll('.velocidad').forEach((b) => {
        b.setAttribute('aria-pressed', String(Number(b.dataset.ms) === estado.intervalo));
    });
}

el.playBtn.addEventListener('click', alternarJuego);
el.resetBtn.addEventListener('click', pedirReinicio);
el.bingoBtn.addEventListener('click', bingo);
$('verificarBtn').addEventListener('click', verificarCarton);
$('numerosCarton').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); verificarCarton(); }
});
$('seguirBtn').addEventListener('click', () => { cerrarModal(); iniciar(); });
$('nuevaPartidaBtn').addEventListener('click', () => { cerrarModal(); reiniciar(); });
$('confirmarResetBtn').addEventListener('click', () => { cerrarModal(); reiniciar(); });

el.sonidoBtn.addEventListener('click', () => {
    estado.sonido = !estado.sonido;
    if (!estado.sonido) callar();
    guardarPreferencia('sonido', estado.sonido);
    aplicarSonido();
    avisar(estado.sonido ? 'Sonido y voz activados' : 'Sonido desactivado');
});

document.querySelectorAll('.velocidad').forEach((b) => {
    b.addEventListener('click', () => {
        estado.intervalo = Number(b.dataset.ms);
        guardarPreferencia('intervalo', estado.intervalo);
        aplicarVelocidad();
        if (proximaBola) programarSiguiente();
        avisar(`Una bola cada ${estado.intervalo / 1000} segundos`);
    });
});

// Atajos de teclado
document.addEventListener('keydown', (e) => {
    if (modalAbierto) {
        if (e.key === 'Escape') cerrarModal();
        return;
    }
    if (e.target.closest('textarea, input') || e.ctrlKey || e.metaKey || e.altKey) return;
    // Con un botón enfocado, Espacio pulsa ese botón (comportamiento normal)
    if (e.code === 'Space' && !e.target.closest('button')) {
        e.preventDefault();
        if (!estado.terminado) alternarJuego();
    } else if (e.key.toLowerCase() === 'b') {
        bingo();
    } else if (e.key.toLowerCase() === 'r') {
        pedirReinicio();
    }
});

// ---------- Arranque ----------
estado.bolas = mezclar(Array.from({ length: TOTAL }, (_, i) => i + 1));
construirTablero();
aplicarSonido();
aplicarVelocidad();
actualizarBotonPlay();

// Animación de entrada
gsap.from('[data-entrada]', { y: 30, opacity: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out' });
gsap.from('.logo-letra', { y: -60, rotation: () => gsap.utils.random(-30, 30), opacity: 0, duration: 1, stagger: 0.08, ease: 'bounce.out', delay: 0.1 });
gsap.from(el.tablero.children, {
    scale: 0, opacity: 0, duration: 0.4, ease: 'back.out(2)', delay: 0.4,
    stagger: { amount: 0.9, grid: 'auto', from: 'start' },
});
