// Control del anfitrión desde el móvil (anfitrion.html?sala=CODIGO). Se vincula con el código de
// 6 cifras que muestra el show (un solo uso, 2 minutos) y desde aquí se maneja la sala: empezar,
// pausar, admitir jugadores, dar o corregir fichas y ver el registro. Protocolo: docs/en-linea.md
import { conectarSala, CLAVES, normalizarCodigo } from './en-linea/cliente.js';

const $ = (id) => document.getElementById(id);
const ESTADOS = { lobby: 'Sala de espera', jugando: 'Jugando', pausa: 'En pausa', terminada: 'Terminada' };
const esc = (t) => String(t ?? '').replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
const fmt = (n) => Number(n || 0).toLocaleString('es-PE');
const hora = (t) => new Date(t).toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });

let codigo = normalizarCodigo(new URLSearchParams(location.search).get('sala'));
let conexion = null;
let sala = null;

// El móvil vinculado guarda su llave aparte; si este dispositivo es el que creó la sala, usa la suya.
// «Desvincular» solo borra la del móvil, nunca la del show.
const claveControl = (c) => `bingoshow.control.${c}`;
const leerToken = (c) => { try { return localStorage.getItem(claveControl(c)) || localStorage.getItem(CLAVES.anfitrion(c)); } catch { return null; } };
const guardarToken = (c, t) => { try { localStorage.setItem(claveControl(c), t); } catch { /* */ } };
const borrarToken = (c) => { try { localStorage.removeItem(claveControl(c)); } catch { /* */ } };

function avisar(texto) {
    const el = $('aviso');
    el.textContent = texto;
    el.classList.remove('hidden');
    clearTimeout(avisar.t);
    avisar.t = setTimeout(() => el.classList.add('hidden'), 3000);
}
const vibrar = (p) => { try { navigator.vibrate?.(p); } catch { /* */ } };
const enviar = (m) => conexion?.enviar(m) || (avisar('Sin conexión con la sala'), false);

// ---------- Vincular ----------
function mostrarVincular(error = '') {
    $('panel').classList.add('hidden');
    $('formVincular').classList.remove('hidden');
    $('codigoSala').value = codigo;
    $('errorVincular').textContent = error;
    $('errorVincular').classList.toggle('hidden', !error);
    (codigo.length === 6 ? $('codigoVinculo') : $('codigoSala')).focus();
}

$('codigoSala').addEventListener('input', (e) => { e.target.value = normalizarCodigo(e.target.value); });
$('codigoVinculo').addEventListener('input', (e) => { e.target.value = e.target.value.replace(/\D/g, '').slice(0, 6); });
$('formVincular').addEventListener('submit', async (e) => {
    e.preventDefault();
    codigo = normalizarCodigo($('codigoSala').value);
    const cifras = $('codigoVinculo').value;
    if (codigo.length !== 6 || cifras.length !== 6) return mostrarVincular('Escribe el código de la sala y las 6 cifras.');
    try {
        const r = await fetch(`/api/salas/${codigo}/vincular`, { method: 'POST', body: JSON.stringify({ codigo: cifras }) });
        const datos = await r.json().catch(() => ({}));
        if (!r.ok) throw new Error(datos.error || 'No se pudo vincular.');
        guardarToken(codigo, datos.tokenAnfitrion);
        history.replaceState(null, '', `?sala=${codigo}`);
        $('codigoVinculo').value = '';
        conectar();
    } catch (error) {
        mostrarVincular(error instanceof TypeError ? 'No se pudo contactar con el servidor.' : error.message);
    }
});

// ---------- Conexión ----------
function conectar() {
    const token = leerToken(codigo);
    if (!token) return mostrarVincular();
    $('formVincular').classList.add('hidden');
    $('panel').classList.remove('hidden');
    conexion?.cerrar();
    conexion = conectarSala(codigo, {
        hola: () => ({ rol: 'anfitrion', token }),
        alMensaje: recibir,
        alCambiarConexion: (estado) => {
            $('conexion').textContent = { conectando: 'Conectando…', conectado: 'En línea', reconectando: 'Reconectando…', cerrado: 'Sin conexión' }[estado] ?? estado;
        },
    });
}

