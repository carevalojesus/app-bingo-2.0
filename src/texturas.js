// Texturas de las bolas: el número se pinta en un canvas 2D con proyección
// equirectangular. La etiqueta delantera queda en u = 0.25 (mira hacia +Z).
import * as THREE from 'three';

const TINTA = '#14112b';

export function texturaBola({ numero, letra, color }, ancho = 256, renderer = null) {
    const alto = ancho / 2;
    const lienzo = document.createElement('canvas');
    lienzo.width = ancho;
    lienzo.height = alto;
    const ctx = lienzo.getContext('2d');
    const k = ancho / 1024; // escala respecto al diseño a 1024 px

    // Cuerpo de la bola con una franja más clara en el ecuador
    const degradado = ctx.createLinearGradient(0, 0, 0, alto);
    degradado.addColorStop(0, mezclar(color, '#000000', 0.25));
    degradado.addColorStop(0.5, color);
    degradado.addColorStop(1, mezclar(color, '#000000', 0.35));
    ctx.fillStyle = degradado;
    ctx.fillRect(0, 0, ancho, alto);

    // Dos etiquetas (delante y detrás) para que el número se vea al girar
    for (const x of [ancho * 0.25, ancho * 0.75]) {
        ctx.save();
        ctx.translate(x, alto / 2);
        ctx.beginPath();
        ctx.arc(0, 0, 132 * k, 0, Math.PI * 2);
        ctx.fillStyle = TINTA;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(0, 0, 116 * k, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        ctx.fillStyle = TINTA;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = `${46 * k}px Bungee, Impact, sans-serif`;
        ctx.fillText(letra, 0, -60 * k);
        ctx.font = `${(String(numero).length > 1 ? 104 : 124) * k}px Bungee, Impact, sans-serif`;
        ctx.fillText(String(numero), 0, 22 * k);
        ctx.restore();
    }

    const textura = new THREE.CanvasTexture(lienzo);
    textura.colorSpace = THREE.SRGBColorSpace;
    if (renderer) textura.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
    return textura;
}

// Punto redondo y suave para las chispas
export function texturaChispa() {
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const g = c.getContext('2d');
    const r = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    r.addColorStop(0, 'rgba(255,255,255,1)');
    r.addColorStop(0.35, 'rgba(255,255,255,0.8)');
    r.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = r;
    g.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(c);
}

function mezclar(a, b, t) {
    const c = new THREE.Color(a);
    c.lerp(new THREE.Color(b), t);
    return '#' + c.getHexString();
}
