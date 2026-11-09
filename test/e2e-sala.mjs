// Prueba de punta a punta del modo en línea contra `wrangler dev` (Node 24: fetch y WebSocket globales).
//
//   npm run test:e2e                 # puerto 8787 (o PUERTO=8788 npm run test:e2e)
//
// Si en el puerto ya hay un `wrangler dev --var MODO_PRUEBA:1` de este proyecto lo usa; si no hay
// nada escuchando, lo arranca él mismo (con estado en una carpeta temporal) y lo cierra al terminar.
// Si el puerto lo ocupa otra cosa, falla con un mensaje claro.

import { spawn } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import assert from 'node:assert/strict';
import { generarCarton, verificar } from '../src/carton.js';
import { nuevaSemilla, verificarPartida } from '../src/justo.js';

const PUERTO = Number(process.env.PUERTO || 8787);
const BASE = `http://localhost:${PUERTO}`;
const WS_BASE = `ws://localhost:${PUERTO}`;
const raiz = new URL('..', import.meta.url).pathname;

let wrangler = null;
let carpetaEstado = null;

const dormir = (ms) => new Promise((r) => setTimeout(r, ms));
const paso = (texto) => console.log(`✔ ${texto}`);

// ---------- Servidor ----------
async function esNuestroServidor() {
    try {
        const r = await fetch(`${BASE}/api/salas/AAAAAA`);
        const datos = await r.json().catch(() => null);
        return r.status === 404 && typeof datos?.error === 'string' ? true : 'otro';
    } catch {
        return false;
    }
}

async function prepararServidor() {
    const estado = await esNuestroServidor();
    if (estado === true) return console.log(`Usando el servidor que ya corre en ${BASE}`);
    if (estado === 'otro') throw new Error(`El puerto ${PUERTO} lo usa otro servidor. Prueba con PUERTO=8788 npm run test:e2e`);

    carpetaEstado = mkdtempSync(join(tmpdir(), 'bingo-e2e-'));
    console.log(`Arrancando wrangler dev en ${BASE}…`);
    wrangler = spawn('npx', ['wrangler', 'dev', '--var', 'MODO_PRUEBA:1', '--port', String(PUERTO), '--persist-to', carpetaEstado], {
        cwd: raiz, stdio: ['ignore', 'pipe', 'pipe'], detached: true,
    });
    let salida = '';
    wrangler.stdout.on('data', (d) => { salida += d; });
    wrangler.stderr.on('data', (d) => { salida += d; });
    for (let i = 0; i < 120; i++) {
        if (wrangler.exitCode !== null) throw new Error(`wrangler terminó:\n${salida}`);
        if ((await esNuestroServidor()) === true) return;
        await dormir(500);
    }
    throw new Error(`wrangler no arrancó a tiempo:\n${salida}`);
}

function pararServidor() {
    if (wrangler && wrangler.exitCode === null) {
        try { process.kill(-wrangler.pid, 'SIGTERM'); } catch { /* ya terminó */ }
    }
    if (carpetaEstado) rmSync(carpetaEstado, { recursive: true, force: true });
}

// ---------- Cliente WebSocket de prueba ----------
class Cliente {
    constructor(nombre, codigo) {
        this.nombre = nombre;
        this.codigo = codigo;
        this.mensajes = [];   // todos los recibidos
        this.leidos = 0;      // hasta dónde ha consumido esperar()
        this.estado = null;   // última instantánea
        this.esperas = [];
        this.alMensaje = null;
    }

