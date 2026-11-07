// Animaciones de la interfaz: anuncio gigante de cada bola, celebración de
// ¡Bingo!, sellos y confeti.
import { gsap } from 'gsap';

const $ = (id) => document.getElementById(id);
const TINTA = '#14112b';

let tlAnuncio = null;

// Sacude la interfaz (no el canvas: la cámara 3D tiene su propia sacudida)
export function sacudirUI(fuerza = 14, reducirMovimiento = false) {
    if (reducirMovimiento) return;
    const mundo = $('mundo');
    gsap.killTweensOf(mundo);
    gsap.timeline()
        .to(mundo, { x: () => gsap.utils.random(-fuerza, fuerza), y: () => gsap.utils.random(-fuerza, fuerza), rotation: () => gsap.utils.random(-0.6, 0.6), duration: 0.05, repeat: 5, yoyo: true, ease: 'none' })
        .to(mundo, { x: 0, y: 0, rotation: 0, duration: 0.2, ease: 'elastic.out(1, 0.4)' });
}

export function anunciarBola({ letra, numero, color, textoClaro }, { ritmo = 1, reducirMovimiento = false } = {}) {
    tlAnuncio?.progress(1);
    const contenedor = $('anuncio');
    const franja = $('franja');
    const franjaTinta = $('franjaTinta');
    const letraEl = $('anuncioLetra');
    const numeroEl = $('anuncioNumero');

    letraEl.textContent = letra;
    letraEl.style.background = color;
    letraEl.style.color = textoClaro ? '#fff3df' : TINTA;
    numeroEl.innerHTML = String(numero).split('').map((d) => `<span class="inline-block">${d}</span>`).join('');
    const digitos = numeroEl.children;
    const f = reducirMovimiento ? 0.5 : ritmo;

    const tl = gsap.timeline();
    tlAnuncio = tl;
    tl.set(contenedor, { display: 'block' })
        .set([franja, franjaTinta], { skewY: -7, backgroundColor: (i) => (i === 0 ? color : TINTA) })
        .fromTo(franjaTinta, { scaleX: 0, transformOrigin: '0% 50%' }, { scaleX: 1, duration: 0.3 * f, ease: 'expo.out' })
        .fromTo(franja, { scaleX: 0, transformOrigin: '0% 50%' }, { scaleX: 1, duration: 0.3 * f, ease: 'expo.out' }, `<${0.06 * f}`)
        .fromTo(letraEl,
            { scale: 4, rotation: -50, autoAlpha: 0 },
            { scale: 1, rotation: -8, autoAlpha: 1, duration: 0.4 * f, ease: 'expo.out' }, `<${0.05 * f}`)
        .call(() => sacudirUI(16, reducirMovimiento))
        .fromTo(digitos,
            { yPercent: 140, rotation: 25, autoAlpha: 0, scale: 0.6 },
            { yPercent: 0, rotation: 0, autoAlpha: 1, scale: 1, duration: 0.5 * f, ease: 'back.out(2.4)', stagger: 0.08 * f }, `<${0.04 * f}`)
        // Respiración mientras se lee
        .to(letraEl, { rotation: -3, scale: 1.06, duration: 0.35 * f, ease: 'sine.inOut', yoyo: true, repeat: 1 })
        .to(digitos, { y: -10, duration: 0.35 * f, ease: 'sine.inOut', yoyo: true, repeat: 1, stagger: 0.05 }, '<')
        // Salida: todo se va de golpe hacia la derecha
        .to([letraEl, numeroEl], { xPercent: 160, skewX: -20, autoAlpha: 0, duration: 0.3 * f, ease: 'power3.in', stagger: 0.04 })
        .to([franja, franjaTinta], { scaleX: 0, transformOrigin: '100% 50%', duration: 0.3 * f, ease: 'expo.in', stagger: 0.04 }, '<0.08')
        .set([letraEl, numeroEl], { clearProps: 'transform,opacity,visibility' })
        .set(contenedor, { display: 'none' });
    return tl;
}

