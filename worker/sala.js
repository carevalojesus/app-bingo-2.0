// Durable Object de una sala: guarda el estado, programa la alarma y reparte mensajes.
// Las reglas viven en juego.js. Protocolo: docs/en-linea.md

import { DurableObject } from 'cloudflare:workers';
import * as juego from './juego.js';

const MAX_MENSAJE = 4096;
const CLAVE = 'sala';

const json = (datos, status = 200) => Response.json(datos, { status });

function enviar(ws, mensaje) {
    try {
        ws.send(JSON.stringify(mensaje));
    } catch {
        // El socket ya se cerró: lo limpiará webSocketClose
    }
}

// Cada acción recibe (sala, mensaje, sesión, ahora); los permisos se comprueban antes
const ACCIONES = {
    elegirCarton: (sala, m, s) => juego.elegirCarton(sala, s.jugadorId, m.numero),
    soltarCarton: (sala, m, s) => juego.soltarCarton(sala, s.jugadorId, m.numero),
    bingo: (sala, m, s, ahora) => juego.cantarBingo(sala, s.jugadorId, m.numero, ahora),
    iniciar: (sala, m, s, ahora) => juego.iniciar(sala, ahora),
    pausar: (sala) => juego.pausar(sala),
    reanudar: (sala, m, s, ahora) => juego.reanudar(sala, ahora),
    nuevaPartida: (sala) => juego.nuevaPartida(sala),
    velocidad: (sala, m, s, ahora) => juego.cambiarVelocidad(sala, m.intervalo, ahora),
};

export class Sala extends DurableObject {
    constructor(ctx, env) {
        super(ctx, env);
        this.prueba = env.MODO_PRUEBA === '1';
        this.sala = null;
        ctx.blockConcurrencyWhile(async () => {
            this.sala = (await ctx.storage.get(CLAVE)) ?? null;
            if (!this.sala) return;
            // Una sala guardada por otra versión del servidor puede venir incompleta
            try {
                const eventos = juego.sanear(this.sala);
                if (eventos.length) {
                    await this.guardar();
                    this.difundir(eventos);
                }
            } catch (error) {
                console.error('No se pudo sanear la sala guardada', error);
            }
        });
        // El latido del cliente se responde sin despertar al objeto
        ctx.setWebSocketAutoResponse(new WebSocketRequestResponsePair('{"tipo":"ping"}', '{"tipo":"pong"}'));
    }

    // ---------- HTTP interno (lo llama worker/index.js) ----------
    async fetch(request) {
        const url = new URL(request.url);

        if (url.pathname === '/crear' && request.method === 'POST') {
            if (this.sala) return json({ error: 'Ese código ya está en uso.' }, 409);
            const { codigo, config } = await request.json();
            try {
                this.sala = juego.crearSala(codigo, config, { prueba: this.prueba });
            } catch (error) {
                if (error instanceof juego.ErrorJuego) return json({ error: error.message }, 400);
                throw error;
            }
            await this.guardar();
            return json({ codigo, tokenAnfitrion: this.sala.tokenAnfitrion }, 201);
        }

        if (!this.sala) return json({ error: 'Sala no encontrada.' }, 404);

        if (url.pathname === '/info') return json(juego.resumen(this.sala));

        if (url.pathname === '/ws') {
            if (request.headers.get('Upgrade')?.toLowerCase() !== 'websocket') {
                return json({ error: 'Se esperaba una conexión WebSocket.' }, 426);
            }
            const { 0: cliente, 1: servidor } = new WebSocketPair();
            this.ctx.acceptWebSocket(servidor);
            servidor.serializeAttachment({ rol: null });
            return new Response(null, { status: 101, webSocket: cliente });
        }

        return json({ error: 'Ruta no encontrada.' }, 404);
    }

