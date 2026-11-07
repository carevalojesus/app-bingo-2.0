// Bola de bingo 3D: esfera brillante con el número pintado en su textura.
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { gsap } from 'gsap';

const ANCHO = 1024;
const ALTO = 512;
const COLOR_INICIAL = '#2a2d4a';

export function crearBola(canvas, { reducirMovimiento = false } = {}) {
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const escena = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    escena.environment = pmrem.fromScene(new RoomEnvironment(renderer), 0.04).texture;

    const camara = new THREE.PerspectiveCamera(35, 1, 0.1, 50);
    camara.position.set(0, 0.15, 4.3);
    camara.lookAt(0, -0.05, 0);

    // Luces: principal + contraluz que toma el color de la letra
    const luzPrincipal = new THREE.DirectionalLight(0xffffff, 1.6);
    luzPrincipal.position.set(2.5, 3, 4);
    escena.add(luzPrincipal);
    const contraluz = new THREE.PointLight(new THREE.Color(COLOR_INICIAL), 25, 10);
    contraluz.position.set(-2.2, 1.2, -1.8);
    escena.add(contraluz);

    // Textura dibujada en un canvas 2D (proyección equirectangular)
    const lienzo = document.createElement('canvas');
    lienzo.width = ANCHO;
    lienzo.height = ALTO;
    const ctx = lienzo.getContext('2d');
    const textura = new THREE.CanvasTexture(lienzo);
    textura.colorSpace = THREE.SRGBColorSpace;
    textura.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const material = new THREE.MeshPhysicalMaterial({
        map: textura,
        roughness: 0.22,
        metalness: 0,
        clearcoat: 1,
        clearcoatRoughness: 0.08,
    });
    const grupo = new THREE.Group(); // flota suavemente (bucle de render)
    const bola = new THREE.Mesh(new THREE.SphereGeometry(1, 96, 64), material); // la anima GSAP
    grupo.add(bola);
    escena.add(grupo);

    // Sombra de contacto bajo la bola
    const sombra = new THREE.Mesh(
        new THREE.PlaneGeometry(2.6, 2.6),
        new THREE.MeshBasicMaterial({ map: texturaSombra(), transparent: true, depthWrite: false }),
    );
    sombra.rotation.x = -Math.PI / 2;
    sombra.position.y = -1.18;
    escena.add(sombra);

    function pintar({ letra = '', numero = '?', color = COLOR_INICIAL, textoOscuro = false } = {}) {
        // Fondo con un brillo vertical sutil
        const degradado = ctx.createLinearGradient(0, 0, 0, ALTO);
        degradado.addColorStop(0, aclarar(color, 0.25));
        degradado.addColorStop(0.5, color);
        degradado.addColorStop(1, aclarar(color, -0.35));
        ctx.fillStyle = degradado;
        ctx.fillRect(0, 0, ANCHO, ALTO);

        // Etiqueta blanca delante (u = 0.25) y otra detrás (u = 0.75)
        for (const [x, escala] of [[ANCHO * 0.25, 1], [ANCHO * 0.75, 0.75]]) {
            ctx.save();
            ctx.translate(x, ALTO / 2);
            ctx.scale(escala, escala);
            ctx.beginPath();
            ctx.arc(0, 0, 128, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.fill();
            ctx.lineWidth = 10;
            ctx.strokeStyle = textoOscuro ? '#1f2937' : color;
            ctx.stroke();

            ctx.fillStyle = '#111827';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            if (letra) {
                ctx.font = '52px "Patua One", serif';
                ctx.fillText(letra, 0, -62);
            }
            ctx.font = `${String(numero).length > 1 ? 120 : 140}px "Patua One", serif`;
            ctx.fillText(String(numero), 0, letra ? 22 : 6);
            ctx.restore();
        }
        textura.needsUpdate = true;
    }

    let visible = false;
    let lineaTiempo = null;

    function mostrar(info) {
        lineaTiempo?.progress(1);
        const destino = new THREE.Color(info.color);
        const factor = reducirMovimiento ? 0.4 : 1;
        lineaTiempo = gsap.timeline({ defaults: { overwrite: 'auto' } });

        if (visible) {
            // La bola anterior se hunde girando
            lineaTiempo
                .to(bola.position, { y: -2.8, duration: 0.35 * factor, ease: 'power2.in' })
                .to(bola.rotation, { x: -1.2, duration: 0.35 * factor, ease: 'power2.in' }, '<');
        }
        lineaTiempo
            .call(() => pintar(info))
            .set(bola.position, { y: 3.2 })
            .set(bola.rotation, { x: 0.9, y: -Math.PI * 4, z: 0.25 })
            .set(bola.scale, { x: 1, y: 1, z: 1 })
            .to(bola.position, { y: 0, duration: 1.1 * factor, ease: 'bounce.out' })
            .to(bola.rotation, { x: 0, y: 0, z: 0, duration: 1.5 * factor, ease: 'power3.out' }, '<')
            .to(contraluz.color, { r: destino.r, g: destino.g, b: destino.b, duration: 0.6 }, '<')
            // "Aplastado" al tocar el suelo
            .to(bola.scale, { x: 1.08, y: 0.9, z: 1.08, duration: 0.09, yoyo: true, repeat: 1, ease: 'power1.inOut' }, `<${0.4 * factor}`);
        visible = true;
        return lineaTiempo;
    }

    function reiniciar() {
        lineaTiempo?.kill();
        visible = false;
        gsap.to(bola.position, { y: 0, duration: 0.6, ease: 'power3.out' });
        gsap.to(bola.rotation, { x: 0, y: Math.PI * 2, z: 0, duration: 1, ease: 'power3.out', onComplete: () => { bola.rotation.y = 0; } });
        const c = new THREE.Color(COLOR_INICIAL);
        gsap.to(contraluz.color, { r: c.r, g: c.g, b: c.b, duration: 0.6 });
        pintar();
    }

    function ajustarTamano() {
        const { clientWidth: w, clientHeight: h } = canvas;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camara.aspect = w / h;
        camara.updateProjectionMatrix();
    }
    new ResizeObserver(ajustarTamano).observe(canvas);
    ajustarTamano();

    const reloj = new THREE.Clock();
    renderer.setAnimationLoop(() => {
        const t = reloj.getElapsedTime();
        if (!reducirMovimiento) {
            grupo.position.y = Math.sin(t * 1.6) * 0.05;
            grupo.rotation.z = Math.sin(t * 0.9) * 0.04;
            grupo.rotation.y = Math.sin(t * 0.7) * 0.12;
        }
        // La sombra se encoge y aclara cuando la bola sube
        const altura = Math.max(0, bola.position.y + grupo.position.y);
        const s = THREE.MathUtils.clamp(1 - altura * 0.25, 0.2, 1);
        sombra.scale.set(s, s, s);
        sombra.material.opacity = s * 0.85;
        renderer.render(escena, camara);
    });

    // Espera a que cargue la fuente antes de pintar la primera textura
    pintar();
    document.fonts?.load('52px "Patua One"').then(() => { if (!visible) pintar(); });

    return { mostrar, reiniciar };
}

function texturaSombra() {
    const c = document.createElement('canvas');
    c.width = c.height = 256;
    const g = c.getContext('2d');
    const r = g.createRadialGradient(128, 128, 0, 128, 128, 128);
    r.addColorStop(0, 'rgba(0,0,0,0.75)');
    r.addColorStop(0.45, 'rgba(0,0,0,0.3)');
    r.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = r;
    g.fillRect(0, 0, 256, 256);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
}

// Aclara (cantidad > 0) u oscurece (cantidad < 0) un color hex
function aclarar(hex, cantidad) {
    const c = new THREE.Color(hex);
    const destino = cantidad > 0 ? new THREE.Color('#ffffff') : new THREE.Color('#000000');
    return '#' + c.lerp(destino, Math.abs(cantidad)).getHexString();
}
