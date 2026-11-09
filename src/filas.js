// Modo «Fila de 5»: en vez de cartones se venden 15 filas fijas de 5 números.
// La fila n lleva un número de cada letra: B-n, I-(n+15), N-(n+30), G-(n+45) y O-(n+60).
// Entre las 15 cubren las 75 bolas sin repetir ninguna, así que con cada bola se completa
// como mucho una fila: siempre hay un único ganador (la primera fila vendida que se completa).
// Los números de cada fila son públicos desde el lobby; el orden de las bolas sigue
// comprometido antes de empezar (src/justo.js), así que conocerlos no da ventaja.

export const TOTAL_FILAS = 15;
export const MODALIDAD_FILA = 'fila5';
export const INFO_FILA = { nombre: 'Fila de 5', detalle: 'los 5 números de tu fila' };

export const esModoFila = (config) => config?.tipo === 'fila';

export function numerosDeFila(n) {
    if (!Number.isInteger(n) || n < 1 || n > TOTAL_FILAS) throw new RangeError(`La fila debe ser un número del 1 al ${TOTAL_FILAS}.`);
    return [0, 1, 2, 3, 4].map((c) => n + c * 15);
}

// Estado de una fila frente a las bolas que ya salieron
export function analizarFila(n, salidas) {
    const numeros = numerosDeFila(n);
    const marcadas = numeros.filter((x) => salidas.has(x));
    return { numeros, marcadas, faltan: numeros.filter((x) => !salidas.has(x)), completa: marcadas.length === 5 };
}

export const filaCompleta = (n, salidas) => analizarFila(n, salidas).completa;

// Modo «Elige tus 5»: cada jugada son 5 números (1–75) que elige el jugador. Se pueden repetir
// entre jugadores, así que puede haber empates (el premio se reparte).
export const MODALIDAD_ELIGE = 'elige5';
export const INFO_ELIGE = { nombre: 'Elige tus 5', detalle: 'los 5 números que elegiste' };
export const esModoElige = (config) => config?.tipo === 'elige';
// Modos en los que nadie canta: el servidor comprueba y entrega el premio solo
export const esModoAuto = (config) => esModoFila(config) || esModoElige(config);

// Valida y ordena una jugada; lanza RangeError con un texto para el jugador
export function limpiarJugada(numeros) {
    if (!Array.isArray(numeros) || numeros.length !== 5) throw new RangeError('Elige exactamente 5 números.');
    if (!numeros.every((n) => Number.isInteger(n) && n >= 1 && n <= 75)) throw new RangeError('Los números van del 1 al 75.');
    if (new Set(numeros).size !== 5) throw new RangeError('No repitas números en la misma jugada.');
    return [...numeros].sort((a, b) => a - b);
}

export function analizarJugada(numeros, salidas) {
    const marcadas = numeros.filter((x) => salidas.has(x));
    return { numeros, marcadas, faltan: numeros.filter((x) => !salidas.has(x)), completa: marcadas.length === numeros.length };
}
