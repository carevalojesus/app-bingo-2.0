// Worker de Bingo Show: API de salas (/api/*) y archivos estáticos (Workers Static Assets).
// Protocolo: docs/en-linea.md

import { generarCodigo, codigoValido } from './juego.js';
import { validarCodigoPro, generarCodigoPro, normalizarCodigoPro } from '../src/codigos.js';

export { Sala } from './sala.js';
export { Limitador } from './limitador.js';
export { Registro } from './registro.js';

const MAX_CUERPO = 100 * 1024; // la configuración puede llevar el logo del evento (≤ 60 KB)
const INTENTOS_CODIGO = 8;

const json = (datos, status = 200) => Response.json(datos, { status });
const sala = (env, codigo) => env.SALAS.get(env.SALAS.idFromName(codigo));
const registro = (env) => env.REGISTRO.get(env.REGISTRO.idFromName('registro'));

// IP de quien pide. En modo prueba se puede simular otra con `x-prueba-ip` (para las pruebas E2E).
function ipDe(request, env) {
    if (env.MODO_PRUEBA === '1' && request.headers.get('x-prueba-ip')) return `prueba:${request.headers.get('x-prueba-ip')}`;
    return request.headers.get('cf-connecting-ip') || 'local';
}

async function crear(request, env) {
    // Límite de salas por IP (ver worker/limitador.js)
    const limitador = env.LIMITES.get(env.LIMITES.idFromName(ipDe(request, env)));
    const { permitido, reintentarEn } = await limitador.consultar();
    if (!permitido) {
        const minutos = Math.max(1, Math.ceil(reintentarEn / 60));
        return Response.json(
            { error: `Has creado demasiadas salas seguidas. Podrás crear otra en ${minutos} ${minutos === 1 ? 'minuto' : 'minutos'}.` },
            { status: 429, headers: { 'retry-after': String(reintentarEn) } },
        );
    }

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

    // Código Pro: se comprueba aquí con la clave secreta. Un código falso gasta cupo del límite
    // por IP, así que no se pueden probar códigos a lo loco.
    let pro = null;
    if (config && typeof config === 'object' && config.codigoPro) {
        if (!env.CODIGOS_SECRETO) return json({ error: 'Los códigos Pro aún no están activados en este servidor.' }, 503);
        const resultado = validarCodigoPro(env.CODIGOS_SECRETO, config.codigoPro);
        const normalizado = normalizarCodigoPro(config.codigoPro);
        if (resultado.valido && await registro(env).revocado(normalizado)) {
            resultado.valido = false;
            resultado.motivo = 'Este código Pro fue anulado. Escríbenos si crees que es un error.';
        }
        if (!resultado.valido) {
            await limitador.apuntar();
            return json({ error: resultado.motivo }, 400);
        }
        pro = { tipo: resultado.tipo, hasta: resultado.hasta, normalizado, codigo: `PRO-${normalizado.slice(0, 6)}-${normalizado.slice(6, 12)}-${normalizado.slice(12)}` };
    }

    // Si el código ya está en uso (409) se prueba con otro
    for (let i = 0; i < INTENTOS_CODIGO; i++) {
        const codigo = generarCodigo();
        const respuesta = await sala(env, codigo).fetch('https://sala/crear', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ codigo, config, pro: pro && { tipo: pro.tipo, hasta: pro.hasta } }),
        });
        if (respuesta.status === 201) {
            await limitador.apuntar();
            await registro(env).anotarSala({ sala: codigo, pro });
        }
        if (respuesta.status !== 409) return respuesta;
    }
    return json({ error: 'No se pudo generar un código de sala. Inténtalo de nuevo.' }, 503);
}

// ---------- Administración (admin.html) ----------
// Autorización: cabecera `Authorization: Bearer <ADMIN_CLAVE>`. Los intentos fallidos gastan
// cupo del limitador de la IP (prefijo admin:), así que no se puede adivinar la clave a lo loco.
const PLANES_VENTA = {
    evento: { tipo: 1, dias: 1, importe: 25 },
    mensual: { tipo: 2, dias: 30, importe: 60 },
    cortesia: { tipo: 3, dias: 1, importe: 0 },
};

