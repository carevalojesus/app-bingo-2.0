// Durable Object de una sala: guarda el estado, programa la alarma y reparte mensajes.
// Las reglas viven en juego.js. Protocolo: docs/en-linea.md

import { DurableObject } from 'cloudflare:workers';
import * as juego from './juego.js';

const MAX_MENSAJE = 4096;
const CLAVE = 'sala';
const MAX_LOGO = 60 * 1024;
const TIPOS_LOGO = ['image/png', 'image/jpeg', 'image/webp'];

// Logo del evento: data URL PNG, JPEG o WebP de hasta 60 KB, solo en el plan Pro.
// Devuelve { tipo, datos (base64) } o null; lanza ErrorJuego si no vale.
function leerLogo(dataUrl, pro) {
    if (dataUrl === undefined || dataUrl === null || dataUrl === '') return null;
    if (!pro) throw new juego.ErrorJuego('El logo del evento es del plan Pro.');
    const partes = typeof dataUrl === 'string' && dataUrl.match(/^data:(image\/[a-z]+);base64,([A-Za-z0-9+/=]+)$/);
    if (!partes || !TIPOS_LOGO.includes(partes[1])) throw new juego.ErrorJuego('El logo debe ser una imagen PNG, JPEG o WebP.');
    if (partes[2].length * 0.75 > MAX_LOGO) throw new juego.ErrorJuego('El logo es demasiado grande (máximo 60 KB).');
    return { tipo: partes[1], datos: partes[2] };
}

