// Azar para el sorteo: generador criptográfico del sistema (CSPRNG) y
// muestreo por rechazo, para que cada bola tenga exactamente la misma
// probabilidad. Funciona igual en el navegador, en Node y en Cloudflare Workers.

const RANGO = 2 ** 32;
const rellenarCripto = (arreglo) => globalThis.crypto.getRandomValues(arreglo);

// Entero uniforme en [0, n). `fuente` rellena un Uint32Array (solo se cambia en las pruebas).
export function enteroAleatorio(n, fuente = rellenarCripto) {
    if (!Number.isInteger(n) || n < 1 || n > RANGO) throw new RangeError(`n fuera de rango: ${n}`);
    // Sin rechazo, `x % n` favorece a los primeros valores cuando 2^32 no es múltiplo de n
    // (sesgo de módulo). Se descartan los x del tramo final incompleto y se pide otro.
    const techo = RANGO - (RANGO % n);
    const palabra = new Uint32Array(1);
    for (;;) {
        fuente(palabra);
        if (palabra[0] < techo) return palabra[0] % n;
    }
}

// Saca una bola al azar de las que quedan (modifica el arreglo) y la devuelve.
export function extraerBola(restantes, fuente) {
    if (restantes.length === 0) throw new RangeError('No quedan bolas');
    return restantes.splice(enteroAleatorio(restantes.length, fuente), 1)[0];
}

// Fisher-Yates con el mismo generador (para quien necesite un orden completo).
export function mezclar(arreglo, fuente) {
    for (let i = arreglo.length - 1; i > 0; i--) {
        const j = enteroAleatorio(i + 1, fuente);
        [arreglo[i], arreglo[j]] = [arreglo[j], arreglo[i]];
    }
    return arreglo;
}