    abrir(hola) {
        this.mensajes = [];
        this.leidos = 0;
        this.cerrado = false;
        this.ws = new WebSocket(`${WS_BASE}/api/salas/${this.codigo}/ws`);
        this.ws.addEventListener('message', (e) => {
            const m = JSON.parse(e.data);
            if (m.estado && (m.tipo === 'estado' || m.tipo === 'bienvenida')) this.estado = m.estado;
            this.mensajes.push(m);
            this.alMensaje?.(m);
            this.esperas.forEach((f) => f());
        });
        this.ws.addEventListener('close', () => { this.cerrado = true; this.esperas.forEach((f) => f()); });
        return new Promise((resolver, rechazar) => {
            this.ws.addEventListener('open', () => {
                if (hola) this.enviar({ tipo: 'hola', ...hola });
                resolver();
            });
            this.ws.addEventListener('error', () => rechazar(new Error(`${this.nombre}: no se pudo conectar`)));
        });
    }

    enviar(mensaje) {
        this.ws.send(typeof mensaje === 'string' ? mensaje : JSON.stringify(mensaje));
    }

    // Espera el siguiente mensaje (desde el último consumido) que cumpla `condicion`
    esperar(condicion, descripcion = 'mensaje', ms = 5000) {
        const filtro = typeof condicion === 'string' ? (m) => m.tipo === condicion : condicion;
        return new Promise((resolver, rechazar) => {
            const revisar = () => {
                for (; this.leidos < this.mensajes.length; this.leidos++) {
                    const m = this.mensajes[this.leidos];
                    if (filtro(m)) {
                        this.leidos++;
                        quitar();
                        return resolver(m);
                    }
                }
            };
            const temporizador = setTimeout(() => {
                quitar();
                rechazar(new Error(`${this.nombre}: no llegó ${descripcion} en ${ms} ms. Últimos: ${JSON.stringify(this.mensajes.slice(-3)).slice(0, 600)}`));
            }, ms);
            const quitar = () => { clearTimeout(temporizador); this.esperas = this.esperas.filter((f) => f !== revisar); };
            this.esperas.push(revisar);
            revisar();
        });
    }

    esperarEstado(condicion, descripcion, ms) {
        return this.esperar((m) => (m.tipo === 'estado' || m.tipo === 'bienvenida') && condicion(m.estado), descripcion, ms);
    }

    esperarCierre(ms = 3000) {
        return new Promise((resolver, rechazar) => {
            const t = setTimeout(() => rechazar(new Error(`${this.nombre}: el servidor no cerró la conexión`)), ms);
            const revisar = () => { if (this.cerrado) { clearTimeout(t); resolver(); } };
            this.esperas.push(revisar);
            revisar();
        });
    }

    cerrar() {
        this.ws?.close();
    }
}

async function pedir(ruta, opciones) {
    const r = await fetch(`${BASE}${ruta}`, opciones);
    return { status: r.status, datos: await r.json() };
}

// Jugador automático: canta ¡Bingo! en cuanto uno de sus cartones completa el premio en juego
function automatico(cliente) {
    const cantados = new Set();
    const previo = cliente.alMensaje;
    cliente.alMensaje = (m) => {
        previo?.(m);
        if (m.tipo !== 'estado') return;
        const e = m.estado;
        if (!['jugando', 'pausa'].includes(e.estado) || e.premioActual === null || !e.serie) return;
        const { modalidad } = e.premios[e.premioActual];
        const yo = e.jugadores.find((j) => j.id === cliente.id);
        for (const numero of yo?.cartones ?? []) {
            const clave = `${e.premioActual}:${numero}`;
            if (cantados.has(clave)) continue;
            if (verificar(generarCarton(e.serie, numero), new Set(e.bolas), modalidad).gana) {
                cantados.add(clave);
                cliente.enviar({ tipo: 'bingo', numero });
            }
        }
    };
}

