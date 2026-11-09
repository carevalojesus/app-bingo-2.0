// Cartones de bingo de 75 bolas generados a partir de una semilla.
// El mismo código (serie + número) produce siempre el mismo cartón, así que no
// hace falta guardarlos: el show los reconstruye para verificarlos.
// Este módulo no depende del DOM ni de Three.js/GSAP (se puede probar con Node).

export const LETRAS = ['B', 'I', 'N', 'G', 'O'];
export const MAX_CARTONES = 999;
export const LARGO_SERIE = 4;
// Sin I, L, O, 0 ni 1 para que el código no se confunda al leerlo en voz alta
const ALFABETO = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
export const ALFABETO_SERIE = ALFABETO;

// ---------- Azar con semilla ----------
// El cartón tiene que ser reproducible (mismo código → mismo cartón), así que no
// puede salir de un generador aleatorio del sistema. Se usa SHA-256 en modo
// contador: bloque_k = SHA-256(etiqueta ‖ k). Cada bloque da 8 palabras de 32 bits
// y los enteros se sacan con muestreo por rechazo (sin sesgo de módulo).
// Es síncrono (crypto.subtle es asíncrono) y da el mismo resultado en el
// navegador, en Node y en el Worker. El orden de las BOLAS no sale de aquí:
// ese usa el generador criptográfico del sistema (src/azar.js).

const K = new Uint32Array([
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
]);