async function igualesSeguro(a, b) {
    const [ha, hb] = await Promise.all([a, b].map((x) => crypto.subtle.digest('SHA-256', new TextEncoder().encode(x))));
    return crypto.subtle.timingSafeEqual(ha, hb);
}

async function admin(request, env, url) {
    if (!env.ADMIN_CLAVE || env.ADMIN_CLAVE.length < 12) return json({ error: 'El panel de administración no está configurado.' }, 503);
    const limitador = env.LIMITES.get(env.LIMITES.idFromName(`admin:${ipDe(request, env)}`));
    if (!(await limitador.consultar()).permitido) return json({ error: 'Demasiados intentos. Espera un rato.' }, 429);
    const clave = (request.headers.get('authorization') ?? '').replace(/^Bearer\s+/i, '');
    if (!clave || !(await igualesSeguro(clave, env.ADMIN_CLAVE))) {
        await limitador.apuntar();
        return json({ error: 'Clave de administración incorrecta.' }, 401);
    }
    const reg = registro(env);

    if (url.pathname === '/api/admin/resumen' && request.method === 'GET') return json(await reg.resumen());

    if (url.pathname === '/api/admin/codigos' && request.method === 'POST') {
        if (!env.CODIGOS_SECRETO) return json({ error: 'Falta la clave de los códigos (CODIGOS_SECRETO).' }, 503);
        const datos = await request.json().catch(() => ({}));
        const plan = PLANES_VENTA[datos.plan];
        if (!plan) return json({ error: 'Plan desconocido.' }, 400);
        const dias = datos.plan === 'cortesia' ? Number(datos.dias) : plan.dias;
        if (!Number.isInteger(dias) || dias < 1 || dias > 90) return json({ error: 'Los días deben ir de 1 a 90.' }, 400);
        const texto = (v, max) => String(v ?? '').replace(/[<>]/g, '').trim().slice(0, max);
        const { codigo, tipo, hasta } = generarCodigoPro(env.CODIGOS_SECRETO, { dias, tipo: plan.tipo });
        const emitido = await reg.emitir({
            normalizado: normalizarCodigoPro(codigo), codigo, tipo, hasta,
            nota: texto(datos.nota, 80), cliente: texto(datos.cliente, 20).replace(/[^\d+]/g, ''), importe: plan.importe,
        });
        return json(emitido, 201);
    }

    if (url.pathname === '/api/admin/codigos/anular' && request.method === 'POST') {
        const datos = await request.json().catch(() => ({}));
        const actualizado = await reg.fijarRevocado(normalizarCodigoPro(datos.codigo), datos.anulado !== false);
        return actualizado ? json(actualizado) : json({ error: 'Ese código no está en el registro.' }, 404);
    }
    return json({ error: 'Ruta no encontrada.' }, 404);
}

async function api(request, env, url) {
    if (url.pathname.startsWith('/api/admin/')) return admin(request, env, url);

    if (/^\/api\/salas\/?$/.test(url.pathname)) {
        if (request.method !== 'POST') return json({ error: 'Método no permitido.' }, 405);
        return crear(request, env);
    }

    const ruta = url.pathname.match(/^\/api\/salas\/([^/]+)(\/ws|\/logo|\/vincular)?\/?$/);
    if (!ruta) return json({ error: 'Ruta no encontrada.' }, 404);
    const codigo = decodeURIComponent(ruta[1]).toUpperCase();
    if (!codigoValido(codigo)) return json({ error: 'Sala no encontrada.' }, 404);

    if (ruta[2] === '/vincular') {
        if (request.method !== 'POST') return json({ error: 'Método no permitido.' }, 405);
        const cuerpo = await request.text();
        if (cuerpo.length > 200) return json({ error: 'Petición no válida.' }, 400);
        return sala(env, codigo).fetch('https://sala/vincular', { method: 'POST', body: cuerpo });
    }
    if (request.method !== 'GET') return json({ error: 'Método no permitido.' }, 405);

    if (ruta[2] === '/logo') return sala(env, codigo).fetch('https://sala/logo');
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