// ---------- Prueba ----------
async function principal() {
    await prepararServidor();

    // Archivos estáticos: lo público sí, el código fuente no
    for (const ruta of ['/', '/index.html', '/dist/app.js', '/carton.html', '/fonts/Bungee/bungee-latin-400-normal.woff2']) {
        assert.equal((await fetch(`${BASE}${ruta}`)).status, 200, `${ruta} debería servirse`);
    }
    for (const ruta of ['/package.json', '/src/main.js', '/src/carton.js', '/worker/index.js', '/wrangler.toml', '/.git/HEAD', '/test/e2e-sala.mjs']) {
        assert.equal((await fetch(`${BASE}${ruta}`)).status, 404, `${ruta} NO debería servirse`);
    }
    paso('assets: index.html, dist/ y fonts/ se sirven; package.json, src/, worker/ y .git no');

    // Crear sala
    const invalida = await pedir('/api/salas', { method: 'POST', body: JSON.stringify({ cartones: 2 }) });
    assert.equal(invalida.status, 400);
    assert.match(invalida.datos.error, /cartones/);
    const config = {
        nombre: 'Prueba E2E', cartones: 10, precioCarton: 10, maxCartonesPorJugador: 3, fichasIniciales: 25,
        intervalo: 150, pozoExtra: 5, premios: [{ modalidad: 'linea', porcentaje: 30 }, { modalidad: 'lleno', porcentaje: 70 }],
    };
    const creada = await pedir('/api/salas', { method: 'POST', body: JSON.stringify(config) });
    assert.equal(creada.status, 201);
    const { codigo, tokenAnfitrion } = creada.datos;
    assert.match(codigo, /^[ABCDEFGHJKMNPQRSTUVWXYZ23456789]{6}$/);
    assert.match(tokenAnfitrion, /^[0-9a-f]{32}$/);
    const info = await pedir(`/api/salas/${codigo.toLowerCase()}`);
    assert.equal(info.status, 200);
    assert.deepEqual({ ...info.datos, config: undefined }, { codigo, nombre: 'Prueba E2E', estado: 'lobby', jugadores: 0, config: undefined });
    assert.equal(info.datos.config.intervalo, 150);
    assert.equal((await pedir('/api/salas/AAAAAA')).status, 404);
    assert.equal((await fetch(`${BASE}/api/salas/${codigo}/ws`)).status, 426);
    paso(`sala ${codigo} creada por HTTP (400 con configuración inválida, 404 si no existe)`);

    // Anfitrión
    const intruso = new Cliente('intruso', codigo);
    await intruso.abrir({ rol: 'anfitrion', token: '0'.repeat(32) });
    await intruso.esperar((m) => m.tipo === 'error' && /Token/.test(m.mensaje), 'error de token');
    await intruso.esperarCierre();

    const anfitrion = new Cliente('anfitrion', codigo);
    await anfitrion.abrir();
    anfitrion.enviar({ tipo: 'ping' });
    await anfitrion.esperar('pong', 'pong antes de hola');
    anfitrion.enviar({ tipo: 'iniciar' }); // antes de hola se ignora
    anfitrion.enviar({ tipo: 'hola', rol: 'anfitrion', token: tokenAnfitrion });
    const bienvenidaA = await anfitrion.esperar('bienvenida');
    assert.equal(bienvenidaA.rol, 'anfitrion');
    assert.equal(bienvenidaA.estado.estado, 'lobby');
    assert.equal(bienvenidaA.estado.anfitrionConectado, true);
    assert.equal(bienvenidaA.estado.serie, null);
    const compromiso = bienvenidaA.estado.justo.compromiso;
    assert.match(compromiso, /^[0-9a-f]{64}$/);
    assert.equal(bienvenidaA.estado.justo.semillaServidor, null);
    assert.equal(bienvenidaA.token, undefined);
    paso('anfitrión: token falso rechazado, se ignora todo antes de hola, bienvenida correcta');

    // Jugadores
    const jugadores = {};
    for (const apodo of ['Ana', 'Beto', 'Caro']) {
        const c = new Cliente(apodo, codigo);
        c.semilla = nuevaSemilla(16);
        await c.abrir({ rol: 'jugador', apodo, semilla: c.semilla });
        const b = await c.esperar('bienvenida');
        assert.match(b.token, /^[0-9a-f]{32}$/);
        c.id = b.jugadorId;
        c.token = b.token;
        jugadores[apodo] = c;
    }
    const { Ana: ana, Beto: beto, Caro: caro } = jugadores;
    const vista = await anfitrion.esperarEstado((e) => e.jugadores.length === 3, '3 jugadores');
    assert.ok(vista.estado.jugadores.every((j) => j.conectado && j.fichas === 25));
    for (const c of [anfitrion, ...Object.values(jugadores)]) {
        assert.ok(!c.mensajes.some((m) => JSON.stringify(m.estado ?? {}).includes('token')), `${c.nombre} recibió un token en una instantánea`);
    }
    paso('3 jugadores unidos con su token; ninguna instantánea lleva tokens');

    // Mensajes no válidos y permisos
    ana.enviar('{esto no es json');
    await ana.esperar((m) => m.tipo === 'error', 'error por JSON inválido');
    ana.enviar({ tipo: 'elegirCarton', relleno: 'x'.repeat(5000) });
    await ana.esperar((m) => m.tipo === 'error' && /grande/.test(m.mensaje), 'error por mensaje > 4 KB');
    ana.enviar({ tipo: 'iniciar' });
    await ana.esperar((m) => m.tipo === 'error' && /anfitrión/.test(m.mensaje), 'error de permisos');
    anfitrion.enviar({ tipo: 'bingo', numero: 1 });
    await anfitrion.esperar((m) => m.tipo === 'error' && /jugadores/.test(m.mensaje), 'error de permisos del anfitrión');
    anfitrion.enviar({ tipo: 'iniciar' });
    await anfitrion.esperar((m) => m.tipo === 'error' && /al menos un cartón/.test(m.mensaje), 'iniciar sin cartones');
    paso('JSON inválido, > 4 KB, permisos de rol e iniciar sin cartones → error');

    // Lobby: cartones
    const elegir = async (c, numero, error) => {
        c.enviar({ tipo: 'elegirCarton', numero });
        if (error) return c.esperar((m) => m.tipo === 'error' && error.test(m.mensaje), `error ${error}`);
        return c.esperarEstado((e) => e.ocupados[numero] === c.id, `cartón ${numero}`);
    };
    await elegir(ana, 1);
    await elegir(ana, 2);
    await elegir(beto, 1, /ya tiene dueño/);
    await elegir(ana, 3, /fichas suficientes/);
    await elegir(beto, 4);
    beto.enviar({ tipo: 'soltarCarton', numero: 4 });
    await beto.esperarEstado((e) => !e.ocupados[4] && e.jugadores.find((j) => j.id === beto.id).fichas === 25, 'soltar devuelve fichas');
    await elegir(beto, 6);
    await elegir(beto, 7);
    await elegir(caro, 5);
    const lobby = (await anfitrion.esperarEstado((e) => Object.keys(e.ocupados).length === 5, '5 cartones vendidos')).estado;
    assert.equal(lobby.pozo, 55);
    paso('cartones: conflicto de dueño, falta de fichas, soltar devuelve fichas; pozo 55');

    // Iniciar
    // Anfitrión y Caro siguen conectados toda la partida: cada `bola` debe llegar antes del `estado` que la incluye
    const serieVista = new Set();
    const fallosOrden = [];
    const ganadores = [];
    const comprobarOrden = (c) => {
        const recibidas = [];
        c.alMensaje = (m) => {
            if (m.tipo === 'bola') recibidas.push(m.numero);
            if (m.tipo === 'ganador' && c === anfitrion) ganadores.push(m);
            if (m.tipo === 'estado' && m.estado.serie) {
                serieVista.add(m.estado.serie);
                if (JSON.stringify(m.estado.bolas) !== JSON.stringify(recibidas)) fallosOrden.push(`${c.nombre}: ${m.estado.bolas.length} vs ${recibidas.length}`);
            }
        };
    };
    comprobarOrden(anfitrion);
    comprobarOrden(caro);

    anfitrion.enviar({ tipo: 'iniciar' });
    const primera = await caro.esperar('bola', 'primera bola');
    assert.equal(primera.indice, 0);
    const jugando = await caro.esperarEstado((e) => e.estado === 'jugando', 'estado jugando');
    assert.match(jugando.estado.serie, /^[A-Z0-9]{4}$/);
    assert.equal(jugando.estado.premioActual, 0);
    assert.deepEqual(jugando.estado.premios.map((p) => p.fichas), [16, 39]);
    paso(`partida iniciada: serie ${jugando.estado.serie} revelada, primera bola ${primera.numero}`);

    // Bingo falso de Caro con una sola bola
    caro.enviar({ tipo: 'bingo', numero: 5 });
    const rechazo = await caro.esperar('bingoRechazado', 'bingoRechazado');
    assert.equal(rechazo.carton, 5);
    assert.ok(rechazo.faltan.length >= 3);
    await beto.esperar((m) => m.tipo === 'aviso' && /falso/.test(m.texto), 'aviso de bingo falso');
    assert.ok(!beto.mensajes.some((m) => m.tipo === 'bingoRechazado'), 'bingoRechazado solo va al que cantó');
    paso('bingo falso: bingoRechazado solo a Caro y aviso a todos');

    // Pausa y reanudar
    anfitrion.enviar({ tipo: 'pausar' });
    const pausa = await caro.esperarEstado((e) => e.estado === 'pausa', 'pausa');
    assert.equal(pausa.estado.siguienteBolaEn, null);
    const bolasEnPausa = pausa.estado.bolas.length;
    await dormir(500);
    assert.equal(caro.estado.bolas.length, bolasEnPausa, 'no salen bolas en pausa');
    anfitrion.enviar({ tipo: 'reanudar' });
    await caro.esperarEstado((e) => e.estado === 'jugando' && e.bolas.length > bolasEnPausa, 'reanudar');
    paso('pausa congela el sorteo y reanudar lo continúa');

    // Reconexión de Ana con su token (antes de activar los jugadores automáticos)
    ana.cerrar();
    await anfitrion.esperarEstado((e) => e.jugadores.find((j) => j.id === ana.id)?.conectado === false, 'Ana desconectada');
    await ana.abrir({ rol: 'jugador', apodo: 'Otra', token: ana.token, semilla: nuevaSemilla(16) });
    const vuelta = await ana.esperar('bienvenida', 'bienvenida de reconexión');
    assert.equal(vuelta.jugadorId, ana.id);
    assert.equal(vuelta.token, undefined);
    const yo = vuelta.estado.jugadores.find((j) => j.id === ana.id);
    assert.equal(yo.apodo, 'Ana');
    assert.deepEqual(yo.cartones, [1, 2]);
    assert.equal(yo.conectado, true);
    paso('reconexión: Ana vuelve con su token, mismo id, mismos cartones');

    // Jugadores automáticos hasta terminar: línea → lleno
    for (const c of [ana, beto, caro]) automatico(c);

    const fin = await anfitrion.esperarEstado((e) => e.estado === 'terminada', 'partida terminada', 30000);
    assert.deepEqual(ganadores.map((g) => g.modalidad), ['linea', 'lleno']);
    assert.equal(ganadores[0].siguiente, 'lleno');
    assert.equal(ganadores[1].siguiente, null);
    const repartido = ganadores.flatMap((g) => g.ganadores).reduce((s, g) => s + g.fichas, 0);
    assert.equal(repartido, 55, 'se reparte todo el pozo');
    for (const g of ganadores) {
        for (const { carton } of g.ganadores) {
            // El cartón ganador es válido con las bolas que había al cantar
            assert.ok(verificar(generarCarton(fin.estado.serie, carton), new Set(fin.estado.bolas), g.modalidad).gana);
        }
    }
    const fichasTotales = fin.estado.jugadores.reduce((s, j) => s + j.fichas, 0);
    assert.equal(fichasTotales, 75 - 50 + 55, 'fichas: iniciales − ventas + premios (el pozo extra lo pone el anfitrión)');
    assert.equal(fin.estado.premioActual, null);
    assert.equal(serieVista.size, 1, 'la serie no cambia durante la partida');
    assert.deepEqual(fallosOrden, [], 'cada bola llega antes de su estado');
    // Partida verificable: el compromiso no cambió y todo sale de las semillas reveladas
    const { justo } = fin.estado;
    assert.equal(justo.compromiso, compromiso);
    assert.deepEqual(
        [...justo.semillasClientes].sort((a, b) => a.apodo.localeCompare(b.apodo)),
        [ana, beto, caro].map((c) => ({ apodo: c.nombre, semilla: c.semilla })),
        'las semillas de los jugadores (la primera de Ana, no la de la reconexión)',
    );
    assert.ok(!anfitrion.mensajes.concat(caro.mensajes).some((m) => m.tipo === 'estado' && m.estado.estado !== 'terminada'
        && JSON.stringify(m.estado).includes(justo.semillaServidor)), 'la semilla del servidor no se reveló antes de terminar');
    const verificacion = verificarPartida({ ...justo, serie: fin.estado.serie, bolas: fin.estado.bolas });
    assert.deepEqual(verificacion, { valida: true, errores: [] });
    paso('partida verificable: verificarPartida() da válida con las semillas reveladas');

    const texto = ganadores.map((g) => `${g.modalidad}: ${g.ganadores.map((x) => `${x.apodo}#${x.carton}=${x.fichas}`).join(', ')}`).join(' | ');
    paso(`premios encadenados hasta terminada tras ${fin.estado.bolas.length} bolas (${texto})`);

    // Nueva partida: conserva saldos, libera cartones
    for (const c of [anfitrion, ana, beto, caro]) c.alMensaje = null;
    const saldos = Object.fromEntries(fin.estado.jugadores.map((j) => [j.id, j.fichas]));
    anfitrion.enviar({ tipo: 'nuevaPartida' });
    const nueva = await anfitrion.esperarEstado((e) => e.estado === 'lobby', 'nueva partida');
    assert.deepEqual(Object.fromEntries(nueva.estado.jugadores.map((j) => [j.id, j.fichas])), saldos);
    assert.deepEqual(nueva.estado.ocupados, {});
    assert.deepEqual(nueva.estado.bolas, []);
    assert.equal(nueva.estado.serie, null);
    assert.notEqual(nueva.estado.justo.compromiso, compromiso);
    assert.equal(nueva.estado.justo.semillaServidor, null);
    paso('nueva partida: lobby, saldos conservados, cartones libres');

    // Expulsar a Caro: recupera las fichas del cartón y se cierra su conexión
    const saldoCaro = saldos[caro.id];
    if (saldoCaro >= 10) {
        await elegir(caro, 9);
    }
    anfitrion.enviar({ tipo: 'expulsar', jugadorId: caro.id });
    await caro.esperar('expulsado');
    await caro.esperarCierre();
    const sinCaro = await anfitrion.esperarEstado((e) => e.jugadores.length === 2, 'Caro expulsada');
    assert.equal(sinCaro.estado.ocupados[9], undefined);
    paso('expulsar: mensaje expulsado, conexión cerrada y cartón liberado');

    const infoFinal = await pedir(`/api/salas/${codigo}`);
    assert.equal(infoFinal.datos.jugadores, 2);
    assert.equal(infoFinal.datos.estado, 'lobby');

    for (const c of [anfitrion, ana, beto]) c.cerrar();
    console.log('\nE2E OK');
}

let codigoSalida = 0;
try {
    await principal();
} catch (error) {
    console.error('\n✘ E2E FALLÓ:', error);
    codigoSalida = 1;
} finally {
    pararServidor();
}
process.exit(codigoSalida);
