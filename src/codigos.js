// Códigos Pro: un código lleva su tipo y su fecha de caducidad, firmados con HMAC-SHA256 y una
// clave secreta que solo conoce el servidor (y quien los genera: scripts/codigo-pro.mjs).
// No hace falta base de datos: el servidor comprueba la firma y la fecha.
//
// Formato: PRO-XXXXXX-XXXXXX-XXXXXX (base32 de Crockford: sin I, L, O ni U).
// 11 bytes = tipo (1) + hora de caducidad (2, horas desde 2026-01-01: alcanza hasta 2033) + azar (3) + firma (5).
import { hmacSha256, palabrasABytes, desdeHex } from './justo.js';

const ALFABETO = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
const EPOCA = Date.UTC(2026, 0, 1);
const HORA = 60 * 60 * 1000;
const DIA = 24 * HORA;
const BYTES_FIRMA = 5;
export const TIPOS_PRO = { 1: 'evento', 2: 'mensual', 3: 'cortesia' };
const texto = new TextEncoder();

function firmar(secreto, cuerpo) {
    const clave = desdeHex(secreto);
    const mensaje = new Uint8Array([...texto.encode('bingoshow:pro:v1:'), ...cuerpo]);
    return palabrasABytes(hmacSha256(clave, mensaje)).slice(0, BYTES_FIRMA);
}

function aBase32(bytes) {
    let bits = 0;
    let valor = 0;
    let salida = '';
    for (const b of bytes) {
        valor = (valor << 8) | b;
        bits += 8;
        while (bits >= 5) {
            salida += ALFABETO[(valor >>> (bits - 5)) & 31];
            bits -= 5;
        }
        valor &= (1 << bits) - 1;
    }
    if (bits > 0) salida += ALFABETO[(valor << (5 - bits)) & 31];
    return salida;
}

function desdeBase32(cadena, largo) {
    let bits = 0;
    let valor = 0;
    const bytes = [];
    for (const c of cadena) {
        const i = ALFABETO.indexOf(c);
        if (i === -1) return null;
        valor = (valor << 5) | i;
        bits += 5;
        if (bits >= 8) {
            bytes.push((valor >>> (bits - 8)) & 255);
            bits -= 8;
            valor &= (1 << bits) - 1;
        }
    }
    return bytes.length >= largo ? new Uint8Array(bytes.slice(0, largo)) : null;
}

// Quita guiones y espacios, pasa a mayúsculas y corrige letras que se confunden (O→0, I/L→1)
export function normalizarCodigoPro(entrada) {
    return String(entrada ?? '').toUpperCase().replace(/[^A-Z0-9]/g, '').replace(/^PRO/, '')
        .replace(/O/g, '0').replace(/[IL]/g, '1').replace(/U/g, 'V');
}

const formato = (cadena) => `PRO-${cadena.slice(0, 6)}-${cadena.slice(6, 12)}-${cadena.slice(12, 18)}`;

// Crea un código válido `dias` × 24 horas desde ahora (redondeado a la hora siguiente).
// `azar` permite pruebas deterministas.
export function generarCodigoPro(secreto, { dias = 1, tipo = 1, ahora = Date.now(), azar = null } = {}) {
    if (!/^[0-9a-f]{32,128}$/i.test(secreto ?? '')) throw new Error('La clave secreta debe ser hex (32 a 128 caracteres).');
    if (!Number.isInteger(dias) || dias < 1 || dias > 400) throw new Error('Los días deben ir de 1 a 400.');
    if (!TIPOS_PRO[tipo]) throw new Error('Tipo de código desconocido.');
    const hora = Math.ceil((ahora + dias * DIA - EPOCA) / HORA);
    if (hora < 0 || hora > 0xffff) throw new Error('Fecha fuera del rango de los códigos.');
    const aleatorio = azar ?? globalThis.crypto.getRandomValues(new Uint8Array(3));
    const cuerpo = new Uint8Array([tipo, (hora >> 8) & 255, hora & 255, ...aleatorio.slice(0, 3)]);
    const codigo = formato(aBase32(new Uint8Array([...cuerpo, ...firmar(secreto, cuerpo)])));
    return { codigo, tipo: TIPOS_PRO[tipo], hasta: EPOCA + hora * HORA };
}

// Devuelve { valido: true, tipo, hasta } o { valido: false, motivo }
export function validarCodigoPro(secreto, entrada, ahora = Date.now()) {
    const limpio = normalizarCodigoPro(entrada);
    if (limpio.length !== 18) return { valido: false, motivo: 'El código Pro no tiene el formato correcto (PRO-XXXXXX-XXXXXX-XXXXXX).' };
    const bytes = desdeBase32(limpio, 11);
    // Solo la forma exacta: el último carácter lleva 2 bits de relleno que deben ser cero
    if (!bytes || aBase32(bytes) !== limpio) return { valido: false, motivo: 'El código Pro no es válido.' };
    const cuerpo = bytes.slice(0, 6);
    const esperada = firmar(secreto, cuerpo);
    // Comparación sin atajos (tiempo constante)
    let distinto = 0;
    for (let i = 0; i < BYTES_FIRMA; i++) distinto |= esperada[i] ^ bytes[6 + i];
    if (distinto || !TIPOS_PRO[cuerpo[0]]) return { valido: false, motivo: 'El código Pro no es válido.' };
    const hasta = EPOCA + ((cuerpo[1] << 8) | cuerpo[2]) * HORA;
    if (ahora >= hasta) return { valido: false, motivo: 'Ese código Pro ya caducó.' };
    return { valido: true, tipo: TIPOS_PRO[cuerpo[0]], hasta };
}
