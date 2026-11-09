// Verificación de Cloudflare Access para el panel de administración.
// Cuando una petición pasa por una aplicación de Access, Cloudflare añade la cabecera
// Cf-Access-Jwt-Assertion (y la cookie CF_Authorization) con un JWT firmado (RS256). Aquí se
// comprueba la firma con las claves públicas del equipo, la audiencia (AUD), el emisor y la fecha.
// Devuelve el correo autorizado o null.

let claves = { equipo: null, hasta: 0, lista: [] };

async function clavesPublicas(equipo) {
    if (claves.equipo === equipo && Date.now() < claves.hasta) return claves.lista;
    const r = await fetch(`https://${equipo}.cloudflareaccess.com/cdn-cgi/access/certs`);
    if (!r.ok) throw new Error(`No se pudieron leer las claves de Access (${r.status})`);
    const { keys = [] } = await r.json();
    const lista = await Promise.all(keys.map(async (jwk) => ({
        kid: jwk.kid,
        clave: await crypto.subtle.importKey('jwk', jwk, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify']),
    })));
    claves = { equipo, hasta: Date.now() + 60 * 60 * 1000, lista };
    return lista;
}

const desdeBase64Url = (texto) => Uint8Array.from(atob(texto.replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0));
const json = (parte) => JSON.parse(new TextDecoder().decode(desdeBase64Url(parte)));

function tokenDe(request) {
    const cabecera = request.headers.get('cf-access-jwt-assertion');
    if (cabecera) return cabecera;
    const cookie = request.headers.get('cookie') ?? '';
    return cookie.match(/(?:^|;\s*)CF_Authorization=([^;]+)/)?.[1] ?? null;
}

export async function usuarioAccess(request, env) {
    const equipo = String(env.ACCESS_EQUIPO ?? '').trim();
    const aud = String(env.ACCESS_AUD ?? '').trim();
    if (!equipo || !aud) return null;
    const token = tokenDe(request);
    if (!token) return null;
    try {
        const [cabecera, cuerpo, firma] = token.split('.');
        const { kid, alg } = json(cabecera);
        if (alg !== 'RS256') return null;
        const clave = (await clavesPublicas(equipo)).find((k) => k.kid === kid)?.clave;
        if (!clave) return null;
        const valida = await crypto.subtle.verify('RSASSA-PKCS1-v1_5', clave, desdeBase64Url(firma),
            new TextEncoder().encode(`${cabecera}.${cuerpo}`));
        if (!valida) return null;
        const datos = json(cuerpo);
        const audiencias = Array.isArray(datos.aud) ? datos.aud : [datos.aud];
        const ahora = Date.now() / 1000;
        if (!audiencias.includes(aud)) return null;
        if (datos.iss !== `https://${equipo}.cloudflareaccess.com`) return null;
        if (typeof datos.exp !== 'number' || datos.exp < ahora) return null;
        if (typeof datos.nbf === 'number' && datos.nbf > ahora + 60) return null;
        return datos.email ?? datos.sub ?? 'acceso';
    } catch {
        return null;
    }
}