// Una sala sin actividad durante este tiempo (y sin nadie conectado) se borra
export const CADUCIDAD_MS = 7 * 24 * 60 * 60 * 1000;

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
    elegirCarton: (sala, m, s) => juego.elegirCarton(sala, s.jugadorId, m.numero, m.numeros),
    repetir: (sala, m, s) => juego.fijarRepetir(sala, s.jugadorId, m.valor),
    detenerCuenta: (sala) => juego.detenerCuenta(sala),
    pedirFichas: (sala, m, s, ahora) => juego.pedirFichas(sala, s.jugadorId, m.cantidad, ahora),
    admitir: (sala, m, s, ahora) => juego.admitir(sala, m.jugadorId, ahora),
    darFichas: (sala, m, s, ahora) => juego.darFichas(sala, m.jugadorId, m.cantidad, ahora),
    vincular: (sala, m, s, ahora) => juego.crearVinculo(sala, ahora),
    soltarCarton: (sala, m, s) => juego.soltarCarton(sala, s.jugadorId, m.numero),
    bingo: (sala, m, s, ahora) => juego.cantarBingo(sala, s.jugadorId, m.numero, ahora, m.marcas),
    iniciar: (sala, m, s, ahora) => juego.iniciar(sala, ahora),
    pausar: (sala) => juego.pausar(sala),
    reanudar: (sala, m, s, ahora) => juego.reanudar(sala, ahora),
    nuevaPartida: (sala, m, s, ahora) => juego.nuevaPartida(sala, juego.AZAR, { ahora, repetir: sala.config.rondasSeguidas }),
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
                // Salas guardadas antes de que existiera la caducidad: se les programa ahora
                if (!this.sala.ultimaActividad) await this.guardar();
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
            const { codigo, config, pro } = await request.json();
            let logo = null;
            try {
                logo = leerLogo(config?.logo, Boolean(pro));
                this.sala = juego.crearSala(codigo, config, { prueba: this.prueba, pro });
                // Solo en modo prueba: caducidad corta para poder probarla
                if (this.prueba && Number.isInteger(config?.caducidadMs) && config.caducidadMs >= 300) {
                    this.sala.caducidadMs = config.caducidadMs;
                }
            } catch (error) {
                if (error instanceof juego.ErrorJuego) return json({ error: error.message }, 400);
                throw error;
            }
            if (logo) {
                await this.ctx.storage.put('logo', logo);
                this.sala.logo = crypto.randomUUID().slice(0, 8);
            }
            await this.guardar();
            return json({ codigo, tokenAnfitrion: this.sala.tokenAnfitrion, pro: Boolean(pro) }, 201);
        }

        if (!this.sala) return json({ error: 'Sala no encontrada.' }, 404);

        if (url.pathname === '/info') return json(juego.resumen(this.sala));

        // Cierre por el administrador (solo llega desde el Worker: no hay ruta pública hasta aquí)
        if (url.pathname === '/cerrar' && request.method === 'POST') {
            const codigo = this.sala.codigo;
            await this.borrar('El administrador cerró esta sala.', 4005);
            return json({ cerrada: codigo });
        }

        // Vincular otro dispositivo como anfitrión con el código de 6 cifras que muestra el show
        if (url.pathname === '/vincular' && request.method === 'POST') {
            const { codigo } = await request.json().catch(() => ({}));
            try {
                const tokenAnfitrion = juego.usarVinculo(this.sala, codigo, Date.now());
                await this.guardar();
                return json({ tokenAnfitrion });
            } catch (error) {
                await this.guardar(); // cuenta el fallo
                if (error instanceof juego.ErrorJuego) return json({ error: error.message }, 400);
                throw error;
            }
        }

        // Logo del evento (Pro). La URL lleva ?v=versión, así que se puede cachear sin miedo.
        if (url.pathname === '/logo') {
            const logo = this.sala.logo ? await this.ctx.storage.get('logo') : null;
            if (!logo) return json({ error: 'Esta sala no tiene logo.' }, 404);
            const bytes = Uint8Array.from(atob(logo.datos), (c) => c.charCodeAt(0));
            return new Response(bytes, {
                headers: { 'content-type': logo.tipo, 'cache-control': 'public, max-age=86400', 'x-content-type-options': 'nosniff' },
            });
        }

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
        if (tipo === 'reaccion') return this.reaccion(ws, mensaje, sesion);
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
            enviar(ws, { tipo: 'bienvenida', rol: 'anfitrion', estado: juego.instantanea(sala, { anfitrion: true }) });
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

    // Reacción rápida: se reenvía a todos sin guardar nada. Como mucho una cada 800 ms por conexión.
    reaccion(ws, mensaje, sesion) {
        if (!juego.REACCIONES.includes(mensaje.emoji)) return enviar(ws, { tipo: 'error', mensaje: 'Reacción no válida.' });
        const ahora = Date.now();
        if (ahora - (sesion.ultimaReaccion ?? 0) < 800) return;
        ws.serializeAttachment({ ...sesion, ultimaReaccion: ahora });
        const apodo = this.sala.jugadores.find((j) => j.id === sesion.jugadorId)?.apodo ?? '?';
        const mensajeReaccion = { tipo: 'reaccion', emoji: mensaje.emoji, apodo };
        for (const socket of this.identificados()) enviar(socket, mensajeReaccion);
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
        if (await this.caducar()) return;
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

    // ---------- Caducidad ----------
    caducaEn() {
        return (this.sala.ultimaActividad ?? Date.now()) + (this.sala.caducidadMs ?? CADUCIDAD_MS);
    }

    // Si la sala lleva demasiado sin actividad la borra entera (estado, alarma y conexiones).
    // Con alguien conectado no se borra: cuenta como actividad y se aplaza.
    async caducar() {
        if (Date.now() < this.caducaEn()) return false;
        const conectados = this.identificados();
        if (conectados.length) {
            await this.guardar();
            return true;
        }
        await this.borrar(null, 4004);
        return true;
    }

    // Borra la sala entera: avisa (si hay texto), cierra las conexiones y la quita del registro
    async borrar(aviso, codigoCierre) {
        const codigo = this.sala?.codigo;
        for (const ws of this.ctx.getWebSockets()) {
            if (aviso) enviar(ws, { tipo: 'aviso', texto: aviso });
            try { ws.close(codigoCierre, aviso ? 'Sala cerrada' : 'Sala caducada'); } catch { /* ya cerrado */ }
        }
        this.sala = null;
        await this.ctx.storage.deleteAlarm();
        await this.ctx.storage.deleteAll();
        if (codigo && this.env.REGISTRO) {
            try {
                await this.env.REGISTRO.get(this.env.REGISTRO.idFromName('registro')).quitarSala(codigo);
            } catch (error) {
                console.error('No se pudo quitar la sala del registro', error);
            }
        }
    }

    // ---------- Utilidades ----------
    // Guarda la sala y programa la alarma: el próximo evento del juego o, si no hay, la caducidad
    async guardar() {
        this.sala.ultimaActividad = Date.now();
        await this.ctx.storage.put(CLAVE, this.sala);
        const cuando = juego.proximoEvento(this.sala);
        await this.ctx.storage.setAlarm(Math.min(cuando ?? Infinity, this.caducaEn()));
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
    // `para`: un jugadorId o 'anfitrion'. El anfitrión recibe además lo que solo ve él (peticiones y registro).
    difundir(eventos, excluirEstado = null) {
        const sockets = this.identificados();
        const esAnfitrion = (ws) => ws.deserializeAttachment().rol === 'anfitrion';
        for (const { para, ...mensaje } of eventos) {
            const destino = !para ? sockets
                : para === 'anfitrion' ? sockets.filter(esAnfitrion)
                    : sockets.filter((ws) => ws.deserializeAttachment().jugadorId === para);
            destino.forEach((ws) => enviar(ws, mensaje));
        }
        const publico = { tipo: 'estado', estado: juego.instantanea(this.sala) };
        const privado = { tipo: 'estado', estado: juego.instantanea(this.sala, { anfitrion: true }) };
        sockets.filter((ws) => ws !== excluirEstado).forEach((ws) => enviar(ws, esAnfitrion(ws) ? privado : publico));
    }
}