    // ---------- WebSocket (Hibernation API) ----------
    async webSocketMessage(ws, datos) {
        if (typeof datos !== 'string' || datos.length > MAX_MENSAJE) {
            return enviar(ws, { tipo: 'error', mensaje: 'Mensaje demasiado grande o no válido.' });
        }
        let mensaje;
        try {
            mensaje = JSON.parse(datos);
        } catch {
            return enviar(ws, { tipo: 'error', mensaje: 'Mensaje mal formado.' });
        }
        if (!mensaje || typeof mensaje !== 'object' || typeof mensaje.tipo !== 'string') {
            return enviar(ws, { tipo: 'error', mensaje: 'Mensaje mal formado.' });
        }
        if (!this.sala) {
            enviar(ws, { tipo: 'error', mensaje: 'Sala no encontrada.' });
            return ws.close(4004, 'Sala no encontrada');
        }

        const sesion = ws.deserializeAttachment() ?? {};
        if (!sesion.rol) {
            // Antes de `hola` se ignora todo lo demás
            if (mensaje.tipo === 'hola') await this.hola(ws, mensaje);
            return;
        }

        const { tipo } = mensaje;
        if (tipo === 'ping') return enviar(ws, { tipo: 'pong' });
        if (tipo === 'hola') return enviar(ws, { tipo: 'error', mensaje: 'Ya te identificaste.' });

        try {
            juego.comprobarPermiso(sesion.rol, tipo);
        } catch (error) {
            return enviar(ws, { tipo: 'error', mensaje: error.message });
        }
        if (tipo === 'expulsar') return this.expulsar(ws, mensaje.jugadorId);
        const ahora = Date.now();
        return this.ejecutar(ws, () => ACCIONES[tipo](this.sala, mensaje, sesion, ahora));
    }

    async webSocketClose(ws) {
        await this.desconectar(ws);
    }

    async webSocketError(ws) {
        await this.desconectar(ws);
    }

    async desconectar(ws) {
        ws.serializeAttachment({ rol: null });
        try { ws.close(1000, 'Adiós'); } catch { /* ya cerrado */ }
        if (this.sala && this.actualizarConexiones(ws)) {
            await this.guardar();
            this.difundir([]);
        }
    }

    async hola(ws, mensaje) {
        const sala = this.sala;
        if (mensaje.rol === 'anfitrion') {
            if (!juego.esAnfitrion(sala, mensaje.token)) {
                enviar(ws, { tipo: 'error', mensaje: 'Token de anfitrión no válido.' });
                return ws.close(4003, 'Token no válido');
            }
            ws.serializeAttachment({ rol: 'anfitrion' });
            this.actualizarConexiones();
            await this.guardar();
            enviar(ws, { tipo: 'bienvenida', rol: 'anfitrion', estado: juego.instantanea(sala) });
            return this.difundir([], ws);
        }

        if (mensaje.rol === 'jugador') {
            let union;
            try {
                union = juego.unirJugador(sala, { apodo: mensaje.apodo, token: mensaje.token, semilla: mensaje.semilla });
            } catch (error) {
                if (!(error instanceof juego.ErrorJuego)) throw error;
                enviar(ws, { tipo: 'error', mensaje: error.message });
                return ws.close(4000, 'No se pudo entrar');
            }
            const { jugador, nuevo } = union;
            ws.serializeAttachment({ rol: 'jugador', jugadorId: jugador.id });
            this.actualizarConexiones();
            await this.guardar();
            const bienvenida = { tipo: 'bienvenida', rol: 'jugador', jugadorId: jugador.id, estado: juego.instantanea(sala) };
            if (nuevo) bienvenida.token = jugador.token;
            enviar(ws, bienvenida);
            const eventos = nuevo ? [{ tipo: 'aviso', texto: `${jugador.apodo} entró a la sala.` }] : [];
            return this.difundir(eventos, ws);
        }

        enviar(ws, { tipo: 'error', mensaje: 'Rol desconocido.' });
        ws.close(4000, 'Rol desconocido');
    }