// SHA-256 (FIPS 180-4) de unos bytes; devuelve 8 palabras de 32 bits.
export function sha256(bytes) {
    const largo = bytes.length;
    const total = Math.ceil((largo + 9) / 64) * 64;
    const datos = new Uint8Array(total);
    datos.set(bytes);
    datos[largo] = 0x80;
    const vista = new DataView(datos.buffer);
    vista.setUint32(total - 8, Math.floor(largo / 0x20000000));
    vista.setUint32(total - 4, (largo * 8) >>> 0);

    const h = new Uint32Array([
        0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19,
    ]);
    const w = new Uint32Array(64);
    const rot = (x, n) => (x >>> n) | (x << (32 - n));
    for (let bloque = 0; bloque < total; bloque += 64) {
        for (let i = 0; i < 16; i++) w[i] = vista.getUint32(bloque + i * 4);
        for (let i = 16; i < 64; i++) {
            const s0 = rot(w[i - 15], 7) ^ rot(w[i - 15], 18) ^ (w[i - 15] >>> 3);
            const s1 = rot(w[i - 2], 17) ^ rot(w[i - 2], 19) ^ (w[i - 2] >>> 10);
            w[i] = (w[i - 16] + s0 + w[i - 7] + s1) | 0;
        }
        let [a, b, c, d, e, f, g, hh] = h;
        for (let i = 0; i < 64; i++) {
            const t1 = (hh + (rot(e, 6) ^ rot(e, 11) ^ rot(e, 25)) + ((e & f) ^ (~e & g)) + K[i] + w[i]) | 0;
            const t2 = ((rot(a, 2) ^ rot(a, 13) ^ rot(a, 22)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
            hh = g; g = f; f = e; e = (d + t1) | 0;
            d = c; c = b; b = a; a = (t1 + t2) | 0;
        }
        h[0] += a; h[1] += b; h[2] += c; h[3] += d; h[4] += e; h[5] += f; h[6] += g; h[7] += hh;
    }
    return h;
}

// Generador determinista: devuelve enteroHasta(n) → entero uniforme en [0, n)
function generadorDeterminista(etiqueta) {
    const prefijo = new TextEncoder().encode(etiqueta);
    const entrada = new Uint8Array(prefijo.length + 4);
    entrada.set(prefijo);
    const contador = new DataView(entrada.buffer, prefijo.length, 4);
    let k = 0;
    let palabras = [];
    const siguiente = () => {
        if (palabras.length === 0) {
            contador.setUint32(0, k++);
            palabras = Array.from(sha256(entrada));
        }
        return palabras.shift();
    };
    return (n) => {
        const techo = 2 ** 32 - (2 ** 32 % n);
        for (;;) {
            const x = siguiente();
            if (x < techo) return x % n;
        }
    };
}

// ---------- Series ----------
export function nuevaSerie() {
    // CSPRNG con muestreo por rechazo (31 letras: sin rechazo habría sesgo de módulo)
    const techo = 2 ** 32 - (2 ** 32 % ALFABETO.length);
    const palabra = new Uint32Array(1);
    let serie = '';
    while (serie.length < LARGO_SERIE) {
        globalThis.crypto.getRandomValues(palabra);
        if (palabra[0] < techo) serie += ALFABETO[palabra[0] % ALFABETO.length];
    }
    return serie;
}

export function normalizarSerie(texto) {
    return String(texto ?? '').toUpperCase().replace(/[^A-Z0-9]/g, '');
}

export function serieValida(serie) {
    return serie.length === LARGO_SERIE && [...serie].every((c) => ALFABETO.includes(c));
}

export const formatoCodigo = (serie, numero) => `${serie}-${String(numero).padStart(3, '0')}`;

// Acepta "K7QX-042", "k7qx 42", "K7QX042" o solo "42" (usa la serie recordada)
export function parsearCodigo(texto, serieRecordada = null) {
    const partes = String(texto ?? '').toUpperCase().match(/[A-Z0-9]+/g) || [];
    if (partes.length === 0) return { error: 'Escribe el número o el código del cartón.' };

    let serie;
    let numero;
    if (partes.length === 1 && /^\d+$/.test(partes[0]) && partes[0].length <= 3) {
        if (!serieRecordada) return { error: 'Escribe el código completo, ej: K7QX-042.' };
        serie = serieRecordada;
        numero = partes[0];
    } else if (partes.length === 1) {
        serie = partes[0].slice(0, LARGO_SERIE);
        numero = partes[0].slice(LARGO_SERIE);
    } else if (partes.length === 2) {
        [serie, numero] = partes;
    } else {
        return { error: 'Código no reconocido. Ejemplo: K7QX-042.' };
    }

    if (!serieValida(serie)) return { error: `"${serie}" no es una serie válida.` };
    if (!/^\d{1,3}$/.test(numero) || Number(numero) < 1) {
        return { error: `El número de cartón va del 1 al ${MAX_CARTONES}.` };
    }
    return { serie, numero: Number(numero) };
}

// ---------- Cartón ----------
// columnas[c][f]: columna c (B..O), fila f. El centro (N, fila 3) es libre: null.
export function generarCarton(serie, numero) {
    const enteroHasta = generadorDeterminista(`bingoshow:carton:v2:${serie}:${numero}`);
    const columnas = LETRAS.map((_, c) => {
        const bolsa = Array.from({ length: 15 }, (_, i) => c * 15 + i + 1);
        const cantidad = c === 2 ? 4 : 5;
        // Fisher-Yates parcial: solo hacen falta los primeros números
        for (let i = 0; i < cantidad; i++) {
            const j = i + enteroHasta(bolsa.length - i);
            [bolsa[i], bolsa[j]] = [bolsa[j], bolsa[i]];
        }
        const columna = bolsa.slice(0, cantidad).sort((a, b) => a - b);
        if (c === 2) columna.splice(2, 0, null);
        return columna;
    });
    return { serie, numero, codigo: formatoCodigo(serie, numero), columnas };
}

// ---------- Modalidades ----------
const indices = [0, 1, 2, 3, 4];
const filas = indices.map((f) => indices.map((c) => [c, f]));
const columnas = indices.map((c) => indices.map((f) => [c, f]));
const diagonales = [indices.map((i) => [i, i]), indices.map((i) => [i, 4 - i])];
// Une varias listas de casillas [c, f] sin repetir
const unir = (...listas) => [...new Map(listas.flat().map((p) => [p.join(','), p])).values()];
const interior = [1, 2, 3].flatMap((c) => [1, 2, 3].map((f) => [c, f]));

export const PATRONES = {
    linea: { nombre: 'Línea', detalle: 'fila, columna o diagonal', figuras: [...filas, ...columnas, ...diagonales] },
    esquinas: { nombre: '4 esquinas', detalle: 'las cuatro esquinas', figuras: [[[0, 0], [4, 0], [0, 4], [4, 4]]] },
    lleno: { nombre: 'Cartón lleno', detalle: 'los 24 números', figuras: [filas.flat()] },
    letraL: { nombre: 'Letra L', detalle: 'columna B y fila de abajo', figuras: [unir(columnas[0], filas[4])] },
    letraT: { nombre: 'Letra T', detalle: 'fila de arriba y columna N', figuras: [unir(filas[0], columnas[2])] },
    letraX: { nombre: 'Letra X', detalle: 'las dos diagonales', figuras: [unir(...diagonales)] },
    marco: { nombre: 'Marco', detalle: 'todo el borde del cartón', figuras: [unir(filas[0], filas[4], columnas[0], columnas[4])] },
    cuadro: { nombre: 'Cuadro central', detalle: 'los 8 números alrededor del centro', figuras: [interior] },
};

// Comprueba el cartón contra las bolas que ya salieron.
// Devuelve las figuras completas y, si no gana, la figura a la que le faltan menos números.
export function verificar(carton, salidas, patron = 'linea') {
    const { figuras } = PATRONES[patron] ?? PATRONES.linea;
    const valor = ([c, f]) => carton.columnas[c][f];
    const ganadoras = [];
    let cercana = null;

    for (const figura of figuras) {
        const faltan = figura.map(valor).filter((n) => n !== null && !salidas.has(n));
        if (faltan.length === 0) ganadoras.push(figura);
        else if (!cercana || faltan.length < cercana.faltan.length) cercana = { figura, faltan };
    }

    const marcadas = carton.columnas.map((col) => col.map((n) => n === null || salidas.has(n)));
    return {
        gana: ganadoras.length > 0,
        ganadoras,
        figura: ganadoras.length ? ganadoras.flat() : cercana.figura,
        faltan: ganadoras.length ? [] : cercana.faltan.sort((a, b) => a - b),
        marcadas,
    };
}
