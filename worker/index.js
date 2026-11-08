// Worker de Bingo Show: API de salas (/api/*) y archivos estáticos (Workers Static Assets).
// Protocolo: docs/en-linea.md

import { generarCodigo, codigoValido } from './juego.js';

export { Sala } from './sala.js';

const MAX_CUERPO = 16 * 1024;
const INTENTOS_CODIGO = 8;

const json = (datos, status = 200) => Response.json(datos, { status });
const sala = (env, codigo) => env.SALAS.get(env.SALAS.idFromName(codigo));

async function crear(request, env) {
    const texto = await request.text();
    if (texto.length > MAX_CUERPO) return json({ error: 'La configuración es demasiado grande.' }, 413);
    let config = {};
    if (texto.trim()) {
        try {
            config = JSON.parse(texto);
        } catch {
            return json({ error: 'El cuerpo debe ser JSON.' }, 400);
        }
    }

    // Si el código ya está en uso (409) se prueba con otro
    for (let i = 0; i < INTENTOS_CODIGO; i++) {
        const codigo = generarCodigo();
        const respuesta = await sala(env, codigo).fetch('https://sala/crear', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ codigo, config }),
        });
        if (respuesta.status !== 409) return respuesta;
    }
    return json({ error: 'No se pudo generar un código de sala. Inténtalo de nuevo.' }, 503);
}

async function api(request, env, url) {
    if (/^\/api\/salas\/?$/.test(url.pathname)) {
        if (request.method !== 'POST') return json({ error: 'Método no permitido.' }, 405);
        return crear(request, env);
    }

    const ruta = url.pathname.match(/^\/api\/salas\/([^/]+)(\/ws)?\/?$/);
    if (!ruta) return json({ error: 'Ruta no encontrada.' }, 404);
    if (request.method !== 'GET') return json({ error: 'Método no permitido.' }, 405);

    const codigo = decodeURIComponent(ruta[1]).toUpperCase();
    if (!codigoValido(codigo)) return json({ error: 'Sala no encontrada.' }, 404);

    if (ruta[2]) {
        if (request.headers.get('Upgrade')?.toLowerCase() !== 'websocket') {
            return json({ error: 'Se esperaba una conexión WebSocket.' }, 426);
        }
        return sala(env, codigo).fetch(new Request('https://sala/ws', request));
    }
    return sala(env, codigo).fetch('https://sala/info');
}

export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        if (!url.pathname.startsWith('/api/')) return env.ASSETS.fetch(request);
        try {
            return await api(request, env, url);
        } catch (error) {
            console.error(error);
            return json({ error: 'Error interno del servidor.' }, 500);
        }
    },
};
