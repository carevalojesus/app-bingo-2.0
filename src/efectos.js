// Sonido, voz y confeti.
import { gsap } from 'gsap';

let audio = null;

function contexto() {
    if (!audio) {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        if (!Ctx) return null;
        audio = new Ctx();
    }
    if (audio.state === 'suspended') audio.resume();
    return audio;
}

// "Pop" corto al salir una bola
export function sonidoBola() {
    const ctx = contexto();
    if (!ctx) return;
    const ahora = ctx.currentTime;
    const osc = ctx.createOscillator();
    const ganancia = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ahora);
    osc.frequency.exponentialRampToValueAtTime(220, ahora + 0.18);
    ganancia.gain.setValueAtTime(0.0001, ahora);
    ganancia.gain.exponentialRampToValueAtTime(0.25, ahora + 0.01);
    ganancia.gain.exponentialRampToValueAtTime(0.0001, ahora + 0.25);
    osc.connect(ganancia).connect(ctx.destination);
    osc.start(ahora);
    osc.stop(ahora + 0.3);
}

// Pequeña fanfarria para el ¡Bingo!
export function sonidoBingo() {
    const ctx = contexto();
    if (!ctx) return;
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
        const t = ctx.currentTime + i * 0.11;
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.value = f;
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.22, t + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t + (i === 3 ? 0.7 : 0.2));
        osc.connect(g).connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.8);
    });
}

export function cantar(texto) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const voz = new SpeechSynthesisUtterance(texto);
    voz.lang = 'es-ES';
    voz.rate = 0.95;
    window.speechSynthesis.speak(voz);
}

export function callar() {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
}

export function confeti(colores, cantidad = 140) {
    const capa = document.createElement('div');
    capa.className = 'pointer-events-none fixed inset-0 z-50 overflow-hidden';
    capa.setAttribute('aria-hidden', 'true');
    document.body.appendChild(capa);

    const origenX = window.innerWidth / 2;
    const origenY = window.innerHeight * 0.45;

    for (let i = 0; i < cantidad; i++) {
        const pieza = document.createElement('span');
        const ancho = gsap.utils.random(6, 12);
        pieza.style.cssText =
            `position:absolute;left:${origenX}px;top:${origenY}px;width:${ancho}px;height:${ancho * gsap.utils.random(0.4, 1.6)}px;` +
            `background:${colores[i % colores.length]};border-radius:${Math.random() > 0.5 ? '50%' : '2px'}`;
        capa.appendChild(pieza);

        const angulo = gsap.utils.random(0, Math.PI * 2);
        const fuerza = gsap.utils.random(160, Math.min(window.innerWidth, 900) * 0.6);
        const dx = Math.cos(angulo) * fuerza;
        const dy = Math.sin(angulo) * fuerza - 160;

        gsap.timeline()
            .to(pieza, { x: dx, y: dy, rotation: gsap.utils.random(-540, 540), duration: 0.7, ease: 'power3.out' })
            .to(pieza, { y: dy + window.innerHeight, x: dx + gsap.utils.random(-80, 80), rotation: '+=360', duration: gsap.utils.random(1.6, 2.6), ease: 'power1.in' })
            .to(pieza, { opacity: 0, duration: 0.6 }, '-=0.6');
    }
    gsap.delayedCall(3.6, () => capa.remove());
}
