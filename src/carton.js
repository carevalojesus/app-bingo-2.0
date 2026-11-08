// Cartones de bingo de 75 bolas generados a partir de una semilla.
// El mismo código (serie + número) produce siempre el mismo cartón, así que no
// hace falta guardarlos: el show los reconstruye para verificarlos.
// Este módulo no depende del DOM ni de Three.js/GSAP (se puede probar con Node).

export const LETRAS = ['B', 'I', 'N', 'G', 'O'];
export const MAX_CARTONES = 999;
export const LARGO_SERIE = 4;
// Sin I, L, O, 0 ni 1 para que el código no se confunda al leerlo en voz alta
const ALFABETO = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

// ---------- Azar con semilla ----------
function hash(texto) {
    // FNV-1a de 32 bits
    let h = 0x811c9dc5;
    for (let i = 0; i < texto.length; i++) {
        h ^= texto.charCodeAt(i);
        h = Math.imul(h, 0x01000193);
    }
    return h >>> 0;
}

function mulberry32(semilla) {
    let a = semilla >>> 0;
    return () => {
        a = (a + 0x6d2b79f5) >>> 0;
        let t = a;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

// ---------- Series ----------
export function nuevaSerie() {
    const azar = new Uint32Array(LARGO_SERIE);
    globalThis.crypto.getRandomValues(azar);
    return Array.from(azar, (n) => ALFABETO[n % ALFABETO.length]).join('');
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
    const azar = mulberry32(hash(`bingoshow:${serie}:${numero}`));
    const columnas = LETRAS.map((_, c) => {
        const bolsa = Array.from({ length: 15 }, (_, i) => c * 15 + i + 1);
        const cantidad = c === 2 ? 4 : 5;
        // Fisher-Yates parcial: solo hacen falta los primeros números
        for (let i = 0; i < cantidad; i++) {
            const j = i + Math.floor(azar() * (bolsa.length - i));
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

export const PATRONES = {
    linea: { nombre: 'Línea', detalle: 'fila, columna o diagonal', figuras: [...filas, ...columnas, ...diagonales] },
    esquinas: { nombre: '4 esquinas', detalle: 'las cuatro esquinas', figuras: [[[0, 0], [4, 0], [0, 4], [4, 4]]] },
    lleno: { nombre: 'Cartón lleno', detalle: 'los 24 números', figuras: [filas.flat()] },
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