// Fichas B-I-N-G-O que caen rebotando + destello + confeti
let tlFlotar = null;
export function celebrarBingo({ colores, reducirMovimiento = false }) {
    const fichas = document.querySelectorAll('#tituloBingo .letra-bingo');
    const caja = document.querySelector('#modalBingo .modal-caja');
    const tl = gsap.timeline();
    tlFlotar?.kill();

    tl.fromTo('#flash', { opacity: 0.95 }, { opacity: 0, duration: 0.7, ease: 'power2.out' }, 0)
        .fromTo(fichas,
            { y: () => -window.innerHeight, rotation: () => gsap.utils.random(-120, 120), scale: 1.3 },
            { y: 0, rotation: (i, el) => Number(el.dataset.rot), scale: 1, duration: 1, ease: 'bounce.out', stagger: 0.12 }, 0.1)
        .fromTo(caja, { yPercent: 140, rotation: 6 }, { yPercent: 0, rotation: 0, duration: 0.8, ease: 'back.out(1.4)' }, 0.75);
    fichas.forEach((_, i) => tl.call(() => sacudirUI(10, reducirMovimiento), null, 0.1 + i * 0.12 + 0.36));
    tl.call(() => confeti(colores, { cantidad: reducirMovimiento ? 40 : 110 }), null, 0.2)
        .call(() => confeti(colores, { cantidad: reducirMovimiento ? 0 : 90 }), null, 1.1)
        .call(() => {
            if (reducirMovimiento) return;
            tlFlotar = gsap.to(fichas, {
                y: -14, rotation: (i, el) => Number(el.dataset.rot) * -1, duration: 0.7, ease: 'sine.inOut',
                yoyo: true, repeat: -1, stagger: { each: 0.12, yoyo: true, repeat: -1 },
            });
        }, null, 1.8);
    return tl;
}

export function detenerCelebracion() {
    tlFlotar?.kill();
    tlFlotar = null;
}

// Sello de goma que se estampa sobre la tarjeta
export function estampar(el, { texto, fondo, color = TINTA }, reducirMovimiento = false) {
    el.textContent = texto;
    el.style.background = fondo;
    el.style.color = color;
    el.style.borderColor = TINTA;
    el.classList.remove('hidden');
    gsap.fromTo(el,
        { scale: 3.5, rotation: -35, autoAlpha: 0 },
        {
            scale: 1, rotation: -12, autoAlpha: 1, duration: 0.42, ease: 'power4.in',
            onComplete: () => {
                sacudirUI(12, reducirMovimiento);
                gsap.fromTo(el, { scale: 0.92 }, { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.4)' });
            },
        });
}

// Confeti con borde de tinta disparado desde las dos esquinas de abajo
export function confeti(colores, { cantidad = 100 } = {}) {
    if (!cantidad) return;
    const capa = document.createElement('div');
    capa.className = 'pointer-events-none fixed inset-0 z-[55] overflow-hidden';
    capa.setAttribute('aria-hidden', 'true');
    document.body.appendChild(capa);

    const W = window.innerWidth;
    const H = window.innerHeight;
    const formas = ['50%', '3px', 'triangulo'];

    for (let i = 0; i < cantidad; i++) {
        const izquierda = i % 2 === 0;
        const pieza = document.createElement('span');
        const tam = gsap.utils.random(10, 18);
        const forma = formas[i % formas.length];
        const color = colores[i % colores.length];
        pieza.style.cssText =
            `position:absolute;left:${izquierda ? -10 : W + 10}px;top:${H + 10}px;width:${tam}px;height:${tam * (forma === '3px' ? 0.6 : 1)}px;` +
            (forma === 'triangulo'
                ? `background:${color};clip-path:polygon(50% 0,100% 100%,0 100%);`
                : `background:${color};border:2.5px solid ${TINTA};border-radius:${forma};`);
        capa.appendChild(pieza);

        const alcance = gsap.utils.random(0.25, 0.85) * W;
        const altura = gsap.utils.random(0.45, 0.95) * H;
        const subida = gsap.utils.random(0.55, 0.85);
        const caida = gsap.utils.random(1.4, 2.4);
        const dx = izquierda ? alcance : -alcance;
        const retraso = gsap.utils.random(0, 0.25);

        gsap.to(pieza, { x: dx, duration: subida + caida, ease: 'none', delay: retraso });
        gsap.to(pieza, { rotation: gsap.utils.random(-900, 900), duration: subida + caida, ease: 'none', delay: retraso });
        gsap.timeline({ delay: retraso })
            .to(pieza, { y: -altura, duration: subida, ease: 'power2.out' })
            .to(pieza, { y: H * 0.3, duration: caida, ease: 'power1.in' })
            .to(pieza, { opacity: 0, duration: 0.4 }, '-=0.4');
        gsap.to(pieza, { scaleY: -1, duration: gsap.utils.random(0.15, 0.35), repeat: -1, yoyo: true, ease: 'sine.inOut' });
    }
    gsap.delayedCall(3.6, () => {
        gsap.killTweensOf(capa.children);
        capa.remove();
    });
}