function recibir(m) {
    if (m.tipo === 'error' && /Token/.test(m.mensaje || '')) {
        borrarToken(codigo);
        conexion?.cerrar();
        return mostrarVincular('Este móvil ya no está vinculado. Pide un código nuevo en el show.');
    }
    if ((m.tipo === 'bienvenida' || m.tipo === 'estado') && m.estado) {
        sala = m.estado;
        return pintar();
    }
    if (m.tipo === 'solicitud') {
        vibrar([80, 50, 80]);
        return avisar(`${m.apodo} pide ${fmt(m.cantidad)} fichas`);
    }
    if (m.tipo === 'aviso' || m.tipo === 'error') avisar(m.texto || m.mensaje);
}

// ---------- Pintar ----------
function pintar() {
    if (!sala) return;
    $('nombreSala').textContent = sala.nombre || `Sala ${sala.codigo}`;
    $('estadoSala').textContent = `Sala ${sala.codigo} · ${ESTADOS[sala.estado] ?? sala.estado}`;
    $('pozo').textContent = fmt(sala.pozo);
    $('bolas').textContent = `${(sala.bolas || []).length}/75`;

    const botones = [];
    if (sala.estado === 'lobby') {
        botones.push(`<button type="button" data-accion="iniciar" class="boton col-span-2 h-14 bg-girasol font-display text-xl normal-case" ${Object.keys(sala.ocupados || {}).length ? '' : 'disabled'}>¡Empezar!</button>`);
        if (sala.inicioAutoEn) botones.push('<button type="button" data-accion="detenerCuenta" class="boton col-span-2 h-11 bg-crema text-xs">Detener la cuenta atrás</button>');
    }
    if (sala.estado === 'jugando') botones.push('<button type="button" data-accion="pausar" class="boton col-span-2 h-14 bg-crema">⏸ Pausar</button>');
    if (sala.estado === 'pausa') botones.push('<button type="button" data-accion="reanudar" class="boton col-span-2 h-14 bg-menta">▶ Seguir</button>');
    if (sala.estado === 'terminada') botones.push('<button type="button" data-accion="nuevaPartida" class="boton col-span-2 h-14 bg-girasol">Nueva partida</button>');
    $('controles').innerHTML = botones.join('');

    const jugadores = sala.jugadores || [];
    const pedidos = new Map((sala.solicitudes || []).map((s) => [s.jugadorId, s]));
    const pendientes = jugadores.filter((j) => j.admitido === false || pedidos.has(j.id));
    $('seccionSolicitudes').classList.toggle('hidden', !pendientes.length);
    $('solicitudes').innerHTML = pendientes.map((j) => {
        const pedido = pedidos.get(j.id);
        const espera = j.admitido === false;
        return `<li class="rounded-xl border-[2.5px] border-tinta ${espera ? 'bg-papel' : 'bg-white'} p-3">
            <p class="font-black">${esc(j.apodo)} <span class="text-xs font-bold text-tinta/60">${espera ? '· en espera' : ''}${pedido ? ` · pide ${fmt(pedido.cantidad)} fichas (${hora(pedido.en)})` : ''}</span></p>
            <div class="mt-2 flex flex-wrap gap-2">
                ${pedido ? `<button type="button" data-dar="${esc(j.id)}" data-cantidad="${pedido.cantidad}" class="boton h-10 bg-menta px-3 text-xs">Dar ${fmt(pedido.cantidad)}</button>` : ''}
                ${espera && !pedido ? `<button type="button" data-admitir="${esc(j.id)}" class="boton h-10 bg-menta px-3 text-xs">Admitir</button>` : ''}
                ${espera ? `<button type="button" data-rechazar="${esc(j.id)}" class="boton h-10 bg-crema px-3 text-xs">Rechazar</button>` : ''}
            </div>
        </li>`;
    }).join('');

    const admitidos = jugadores.filter((j) => j.admitido !== false);
    $('cuentaJugadores').textContent = `${admitidos.length} jugando · ${jugadores.length - admitidos.length} en espera`;
    $('jugadores').innerHTML = admitidos.map((j) => `
        <li class="rounded-xl border-[2.5px] border-tinta bg-white p-3">
            <div class="flex items-center justify-between gap-2">
                <p class="min-w-0 truncate font-black ${j.conectado ? '' : 'text-tinta/50'}">${esc(j.apodo)}${j.conectado ? '' : ' · desconectado'}</p>
                <p class="shrink-0 font-display">${fmt(j.fichas)} <span class="font-ui text-xs font-black">fichas</span></p>
            </div>
            <div class="mt-2 flex gap-2">
                <input type="number" inputmode="numeric" min="1" max="100000" placeholder="Fichas" data-cantidad-de="${esc(j.id)}" class="campo h-10 min-w-0 flex-1" aria-label="Fichas para ${esc(j.apodo)}">
                <button type="button" data-sumar="${esc(j.id)}" class="boton h-10 shrink-0 bg-menta px-3 text-xs">Dar</button>
                <button type="button" data-restar="${esc(j.id)}" class="boton h-10 shrink-0 bg-crema px-3 text-xs">Quitar</button>
            </div>
        </li>`).join('') || '<li class="text-sm font-bold text-tinta/60">Aún no hay jugadores admitidos.</li>';

    const movimientos = sala.movimientos || [];
    $('seccionRegistro').classList.toggle('hidden', !movimientos.length);
    const total = movimientos.reduce((t, m) => t + m.cantidad, 0);
    $('totalRegistro').textContent = `Total asignado: ${fmt(total)} fichas en ${movimientos.length} ${movimientos.length === 1 ? 'movimiento' : 'movimientos'}`;
    $('registro').innerHTML = [...movimientos].reverse().slice(0, 50).map((m) => `
        <li class="flex justify-between gap-2 border-b-2 border-tinta/10 py-1">
            <span class="font-bold"><span class="text-tinta/50">${hora(m.en)}</span> ${esc(m.apodo)}</span>
            <span class="font-display ${m.cantidad < 0 ? 'text-tomate' : ''}">${m.cantidad > 0 ? '+' : ''}${fmt(m.cantidad)}</span>
        </li>`).join('');
}

