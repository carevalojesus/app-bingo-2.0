// Escenario 3D del show: bombo dorado con las 75 bolas (con física), arco de
// bombillas, focos que barren el escenario, chispas y postprocesado con brillo.
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { gsap } from 'gsap';
import { texturaBola, texturaChispa } from './texturas.js';

const R = 2;          // radio interior del bombo
const RJ = R + 0.07;  // radio de la jaula
const r = 0.2;        // radio de cada bola
// Paletas soldadas por dentro de la jaula: suben las bolas y las sueltan en cascada
const PALETAS = 4;
const ALTO_PALETA = 0.4;                      // lo que sobresale de la pared (≈ una bola)
const Z_PALETA = 1.45;                        // no llegan a los polos, donde está el eje
const ESPESOR_PALETA = 0.03;
// Escala: 1 unidad = 10 cm (bola de 4 cm de diámetro en un bombo de 40 cm), así que la
// gravedad real son 98 u/s². El bombo voltea las bolas por debajo de ω = √(g/R) ≈ 7 rad/s;
// por encima las pega a la pared como una centrifugadora.
const GRAVEDAD = 98;
const GIRO_REPOSO = 1.0;   // ~0,16 vueltas/s: las paletas suben unas pocas bolas y el resto rueda
const GIRO_SORTEO = 6.8;   // cerca del crítico: las bolas voltean y rebotan con fuerza
const GIRO_FIESTA = 8.5;   // por encima del crítico, solo un momento en la celebración
const SUELO = -3.05;
const TARIMA_BAJA = -2.8;    // altura del escalón de abajo
const TARIMA_ALTA = -2.55;   // altura del escalón de arriba (donde se apoya el pedestal)
const R_TARIMA_ALTA = 2.5;
const R_TARIMA_BAJA = 3.3;
const R_BOMBILLAS = 2.95;    // aro de bombillas sobre el escalón de abajo
const FONDO = '#1a0d36';
const ANCHO_PIZARRA = 424; // px que ocupa la pizarra en escritorio

const V = () => new THREE.Vector3();
const EJE_Y = new THREE.Vector3(0, 1, 0);

