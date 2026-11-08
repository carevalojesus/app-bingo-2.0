// Partida verificable ("provably fair") para el modo en línea.
//
// 1. En el lobby el servidor crea una semilla secreta y publica su compromiso:
//    compromiso = SHA-256(semillaServidor).
// 2. Cada jugador aporta una semilla aleatoria propia al unirse.
// 3. Al iniciar se fijan las semillas de los clientes (semillaClientes) y de
//    ellas + la semilla del servidor salen, con HMAC-SHA256, la serie de los
//    cartones y el orden de las 75 bolas. El servidor ya no puede cambiarlos.
// 4. Al terminar el servidor revela su semilla y cualquiera puede recalcularlo
//    todo con verificarPartida().
//
// Mismo código en el navegador, en Node y en el Worker (síncrono, sin dependencias).
import { sha256, ALFABETO_SERIE, LARGO_SERIE } from './carton.js';

const texto = new TextEncoder();

export const aHex = (bytes) => Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');

export function desdeHex(hex) {
    if (typeof hex !== 'string' || hex.length % 2 || /[^0-9a-f]/i.test(hex)) throw new TypeError('Hex no válido');
    return Uint8Array.from(hex.match(/../g) || [], (par) => parseInt(par, 16));
}

function palabrasABytes(palabras) {
    const bytes = new Uint8Array(palabras.length * 4);
    const vista = new DataView(bytes.buffer);
    palabras.forEach((p, i) => vista.setUint32(i * 4, p));
    return bytes;
}

const unir = (a, b) => {
    const r = new Uint8Array(a.length + b.length);
    r.set(a);
    r.set(b, a.length);
    return r;
};

export const sha256Hex = (bytes) => aHex(palabrasABytes(sha256(bytes)));

// HMAC-SHA256 (RFC 2104); devuelve 8 palabras de 32 bits
export function hmacSha256(clave, mensaje) {
    let k = clave.length > 64 ? palabrasABytes(sha256(clave)) : clave;
    const relleno = new Uint8Array(64);
    relleno.set(k);
    const interior = relleno.map((b) => b ^ 0x36);
    const exterior = relleno.map((b) => b ^ 0x5c);
    return sha256(unir(exterior, palabrasABytes(sha256(unir(interior, mensaje)))));
}

// Semilla aleatoria del sistema (CSPRNG), en hex
export function nuevaSemilla(bytes = 32) {
    const datos = new Uint8Array(bytes);
    globalThis.crypto.getRandomValues(datos);
    return aHex(datos);
}

export const compromisoDe = (semillaServidor) => sha256Hex(desdeHex(semillaServidor));

// Combina las semillas de los jugadores en una sola, sin depender del orden de llegada.
// semillas: [{ apodo, semilla }]
export function combinarSemillas(semillas) {
    const lineas = semillas.map(({ apodo, semilla }) => `${apodo}:${semilla}`).sort();
    return sha256Hex(texto.encode(lineas.join('\n')));
}

// Flujo de enteros uniformes en [0, n) a partir de HMAC(semillaServidor, etiqueta ‖ bloque)
function flujo(semillaServidor, etiqueta) {
    const clave = desdeHex(semillaServidor);
    let bloque = 0;
    let palabras = [];
    const siguiente = () => {
        if (palabras.length === 0) palabras = Array.from(hmacSha256(clave, texto.encode(`${etiqueta}:${bloque++}`)));
        return palabras.shift();
    };
    return (n) => {
        const techo = 2 ** 32 - (2 ** 32 % n); // muestreo por rechazo: sin sesgo de módulo
        for (;;) {
            const x = siguiente();
            if (x < techo) return x % n;
        }
    };
}

// Serie de los cartones de la partida
export function serieDePartida(semillaServidor, semillaClientes) {
    const entero = flujo(semillaServidor, `bingoshow:serie:v1:${semillaClientes}`);
    return Array.from({ length: LARGO_SERIE }, () => ALFABETO_SERIE[entero(ALFABETO_SERIE.length)]).join('');
}

// Orden de las bolas: la bola k se elige entre las que quedan con su propio flujo.
// `cuantas` permite calcular solo las primeras (el resultado es el mismo prefijo).
export function ordenDeBolas(semillaServidor, semillaClientes, cuantas = 75) {
    const restantes = Array.from({ length: 75 }, (_, i) => i + 1);
    const orden = [];
    for (let k = 0; k < Math.min(cuantas, 75); k++) {
        const entero = flujo(semillaServidor, `bingoshow:bola:v1:${semillaClientes}:${k}`);
        orden.push(restantes.splice(entero(restantes.length), 1)[0]);
    }
    return orden;
}

// Comprueba una partida terminada con los datos publicados.
// Devuelve { valida, errores: [texto…] }
export function verificarPartida({ compromiso, semillaServidor, semillasClientes, semillaClientes, serie, bolas }) {
    const errores = [];
    try {
        if (compromisoDe(semillaServidor) !== compromiso) errores.push('La semilla revelada no coincide con el compromiso publicado al principio.');
        const combinada = combinarSemillas(semillasClientes);
        if (combinada !== semillaClientes) errores.push('Las semillas de los jugadores no dan la semilla combinada publicada.');
        if (serieDePartida(semillaServidor, combinada) !== serie) errores.push('La serie de los cartones no sale de las semillas.');
        const orden = ordenDeBolas(semillaServidor, combinada);
        const distinta = bolas.findIndex((n, i) => n !== orden[i]);
        if (distinta !== -1) errores.push(`La bola nº ${distinta + 1} (${bolas[distinta]}) no es la que tocaba (${orden[distinta]}).`);
    } catch (error) {
        errores.push(`Datos no válidos: ${error.message}`);
    }
    return { valida: errores.length === 0, errores };
}