// ---------- Acciones ----------
const confirmados = new Set();
document.addEventListener('click', (e) => {
    const accion = e.target.closest('[data-accion]');
    if (accion) return enviar({ tipo: accion.dataset.accion });
    const dar = e.target.closest('[data-dar]');
    if (dar) return enviar({ tipo: 'darFichas', jugadorId: dar.dataset.dar, cantidad: Number(dar.dataset.cantidad) });
    const admitir = e.target.closest('[data-admitir]');
    if (admitir) return enviar({ tipo: 'admitir', jugadorId: admitir.dataset.admitir });
    const rechazar = e.target.closest('[data-rechazar]');
    if (rechazar) {
        const id = rechazar.dataset.rechazar;
        if (!confirmados.has(id)) {
            confirmados.add(id);
            rechazar.textContent = '¿Seguro?';
            rechazar.classList.replace('bg-crema', 'bg-tomate');
            return;
        }
        confirmados.delete(id);
        return enviar({ tipo: 'expulsar', jugadorId: id });
    }
    const sumar = e.target.closest('[data-sumar], [data-restar]');
    if (sumar) {
        const id = sumar.dataset.sumar ?? sumar.dataset.restar;
        const campo = document.querySelector(`[data-cantidad-de="${CSS.escape(id)}"]`);
        const n = Number(campo?.value);
        if (!Number.isInteger(n) || n < 1) return avisar('Escribe cuántas fichas.');
        if (enviar({ tipo: 'darFichas', jugadorId: id, cantidad: sumar.dataset.restar ? -n : n })) campo.value = '';
    }
});

// Registro en CSV para cuadrar cuentas al final del evento
$('descargarRegistro').addEventListener('click', () => {
    const filas = [['fecha', 'jugador', 'fichas'], ...(sala?.movimientos || []).map((m) => [new Date(m.en).toISOString(), m.apodo, m.cantidad])];
    const csv = filas.map((f) => f.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
    const enlace = document.createElement('a');
    enlace.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    enlace.download = `fichas-${codigo}.csv`;
    enlace.click();
    setTimeout(() => URL.revokeObjectURL(enlace.href), 1000);
});

$('desvincular').addEventListener('click', () => {
    borrarToken(codigo);
    conexion?.cerrar();
    sala = null;
    mostrarVincular();
});

if (codigo.length === 6 && leerToken(codigo)) conectar();
else mostrarVincular();
