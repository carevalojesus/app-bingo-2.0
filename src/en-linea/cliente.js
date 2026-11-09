// Conexión con una sala en línea (Durable Object) por WebSocket, con reconexión.
// Protocolo: docs/en-linea.md

export const CLAVES = {
    jugador: (codigo) => `bingoshow.jugador.${codigo}`,
    anfitrion: (codigo) => `bingoshow.anfitrion.${codigo}`,
    apodo: 'bingoshow.apodo',
};

export const normalizarCodigo = (texto) => String(texto ?? '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6);

async function pedir(ruta, opciones) {
    const respuesta = await fetch(ruta, {
        ...opciones,
        headers: { 'content-type': 'application/json', ...(opciones?.headers || {}) },
    });
    const datos = await respuesta.json().catch(() => ({}));
    if (!respuesta.ok) throw new Error(datos.error || `Error ${respuesta.status}`);
    return datos;
}

// POST /api/salas → { codigo, tokenAnfitrion }
export const crearSala = (config) => pedir('/api/salas', { method: 'POST', body: JSON.stringify(config) });

// GET /api/salas/:codigo → { codigo, nombre, estado, jugadores, config }
export const consultarSala = (codigo) => pedir(`/api/salas/${encodeURIComponent(normalizarCodigo(codigo))}`);

export function conectarSala(codigo, { hola, alMensaje, alCambiarConexion = () => {} }) {
    const url = new URL(`/api/salas/${encodeURIComponent(normalizarCodigo(codigo))}/ws`, location.href);
    url.protocol = url.protocol === 'https:' ? 'wss:' : 'ws:';

    let ws = null;
    let intentos = 0;
    let cerrada = false;
    let temporizador = null;
    let latido = null;

    function abrir() {
        alCambiarConexion(intentos === 0 ? 'conectando' : 'reconectando');
        ws = new WebSocket(url);
        ws.addEventListener('open', () => {
            intentos = 0;
            ws.send(JSON.stringify({ tipo: 'hola', ...hola() }));
            alCambiarConexion('conectado');
            clearInterval(latido);
            latido = setInterval(() => enviar({ tipo: 'ping' }), 25000);
        });
        ws.addEventListener('message', (evento) => {
            let mensaje;
            try { mensaje = JSON.parse(evento.data); } catch { return; }
            if (mensaje.tipo === 'expulsado' || mensaje.tipo === 'salaCerrada') cerrada = true;
            alMensaje(mensaje);
        });
        ws.addEventListener('close', (evento) => {
            clearInterval(latido);
            // 4004 caducada o inexistente, 4005 cerrada por el administrador, 4006 cerrada por el anfitrión
            if (evento.code >= 4004 && evento.code <= 4006) cerrada = true;
            if (cerrada) return alCambiarConexion('cerrado');
            const espera = Math.min(8000, 500 * 2 ** intentos++);
            alCambiarConexion('reconectando');
            temporizador = setTimeout(abrir, espera);
        });
    }

    function enviar(mensaje) {
        if (ws?.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(mensaje));
            return true;
        }
        return false;
    }

    function cerrar() {
        cerrada = true;
        clearTimeout(temporizador);
        clearInterval(latido);
        ws?.close();
    }

    abrir();
    return { enviar, cerrar };
}