    async ejecutar(ws, accion) {
        let eventos;
        try {
            eventos = accion();
        } catch (error) {
            if (!(error instanceof juego.ErrorJuego)) {
                console.error(error);
                return enviar(ws, { tipo: 'error', mensaje: 'Error interno del servidor.' });
            }
            return enviar(ws, { tipo: 'error', mensaje: error.message });
        }
        await this.guardar();
        this.difundir(eventos);
    }

    async expulsar(ws, jugadorId) {
        const sockets = this.socketsDe(jugadorId);
        let eventos;
        try {
            eventos = juego.expulsar(this.sala, jugadorId);
        } catch (error) {
            if (!(error instanceof juego.ErrorJuego)) throw error;
            return enviar(ws, { tipo: 'error', mensaje: error.message });
        }
        for (const socket of sockets) {
            enviar(socket, { tipo: 'expulsado' });
            socket.serializeAttachment({ rol: null });
            try { socket.close(4001, 'Expulsado'); } catch { /* ya cerrado */ }
        }
        this.actualizarConexiones();
        await this.guardar();
        this.difundir(eventos);
    }

    // ---------- Alarma: siguiente bola, cierre de ventana o reanudación tras premio ----------
    async alarm() {
        if (!this.sala) return;
        try {
            // Normalmente hay un solo evento pendiente; el límite evita bucles si algo falla
            for (let i = 0; i < 100; i++) {
                const eventos = juego.avanzar(this.sala, Date.now());
                if (!eventos) break;
                this.difundir(eventos);
            }
            await this.guardar();
        } catch (error) {
            // Un error aquí no debe repetirse en cada reintento de la alarma ni dejar a los
            // clientes esperando una bola que no llega: la partida termina de forma limpia.
            console.error('Error en la alarma de la sala', error);
            await this.recuperar();
        }
    }

    async recuperar() {
        let eventos = [];
        try {
            if (this.sala.estado === 'jugando' || this.sala.estado === 'pausa') eventos = juego.interrumpir(this.sala);
            else {
                this.sala.siguienteBolaEn = null;
                this.sala.ventanaHasta = null;
            }
            await this.guardar();
        } catch (error) {
            console.error('No se pudo recuperar la sala', error);
            try { await this.ctx.storage.deleteAlarm(); } catch { /* nada más que hacer */ }
            eventos = [{ tipo: 'aviso', texto: 'Error del servidor en la sala.' }];
        }
        try { this.difundir(eventos); } catch { /* sin instantánea posible */ }
    }

    // ---------- Utilidades ----------
    async guardar() {
        await this.ctx.storage.put(CLAVE, this.sala);
        const cuando = juego.proximoEvento(this.sala);
        if (cuando === null) await this.ctx.storage.deleteAlarm();
        else await this.ctx.storage.setAlarm(cuando);
    }

    identificados(excluir = null) {
        return this.ctx.getWebSockets().filter((ws) => ws !== excluir && ws.deserializeAttachment()?.rol);
    }

    socketsDe(jugadorId) {
        return this.identificados().filter((ws) => ws.deserializeAttachment().jugadorId === jugadorId);
    }

    actualizarConexiones(excluir = null) {
        const ids = new Set();
        let anfitrion = false;
        for (const ws of this.identificados(excluir)) {
            const { rol, jugadorId } = ws.deserializeAttachment();
            if (rol === 'anfitrion') anfitrion = true;
            else if (jugadorId) ids.add(jugadorId);
        }
        return juego.marcarConexiones(this.sala, ids, anfitrion);
    }

    // Eventos (cada `bola` va antes del `estado` que la incluye) y después la instantánea a todos
    difundir(eventos, excluirEstado = null) {
        const sockets = this.identificados();
        for (const { para, ...mensaje } of eventos) {
            const destino = para ? sockets.filter((ws) => ws.deserializeAttachment().jugadorId === para) : sockets;
            destino.forEach((ws) => enviar(ws, mensaje));
        }
        const estado = { tipo: 'estado', estado: juego.instantanea(this.sala) };
        sockets.filter((ws) => ws !== excluirEstado).forEach((ws) => enviar(ws, estado));
    }
}
