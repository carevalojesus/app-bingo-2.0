// Verificación de Cloudflare Access (worker/access.js) con un par de claves RSA de prueba
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { usuarioAccess } from '../worker/access.js';

const EQUIPO = 'equipoprueba';
const AUD = 'aud-de-prueba';
const { publicKey, privateKey } = await crypto.subtle.generateKey(
    { name: 'RSASSA-PKCS1-v1_5', modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: 'SHA-256' }, true, ['sign', 'verify']);
const jwk = { ...(await crypto.subtle.exportKey('jwk', publicKey)), kid: 'k1', alg: 'RS256' };
globalThis.fetch = async (url) => {
    assert.equal(url, `https://${EQUIPO}.cloudflareaccess.com/cdn-cgi/access/certs`);
    return new Response(JSON.stringify({ keys: [jwk] }));
};

const b64 = (datos) => Buffer.from(typeof datos === 'string' ? datos : JSON.stringify(datos)).toString('base64url');
async function firmar(cuerpo, { kid = 'k1' } = {}) {
    const cabecera = b64({ alg: 'RS256', kid, typ: 'JWT' });
    const datos = b64(cuerpo);
    const firma = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', privateKey, new TextEncoder().encode(`${cabecera}.${datos}`));
    return `${cabecera}.${datos}.${Buffer.from(firma).toString('base64url')}`;
}
const ahora = () => Math.floor(Date.now() / 1000);
const valido = () => ({ aud: [AUD], iss: `https://${EQUIPO}.cloudflareaccess.com`, email: 'yo@ejemplo.com', exp: ahora() + 600, iat: ahora() });
const env = { ACCESS_EQUIPO: EQUIPO, ACCESS_AUD: AUD };
const peticion = (token, enCookie = false) => new Request('https://bingo.ejemplo.com/api/admin/resumen', {
    headers: enCookie ? { cookie: `otra=1; CF_Authorization=${token}` } : { 'cf-access-jwt-assertion': token },
});

test('Access: un token válido da el correo (por cabecera o por cookie)', async () => {
    const token = await firmar(valido());
    assert.equal(await usuarioAccess(peticion(token), env), 'yo@ejemplo.com');
    assert.equal(await usuarioAccess(peticion(token, true), env), 'yo@ejemplo.com');
});

test('Access: se rechazan tokens caducados, de otra aplicación, de otro emisor o alterados', async () => {
    assert.equal(await usuarioAccess(peticion(await firmar({ ...valido(), exp: ahora() - 10 })), env), null, 'caducado');
    assert.equal(await usuarioAccess(peticion(await firmar({ ...valido(), aud: ['otra'] })), env), null, 'otra AUD');
    assert.equal(await usuarioAccess(peticion(await firmar({ ...valido(), iss: 'https://malo.cloudflareaccess.com' })), env), null, 'otro emisor');
    assert.equal(await usuarioAccess(peticion(await firmar(valido(), { kid: 'desconocida' })), env), null, 'clave desconocida');
    const [c, , f] = (await firmar(valido())).split('.');
    const cambiado = `${c}.${b64({ ...valido(), email: 'intruso@ejemplo.com' })}.${f}`;
    assert.equal(await usuarioAccess(peticion(cambiado), env), null, 'cuerpo alterado');
    assert.equal(await usuarioAccess(peticion('basura'), env), null);
    assert.equal(await usuarioAccess(new Request('https://x/'), env), null, 'sin token');
});

test('Access: sin configurar no deja pasar a nadie (se usa la clave)', async () => {
    const token = await firmar(valido());
    assert.equal(await usuarioAccess(peticion(token), {}), null);
    assert.equal(await usuarioAccess(peticion(token), { ACCESS_EQUIPO: EQUIPO }), null);
});