export function crearEscenario(canvas, { columnaDe, colores, reducirMovimiento = false }) {
    // ---------- Render ----------
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
    const dpr = Math.min(window.devicePixelRatio, 1.75);
    renderer.setPixelRatio(dpr);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.85;

    const escena = new THREE.Scene();
    escena.background = new THREE.Color(FONDO);
    escena.fog = new THREE.Fog(FONDO, 16, 36);
    const pmrem = new THREE.PMREMGenerator(renderer);
    escena.environment = pmrem.fromScene(new RoomEnvironment(renderer), 0.04).texture;

    const camara = new THREE.PerspectiveCamera(38, 1, 0.1, 90);

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(escena, camara));
    const bloom = new UnrealBloomPass(new THREE.Vector2(256, 256), 0.55, 0.4, 0.92);
    composer.addPass(bloom);
    composer.addPass(new OutputPass());

    // ---------- Estado animable ----------
    const bombo = { omega: 0, angulo: 0 };
    const cam = { ang: 0.42, alt: 2.2, factor: 1, distBase: 15, mx: 0, my: 0.35, mz: 0, sacudida: 0 };
    const luces = { modo: 'apagado', velocidad: 6, destello: 0, color: new THREE.Color('#ffc43d') };
    const focos = { enfoque: 0, intensidad: 0, velocidad: 1 };

    // ---------- Luces ----------
    const clave = new THREE.DirectionalLight('#ffe7c4', 1.5);
    clave.position.set(4, 8, 7);
    escena.add(clave);
    const rimA = new THREE.PointLight('#ff4fa3', 28, 24);
    rimA.position.set(-6, 3, -3);
    const rimB = new THREE.PointLight('#3d6bff', 28, 24);
    rimB.position.set(6, 2, -3);
    const luzColor = new THREE.PointLight('#ffffff', 0, 16);
    luzColor.position.set(0, 1.5, 4);
    escena.add(rimA, rimB, luzColor);

    // ---------- Materiales ----------
    const oro = new THREE.MeshStandardMaterial({ color: '#e9a93a', metalness: 1, roughness: 0.3, envMapIntensity: 0.7 });
    const laca = new THREE.MeshStandardMaterial({ color: '#c8193b', metalness: 0.1, roughness: 0.35, envMapIntensity: 0.5 });
    const tarima = new THREE.MeshStandardMaterial({ color: '#241455', metalness: 0.2, roughness: 0.5, envMapIntensity: 0.25 });

    // ---------- Bombo ----------
    const jaula = new THREE.Group();
    escena.add(jaula);
    for (let k = 0; k < 6; k++) {
        const meridiano = new THREE.Mesh(new THREE.TorusGeometry(RJ, 0.035, 8, 120), oro);
        meridiano.rotation.order = 'ZYX';
        meridiano.rotation.set(0, Math.PI / 2, (k * Math.PI) / 6);
        jaula.add(meridiano);
    }
    for (const z of [-1.5, -0.8, 0.8, 1.5]) {
        const paralelo = new THREE.Mesh(new THREE.TorusGeometry(Math.sqrt(RJ * RJ - z * z), 0.03, 8, 100), oro);
        paralelo.position.z = z;
        jaula.add(paralelo);
    }
    jaula.add(new THREE.Mesh(new THREE.TorusGeometry(RJ, 0.06, 10, 140), oro)); // ecuador
    for (const z of [-RJ, RJ]) {
        const tapa = new THREE.Mesh(new THREE.SphereGeometry(0.17, 20, 14), oro);
        tapa.position.z = z;
        jaula.add(tapa);
    }
    // Paletas: tiras curvas en planos que contienen el eje (giran con la jaula)
    const arcoPaleta = Math.asin(Z_PALETA / R);
    for (let k = 0; k < PALETAS; k++) {
        const paleta = new THREE.Mesh(
            new THREE.RingGeometry(R - ALTO_PALETA, R + 0.02, 48, 1, -arcoPaleta, 2 * arcoPaleta),
            new THREE.MeshStandardMaterial({ color: '#e9a93a', metalness: 1, roughness: 0.35, envMapIntensity: 0.7, side: THREE.DoubleSide }),
        );
        paleta.rotation.order = 'ZYX'; // primero se pone vertical (X), luego se orienta (Z)
        paleta.rotation.set(Math.PI / 2, 0, (k * Math.PI * 2) / PALETAS + Math.PI / PALETAS);
        jaula.add(paleta);
    }

    const cristal = new THREE.Mesh(
        new THREE.SphereGeometry(R + 0.02, 48, 32),
        new THREE.MeshPhysicalMaterial({ color: '#ffffff', roughness: 0.04, transparent: true, opacity: 0.04, clearcoat: 1, depthWrite: false, envMapIntensity: 0.6 }),
    );
    escena.add(cristal);

    // Eje y soporte trasero
    const eje = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 1.7, 16), oro);
    eje.rotation.x = Math.PI / 2;
    eje.position.z = -(RJ + 0.85);
    const poste = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.24, -TARIMA_BAJA, 20), laca);
    poste.position.set(0, TARIMA_BAJA / 2, -(RJ + 1.7));
    const remate = new THREE.Mesh(new THREE.SphereGeometry(0.22, 20, 14), oro);
    remate.position.set(0, 0, -(RJ + 1.7));
    escena.add(eje, poste, remate);

    // Tarima de dos escalones: neón en el borde del de arriba, bombillas en el de abajo
    const escalonBajo = new THREE.Mesh(new THREE.CylinderGeometry(R_TARIMA_BAJA, R_TARIMA_BAJA + 0.15, TARIMA_BAJA - SUELO, 72), tarima);
    escalonBajo.position.y = (TARIMA_BAJA + SUELO) / 2;
    const escalonAlto = new THREE.Mesh(new THREE.CylinderGeometry(R_TARIMA_ALTA, R_TARIMA_ALTA + 0.1, TARIMA_ALTA - TARIMA_BAJA, 72), tarima);
    escalonAlto.position.y = (TARIMA_ALTA + TARIMA_BAJA) / 2;
    const neon = new THREE.Mesh(
        new THREE.TorusGeometry(R_TARIMA_ALTA, 0.05, 8, 160),
        new THREE.MeshBasicMaterial({ color: new THREE.Color('#ffc43d').multiplyScalar(1.6) }),
    );
    neon.rotation.x = Math.PI / 2;
    neon.position.y = TARIMA_ALTA;
    const suelo = new THREE.Mesh(
        new THREE.CircleGeometry(45, 64),
        new THREE.MeshStandardMaterial({ color: '#180c36', roughness: 0.8, envMapIntensity: 0.12 }),
    );
    suelo.rotation.x = -Math.PI / 2;
    suelo.position.y = SUELO;
    escena.add(escalonBajo, escalonAlto, neon, suelo);

    // Pedestal: columna sobre la tarima y una cuna dorada que recoge el bombo por debajo.
    // La cuna queda fuera de la esfera de la jaula, así que no estorba al girar.
    const Y_CUNA = -1.35;
    const R_CUNA = Math.sqrt(RJ * RJ - Y_CUNA * Y_CUNA) + 0.12;
    const Y_COLUMNA = -2.3;
    const columna = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.62, Y_COLUMNA - TARIMA_ALTA, 28), laca);
    columna.position.y = (Y_COLUMNA + TARIMA_ALTA) / 2;
    const collarin = new THREE.Mesh(new THREE.TorusGeometry(0.45, 0.06, 10, 40), oro);
    collarin.rotation.x = Math.PI / 2;
    collarin.position.y = Y_COLUMNA;
    const basePedestal = new THREE.Mesh(new THREE.TorusGeometry(0.64, 0.06, 10, 40), oro);
    basePedestal.rotation.x = Math.PI / 2;
    basePedestal.position.y = TARIMA_ALTA + 0.03;
    const cuna = new THREE.Mesh(new THREE.TorusGeometry(R_CUNA, 0.06, 10, 120), oro);
    cuna.rotation.x = Math.PI / 2;
    cuna.position.y = Y_CUNA;
    escena.add(columna, collarin, basePedestal, cuna);
    const desde = V(), hasta = V();
    for (let k = 0; k < 4; k++) {
        const a = (k * Math.PI) / 2 + Math.PI / 4;
        desde.set(Math.cos(a) * 0.5, Y_COLUMNA, Math.sin(a) * 0.5);
        hasta.set(Math.cos(a) * R_CUNA, Y_CUNA, Math.sin(a) * R_CUNA);
        const largo = desde.distanceTo(hasta);
        const brazo = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, largo, 10), oro);
        brazo.position.copy(desde).add(hasta).multiplyScalar(0.5);
        brazo.quaternion.setFromUnitVectors(EJE_Y, hasta.clone().sub(desde).normalize());
        escena.add(brazo);
    }

    // Marquesina detrás del bombo: dos patas apoyadas en el suelo y un
    // semicírculo arriba, simétrica y centrada, con bombillas en todo el contorno.
    const ARCO_R = 4.5;            // radio del semicírculo
    const ARCO_Y = 0.1;          // altura donde empieza la curva
    const ARCO_Z = -4.3;         // detrás del poste del bombo
    const GROSOR = 0.24;
    const largoPata = ARCO_Y - SUELO;
    const curva = new THREE.Mesh(new THREE.TorusGeometry(ARCO_R, GROSOR, 14, 90, Math.PI), laca);
    curva.position.set(0, ARCO_Y, ARCO_Z);
    escena.add(curva);
    for (const lado of [-1, 1]) {
        const pata = new THREE.Mesh(new THREE.CylinderGeometry(GROSOR, GROSOR, largoPata, 14), laca);
        pata.position.set(lado * ARCO_R, SUELO + largoPata / 2, ARCO_Z);
        const anillo = new THREE.Mesh(new THREE.TorusGeometry(GROSOR + 0.02, 0.05, 8, 24), oro);
        anillo.rotation.x = Math.PI / 2;
        anillo.position.set(lado * ARCO_R, ARCO_Y, ARCO_Z);
        const pie = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.52, 0.32, 24), oro);
        pie.position.set(lado * ARCO_R, SUELO + 0.16, ARCO_Z);
        escena.add(pata, anillo, pie);
    }

    // ---------- Bombillas (instanciadas) ----------
    // Repartidas a distancias iguales por pata izquierda → curva → pata derecha
    const posicionesBombillas = [];
    const N_ARCO = 52;
    const inicioPata = SUELO + 0.5;
    const tramoPata = ARCO_Y - inicioPata;
    const tramoCurva = Math.PI * ARCO_R;
    const total = 2 * tramoPata + tramoCurva;
    const zBombilla = ARCO_Z + GROSOR + 0.04;
    for (let i = 0; i < N_ARCO; i++) {
        const s = (total * i) / (N_ARCO - 1);
        if (s <= tramoPata) {
            posicionesBombillas.push(new THREE.Vector3(-ARCO_R, inicioPata + s, zBombilla));
        } else if (s <= tramoPata + tramoCurva) {
            const a = Math.PI - (s - tramoPata) / ARCO_R;
            posicionesBombillas.push(new THREE.Vector3(Math.cos(a) * ARCO_R, ARCO_Y + Math.sin(a) * ARCO_R, zBombilla));
        } else {
            posicionesBombillas.push(new THREE.Vector3(ARCO_R, ARCO_Y + tramoPata + tramoCurva - s, zBombilla));
        }
    }
    const N_ARO = 44;
    for (let i = 0; i < N_ARO; i++) {
        const a = (i / N_ARO) * Math.PI * 2;
        posicionesBombillas.push(new THREE.Vector3(Math.cos(a) * R_BOMBILLAS, TARIMA_BAJA + 0.07, Math.sin(a) * R_BOMBILLAS));
    }
    const bombillas = new THREE.InstancedMesh(
        new THREE.SphereGeometry(0.1, 12, 8),
        new THREE.MeshBasicMaterial({ color: '#ffffff' }),
        posicionesBombillas.length,
    );
    const ayudante = new THREE.Object3D();
    posicionesBombillas.forEach((p, i) => {
        ayudante.position.copy(p);
        ayudante.updateMatrix();
        bombillas.setMatrixAt(i, ayudante.matrix);
        bombillas.setColorAt(i, new THREE.Color(0, 0, 0));
    });
    escena.add(bombillas);
    const coloresLuz = colores.map((c) => new THREE.Color(c));
    const colorTmp = new THREE.Color();
    const colorMarquesina = new THREE.Color('#ffd98a');

    // ---------- Focos (haces de luz volumétricos falsos) ----------
    const haces = [-6.5, -2.4, 2.4, 6.5].map((x, i) => {
        const largo = 16;
        const geo = new THREE.ConeGeometry(1.4, largo, 40, 1, true);
        geo.translate(0, -largo / 2, 0);
        const mat = new THREE.ShaderMaterial({
            uniforms: { uColor: { value: new THREE.Color(colores[(i + 1) % colores.length]) }, uOpacidad: { value: 0 } },
            vertexShader: /* glsl */`
                varying vec3 vN; varying vec3 vV; varying float vH;
                void main() {
                    vec4 mv = modelViewMatrix * vec4(position, 1.0);
                    vN = normalize(normalMatrix * normal);
                    vV = normalize(-mv.xyz);
                    vH = uv.y;
                    gl_Position = projectionMatrix * mv;
                }`,
            fragmentShader: /* glsl */`
                uniform vec3 uColor; uniform float uOpacidad;
                varying vec3 vN; varying vec3 vV; varying float vH;
                void main() {
                    float borde = pow(abs(dot(normalize(vN), normalize(vV))), 1.8);
                    float a = borde * pow(vH, 1.3) * uOpacidad;
                    gl_FragColor = vec4(uColor, a);
                }`,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            side: THREE.DoubleSide,
        });
        const cono = new THREE.Mesh(geo, mat);
        const pivote = new THREE.Group();
        pivote.position.set(x, 10, -1.2);
        pivote.add(cono);
        escena.add(pivote);
        return { pivote, mat, base: Math.atan2(-x, 10), fase: i * 1.7 };
    });

    // ---------- Bolas ----------
    const geoBola = new THREE.SphereGeometry(r, 28, 18);
    const bolas = [];
    const porNumero = new Map();
    for (let n = 1; n <= 75; n++) {
        const info = { ...columnaDe(n), numero: n };
        const textura = texturaBola(info, 256, renderer);
        const mesh = new THREE.Mesh(geoBola, new THREE.MeshPhysicalMaterial({
            map: textura, roughness: 0.25, clearcoat: 1, clearcoatRoughness: 0.1, envMapIntensity: 0.55,
        }));
        mesh.visible = false;
        mesh.quaternion.setFromEuler(new THREE.Euler(Math.random() * 6, Math.random() * 6, Math.random() * 6));
        escena.add(mesh);
        const bola = { n, info, mesh, textura, p: V(), v: V(), w: V(), estado: 'fuera' };
        bolas.push(bola);
        porNumero.set(n, bola);
    }

    // ---------- Chispas ----------
    const MAX_CHISPAS = 600;
    const chispas = Array.from({ length: MAX_CHISPAS }, () => ({ p: V(), v: V(), vida: 0, max: 1, color: new THREE.Color() }));
    const geoChispas = new THREE.BufferGeometry();
    const posChispas = new Float32Array(MAX_CHISPAS * 3);
    const colChispas = new Float32Array(MAX_CHISPAS * 3);
    geoChispas.setAttribute('position', new THREE.BufferAttribute(posChispas, 3));
    geoChispas.setAttribute('color', new THREE.BufferAttribute(colChispas, 3));
    const puntos = new THREE.Points(geoChispas, new THREE.PointsMaterial({
        size: 0.22, map: texturaChispa(), vertexColors: true, transparent: true,
        depthWrite: false, blending: THREE.AdditiveBlending,
    }));
    puntos.frustumCulled = false;
    escena.add(puntos);
    let siguienteChispa = 0;

    function emitirChispas(origen, color, cantidad = 120, fuerza = 6) {
        const c = new THREE.Color(color);
        for (let i = 0; i < cantidad; i++) {
            const s = chispas[siguienteChispa];
            siguienteChispa = (siguienteChispa + 1) % MAX_CHISPAS;
            s.p.copy(origen);
            s.v.set(Math.random() - 0.5, Math.random() - 0.3, Math.random() - 0.5).normalize()
                .multiplyScalar(fuerza * (0.35 + Math.random() * 0.65));
            s.max = s.vida = 0.7 + Math.random() * 0.9;
            s.color.copy(Math.random() < 0.25 ? new THREE.Color('#fff3df') : c).multiplyScalar(2.2);
        }
    }

    // ---------- Física de las bolas dentro del bombo ----------
    // Esferas rígidas (m = 1, I = 2/5·m·r²) resueltas con impulsos: rebote con restitución y
    // rozamiento de Coulomb en el punto de contacto, que es lo que las hace rodar y girar.
    // Pasos fijos de 1/240 s para que el resultado no dependa de los fps.
    const PASO = 1 / 240;
    const ITERACIONES = 2;
    const REBOTE_BOLAS = 0.6;   // bolas de plástico duro
    const REBOTE_PARED = 0.4;   // jaula de alambre
    const ROCE_BOLAS = 0.15;
    const ROCE_PARED = 0.4;
    const INV_INERCIA = 5 / (2 * r * r);
    const VEL_MAX = 45;
    // Los 6 meridianos de alambre forman 12 varillas (cada π/6) que actúan como paletas:
    // son las que suben las bolas por la pared, igual que en un bombo real.
    const VARILLAS = 12;
    const GROSOR_ALAMBRE = 0.1; // efectivo: incluye los cruces con los paralelos
    const REBOTE_VARILLA = 0.3;
    const REBOTE_PALETA = 0.35;
    const ROCE_PALETA = 0.35;
    const cercano = V();
    let acumulado = 0;

    const tmpA = V();
    const tmpB = V();
    const normal = V();
    const opuesta = V();
    const relativa = V();
    const tangente = V();
    const impulso = V();
    const brazo = V();
    const velA = V();
    const velB = V();
    const pared = V();

    // Velocidad del punto de la superficie de la bola en la dirección `dir`: v + ω × (r·dir)
    function velocidadEn(b, dir, destino) {
        return destino.crossVectors(b.w, brazo.copy(dir).multiplyScalar(r)).add(b.v);
    }
    // Impulso J aplicado en el punto r·dir de la bola: cambia su velocidad y su giro
    function aplicar(b, dir, J) {
        b.v.add(J);
        b.w.addScaledVector(brazo.copy(dir).multiplyScalar(r).cross(J), INV_INERCIA);
    }

    function choqueBolas(a, b) {
        normal.subVectors(b.p, a.p);
        const d2 = normal.lengthSq();
        const minimo = 2 * r;
        if (d2 >= minimo * minimo || d2 === 0) return;
        const d = Math.sqrt(d2);
        normal.divideScalar(d);
        opuesta.copy(normal).negate();
        // Separación (con un poco de holgura para que las pilas no tiemblen)
        const correccion = Math.max(0, minimo - d - 0.002) * 0.5;
        a.p.addScaledVector(normal, -correccion);
        b.p.addScaledVector(normal, correccion);

        relativa.subVectors(velocidadEn(b, opuesta, velB), velocidadEn(a, normal, velA));
        const vn = relativa.dot(normal);
        if (vn >= 0) return;
        const e = vn < -1 ? REBOTE_BOLAS : 0;
        const jn = (-(1 + e) * vn) / 2;
        impulso.copy(normal).multiplyScalar(jn);
        // Rozamiento: anula el deslizamiento hasta el límite de Coulomb (μ·jn)
        tangente.copy(relativa).addScaledVector(normal, -vn);
        const desliz = tangente.length();
        if (desliz > 1e-6) {
            const jt = Math.min(desliz / 7, ROCE_BOLAS * jn); // masa efectiva tangencial: 1/(2·(1 + r²/I))
            impulso.addScaledVector(tangente, -jt / desliz);
        }
        aplicar(b, opuesta, impulso);
        aplicar(a, normal, impulso.negate());
    }

    function choquePared(b, w) {
        const limite = R - r;
        const len = b.p.length();
        if (len <= limite) return;
        normal.copy(b.p).divideScalar(len);
        b.p.copy(normal).multiplyScalar(limite);
        // Velocidad de la jaula en el punto de contacto: ω ẑ × (R·n)
        pared.set(-w * R * normal.y, w * R * normal.x, 0);
        relativa.subVectors(velocidadEn(b, normal, velA), pared);
        const vn = relativa.dot(normal);
        if (vn <= 0) return;
        const e = vn > 1 ? REBOTE_PARED : 0;
        const jn = (1 + e) * vn;
        impulso.copy(normal).multiplyScalar(-jn);
        tangente.copy(relativa).addScaledVector(normal, -vn);
        const desliz = tangente.length();
        if (desliz > 1e-6) {
            const jt = Math.min(desliz / 3.5, ROCE_PARED * jn); // 1/(1 + r²/I) con la pared fija
            impulso.addScaledVector(tangente, -jt / desliz);
        }
        aplicar(b, normal, impulso);
        choqueVarilla(b, w);
    }

    // Choque esfera–paleta: punto de la paleta más cercano al centro de la bola (cara o borde)
    function choquePaletas(b, w) {
        for (let k = 0; k < PALETAS; k++) {
            const angulo = bombo.angulo + (k * Math.PI * 2) / PALETAS + Math.PI / PALETAS;
            const ux = Math.cos(angulo);
            const uy = Math.sin(angulo);
            // Coordenadas de la bola en el plano de la paleta: s (hacia fuera) y z (a lo largo del eje)
            let sP = b.p.x * ux + b.p.y * uy;
            if (sP < -r) continue; // está en el otro semiplano
            let zP = Math.max(-Z_PALETA, Math.min(Z_PALETA, b.p.z));
            sP = Math.max(0, sP);
            const rho = Math.hypot(sP, zP);
            if (rho < 1e-6) continue;
            const radio = Math.max(R - ALTO_PALETA, Math.min(R, rho));
            sP *= radio / rho;
            zP *= radio / rho;
            cercano.set(sP * ux, sP * uy, zP);

            normal.subVectors(b.p, cercano);
            const d = normal.length();
            const minimo = r + ESPESOR_PALETA / 2;
            if (d >= minimo || d === 0) continue;
            normal.divideScalar(d);
            b.p.addScaledVector(normal, minimo - d);

            pared.set(-w * cercano.y, w * cercano.x, 0); // velocidad de la paleta en ese punto
            opuesta.copy(normal).negate();
            relativa.subVectors(velocidadEn(b, opuesta, velA), pared);
            const vn = relativa.dot(normal);
            if (vn >= 0) continue;
            const e = vn < -1 ? REBOTE_PALETA : 0;
            const jn = -(1 + e) * vn;
            impulso.copy(normal).multiplyScalar(jn);
            tangente.copy(relativa).addScaledVector(normal, -vn);
            const desliz = tangente.length();
            if (desliz > 1e-6) impulso.addScaledVector(tangente, -Math.min(desliz / 3.5, ROCE_PALETA * jn) / desliz);
            aplicar(b, opuesta, impulso);
        }
    }

    // Choque esfera–alambre con el meridiano más cercano. La normal va del alambre al centro de la
    // bola: casi radial y solo un poco de lado, así que el alambre arrastra la bola mientras la
    // pared está poco inclinada y, más arriba, la gravedad la hace rodar por encima. Por eso
    // a poca velocidad las bolas solo ruedan por el fondo y a mucha suben y caen en cascada.
    function choqueVarilla(b, w) {
        const separacion = (Math.PI * 2) / VARILLAS;
        const k = Math.round((Math.atan2(b.p.y, b.p.x) - bombo.angulo) / separacion);
        const angulo = bombo.angulo + k * separacion;
        const nx = -Math.sin(angulo);
        const ny = Math.cos(angulo);
        const lateral = b.p.x * nx + b.p.y * ny; // distancia al plano del meridiano
        const px = b.p.x - lateral * nx;
        const py = b.p.y - lateral * ny;
        const largo = Math.hypot(px, py, b.p.z);
        if (largo < 1e-6) return;
        // Punto del alambre más cercano (el meridiano es un círculo de radio R en ese plano)
        const wx = (px / largo) * R;
        const wy = (py / largo) * R;
        const wz = (b.p.z / largo) * R;
        normal.set(b.p.x - wx, b.p.y - wy, b.p.z - wz);
        const d = normal.length();
        const minimo = r + GROSOR_ALAMBRE;
        if (d >= minimo || d === 0) return;
        normal.divideScalar(d);
        b.p.addScaledVector(normal, minimo - d);

        pared.set(-w * wy, w * wx, 0); // velocidad del alambre: ω ẑ × W
        opuesta.copy(normal).negate(); // punto de la bola que toca el alambre
        relativa.subVectors(velocidadEn(b, opuesta, velA), pared);
        const vn = relativa.dot(normal);
        if (vn >= 0) return;
        const e = vn < -1 ? REBOTE_VARILLA : 0;
        const jn = -(1 + e) * vn;
        impulso.copy(normal).multiplyScalar(jn);
        tangente.copy(relativa).addScaledVector(normal, -vn);
        const desliz = tangente.length();
        if (desliz > 1e-6) impulso.addScaledVector(tangente, -Math.min(desliz / 3.5, ROCE_PARED * jn) / desliz);
        aplicar(b, opuesta, impulso);
    }

    function pasoFisica(dt, activas) {
        const w = bombo.omega;
        const frenoLineal = 1 - 0.05 * dt;
        const frenoGiro = 1 - 0.8 * dt; // resistencia a la rodadura
        for (const b of activas) {
            b.v.y -= GRAVEDAD * dt;
            b.v.multiplyScalar(frenoLineal);
            if (b.v.lengthSq() > VEL_MAX * VEL_MAX) b.v.setLength(VEL_MAX);
            b.w.multiplyScalar(frenoGiro);
            b.p.addScaledVector(b.v, dt);
        }
        for (let k = 0; k < ITERACIONES; k++) {
            for (let i = 0; i < activas.length; i++) {
                for (let j = i + 1; j < activas.length; j++) choqueBolas(activas[i], activas[j]);
            }
            for (const b of activas) {
                choquePaletas(b, w);
                choquePared(b, w); // la pared al final: nada puede dejar una bola fuera de la jaula
            }
        }
    }

    function simular(dtFotograma) {
        const activas = bolas.filter((b) => b.estado === 'bombo');
        acumulado = Math.min(acumulado + dtFotograma, PASO * 10);
        while (acumulado >= PASO) {
            pasoFisica(PASO, activas);
            acumulado -= PASO;
        }
        for (const b of activas) {
            b.mesh.position.copy(b.p);
            const giro = b.w.length();
            if (giro > 1e-4) b.mesh.rotateOnWorldAxis(tmpA.copy(b.w).divideScalar(giro), giro * dtFotograma);
        }
    }

    // Saca del bombo, sin animar, las bolas que ya salieron (al reconectar a mitad de partida)
    function retirar(numeros) {
        for (const n of numeros) {
            const b = porNumero.get(n);
            if (!b || b.estado !== 'bombo') continue;
            b.estado = 'fuera';
            b.mesh.visible = false;
        }
    }

    function meterBola(b, retraso = 0) {
        return gsap.delayedCall(retraso, () => {
            b.estado = 'bombo';
            b.p.set((Math.random() - 0.5) * 1.2, R - r - 0.2 - Math.random() * 0.3, (Math.random() - 0.5) * 1.2);
            b.v.set((Math.random() - 0.5) * 2, -1.5, (Math.random() - 0.5) * 2);
            b.w.set((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20);
            b.mesh.position.copy(b.p);
            b.mesh.visible = true;
            b.mesh.material.map = b.textura;
            gsap.fromTo(b.mesh.scale, { x: 0.01, y: 0.01, z: 0.01 }, { x: 1, y: 1, z: 1, duration: 0.3, ease: 'back.out(2)' });
        });
    }

    // ---------- Encuadre según el tamaño de la pantalla ----------
    function ajustar() {
        const w = window.innerWidth;
        const h = window.innerHeight;
        renderer.setSize(w, h, false);
        composer.setSize(w, h);
        camara.aspect = w / h;
        const escritorio = w >= 1024;
        const anchoUtil = escritorio ? w - ANCHO_PIZARRA : w;
        const proporcion = anchoUtil / h;
        cam.distBase = Math.max(15.5, 10 / proporcion);
        escena.fog.near = cam.distBase + 3;
        escena.fog.far = cam.distBase + 24;
        // Desplaza el centro de la imagen al área libre (izquierda en escritorio, arriba en móvil)
        camara.setViewOffset(w, h, escritorio ? ANCHO_PIZARRA / 2 : 0, escritorio ? h * 0.04 : h * 0.07, w, h);
        camara.updateProjectionMatrix();
    }
    window.addEventListener('resize', ajustar);
    ajustar();

    // ---------- Bucle principal ----------
    const reloj = new THREE.Clock();
    const camPos = V();
    const giroTmp = new THREE.Quaternion();

    renderer.setAnimationLoop(() => {
        const dt = Math.min(reloj.getDelta(), 1 / 30);
        const t = reloj.elapsedTime;

        // Bombo y física
        bombo.angulo += bombo.omega * dt;
        jaula.rotation.z = bombo.angulo;
        simular(dt);

        // Bombillas
        const paso = t * luces.velocidad;
        for (let i = 0; i < posicionesBombillas.length; i++) {
            const enArco = i < N_ARCO;
            let brillo;
            if (luces.modo === 'apagado') brillo = 0.04;
            else if (luces.modo === 'arcoiris') brillo = ((i + Math.floor(paso)) % 2 === 0) ? 2.2 : 0.3;
            // Marquesina: todas encendidas y un destello que la recorre; aro del suelo: persecución
            else if (enArco) brillo = ((i - paso) % 4 + 4) % 4 < 1 ? 2.6 : 0.85;
            else brillo = ((i - paso) % 5 + 5) % 5 < 2 ? 2.2 : 0.15;
            colorTmp.copy(enArco ? colorMarquesina : coloresLuz[Math.floor(i / 2) % coloresLuz.length]);
            if (luces.modo === 'arcoiris') colorTmp.copy(coloresLuz[(i + Math.floor(paso / 2)) % coloresLuz.length]);
            colorTmp.multiplyScalar(brillo).lerp(tmpColorDestello(), luces.destello);
            bombillas.setColorAt(i, colorTmp);
        }
        bombillas.instanceColor.needsUpdate = true;

        // Focos
        haces.forEach((h) => {
            const barrido = Math.sin(t * 0.55 * focos.velocidad + h.fase) * 0.45;
            h.pivote.rotation.z = h.base + barrido * (1 - focos.enfoque) * 1.2;
            h.pivote.rotation.x = Math.cos(t * 0.4 * focos.velocidad + h.fase) * 0.18 * (1 - focos.enfoque);
            h.mat.uniforms.uOpacidad.value = focos.intensidad;
        });

        // Chispas
        for (let i = 0; i < MAX_CHISPAS; i++) {
            const s = chispas[i];
            if (s.vida > 0) {
                s.vida -= dt;
                s.v.y -= 4 * dt;
                s.v.multiplyScalar(0.985);
                s.p.addScaledVector(s.v, dt);
            }
            const k = Math.max(0, s.vida / s.max);
            posChispas[i * 3] = s.p.x;
            posChispas[i * 3 + 1] = k > 0 ? s.p.y : -999;
            posChispas[i * 3 + 2] = s.p.z;
            colChispas[i * 3] = s.color.r * k;
            colChispas[i * 3 + 1] = s.color.g * k;
            colChispas[i * 3 + 2] = s.color.b * k;
        }
        geoChispas.attributes.position.needsUpdate = true;
        geoChispas.attributes.color.needsUpdate = true;

        // Cámara (con vaivén suave y sacudida)
        const vaiven = reducirMovimiento ? 0 : 1;
        const ang = cam.ang + Math.sin(t * 0.21) * 0.07 * vaiven;
        const dist = cam.distBase * cam.factor;
        camPos.set(Math.sin(ang) * dist, cam.alt + Math.sin(t * 0.37) * 0.12 * vaiven, Math.cos(ang) * dist);
        if (cam.sacudida > 0.001) {
            camPos.x += (Math.random() - 0.5) * cam.sacudida;
            camPos.y += (Math.random() - 0.5) * cam.sacudida;
        }
        camara.position.copy(camPos);
        camara.lookAt(cam.mx, cam.my, cam.mz);

        composer.render();
    });

    const destelloColor = new THREE.Color();
    function tmpColorDestello() {
        return destelloColor.copy(luces.color).multiplyScalar(3);
    }

    // ---------- Acciones ----------
    function sacudir(fuerza = 0.35) {
        if (reducirMovimiento) return;
        gsap.fromTo(cam, { sacudida: fuerza }, { sacudida: 0, duration: 0.6, ease: 'power2.out', overwrite: 'auto' });
    }

    function destellar(color, duracion = 1.2) {
        luces.color.set(color);
        gsap.fromTo(luces, { destello: 1 }, { destello: 0, duration: duracion, ease: 'power2.out', overwrite: 'auto' });
        luzColor.color.set(color);
        gsap.fromTo(luzColor, { intensity: 120 }, { intensity: 0, duration: duracion * 1.2, ease: 'power2.out', overwrite: 'auto' });
    }

    function intro() {
        const tl = gsap.timeline();
        tl.fromTo(cam, { factor: 2.1, alt: 7, ang: -0.9 }, { factor: 1, alt: 2.2, ang: 0.42, duration: 3, ease: 'power3.inOut' }, 0);
        // Los focos se encienden de golpe, uno a uno
        haces.forEach((h, i) => {
            tl.call(() => { focos.intensidad = Math.max(focos.intensidad, 0.08 + i * 0.04); }, null, 0.35 + i * 0.25);
        });
        tl.to(focos, { intensidad: 0.22, duration: 0.4 }, 1.4);
        tl.call(() => { luces.modo = 'persecucion'; }, null, 1.3);
        tl.to(bombo, { omega: GIRO_REPOSO, duration: 1.5, ease: 'power2.inOut' }, 1.2);
        bolas.forEach((b, i) => tl.add(meterBola(b), 0.9 + i * 0.022));
        return tl;
    }

    let tlSorteo = null;

    function sortear(numero, { ritmo = 1, onSalida, onRevelar, onImpacto } = {}) {
        tlSorteo?.progress(1);
        const b = porNumero.get(numero);
        const f = reducirMovimiento ? 0.6 : ritmo;
        const tl = gsap.timeline();
        tlSorteo = tl;

        // 1. El bombo acelera y los focos apuntan al bombo
        tl.to(bombo, { omega: GIRO_SORTEO, duration: 0.45 * f, ease: 'power2.in' }, 0)
            .to(focos, { enfoque: 1, velocidad: 3, duration: 0.4 * f }, 0)
            .to(luces, { velocidad: 24, duration: 0.4 * f }, 0);

        // 2. La bola sale disparada y vuela hacia la cámara
        const vuelo = { t: 0 };
        let p0, p1, p2, q0, qCara, escala, camInicio;
        const dummy = new THREE.Object3D();
        tl.to(vuelo, {
            t: 1,
            duration: 0.8 * f,
            ease: 'power2.inOut',
            onStart() {
                if (p0) return; // ya preparado
                b.estado = 'vuelo';
                b.mesh.visible = true;
                b.mesh.scale.setScalar(1);
                b.mesh.material.map = texturaBola(b.info, 1024, renderer);
                p0 = b.p.clone();
                ({ P: p2, escala, camPos: camInicio } = puntoPresentacion());
                p1 = new THREE.Vector3(p0.x * 0.3, R + 1.8, 0.8);
                q0 = b.mesh.quaternion.clone();
                dummy.position.copy(p2);
                dummy.lookAt(camInicio);
                qCara = dummy.quaternion.clone();
                onSalida?.();
            },
            onUpdate() {
                // Si se saltó la línea de tiempo, GSAP puede llamar aquí sin haber pasado por onStart
                if (!p0) this.vars.onStart.call(this);
                const e = vuelo.t;
                const u = 1 - e;
                b.mesh.position.set(
                    u * u * p0.x + 2 * u * e * p1.x + e * e * p2.x,
                    u * u * p0.y + 2 * u * e * p1.y + e * e * p2.y,
                    u * u * p0.z + 2 * u * e * p1.z + e * e * p2.z,
                );
                b.mesh.scale.setScalar(1 + (escala - 1) * e * e);
                b.mesh.quaternion.slerpQuaternions(q0, qCara, e);
                b.mesh.quaternion.multiply(giroTmp.setFromAxisAngle(EJE_Y, u * Math.PI * 6));
            },
        }, 0.75 * f);
        tl.to(cam, { factor: 0.88, my: 0.5, duration: 0.9 * f, ease: 'power2.inOut' }, 0.75 * f);

        // 3. Revelación: chispas, destello y el bombo se calma
        const t3 = 0.75 * f + 0.8 * f;
        tl.call(() => {
            emitirChispas(b.mesh.position, b.info.color, reducirMovimiento ? 40 : 160, 7);
            destellar(b.info.color);
            sacudir(0.18);
            onRevelar?.();
        }, null, t3)
            .to(bombo, { omega: GIRO_REPOSO, duration: 1.8, ease: 'power2.out' }, t3)
            .to(focos, { enfoque: 0, velocidad: 1, duration: 1.5 }, t3)
            .to(luces, { velocidad: 6, duration: 1.2 }, t3);

        // Pequeño balanceo mientras se presenta
        const balanceo = { a: 0 };
        tl.to(balanceo, {
            a: 1, duration: 0.6 * f, ease: 'sine.inOut',
            onUpdate() {
                if (!qCara) return;
                b.mesh.quaternion.copy(qCara).multiply(giroTmp.setFromAxisAngle(EJE_Y, Math.sin(balanceo.a * Math.PI * 2) * 0.22));
            },
        }, t3);

        // 4. ¡Impacto! La bola se estrella contra la cámara
        const zoom = { t: 0 };
        let pInicio, pFinal;
        const t4 = t3 + 0.6 * f;
        tl.to(zoom, {
            t: 1,
            duration: 0.3 * f,
            ease: 'power3.in',
            onStart() {
                if (pInicio) return;
                pInicio = b.mesh.position.clone();
                pFinal = camara.position.clone().add(pInicio.clone().sub(camara.position).normalize().multiplyScalar(camara.near + 0.5));
            },
            onUpdate() {
                if (!pInicio) this.vars.onStart.call(this);
                b.mesh.position.lerpVectors(pInicio, pFinal, zoom.t);
            },
        }, t4);
        tl.call(() => {
            b.mesh.visible = false;
            b.estado = 'fuera';
            b.mesh.material.map.dispose();
            b.mesh.material.map = b.textura;
            b.mesh.scale.setScalar(1);
            sacudir(0.5);
            onImpacto?.();
        }, null, t4 + 0.3 * f);
        tl.to(cam, { factor: 1, my: 0.35, duration: 1, ease: 'power3.out' }, t4 + 0.3 * f);
        return tl;
    }

    function puntoPresentacion() {
        const posCam = camara.position.clone();
        const mirar = new THREE.Vector3(cam.mx, cam.my, cam.mz);
        const dir = posCam.clone().sub(mirar);
        const total = dir.length();
        dir.normalize();
        const P = mirar.clone().addScaledVector(dir, total * 0.55);
        const d = total * 0.45;
        const radio = 0.26 * d * Math.tan(THREE.MathUtils.degToRad(camara.fov / 2));
        return { P, escala: radio / r, camPos: posCam };
    }

    function celebrar() {
        tlSorteo?.progress(1);
        const tl = gsap.timeline();
        luces.modo = 'arcoiris';
        tl.to(bombo, { omega: GIRO_FIESTA, duration: 0.6, ease: 'power2.in' }, 0)
            .to(bombo, { omega: GIRO_REPOSO, duration: 3.5, ease: 'power2.out' }, 1.4)
            .to(focos, { velocidad: 6, intensidad: 0.4, duration: 0.3 }, 0)
            .to(focos, { velocidad: 1, intensidad: 0.22, duration: 2 }, 3)
            .to(luces, { velocidad: 10, duration: 0.3 }, 0)
            .call(() => { luces.modo = 'persecucion'; luces.velocidad = 6; }, null, 4.5);
        if (!reducirMovimiento) {
            tl.to(cam, { ang: `+=${Math.PI * 2}`, duration: 3.6, ease: 'power2.inOut', onComplete: () => { cam.ang = 0.42; } }, 0.2);
        }
        colores.forEach((c, i) => {
            tl.call(() => {
                emitirChispas(new THREE.Vector3((Math.random() - 0.5) * 6, 1 + Math.random() * 2.5, (Math.random() - 0.5) * 2), c, 140, 8);
                destellar(c, 0.6);
            }, null, 0.2 + i * 0.35);
        });
        return tl;
    }

    function reiniciar() {
        tlSorteo?.progress(1);
        luces.modo = 'persecucion';
        gsap.to(bombo, { omega: 4.5, duration: 0.4, yoyo: true, repeat: 1 });
        gsap.to(bombo, { omega: GIRO_REPOSO, duration: 1.2, delay: 0.8 });
        bolas.filter((b) => b.estado === 'fuera').forEach((b, i) => meterBola(b, 0.2 + i * 0.03));
        gsap.to(focos, { intensidad: 0.22, duration: 0.6 });
    }

    function terminar() {
        gsap.to(bombo, { omega: 0, duration: 2.5, ease: 'power2.out' });
        gsap.to(focos, { intensidad: 0.2, duration: 2 });
        luces.velocidad = 2;
    }

    return { intro, sortear, celebrar, reiniciar, terminar, sacudir, retirar };
}
