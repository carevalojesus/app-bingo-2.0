// Prueba de punta a punta del modo en línea contra `wrangler dev` (Node 24: fetch y WebSocket globales).
//
//   npm run test:e2e                 # puerto 8787 (o PUERTO=8788 npm run test:e2e)
//
// Si en el puerto ya hay un `wrangler dev --var MODO_PRUEBA:1` de este proyecto lo usa; si no hay
// nada escuchando, lo arranca él mismo (con estado en una carpeta temporal) y lo cierra al terminar.
// Si el puerto lo ocupa otra cosa, falla con un mensaje claro.

import { spawn } from 'node:child_process';
import { mkdtempSync, rmSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import assert from 'node:assert/strict';
import { generarCarton, verificar } from '../src/carton.js';
import { nuevaSemilla, verificarPartida } from '../src/justo.js';
import { numerosDeFila } from '../src/filas.js';
import { generarCodigoPro } from '../src/codigos.js';

const PUERTO = Number(process.env.PUERTO || 8787);
const BASE = `http://localhost:${PUERTO}`;
const WS_BASE = `ws://localhost:${PUERTO}`;
const raiz = new URL('..', import.meta.url).pathname;
// Cada ejecución simula su propia IP (x-prueba-ip, solo en modo prueba) para no chocar con el
// límite de salas por hora si se reutiliza un servidor ya arrancado
const IP_PRUEBA = `e2e-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

// Secretos: los de .dev.vars (wrangler dev los carga) o unos de prueba
function secreto(nombre, porDefecto) {
    if (process.env[nombre]) return process.env[nombre];
    try {
        const m = readFileSync(join(new URL('..', import.meta.url).pathname, '.dev.vars'), 'utf8').match(new RegExp(`^${nombre}\\s*=\\s*"?([^"\\n]+)"?`, 'm'));
        if (m) return m[1].trim();
    } catch { /* sin .dev.vars */ }
    return porDefecto;
}
const CLAVE_CODIGOS = secreto('CODIGOS_SECRETO', 'e2e0'.repeat(16));
const CLAVE_ADMIN = secreto('ADMIN_CLAVE', 'clave-admin-e2e');
const codigoPro = (opciones) => generarCodigoPro(CLAVE_CODIGOS, opciones).codigo;

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
    wrangler = spawn('npx', ['wrangler', 'dev', '--var', 'MODO_PRUEBA:1', '--var', `CODIGOS_SECRETO:${CLAVE_CODIGOS}`, '--var', `ADMIN_CLAVE:${CLAVE_ADMIN}`,
        '--port', String(PUERTO), '--persist-to', carpetaEstado], {
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

async function pedir(ruta, opciones = {}) {
    const r = await fetch(`${BASE}${ruta}`, { ...opciones, headers: { 'x-prueba-ip': IP_PRUEBA, ...(opciones.headers || {}) } });
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
    for (const ruta of ['/', '/index.html', '/show.html', '/dist/app.js', '/carton.html', '/fonts/Bungee/bungee-latin-400-normal.woff2']) {
        assert.equal((await fetch(`${BASE}${ruta}`)).status, 200, `${ruta} debería servirse`);
    }
    for (const ruta of ['/package.json', '/src/main.js', '/src/carton.js', '/worker/index.js', '/wrangler.toml', '/.git/HEAD', '/test/e2e-sala.mjs']) {
        assert.equal((await fetch(`${BASE}${ruta}`)).status, 404, `${ruta} NO debería servirse`);
    }
    paso('assets: portada, show, dist/ y fonts/ se sirven; package.json, src/, worker/ y .git no');

    // Crear sala
    const invalida = await pedir('/api/salas', { method: 'POST', body: JSON.stringify({ cartones: 2 }) });
    assert.equal(invalida.status, 400);
    assert.match(invalida.datos.error, /cartones/);
    const config = {
        nombre: 'Prueba E2E', cartones: 10, precioCarton: 10, maxCartonesPorJugador: 3, fichasIniciales: 25,
        intervalo: 150, pozoExtra: 5, premios: [{ modalidad: 'linea', porcentaje: 30 }, { modalidad: 'lleno', porcentaje: 70 }],
        codigoPro: codigoPro(), // dos premios: hace falta el plan Pro
    };
    const creada = await pedir('/api/salas', { method: 'POST', body: JSON.stringify(config) });
    assert.equal(creada.status, 201);
    const { codigo, tokenAnfitrion } = creada.datos;
    assert.match(codigo, /^[ABCDEFGHJKMNPQRSTUVWXYZ23456789]{6}$/);
    assert.match(tokenAnfitrion, /^[0-9a-f]{32}$/);
    const info = await pedir(`/api/salas/${codigo.toLowerCase()}`);
    assert.equal(info.status, 200);
    assert.deepEqual({ ...info.datos, config: undefined }, { codigo, nombre: 'Prueba E2E', estado: 'lobby', jugadores: 0, pro: true, logo: null, config: undefined });
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

    await modoFila();
    await modoElige();
    await rondasBoteYDorada();
    await reacciones();
    await limiteDeSalas();
    await caducidad();
    await planes();
    await administracion();
    await admisionYVinculo();
    console.log('\nE2E OK');
}

// ---------- Modos y extras ----------
async function nuevaSalaE2E(config, ip = IP_PRUEBA) {
    const r = await pedir('/api/salas', { method: 'POST', body: JSON.stringify({ intervalo: 150, ...config }), headers: { 'x-prueba-ip': ip } });
    assert.equal(r.status, 201, JSON.stringify(r.datos));
    return r.datos;
}

// Anfitrión y jugadores conectados; devuelve { anfitrion, jugadores: [Cliente con .id] }
async function conectar(codigo, tokenAnfitrion, apodos) {
    const anfitrion = new Cliente('anfitrión', codigo);
    await anfitrion.abrir({ rol: 'anfitrion', token: tokenAnfitrion });
    await anfitrion.esperar('bienvenida');
    const jugadores = [];
    for (const apodo of apodos) {
        const c = new Cliente(apodo, codigo);
        await c.abrir({ rol: 'jugador', apodo, semilla: nuevaSemilla(16) });
        c.id = (await c.esperar('bienvenida')).jugadorId;
        jugadores.push(c);
    }
    return { anfitrion, jugadores };
}

const cerrarTodos = (...clientes) => clientes.flat().forEach((c) => c.cerrar());

async function modoFila() {
    const { codigo, tokenAnfitrion } = await nuevaSalaE2E({ tipo: 'fila', precioCarton: 5 });
    const { anfitrion, jugadores: [ana, beto] } = await conectar(codigo, tokenAnfitrion, ['Ana', 'Beto']);
    for (const [c, filas] of [[ana, [1, 2]], [beto, [3, 4]]]) {
        for (const n of filas) c.enviar({ tipo: 'elegirCarton', numero: n });
    }
    await anfitrion.esperarEstado((e) => Object.keys(e.ocupados).length === 4, '4 filas vendidas');
    beto.enviar({ tipo: 'elegirCarton', numero: 16 });
    await beto.esperar((m) => m.tipo === 'error' && /fila debe/i.test(m.mensaje), 'error por fila 16');
    anfitrion.enviar({ tipo: 'iniciar' });
    await ana.esperar('bola', 'primera bola');
    ana.enviar({ tipo: 'bingo', numero: 1 });
    await ana.esperar((m) => m.tipo === 'error' && /no hace falta cantar/.test(m.mensaje), 'bingo rechazado en Fila de 5');

    const ganador = await ana.esperar('ganador', 'ganador de la fila', 30000);
    assert.equal(ganador.modalidad, 'fila5');
    assert.equal(ganador.ganadores.length, 1, 'las filas no comparten números: un solo ganador');
    const final = await anfitrion.esperarEstado((e) => e.estado === 'terminada', 'fin de la partida', 10000);
    const [g] = ganador.ganadores;
    const salidas = new Set(final.estado.bolas);
    assert.ok(numerosDeFila(g.carton).every((n) => salidas.has(n)), 'la fila ganadora está completa');
    assert.equal(g.fichas, 20);
    // Ninguna otra fila vendida estaba completa antes de la última bola
    const antes = new Set(final.estado.bolas.slice(0, -1));
    for (const n of [1, 2, 3, 4]) assert.ok(!numerosDeFila(n).every((x) => antes.has(x)), `la fila ${n} no se completó antes`);
    cerrarTodos(anfitrion, ana, beto);
    paso('Fila de 5: premio automático a la primera fila vendida que se completa, sin cantar');
}

async function modoElige() {
    const { codigo, tokenAnfitrion } = await nuevaSalaE2E({ tipo: 'elige', precioCarton: 10, cartones: 10 });
    const { anfitrion, jugadores: [ana, beto] } = await conectar(codigo, tokenAnfitrion, ['Ana', 'Beto']);
    ana.enviar({ tipo: 'elegirCarton', numeros: [1, 2, 3, 4] });
    await ana.esperar((m) => m.tipo === 'error' && /exactamente 5/.test(m.mensaje), 'error por 4 números');
    // La misma jugada para los dos: se completan con la misma bola y el pozo se reparte
    ana.enviar({ tipo: 'elegirCarton', numeros: [70, 5, 33, 18, 61] });
    beto.enviar({ tipo: 'elegirCarton', numeros: [5, 18, 33, 61, 70] });
    const listo = await anfitrion.esperarEstado((e) => Object.keys(e.jugadas).length === 2, '2 jugadas');
    assert.deepEqual(Object.values(listo.estado.jugadas), [[5, 18, 33, 61, 70], [5, 18, 33, 61, 70]]);
    anfitrion.enviar({ tipo: 'iniciar' });
    const ganador = await ana.esperar('ganador', 'ganadores de Elige tus 5', 30000);
    assert.equal(ganador.modalidad, 'elige5');
    assert.deepEqual(ganador.ganadores.map((g) => [g.apodo, g.fichas]).sort(), [['Ana', 10], ['Beto', 10]]);
    cerrarTodos(anfitrion, ana, beto);
    paso('Elige tus 5: jugadas propias validadas y empate repartido');
}

async function rondasBoteYDorada() {
    const { codigo, tokenAnfitrion } = await nuevaSalaE2E({
        tipo: 'fila', precioCarton: 10, rondasSeguidas: true, bolaDorada: true, botePorcentaje: 20, boteBolas: 75,
    });
    const { anfitrion, jugadores: [ana, beto] } = await conectar(codigo, tokenAnfitrion, ['Ana', 'Beto']);
    ana.enviar({ tipo: 'elegirCarton', numero: 1 });
    beto.enviar({ tipo: 'elegirCarton', numero: 2 });
    const lobby = await anfitrion.esperarEstado((e) => Object.keys(e.ocupados).length === 2, '2 filas');
    assert.equal(lobby.estado.aporteRonda, 4, '20 % de 20 fichas va al bote');
    assert.equal(lobby.estado.pozo, 16);
    beto.enviar({ tipo: 'repetir', valor: false });
    await anfitrion.esperarEstado((e) => e.jugadores.find((j) => j.id === beto.id)?.repetir === false, 'Beto no repite');
    anfitrion.enviar({ tipo: 'iniciar' });

    const ganador = await ana.esperar('ganador', 'ganador de la ronda 1', 30000);
    assert.equal(ganador.bote, 4, 'con 75 bolas de margen el bote siempre se entrega');
    assert.equal(ganador.ganadores[0].bote, 4);
    const fin = await anfitrion.esperarEstado((e) => e.estado === 'terminada', 'fin de la ronda 1', 10000);
    const e1 = fin.estado;
    assert.equal(e1.bote, 0);
    assert.ok(Number.isInteger(e1.dorada), 'la bola dorada se revela al terminar');
    assert.notEqual(e1.siguienteRondaEn, null, 'rondas seguidas: la siguiente está programada');
    const ganadorJugador = e1.jugadores.find((j) => j.id === ganador.ganadores[0].jugadorId);
    const premio = ganador.ganadores[0].fichas;
    assert.ok(premio === 16 || premio === 32, 'premio normal o doble por la bola dorada');
    assert.equal(ganadorJugador.ganado, premio + 4, 'ranking: premio + bote');
    const verificacion = verificarPartida({
        compromiso: e1.justo.compromiso, semillaServidor: e1.justo.semillaServidor, semillasClientes: e1.justo.semillasClientes,
        semillaClientes: e1.justo.semillaClientes, serie: e1.serie, bolas: e1.bolas, dorada: e1.dorada,
    });
    assert.ok(verificacion.valida, verificacion.errores.join(' '));
    if (e1.bolas.indexOf(e1.dorada) !== -1 && e1.bolas.indexOf(e1.dorada) < e1.bolas.length - 1) {
        assert.equal(e1.premios[0].fichas, 32, 'la bola dorada salió antes del ganador: premio doble');
    }

    const ronda2 = await anfitrion.esperarEstado((e) => e.estado === 'lobby' && e.ronda === 2, 'lobby de la ronda 2', 10000);
    assert.deepEqual(ronda2.estado.ocupados, { 1: ana.id }, 'Ana repite su fila; Beto no');
    assert.notEqual(ronda2.estado.inicioAutoEn, null);
    await anfitrion.esperarEstado((e) => e.estado === 'jugando' && e.ronda === 2, 'la ronda 2 empieza sola', 10000);
    anfitrion.enviar({ tipo: 'pausar' });
    cerrarTodos(anfitrion, ana, beto);
    paso('rondas seguidas, bote, ranking y bola dorada verificable');
}

async function reacciones() {
    const { codigo, tokenAnfitrion } = await nuevaSalaE2E({ tipo: 'fila' });
    const { anfitrion, jugadores: [ana] } = await conectar(codigo, tokenAnfitrion, ['Ana']);
    ana.enviar({ tipo: 'reaccion', emoji: '🔥' });
    ana.enviar({ tipo: 'reaccion', emoji: '👏' }); // demasiado pronto: se descarta
    const r = await anfitrion.esperar('reaccion', 'reacción en el show');
    assert.deepEqual([r.emoji, r.apodo], ['🔥', 'Ana']);
    await dormir(300);
    assert.ok(!anfitrion.mensajes.some((m) => m.tipo === 'reaccion' && m.emoji === '👏'), 'como mucho una cada 800 ms');
    ana.enviar({ tipo: 'reaccion', emoji: '💣' });
    await ana.esperar((m) => m.tipo === 'error' && /Reacción/.test(m.mensaje), 'reacción no válida');
    anfitrion.enviar({ tipo: 'reaccion', emoji: '🔥' });
    await anfitrion.esperar((m) => m.tipo === 'error' && /jugadores/.test(m.mensaje), 'el anfitrión no reacciona');
    cerrarTodos(anfitrion, ana);
    paso('reacciones: se reenvían al show con el apodo, limitadas y validadas');
}

async function limiteDeSalas() {
    const ip = `limite-${IP_PRUEBA}`;
    const crearDesde = (config) => pedir('/api/salas', { method: 'POST', body: JSON.stringify(config), headers: { 'x-prueba-ip': ip } });
    for (let i = 0; i < 2; i++) assert.equal((await crearDesde({ cartones: 2 })).status, 400, 'config no válida');
    for (let i = 0; i < 10; i++) assert.equal((await crearDesde({})).status, 201, `sala ${i + 1} de 10`);
    const r = await fetch(`${BASE}/api/salas`, { method: 'POST', body: '{}', headers: { 'x-prueba-ip': ip } });
    assert.equal(r.status, 429);
    assert.ok(Number(r.headers.get('retry-after')) > 0, 'Retry-After');
    assert.match((await r.json()).error, /demasiadas salas/);
    assert.equal((await pedir('/api/salas', { method: 'POST', body: '{}' })).status, 201, 'otra IP sí puede');
    paso('límite: 10 salas por hora e IP (429 con Retry-After); los formularios con errores no cuentan');
}

// PNG de 1×1 px
const LOGO = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';

async function planes() {
    // IP propia: los códigos falsos gastan cupo del límite por hora
    const ip = `planes-${IP_PRUEBA}`;
    const crear = (config) => pedir('/api/salas', { method: 'POST', body: JSON.stringify(config), headers: { 'x-prueba-ip': ip } });
    const dosPremios = { premios: [{ modalidad: 'linea', porcentaje: 30 }, { modalidad: 'lleno', porcentaje: 70 }] };
    const sinCodigo = await crear(dosPremios);
    assert.equal(sinCodigo.status, 400);
    assert.match(sinCodigo.datos.error, /plan gratis incluye 1 premio/);
    const falso = await crear({ codigoPro: 'PRO-000000-000000-000000' });
    assert.equal(falso.status, 400);
    assert.match(falso.datos.error, /no es válido/);
    const caducado = codigoPro({ ahora: Date.now() - 3 * 864e5 });
    assert.match((await crear({ codigoPro: caducado })).datos.error, /caducó/);
    const logoGratis = await crear({ logo: LOGO });
    assert.equal(logoGratis.status, 400);
    assert.match(logoGratis.datos.error, /plan Pro/);

    // Gratis: 15 jugadores como máximo
    const gratis = await nuevaSalaE2E({ tipo: 'fila' }, ip);
    const { anfitrion, jugadores } = await conectar(gratis.codigo, gratis.tokenAnfitrion, Array.from({ length: 15 }, (_, i) => `J${i + 1}`));
    assert.equal(anfitrion.estado.pro, false);
    const decimosexto = new Cliente('J16', gratis.codigo);
    await decimosexto.abrir({ rol: 'jugador', apodo: 'J16', semilla: nuevaSemilla(16) });
    await decimosexto.esperar((m) => m.tipo === 'error' && /plan gratis admite 15/.test(m.mensaje), 'sala llena en el plan gratis');
    cerrarTodos(anfitrion, jugadores, decimosexto);

    // Pro: dos premios y logo, que se sirve aparte
    const pro = await nuevaSalaE2E({ ...dosPremios, codigoPro: codigoPro().toLowerCase().replace(/-/g, ' '), logo: LOGO }, ip);
    assert.equal(pro.pro, true);
    const info = await pedir(`/api/salas/${pro.codigo}`);
    assert.equal(info.datos.pro, true);
    assert.match(info.datos.logo, /^[0-9a-f]{8}$/);
    const imagen = await fetch(`${BASE}/api/salas/${pro.codigo}/logo?v=${info.datos.logo}`);
    assert.equal(imagen.status, 200);
    assert.equal(imagen.headers.get('content-type'), 'image/png');
    assert.deepEqual(Buffer.from(await imagen.arrayBuffer()), Buffer.from(LOGO.split(',')[1], 'base64'));
    assert.equal((await fetch(`${BASE}/api/salas/${gratis.codigo}/logo`)).status, 404, 'sin logo: 404');
    paso('planes: gratis con 15 jugadores y 1 premio; código Pro (falso, caducado, bien) y logo del evento');
}

async function administracion() {
    const ip = `admin-${IP_PRUEBA}`;
    const llamar = (ruta, { clave = CLAVE_ADMIN, ...opciones } = {}) => pedir(ruta, {
        ...opciones, headers: { 'x-prueba-ip': ip, authorization: `Bearer ${clave}`, ...(opciones.headers || {}) },
    });
    assert.equal((await llamar('/api/admin/resumen', { clave: 'mala' })).status, 401);
    assert.equal((await pedir('/api/admin/resumen', { headers: { 'x-prueba-ip': ip } })).status, 401, 'sin clave');

    const emitido = await llamar('/api/admin/codigos', { method: 'POST', body: JSON.stringify({ plan: 'evento', nota: 'Kermés E2E', cliente: '51 987-654-321' }) });
    assert.equal(emitido.status, 201);
    assert.equal(emitido.datos.importe, 25);
    assert.equal(emitido.datos.cliente, '51987654321');
    assert.ok(emitido.datos.hasta - Date.now() > 23.9 * 3600e3, 'un código de evento vale 24 h');
    assert.equal((await llamar('/api/admin/codigos', { method: 'POST', body: JSON.stringify({ plan: 'oro' }) })).status, 400);

    // Se usa para crear una sala y aparece en el registro con esa sala
    const sala = await nuevaSalaE2E({ codigoPro: emitido.datos.codigo }, `uso-${IP_PRUEBA}`);
    let resumen = (await llamar('/api/admin/resumen')).datos;
    const registrado = resumen.codigos.find((c) => c.codigo === emitido.datos.codigo);
    assert.deepEqual(registrado.salas.map((s) => s.sala), [sala.codigo]);
    assert.ok(resumen.dias.at(-1).pro >= 1, 'las salas Pro de hoy se cuentan');
    assert.equal(resumen.dias.length, 30);

    // Un código generado en la terminal se registra al usarse (origen externo)
    const externo = codigoPro({ dias: 30, tipo: 2 });
    await nuevaSalaE2E({ codigoPro: externo }, `uso-${IP_PRUEBA}`);
    resumen = (await llamar('/api/admin/resumen')).datos;
    assert.equal(resumen.codigos.find((c) => c.codigo === externo)?.origen, 'externo');

    // Anular: ya no sirve; reactivar: vuelve a servir
    assert.equal((await llamar('/api/admin/codigos/anular', { method: 'POST', body: JSON.stringify({ codigo: emitido.datos.codigo }) })).datos.revocado, true);
    const rechazada = await pedir('/api/salas', { method: 'POST', body: JSON.stringify({ codigoPro: emitido.datos.codigo }), headers: { 'x-prueba-ip': `uso-${IP_PRUEBA}` } });
    assert.equal(rechazada.status, 400);
    assert.match(rechazada.datos.error, /anulado/);
    await llamar('/api/admin/codigos/anular', { method: 'POST', body: JSON.stringify({ codigo: emitido.datos.codigo, anulado: false }) });
    assert.equal((await nuevaSalaE2E({ codigoPro: emitido.datos.codigo }, `uso2-${IP_PRUEBA}`)).pro, true);

    // Muchas claves falsas: la IP queda bloqueada un rato
    const bloqueo = `fuerza-${IP_PRUEBA}`;
    for (let i = 0; i < 10; i++) assert.equal((await pedir('/api/admin/resumen', { headers: { 'x-prueba-ip': bloqueo, authorization: 'Bearer x' } })).status, 401);
    assert.equal((await pedir('/api/admin/resumen', { headers: { 'x-prueba-ip': bloqueo, authorization: `Bearer ${CLAVE_ADMIN}` } })).status, 429);
    // Salas activas: aparecen en el panel y se cierran (avisando y desconectando a quien esté dentro)
    const abierta = await nuevaSalaE2E({ nombre: 'Para cerrar' }, `cierre-${IP_PRUEBA}`);
    const dentro = new Cliente('anfitrión de la sala a cerrar', abierta.codigo);
    await dentro.abrir({ rol: 'anfitrion', token: abierta.tokenAnfitrion });
    await dentro.esperar('bienvenida');
    const activas = (await llamar('/api/admin/salas')).datos.salas;
    assert.ok(activas.some((x) => x.codigo === abierta.codigo && x.nombre === 'Para cerrar' && x.estado === 'lobby'));
    const cierre = await llamar('/api/admin/salas/cerrar', { method: 'POST', body: JSON.stringify({ codigos: [abierta.codigo] }) });
    assert.equal(cierre.datos.cerradas, 1);
    await dentro.esperar((m) => m.tipo === 'aviso' && /cerró esta sala/.test(m.texto), 'aviso de cierre');
    await dentro.esperarCierre();
    assert.equal((await pedir(`/api/salas/${abierta.codigo}`)).status, 404, 'la sala cerrada ya no existe');
    assert.ok(!(await llamar('/api/admin/salas')).datos.salas.some((x) => x.codigo === abierta.codigo));
    dentro.cerrar();
    paso('administración: clave, emitir y registrar códigos, uso por sala, anular/reactivar, bloqueo por intentos y cerrar salas');

    // Contador de visitas: página, procedencia y clics; como mucho 10 por hora desde cada IP
    const ipVisitas = `visitas-${IP_PRUEBA}`;
    const visitar = (cuerpo) => fetch(`${BASE}/api/visita`, { method: 'POST', body: JSON.stringify(cuerpo), headers: { 'x-prueba-ip': ipVisitas } });
    const hoyAntes = (await llamar('/api/admin/resumen')).datos.dias.at(-1).visitas;
    assert.equal((await visitar({ pagina: 'portada', origen: 'facebook.com' })).status, 204);
    await visitar({ evento: 'whatsapp' });
    await visitar({ pagina: 'inventada' }); // no se cuenta
    for (let i = 0; i < 10; i++) await visitar({ pagina: 'precios' }); // las últimas ya superan el límite
    const hoy = (await llamar('/api/admin/resumen')).datos.dias.at(-1).visitas;
    assert.equal((hoy.paginas.portada ?? 0) - (hoyAntes.paginas.portada ?? 0), 1);
    assert.equal((hoy.origenes['facebook.com'] ?? 0) - (hoyAntes.origenes['facebook.com'] ?? 0), 1);
    assert.equal((hoy.eventos.whatsapp ?? 0) - (hoyAntes.eventos.whatsapp ?? 0), 1);
    assert.equal((hoy.paginas.precios ?? 0) - (hoyAntes.paginas.precios ?? 0), 8, '10 por hora: 2 + 8 de precios');
    assert.equal(hoy.paginas.inventada, undefined);
    for (const ruta of ['/favicon.svg', '/favicon.ico', '/img/icono-180.png']) assert.equal((await fetch(`${BASE}${ruta}`)).status, 200, ruta);
    paso('visitas: portada, precios, procedencia y clics contados, con límite por IP; iconos publicados');
}

async function admisionYVinculo() {
    const { codigo, tokenAnfitrion } = await nuevaSalaE2E({ admision: true, fichasIniciales: 0, precioCarton: 10, mensajeFichas: 'Pide en la mesa' }, `adm-${IP_PRUEBA}`);
    const anfitrion = new Cliente('anfitrión', codigo);
    await anfitrion.abrir({ rol: 'anfitrion', token: tokenAnfitrion });
    await anfitrion.esperar('bienvenida');
    const ana = new Cliente('Ana', codigo);
    await ana.abrir({ rol: 'jugador', apodo: 'Ana', semilla: nuevaSemilla(16) });
    const bienvenida = await ana.esperar('bienvenida');
    ana.id = bienvenida.jugadorId;
    const yo = bienvenida.estado.jugadores.find((j) => j.id === ana.id);
    assert.deepEqual([yo.admitido, yo.fichas], [false, 0], 'entra en espera y sin fichas');
    assert.equal(bienvenida.estado.config.mensajeFichas, 'Pide en la mesa');

    ana.enviar({ tipo: 'elegirCarton', numero: 1 });
    await ana.esperar((m) => m.tipo === 'error' && /admita/.test(m.mensaje), 'no puede elegir en espera');
    ana.enviar({ tipo: 'pedirFichas', cantidad: 30 });
    const solicitud = await anfitrion.esperar('solicitud', 'el anfitrión recibe el pedido');
    assert.deepEqual([solicitud.apodo, solicitud.cantidad], ['Ana', 30]);
    await anfitrion.esperarEstado((e) => e.solicitudes?.length === 1, 'pedido en el estado del anfitrión');
    assert.ok(!ana.mensajes.some((m) => m.tipo === 'solicitud'), 'los jugadores no ven los pedidos');
    assert.equal(ana.estado.solicitudes, undefined);

    anfitrion.enviar({ tipo: 'darFichas', jugadorId: ana.id, cantidad: 30 });
    const fichas = await ana.esperar('fichas', 'Ana recibe sus fichas');
    assert.deepEqual([fichas.cantidad, fichas.saldo], [30, 30]);
    const conRegistro = await anfitrion.esperarEstado((e) => e.movimientos?.length === 1, 'registro del anfitrión');
    assert.deepEqual(conRegistro.estado.movimientos.map((m) => [m.apodo, m.cantidad]), [['Ana', 30]]);
    assert.equal(ana.estado.movimientos, undefined, 'el registro no llega a los jugadores');
    ana.enviar({ tipo: 'elegirCarton', numero: 1 });
    await ana.esperarEstado((e) => e.ocupados[1] === ana.id, 'ya admitida, compra su cartón');

    // Vincular otro móvil como anfitrión con el código de 6 cifras
    anfitrion.enviar({ tipo: 'vincular' });
    const { codigo: cifras } = await anfitrion.esperar('vinculo', 'código de vinculación');
    assert.ok(!ana.mensajes.some((m) => m.tipo === 'vinculo'), 'el código solo lo ve el anfitrión');
    const vincular = (c) => pedir(`/api/salas/${codigo}/vincular`, { method: 'POST', body: JSON.stringify({ codigo: c }) });
    assert.equal((await vincular(cifras === '000000' ? '111111' : '000000')).status, 400);
    const bien = await vincular(cifras);
    assert.equal(bien.status, 200);
    assert.equal(bien.datos.tokenAnfitrion, tokenAnfitrion);
    assert.equal((await vincular(cifras)).status, 400, 'un solo uso');
    const movil = new Cliente('móvil del anfitrión', codigo);
    await movil.abrir({ rol: 'anfitrion', token: bien.datos.tokenAnfitrion });
    assert.equal((await movil.esperar('bienvenida')).rol, 'anfitrion');
    movil.enviar({ tipo: 'darFichas', jugadorId: ana.id, cantidad: -5 });
    await ana.esperar((m) => m.tipo === 'fichas' && m.cantidad === -5, 'corrección desde el móvil');
    cerrarTodos(anfitrion, ana, movil);
    paso('admisión: en espera, pedido de fichas solo al anfitrión, asignación con registro privado; vincular un móvil (un solo uso)');
}

async function caducidad() {
    const sola = await nuevaSalaE2E({ caducidadMs: 1500 });
    assert.equal((await pedir(`/api/salas/${sola.codigo}`)).status, 200);
    const conGente = await nuevaSalaE2E({ caducidadMs: 1500 });
    const anfitrion = new Cliente('anfitrión', conGente.codigo);
    await anfitrion.abrir({ rol: 'anfitrion', token: conGente.tokenAnfitrion });
    await anfitrion.esperar('bienvenida');

    await dormir(3500);
    const borrada = await pedir(`/api/salas/${sola.codigo}`);
    assert.equal(borrada.status, 404, 'sin actividad ni nadie conectado: se borra');
    assert.equal((await pedir(`/api/salas/${conGente.codigo}`)).status, 200, 'con alguien conectado no se borra');

    anfitrion.cerrar();
    await dormir(4500);
    assert.equal((await pedir(`/api/salas/${conGente.codigo}`)).status, 404, 'al quedarse vacía también caduca');
    paso('caducidad: las salas sin actividad se borran; con alguien conectado se aplazan');
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
