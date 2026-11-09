// Sonidos sintetizados con Web Audio (sin archivos) y voz que canta las bolas.

let audio = null;
let bufferRuido = null;
let maestro = null;      // ganancia general de los efectos
let volEfectos = 0.8;    // 0–1
let volVoz = 1;          // 0–1 (volumen de la voz sintetizada)

// Todos los efectos pasan por la ganancia general, así se regula el volumen en un solo sitio
function salidaGeneral(ctx) {
    if (!maestro) {
        maestro = ctx.createGain();
        maestro.gain.value = volEfectos;
        maestro.connect(ctx.destination);
    }
    return maestro;
}

// Volumen de efectos y voz (0–1); se aplica al momento
export function fijarVolumen({ efectos, voz } = {}) {
    if (Number.isFinite(efectos)) {
        volEfectos = Math.min(1, Math.max(0, efectos));
        if (maestro && audio) maestro.gain.setTargetAtTime(volEfectos, audio.currentTime, 0.02);
    }
    if (Number.isFinite(voz)) volVoz = Math.min(1, Math.max(0, voz));
}

function contexto() {
    if (!audio) {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        if (!Ctx) return null;
        audio = new Ctx();
    }
    if (audio.state === 'suspended') audio.resume();
    return audio;
}

function ruido(ctx) {
    if (!bufferRuido) {
        bufferRuido = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
        const datos = bufferRuido.getChannelData(0);
        for (let i = 0; i < datos.length; i++) datos[i] = Math.random() * 2 - 1;
    }
    const fuente = ctx.createBufferSource();
    fuente.buffer = bufferRuido;
    fuente.loop = true;
    return fuente;
}

function envolvente(ctx, inicio, pico, ataque, caida) {
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, inicio);
    g.gain.exponentialRampToValueAtTime(pico, inicio + ataque);
    g.gain.exponentialRampToValueAtTime(0.0001, inicio + ataque + caida);
    return g;
}

// Redoble de tambor mientras gira el bombo
export function redoble(duracion = 1) {
    const ctx = contexto();
    if (!ctx) return;
    const t = ctx.currentTime;
    const fuente = ruido(ctx);
    const filtro = ctx.createBiquadFilter();
    filtro.type = 'bandpass';
    filtro.frequency.value = 220;
    filtro.Q.value = 0.7;
    const tremolo = ctx.createGain();
    tremolo.gain.value = 0.5;
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 24;
    const profundidad = ctx.createGain();
    profundidad.gain.value = 0.5;
    lfo.connect(profundidad).connect(tremolo.gain);
    const volumen = ctx.createGain();
    volumen.gain.setValueAtTime(0.0001, t);
    volumen.gain.exponentialRampToValueAtTime(0.35, t + duracion * 0.85);
    volumen.gain.exponentialRampToValueAtTime(0.0001, t + duracion + 0.05);
    fuente.connect(filtro).connect(tremolo).connect(volumen).connect(salidaGeneral(ctx));
    fuente.start(t);
    lfo.start(t);
    fuente.stop(t + duracion + 0.1);
    lfo.stop(t + duracion + 0.1);
}

// Silbido de la bola volando
export function silbido(duracion = 0.6) {
    const ctx = contexto();
    if (!ctx) return;
    const t = ctx.currentTime;
    const fuente = ruido(ctx);
    const filtro = ctx.createBiquadFilter();
    filtro.type = 'bandpass';
    filtro.Q.value = 4;
    filtro.frequency.setValueAtTime(500, t);
    filtro.frequency.exponentialRampToValueAtTime(3200, t + duracion);
    const g = envolvente(ctx, t, 0.3, duracion * 0.7, duracion * 0.3);
    fuente.connect(filtro).connect(g).connect(salidaGeneral(ctx));
    fuente.start(t);
    fuente.stop(t + duracion + 0.05);
}

// Campana brillante al revelar el número
export function campana() {
    const ctx = contexto();
    if (!ctx) return;
    const t = ctx.currentTime;
    [1318.5, 1975.5, 2637].forEach((f, i) => {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = f;
        const g = envolvente(ctx, t, 0.16 / (i + 1), 0.005, 1.1);
        osc.connect(g).connect(salidaGeneral(ctx));
        osc.start(t);
        osc.stop(t + 1.2);
    });
}

// Golpe grave cuando el número choca contra la pantalla
export function golpe(fuerza = 1) {
    const ctx = contexto();
    if (!ctx) return;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, t);
    osc.frequency.exponentialRampToValueAtTime(40, t + 0.3);
    const g = envolvente(ctx, t, 0.7 * fuerza, 0.005, 0.35);
    osc.connect(g).connect(salidaGeneral(ctx));
    osc.start(t);
    osc.stop(t + 0.4);

    const chasquido = ruido(ctx);
    const filtro = ctx.createBiquadFilter();
    filtro.type = 'highpass';
    filtro.frequency.value = 1800;
    const gc = envolvente(ctx, t, 0.25 * fuerza, 0.002, 0.06);
    chasquido.connect(filtro).connect(gc).connect(salidaGeneral(ctx));
    chasquido.start(t);
    chasquido.stop(t + 0.1);
}

// Fanfarria del ¡Bingo!
export function fanfarria() {
    const ctx = contexto();
    if (!ctx) return;
    const notas = [[523.25, 0], [659.25, 0.12], [783.99, 0.24], [1046.5, 0.36], [783.99, 0.56], [1046.5, 0.68]];
    notas.forEach(([f, d], i) => {
        const t = ctx.currentTime + d;
        for (const detune of [-8, 8]) {
            const osc = ctx.createOscillator();
            osc.type = 'sawtooth';
            osc.frequency.value = f;
            osc.detune.value = detune;
            const filtro = ctx.createBiquadFilter();
            filtro.type = 'lowpass';
            filtro.frequency.value = 2400;
            const g = envolvente(ctx, t, 0.07, 0.02, i === notas.length - 1 ? 1.1 : 0.18);
            osc.connect(filtro).connect(g).connect(salidaGeneral(ctx));
            osc.start(t);
            osc.stop(t + 1.3);
        }
    });
}

// `texto` puede ser un texto o { texto, lang } (ver src/narrador.js)
export function cantar(texto, lang = 'es-ES') {
    if (!('speechSynthesis' in window)) return;
    if (texto && typeof texto === 'object') ({ texto, lang = 'es-ES' } = texto);
    if (!texto || volVoz === 0) return;
    window.speechSynthesis.cancel();
    const voz = new SpeechSynthesisUtterance(texto);
    voz.lang = lang;
    voz.volume = volVoz;
    voz.rate = 0.95;
    voz.pitch = 1.05;
    window.speechSynthesis.speak(voz);
}

export function callar() {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
}
