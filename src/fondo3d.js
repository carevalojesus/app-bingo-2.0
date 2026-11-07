// Fondo 3D: bolas de colores que flotan con profundidad y reaccionan a cada bola cantada.
import * as THREE from 'three';
import { gsap } from 'gsap';

export function crearFondo(canvas, colores, { reducirMovimiento = false } = {}) {
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const escena = new THREE.Scene();
    escena.fog = new THREE.Fog(0x070712, 8, 26);

    const camara = new THREE.PerspectiveCamera(55, 1, 0.1, 60);
    camara.position.z = 12;

    escena.add(new THREE.HemisphereLight(0xb9c3ff, 0x1a0b24, 1.4));
    const sol = new THREE.DirectionalLight(0xffffff, 2);
    sol.position.set(5, 8, 10);
    escena.add(sol);
    const destello = new THREE.PointLight(0xffffff, 0, 40);
    destello.position.set(0, 0, 6);
    escena.add(destello);

    const CANTIDAD = window.innerWidth < 640 ? 28 : 56;
    const malla = new THREE.InstancedMesh(
        new THREE.SphereGeometry(1, 32, 20),
        new THREE.MeshStandardMaterial({ roughness: 0.35, metalness: 0.1 }),
        CANTIDAD,
    );
    escena.add(malla);

    const bolas = Array.from({ length: CANTIDAD }, (_, i) => {
        malla.setColorAt(i, new THREE.Color(colores[i % colores.length]));
        return {
            posicion: new THREE.Vector3(
                THREE.MathUtils.randFloatSpread(30),
                THREE.MathUtils.randFloatSpread(20),
                THREE.MathUtils.randFloat(-14, 4),
            ),
            velocidad: THREE.MathUtils.randFloat(0.15, 0.5),
            tamano: THREE.MathUtils.randFloat(0.18, 0.6),
            fase: Math.random() * Math.PI * 2,
            giro: new THREE.Euler(Math.random() * 6, Math.random() * 6, 0),
        };
    });
    malla.instanceColor.needsUpdate = true;

    const estado = { energia: 0 };
    const raton = { x: 0, y: 0 };
    window.addEventListener('pointermove', (e) => {
        raton.x = (e.clientX / window.innerWidth) * 2 - 1;
        raton.y = (e.clientY / window.innerHeight) * 2 - 1;
    });

    function ajustarTamano() {
        renderer.setSize(window.innerWidth, window.innerHeight, false);
        camara.aspect = window.innerWidth / window.innerHeight;
        camara.updateProjectionMatrix();
    }
    window.addEventListener('resize', ajustarTamano);
    ajustarTamano();

    const ayudante = new THREE.Object3D();
    const reloj = new THREE.Clock();
    const ritmo = reducirMovimiento ? 0.25 : 1;

    renderer.setAnimationLoop(() => {
        const dt = Math.min(reloj.getDelta(), 0.05);
        const t = reloj.elapsedTime;
        const impulso = 1 + estado.energia * 6;

        bolas.forEach((b, i) => {
            b.posicion.y += b.velocidad * dt * impulso * ritmo;
            if (b.posicion.y > 11) b.posicion.y = -11; // reaparece abajo
            b.giro.x += dt * 0.3 * impulso * ritmo;
            b.giro.y += dt * 0.2 * ritmo;
            ayudante.position.set(
                b.posicion.x + Math.sin(t * 0.5 + b.fase) * 0.4,
                b.posicion.y,
                b.posicion.z,
            );
            ayudante.rotation.copy(b.giro);
            ayudante.scale.setScalar(b.tamano * (1 + estado.energia * 0.25));
            ayudante.updateMatrix();
            malla.setMatrixAt(i, ayudante.matrix);
        });
        malla.instanceMatrix.needsUpdate = true;

        // Paralaje suave con el ratón
        camara.position.x += (raton.x * 1.2 - camara.position.x) * 0.03;
        camara.position.y += (-raton.y * 0.8 - camara.position.y) * 0.03;
        camara.lookAt(0, 0, 0);

        renderer.render(escena, camara);
    });

    // Destello de color + aceleración momentánea al cantar una bola
    function pulso(color) {
        destello.color.set(color);
        gsap.fromTo(destello, { intensity: 260 }, { intensity: 0, duration: 1.6, ease: 'power2.out', overwrite: true });
        gsap.fromTo(estado, { energia: 1 }, { energia: 0, duration: 1.8, ease: 'power3.out', overwrite: true });
    }

    return { pulso };
}
