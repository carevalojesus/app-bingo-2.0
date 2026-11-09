// Panel de administración (admin.html): códigos Pro, ingresos y salas creadas.
// La clave se guarda solo en esta pestaña (sessionStorage) y se manda como Bearer a /api/admin/*.

const $ = (id) => document.getElementById(id);
const CLAVE_SESION = 'bingoshow.admin';
const NOMBRE_PLAN = { evento: 'Evento', mensual: 'Mensual', cortesia: 'Cortesía', anterior: 'Anterior' };

const esc = (t) => String(t ?? '').replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
const soles = (n) => `S/ ${Number(n || 0).toLocaleString('es-PE')}`;
const fecha = (t) => (t ? new Date(t).toLocaleString('es-PE', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '—');

let clave = '';
let datos = { codigos: [], dias: [] };

function leerClave() { try { return sessionStorage.getItem(CLAVE_SESION) || ''; } catch { return ''; } }
function guardarClave(valor) { try { valor ? sessionStorage.setItem(CLAVE_SESION, valor) : sessionStorage.removeItem(CLAVE_SESION); } catch { /* */ } }

function avisar(texto) {
    const el = $('aviso');
    el.textContent = texto;
    el.classList.remove('hidden');
    clearTimeout(avisar.t);
    avisar.t = setTimeout(() => el.classList.add('hidden'), 2600);
}

async function api(ruta, opciones = {}) {
    const r = await fetch(ruta, {
        ...opciones,
        headers: { authorization: `Bearer ${clave}`, 'content-type': 'application/json', ...(opciones.headers || {}) },
    });
    const cuerpo = await r.json().catch(() => ({}));
    if (r.status === 401) {
        salir();
        throw new Error(cuerpo.error || 'Clave incorrecta.');
    }
    if (!r.ok) throw new Error(cuerpo.error || `Error ${r.status}`);
    return cuerpo;
}

// ---------- Estado de un código ----------
function estadoDe(c) {
    if (c.revocado) return 'anulado';
    if (c.hasta && Date.now() >= c.hasta) return 'caducado';
    return 'activo';
}
const ESTILO_ESTADO = { activo: 'bg-menta', caducado: 'bg-papel text-tinta/60', anulado: 'bg-tomate text-crema' };

// ---------- Pintar ----------
function pintarResumen() {
    const vendidos = datos.codigos.filter((c) => !c.revocado);
    const activos = datos.codigos.filter((c) => estadoDe(c) === 'activo');
    $('kIngresos').textContent = soles(vendidos.reduce((t, c) => t + (c.importe || 0), 0));
    $('kActivos').textContent = activos.length;
    $('kActivosDetalle').textContent = `${datos.codigos.length} en total`;
    const hoy = datos.dias.at(-1) ?? { gratis: 0, pro: 0 };
    $('kHoy').textContent = hoy.gratis + hoy.pro;
    $('kHoyDetalle').textContent = `${hoy.pro} Pro · ${hoy.gratis} gratis`;
    const mes = datos.dias.reduce((t, d) => ({ gratis: t.gratis + d.gratis, pro: t.pro + d.pro }), { gratis: 0, pro: 0 });
    $('kMes').textContent = mes.gratis + mes.pro;
    $('kMesDetalle').textContent = `${mes.pro} Pro · ${mes.gratis} gratis`;
}

function pintarVisitas() {
    const dias = datos.dias || [];
    const suma = (lista, f) => lista.reduce((t, d) => t + f(d.visitas ?? { paginas: {}, eventos: {}, origenes: {} }), 0);
    const paginas = (v) => Object.values(v.paginas || {}).reduce((a, b) => a + b, 0);
    $('vHoy').textContent = suma(dias.slice(-1), paginas);
    $('vMes').textContent = suma(dias, paginas);
    $('vMesDetalle').textContent = `${suma(dias, (v) => v.paginas?.portada ?? 0)} portada · ${suma(dias, (v) => v.paginas?.precios ?? 0)} precios`;
    $('vWhatsapp').textContent = suma(dias, (v) => v.eventos?.whatsapp ?? 0);
    $('vCrear').textContent = suma(dias, (v) => v.eventos?.crear ?? 0);
    const origenes = {};
    for (const d of dias) for (const [o, n] of Object.entries(d.visitas?.origenes ?? {})) origenes[o] = (origenes[o] ?? 0) + n;
    const top = Object.entries(origenes).sort((a, b) => b[1] - a[1]).slice(0, 10);
    $('vOrigenes').innerHTML = top.length
        ? top.map(([o, n]) => `<li class="rounded-full border-2 border-tinta bg-papel px-3 py-0.5">${esc(o === 'directo' ? 'Directo / WhatsApp' : o)} <b>${n}</b></li>`).join('')
        : '<li class="text-tinta/60">Aún no hay visitas.</li>';
}

function pintarTabla() {
    const filtro = $('filtro').value;
    const texto = $('buscar').value.trim().toLowerCase();
    const filas = datos.codigos.filter((c) => (filtro === 'todos' || estadoDe(c) === filtro)
        && (!texto || `${c.codigo} ${c.nota} ${c.cliente}`.toLowerCase().includes(texto)));
    $('sinCodigos').classList.toggle('hidden', filas.length > 0);
    $('tablaCodigos').innerHTML = filas.map((c) => {
        const estado = estadoDe(c);
        const salas = c.salas?.length ?? 0;
        return `<tr class="bg-white">
            <td class="rounded-l-xl border-y-[2.5px] border-l-[2.5px] border-tinta px-2 py-2">
                <button type="button" data-copiar="${esc(c.codigo)}" class="font-mono text-xs font-black hover:underline" title="Copiar">${esc(c.codigo)}</button>
                ${c.origen === 'externo' ? '<span class="ml-1 text-[10px] font-black uppercase text-tinta/50">terminal</span>' : ''}
            </td>
            <td class="border-y-[2.5px] border-tinta px-2 py-2 font-bold">${esc(NOMBRE_PLAN[c.tipo] ?? c.tipo)}<span class="block text-xs text-tinta/60">${soles(c.importe)}</span></td>
            <td class="max-w-[12rem] truncate border-y-[2.5px] border-tinta px-2 py-2 font-bold" title="${esc(c.nota)}">${esc(c.nota || '—')}${c.cliente ? `<span class="block text-xs text-tinta/60">${esc(c.cliente)}</span>` : ''}</td>
            <td class="border-y-[2.5px] border-tinta px-2 py-2 text-xs font-bold">${fecha(c.hasta)}${c.emitido ? `<span class="block text-tinta/50">emitido ${fecha(c.emitido)}</span>` : ''}</td>
            <td class="border-y-[2.5px] border-tinta px-2 py-2 font-display" title="${esc((c.salas ?? []).slice(0, 10).map((s) => s.sala).join(', '))}">${salas}</td>
            <td class="border-y-[2.5px] border-tinta px-2 py-2"><span class="rounded-full border-2 border-tinta px-2 py-0.5 text-[11px] font-black uppercase ${ESTILO_ESTADO[estado]}">${estado}</span></td>
            <td class="rounded-r-xl border-y-[2.5px] border-r-[2.5px] border-tinta px-2 py-2 text-right">
                <button type="button" data-anular="${esc(c.codigo)}" data-valor="${c.revocado ? 'false' : 'true'}" class="boton h-8 px-2 text-[10px] ${c.revocado ? 'bg-crema' : 'bg-crema'}">${c.revocado ? 'Reactivar' : 'Anular'}</button>
            </td>
        </tr>`;
    }).join('');
}

async function cargar() {
    try {
        datos = await api('/api/admin/resumen');
        pintarResumen();
        pintarVisitas();
        pintarTabla();
    } catch (error) {
        avisar(error.message);
    }
}

// ---------- Salas activas ----------
const ESTADOS_SALA = { lobby: 'Sala de espera', jugando: 'Jugando', pausa: 'En pausa', terminada: 'Terminada' };

async function cargarSalas() {
    try {
        const { salas } = await api('/api/admin/salas');
        $('cuentaSalas').textContent = `(${salas.length})`;
        $('sinSalas').classList.toggle('hidden', salas.length > 0);
        $('cerrarTodas').disabled = salas.length === 0;
        $('listaSalas').innerHTML = salas.map((s) => `
            <li class="flex flex-wrap items-center gap-3 rounded-xl border-[2.5px] border-tinta bg-white px-3 py-2">
                <span class="font-display tracking-widest">${esc(s.codigo)}</span>
                <span class="min-w-0 flex-1 text-sm font-bold">${esc(s.nombre || 'Sin nombre')}
                    <span class="block text-xs text-tinta/60">${ESTADOS_SALA[s.estado] ?? s.estado} · ${s.jugadores} ${s.jugadores === 1 ? 'jugador' : 'jugadores'} · ${s.pro ? 'Pro' : 'gratis'} · creada ${fecha(s.creada)}</span></span>
                <button type="button" data-cerrar="${esc(s.codigo)}" class="boton h-9 bg-crema px-3 text-[11px]">Cerrar</button>
            </li>`).join('');
    } catch (error) {
        avisar(error.message);
    }
}

async function cerrarSalas(cuerpo, boton) {
    if (boton.dataset.confirmar !== '1') {
        boton.dataset.confirmar = '1';
        boton.dataset.texto = boton.textContent;
        boton.textContent = '¿Seguro?';
        boton.classList.replace('bg-crema', 'bg-tomate');
        return;
    }
    try {
        const { cerradas } = await api('/api/admin/salas/cerrar', { method: 'POST', body: JSON.stringify(cuerpo) });
        avisar(cerradas === 1 ? 'Sala cerrada' : `${cerradas} salas cerradas`);
    } catch (error) {
        avisar(error.message);
    }
    boton.dataset.confirmar = '';
    boton.textContent = boton.dataset.texto;
    boton.classList.replace('bg-tomate', 'bg-crema');
    await cargarSalas();
}

$('recargarSalas').addEventListener('click', cargarSalas);
$('cerrarTodas').addEventListener('click', (e) => cerrarSalas({ todas: true }, e.currentTarget));
$('listaSalas').addEventListener('click', (e) => {
    const boton = e.target.closest('[data-cerrar]');
    if (boton) cerrarSalas({ codigos: [boton.dataset.cerrar] }, boton);
});

// ---------- Entrar / salir ----------
async function entrar(valor) {
    clave = valor;
    try {
        datos = await api('/api/admin/resumen');
    } catch (error) {
        $('errorEntrar').textContent = error.message;
        $('errorEntrar').classList.remove('hidden');
        clave = '';
        return;
    }
    guardarClave(clave);
    $('formEntrar').classList.add('hidden');
    $('panel').classList.remove('hidden');
    $('salirBtn').classList.remove('hidden');
    pintarResumen();
    pintarVisitas();
    pintarTabla();
    cargarSalas();
}

function salir() {
    clave = '';
    guardarClave('');
    $('panel').classList.add('hidden');
    $('salirBtn').classList.add('hidden');
    $('formEntrar').classList.remove('hidden');
    $('clave').value = '';
}

$('formEntrar').addEventListener('submit', (e) => {
    e.preventDefault();
    $('errorEntrar').classList.add('hidden');
    const valor = $('clave').value.trim();
    if (valor) entrar(valor);
});
$('salirBtn').addEventListener('click', salir);

// ---------- Nuevo código ----------
const planElegido = () => document.querySelector('input[name="plan"]:checked').value;
document.querySelectorAll('input[name="plan"]').forEach((r) => r.addEventListener('change', () => {
    $('campoDias').classList.toggle('hidden', planElegido() !== 'cortesia');
}));

function enlaceWhatsapp(codigo, plan, hasta, cliente) {
    const texto = `¡Hola! Tu código Pro de Bingo Show (${NOMBRE_PLAN[plan]}) es:\n\n${codigo}\n\n`
        + `Vale hasta el ${fecha(hasta)}. Escríbelo en «Código Pro» al crear la sala: ${location.origin}/sala.html`;
    const numero = String(cliente || '').replace(/\D/g, '');
    return `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
}

$('formCodigo').addEventListener('submit', async (e) => {
    e.preventDefault();
    const boton = $('emitirBtn');
    $('errorCodigo').classList.add('hidden');
    boton.disabled = true;
    try {
        const plan = planElegido();
        const nuevo = await api('/api/admin/codigos', {
            method: 'POST',
            body: JSON.stringify({ plan, dias: Number($('dias').value), nota: $('nota').value, cliente: $('cliente').value }),
        });
        $('emitidoCodigo').textContent = nuevo.codigo;
        $('emitidoDetalle').textContent = `${NOMBRE_PLAN[nuevo.tipo]} · ${soles(nuevo.importe)} · vale hasta el ${fecha(nuevo.hasta)}`;
        $('whatsappEmitido').href = enlaceWhatsapp(nuevo.codigo, nuevo.tipo, nuevo.hasta, nuevo.cliente);
        $('emitido').classList.remove('hidden');
        $('nota').value = '';
        $('cliente').value = '';
        await cargar();
    } catch (error) {
        $('errorCodigo').textContent = error.message;
        $('errorCodigo').classList.remove('hidden');
    } finally {
        boton.disabled = false;
    }
});

async function copiar(texto) {
    try {
        await navigator.clipboard.writeText(texto);
        avisar('Copiado');
    } catch {
        avisar('No se pudo copiar: selecciónalo a mano');
    }
}
$('copiarEmitido').addEventListener('click', () => copiar($('emitidoCodigo').textContent));

// ---------- Tabla ----------
$('buscar').addEventListener('input', pintarTabla);
$('filtro').addEventListener('change', pintarTabla);
$('recargarBtn').addEventListener('click', cargar);
$('tablaCodigos').addEventListener('click', async (e) => {
    const copia = e.target.closest('[data-copiar]');
    if (copia) return copiar(copia.dataset.copiar);
    const boton = e.target.closest('[data-anular]');
    if (!boton) return;
    const anular = boton.dataset.valor === 'true';
    if (anular && boton.dataset.confirmar !== '1') {
        boton.dataset.confirmar = '1';
        boton.textContent = '¿Seguro?';
        boton.classList.replace('bg-crema', 'bg-tomate');
        return;
    }
    try {
        await api('/api/admin/codigos/anular', { method: 'POST', body: JSON.stringify({ codigo: boton.dataset.anular, anulado: anular }) });
        avisar(anular ? 'Código anulado: ya no sirve para crear salas' : 'Código reactivado');
        await cargar();
    } catch (error) {
        avisar(error.message);
    }
});

// Al abrir, si esta pestaña ya tenía la clave, se entra directamente
const guardada = leerClave();
if (guardada) entrar(guardada);
