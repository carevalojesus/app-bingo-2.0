// Show en modo en línea (show.html?sala=CODIGO): el anfitrión proyecta el
// escenario y el servidor saca las bolas. Protocolo: docs/en-linea.md
//
// main.js solo crea este controlador si hay ?sala= en la URL; sin él, el show
// funciona sin conexión y este módulo no hace ninguna petición.
import { gsap } from 'gsap';
import { conectarSala, consultarSala, CLAVES, normalizarCodigo } from './cliente.js';
import { PATRONES, generarCarton, verificar } from '../carton.js';
import { htmlCarton } from '../carton-html.js';
import { MODALIDAD_FILA, INFO_FILA, MODALIDAD_ELIGE, INFO_ELIGE, esModoFila, esModoElige, esModoAuto, numerosDeFila } from '../filas.js';
import qrcode from 'qrcode-generator';
import * as sfx from '../efectos.js';
import { verificarPartida } from '../justo.js';

const $ = (id) => document.getElementById(id);
const COLORES_CODIGO = ['bg-tomate', 'bg-girasol', 'bg-menta', 'bg-cobalto text-crema', 'bg-fucsia', 'bg-crema'];
const TEXTO_CONEXION = {
    conectando: 'Conectando…',
    conectado: 'Conectado',
    reconectando: 'Reconectando…',
    cerrado: 'Desconectado',
};

const escapar = (texto) => String(texto ?? '').replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
const nombrePremio = (modalidad) => (modalidad === MODALIDAD_FILA ? INFO_FILA.nombre
    : modalidad === MODALIDAD_ELIGE ? INFO_ELIGE.nombre : PATRONES[modalidad]?.nombre ?? modalidad);
const segundosHasta = (t) => Math.max(0, Math.ceil((t - Date.now()) / 1000));

// QR (SVG) del enlace para unirse
function svgQr(texto) {
    const qr = qrcode(0, 'M');
    qr.addData(texto);
    qr.make();
    return qr.createSvgTag({ cellSize: 4, margin: 0, scalable: true });
}
const COLORES_LETRA = ['#ff5a36', '#ffc43d', '#19c3a0', '#3d6bff', '#ff4fa3'];
// Palabras según el tipo de juego
const palabras = (e) => (esModoElige(e?.config)
    ? { uno: 'jugada', varios: 'jugadas', Uno: 'Jugada', Varios: 'Jugadas', vendido: 'jugada vendida', vendidos: 'jugadas vendidas', sin: 'Sin jugadas', alguien: 'Esperando a que alguien arme una jugada' }
    : esModoFila(e?.config)
    ? { uno: 'fila', varios: 'filas', Uno: 'Fila', Varios: 'Filas', vendido: 'fila vendida', vendidos: 'filas vendidas', sin: 'Sin filas', alguien: 'Esperando a que alguien elija una fila' }
    : { uno: 'cartón', varios: 'cartones', Uno: 'Cartón', Varios: 'Cartones', vendido: 'cartón vendido', vendidos: 'cartones vendidos', sin: 'Sin cartones', alguien: 'Esperando a que alguien elija un cartón' });
const fichas = (n) => `${Number(n || 0).toLocaleString('es')} ${n === 1 ? 'ficha' : 'fichas'}`;
const plural = (n, uno, varios) => `${n} ${n === 1 ? uno : varios}`;

function leerToken(codigo) {
    try { return localStorage.getItem(CLAVES.anfitrion(codigo)); } catch { return null; }
}

// Código de sala de la URL (?sala=CODIGO) o null
export function salaEnUrl() {
    const codigo = normalizarCodigo(new URLSearchParams(location.search).get('sala'));
    return codigo.length === 6 ? codigo : null;
}

const urlJugar = (codigo) => `${location.origin}/jugar.html?sala=${codigo}`;

// show: ganchos de main.js (bola, fijarBolas, reiniciar, finalizar, correrReloj,
// fijarVelocidad, celebrarGanador, avisar, abrirModal, cerrarModal, hayModal,
// cantadas, sonido, columnaDe, colores, reducirMovimiento)
export function iniciarAnfitrion(codigo, show) {
    document.body.classList.add('en-linea', 'sala-cargando');
    $('infoCodigo').textContent = codigo;

    let conexion = null;
    let ultimo = null; // última instantánea
    let bienvenido = false;
    let finalizado = false;
    let finProgramado = null;
    let cierreGanador = null;
    let ventanaAbierta = false;
    let cuenta = null; // { objetivo, hasta, total } para el anillo
    let expulsarPendiente = null;
    let velocidadPedida = null; // { valor, hasta }

    prepararInterfaz();

    const token = leerToken(codigo);
    if (!token) {
        mostrarAvisoSala('Esta sala no es tuya', `En este dispositivo no está guardada la llave de anfitrión de la sala ${codigo}. Si vienes a jugar, entra desde el móvil.`, [
            { texto: 'Jugar en esta sala', href: `jugar.html?sala=${codigo}`, clase: 'bg-girasol' },
            { texto: 'Crear otra sala', href: 'sala.html', clase: 'bg-crema' },
            { texto: 'Show sin conexión', href: 'show.html', clase: 'bg-crema' },
        ]);
        return controlador();
    }

    // Comprobación previa: si la sala no existe no tiene sentido reconectar sin fin
    consultarSala(codigo)
        .then(() => conectar())
        .catch((error) => {
            if (/no existe|404|encontr/i.test(error.message)) {
                mostrarAvisoSala('Sala no encontrada', `No hay ninguna sala con el código ${codigo}. Puede que haya caducado.`, [
                    { texto: 'Crear una sala', href: 'sala.html', clase: 'bg-girasol' },
                    { texto: 'Show sin conexión', href: 'show.html', clase: 'bg-crema' },
                ]);
            } else {
                conectar(); // error de red: lo intenta el WebSocket con sus reintentos
            }
        });

    function conectar() {
        conexion = conectarSala(codigo, {
            hola: () => ({ rol: 'anfitrion', token }),
            alMensaje: recibir,
            alCambiarConexion: pintarConexion,
        });
    }

    function enviar(mensaje) {
        if (conexion?.enviar(mensaje)) return true;
        show.avisar('Sin conexión con la sala');
        return false;
    }

    // ---------- Mensajes ----------
    function recibir(mensaje) {
        switch (mensaje.tipo) {
            case 'bienvenida':
                if (mensaje.rol !== 'anfitrion') {
                    conexion?.cerrar();
                    return mostrarAvisoSala('No eres el anfitrión', 'El servidor no reconoce la llave de anfitrión guardada en este dispositivo.', [
                        { texto: 'Jugar en esta sala', href: `jugar.html?sala=${codigo}`, clase: 'bg-girasol' },
                    ]);
                }
                bienvenido = true;
                return aplicarEstado(mensaje.estado);
            case 'estado':
                return aplicarEstado(mensaje.estado);
            case 'bola':
                // Si llega desordenada (p. ej. tras reconectar) la siguiente instantánea lo arregla
                if (Number.isInteger(mensaje.numero) && !(mensaje.indice > show.cantadas())) show.bola(mensaje.numero);
                return;
            case 'ganador':
                return celebrar(mensaje);
            case 'cuenta':
                return show.cuentaAtras(Number(mensaje.ms) || 4000);
            case 'dorada':
                // Después del anuncio de la propia bola, que sale a la vez
                return gsap.delayedCall(2.4, () => anunciarDorada(mensaje));
            case 'reaccion':
                return flotarReaccion(mensaje.emoji, mensaje.apodo);
            case 'solicitud':
                if (show.sonido()) sfx.campana();
                return show.avisar(`${mensaje.apodo} pide ${fichas(mensaje.cantidad)}`);
            case 'vinculo':
                return mostrarVinculo(mensaje);
            case 'aviso':
                return show.avisar(mensaje.texto);
            case 'error':
                if (!bienvenido) {
                    conexion?.cerrar();
                    return mostrarAvisoSala('No se pudo abrir la sala', mensaje.mensaje || 'El servidor rechazó la conexión del anfitrión.', [
                        { texto: 'Jugar en esta sala', href: `jugar.html?sala=${codigo}`, clase: 'bg-girasol' },
                        { texto: 'Crear otra sala', href: 'sala.html', clase: 'bg-crema' },
                    ]);
                }
                return show.avisar(mensaje.mensaje || 'Algo salió mal');
            default:
                return undefined; // pong, bingoRechazado (solo jugadores)…
        }
    }

    function aplicarEstado(e) {
        if (!e) return;
        const anterior = ultimo;
        ultimo = e;
        const fase = e.estado;
        document.body.classList.remove('sala-cargando');
        document.body.classList.toggle('sala-lobby', fase === 'lobby');
        $('lobby').classList.toggle('hidden', fase !== 'lobby');

        // Mientras el servidor no confirma la velocidad pedida se mantiene la que ya se ve
        const esperando = velocidadPedida && Date.now() < velocidadPedida.hasta && e.config?.intervalo !== velocidadPedida.valor;
        if (!esperando) velocidadPedida = null;
        if (!esperando && e.config?.intervalo) show.fijarVelocidad(e.config.intervalo);

        if (fase === 'lobby') {
            // Nueva partida: limpiar pizarra, historial y fin
            if (anterior && anterior.estado !== 'lobby') {
                finProgramado?.kill();
                cierreGanador?.kill();
                if (show.hayModal()) show.cerrarModal();
                show.reiniciar({ aviso: '¡Nueva partida! A elegir cartones' });
                gsap.from('#lobby section, #empezarBtn', { y: 60, opacity: 0, duration: 0.6, ease: 'back.out(1.8)', stagger: 0.08, clearProps: 'all' });
            } else if (show.cantadas() > 0) {
                show.fijarBolas([]);
            }
            finalizado = false;
            pintarLobby(e);
        } else {
            if (anterior?.estado === 'lobby') {
                show.avisar('¡Que empiece el show!');
                gsap.from('#actual > div, #controles > *, #infoEnLinea', { y: 60, opacity: 0, duration: 0.6, ease: 'back.out(2)', stagger: 0.06, clearProps: 'transform,opacity' });
            }
            show.fijarBolas(e.bolas || []);
        }

        pintarMarca(e);
        show.correrReloj(fase === 'jugando');
        pintarAnillo(e);
        pintarInfo(e);
        pintarVentana(e);
        pintarControles(e);

        if (fase === 'terminada' && !finalizado) {
            finalizado = true;
            // Si se está celebrando el último premio, el fin espera a que termine
            const retraso = show.hayModal() || cierreGanador?.isActive() ? 6 : anterior ? 1.6 : 0;
            finProgramado?.kill();
            finProgramado = gsap.delayedCall(retraso, () => {
                if (show.hayModal()) show.cerrarModal();
                show.finalizar(htmlFin(ultimo));
                $('finNuevaBtn')?.addEventListener('click', pedirReinicio);
                $('finVerificarBtn')?.addEventListener('click', comprobarPartida);
            });
        }
    }

    // ---------- Interfaz ----------
    function prepararInterfaz() {
        $('conexion').classList.remove('hidden');
        $('enLineaBtn').classList.add('hidden');
        $('cartonesBtn').classList.add('hidden');
        $('bingoBtn').classList.add('hidden');
        $('infoEnLinea').classList.remove('hidden');
        // El modal de ¡Bingo! muestra los ganadores que verificó el servidor
        $('bingoLocal').classList.add('hidden');
        $('bingoEnLinea').classList.remove('hidden');
        $('nuevaPartidaBtn').classList.add('hidden');
        $('bingoBotones').classList.replace('grid-cols-2', 'grid-cols-1');
        $('textoReset').textContent = 'Se liberan los cartones y todos vuelven a la sala de espera. Los saldos de fichas se conservan.';
        $('confirmarResetBtn').textContent = 'Nueva partida';
        document.querySelector('#tituloReset').textContent = '¿Nueva partida?';

        $('lobbyCodigo').innerHTML = [...codigo].map((letra, i) =>
            `<span class="lobby-letra ${COLORES_CODIGO[i]}" style="--r:${[-5, 3, -2, 5, -4, 2][i]}deg">${letra}</span>`).join('');
        $('lobbyEnlace').value = urlJugar(codigo);
        try { $('lobbyQr').innerHTML = svgQr(urlJugar(codigo)); } catch { $('lobbyQr').classList.add('hidden'); }
        $('detenerCuentaBtn').addEventListener('click', () => enviar({ tipo: 'detenerCuenta' }));
        setInterval(() => {
            document.querySelectorAll('[data-hasta]').forEach((el) => { el.textContent = String(segundosHasta(Number(el.dataset.hasta))); });
            if (ultimo?.estado === 'lobby' && ultimo.inicioAutoEn) $('lobbyCuentaSeg').textContent = String(segundosHasta(ultimo.inicioAutoEn));
        }, 250);
        $('copiarBtn').addEventListener('click', copiarEnlace);
        $('lobbyEnlace').addEventListener('focus', (ev) => ev.target.select());
        $('empezarBtn').addEventListener('click', () => {
            if (ultimo?.estado === 'lobby' && enviar({ tipo: 'iniciar' })) $('empezarBtn').disabled = true;
        });
        $('vincularBtn').addEventListener('click', () => enviar({ tipo: 'vincular' }));
        $('lobbyJugadores').addEventListener('click', (ev) => {
            const admitir = ev.target.closest('[data-admitir]');
            if (admitir) {
                const cantidad = Number(admitir.dataset.cantidad) || 0;
                return enviar(cantidad > 0
                    ? { tipo: 'darFichas', jugadorId: admitir.dataset.admitir, cantidad }
                    : { tipo: 'admitir', jugadorId: admitir.dataset.admitir });
            }
            const dar = ev.target.closest('[data-dar]');
            if (dar) return enviar({ tipo: 'darFichas', jugadorId: dar.dataset.dar, cantidad: Number(dar.dataset.cantidad) });
            const boton = ev.target.closest('[data-expulsar]');
            if (!boton) return;
            const id = boton.dataset.expulsar;
            if (expulsarPendiente !== id) {
                expulsarPendiente = id;
                pintarLobby(ultimo);
                return;
            }
            expulsarPendiente = null;
            enviar({ tipo: 'expulsar', jugadorId: id });
        });
    }

    async function copiarEnlace() {
        const enlace = urlJugar(codigo);
        try {
            await navigator.clipboard.writeText(enlace);
        } catch {
            $('lobbyEnlace').focus();
            $('lobbyEnlace').select();
            try { document.execCommand('copy'); } catch { /* el texto queda seleccionado */ }
        }
        show.avisar('¡Enlace copiado!');
        gsap.fromTo('#copiarBtn', { rotation: -8 }, { rotation: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)', clearProps: 'transform' });
    }

    function pintarConexion(estadoConexion) {
        const el = $('conexion');
        el.dataset.estado = estadoConexion;
        $('conexionTexto').textContent = TEXTO_CONEXION[estadoConexion] ?? estadoConexion;
        if (estadoConexion === 'reconectando') pintarControles(ultimo);
        if (estadoConexion === 'conectado') pintarControles(ultimo);
    }

    function vendidos(e) {
        return Object.keys(e.ocupados || {}).length;
    }

    // En lobby el pozo aún no está cerrado: ventas + pozo extra
    function pozoDe(e) {
        if (e.estado !== 'lobby' && e.pozo) return e.pozo;
        const ventas = vendidos(e) * (e.config?.precioCarton || 0);
        const aporte = Math.floor((ventas * (e.config?.botePorcentaje || 0)) / 100);
        return Math.max(e.pozo || 0, ventas - aporte + (e.config?.pozoExtra || 0));
    }

    function pintarLobby(e) {
        const config = e.config || {};
        const total = config.cartones || 0;
        const vendidosN = vendidos(e);
        const pozo = pozoDe(e);
        const p = palabras(e);
        $('lobbyUnidades').textContent = p.Varios;
        $('lobbyNombre').textContent = e.nombre || `Sala ${codigo}`;
        $('lobbyPozo').textContent = pozo.toLocaleString('es');
        $('lobbyVendidos').textContent = vendidosN;
        $('lobbyTotal').textContent = total;
        $('lobbyBarra').style.width = `${total ? (vendidosN / total) * 100 : 0}%`;
        $('lobbyReglas').textContent =
            `${esModoFila(config) ? 'Fila de 5 · ' : ''}${fichas(config.precioCarton)} por ${p.uno} · máx. ${config.maxCartonesPorJugador ?? '—'} por jugador · ${fichas(config.fichasIniciales)} al entrar`;
        $('lobbyPremios').innerHTML = (config.premios || []).map((p, i) => `
            <li class="flex items-center justify-between gap-3 rounded-xl border-[2.5px] border-tinta bg-papel px-3 py-2">
                <span class="flex items-center gap-2">
                    <span class="grid h-7 w-7 place-items-center rounded-lg border-[2.5px] border-tinta bg-girasol font-display text-sm">${i + 1}</span>
                    <span class="font-ui font-black uppercase tracking-wide">${escapar(nombrePremio(p.modalidad))}</span>
                </span>
                <span class="text-right font-ui font-bold"><span class="font-display">${Math.floor((pozo * p.porcentaje) / 100).toLocaleString('es')}</span> <span class="text-tinta/50">· ${p.porcentaje}%</span></span>
            </li>`).join('');

        const jugadores = e.jugadores || [];
        $('lobbyConectados').textContent = `${jugadores.filter((j) => j.conectado).length}/${jugadores.length}${e.pro ? '' : ` (máx. ${e.maxJugadores ?? 15})`}`;
        const pedidos = new Map((e.solicitudes || []).map((s) => [s.jugadorId, s.cantidad]));
        $('lobbyJugadores').innerHTML = jugadores.length ? jugadores.map((j) => j.admitido === false ? `
            <li class="flex flex-wrap items-center gap-2 rounded-xl border-[2.5px] border-dashed border-tinta bg-papel px-3 py-2">
                <span class="min-w-0 flex-1">
                    <span class="block truncate font-ui font-black">${escapar(j.apodo)}</span>
                    <span class="font-ui text-xs font-bold text-tinta/60">En espera${pedidos.has(j.id) ? ` · pide ${fichas(pedidos.get(j.id))}` : ''}</span>
                </span>
                <button type="button" data-admitir="${escapar(j.id)}" data-cantidad="${pedidos.get(j.id) ?? 0}" class="boton h-8 shrink-0 bg-menta px-2 text-[10px]">${pedidos.has(j.id) ? `Admitir y dar ${pedidos.get(j.id)}` : 'Admitir'}</button>
                <button type="button" data-expulsar="${escapar(j.id)}" class="boton h-8 shrink-0 bg-crema px-2 text-[10px]">Rechazar</button>
            </li>` : `
            <li class="flex items-center gap-3 rounded-xl border-[2.5px] border-tinta bg-white px-3 py-2 ${j.conectado ? '' : 'opacity-60'}">
                <span class="h-3 w-3 shrink-0 rounded-full border-2 border-tinta ${j.conectado ? 'bg-menta' : 'bg-tinta/20'}" title="${j.conectado ? 'Conectado' : 'Desconectado'}"></span>
                <span class="min-w-0 flex-1">
                    <span class="block truncate font-ui font-black">${escapar(j.apodo)}</span>
                    <span class="flex flex-wrap gap-1 pt-0.5">${(j.cartones || []).length
                        ? j.cartones.map((n) => `<span class="rounded-md border-2 border-tinta bg-girasol px-1.5 font-display text-[11px] leading-5">${n}</span>`).join('')
                        : `<span class="font-ui text-xs font-bold text-tinta/50">${p.sin}</span>`}</span>
                </span>
                <span class="shrink-0 text-right font-ui text-xs font-bold text-tinta/60">${fichas(j.fichas)}${pedidos.has(j.id)
                    ? `<button type="button" data-dar="${escapar(j.id)}" data-cantidad="${pedidos.get(j.id)}" class="boton mt-1 block h-7 bg-girasol px-2 text-[10px]">Dar ${pedidos.get(j.id)}</button>` : ''}</span>
                <button type="button" data-expulsar="${escapar(j.id)}" class="boton h-8 shrink-0 px-2 text-[10px] ${expulsarPendiente === j.id ? 'bg-tomate text-crema' : 'bg-crema'}"
                        aria-label="Expulsar a ${escapar(j.apodo)}" title="Expulsar">${expulsarPendiente === j.id ? '¿Seguro?' : '✕'}</button>
            </li>`).join('')
            : `<li class="grid flex-1 place-items-center rounded-xl border-[2.5px] border-dashed border-tinta/30 p-6 text-center font-ui font-bold text-tinta/50">
                Aún no hay nadie.<br>Escanea o escribe el enlace en el móvil para unirte.</li>`;

        // Partida verificable: el compromiso existe desde el lobby
        const compromiso = e.justo?.compromiso;
        $('lobbyJusto').classList.toggle('hidden', !compromiso);
        $('lobbyJusto').classList.toggle('flex', Boolean(compromiso));
        $('lobbyCompromiso').textContent = compromiso ? compromiso.slice(0, 12) : '';

        $('lobbyExtras').innerHTML = htmlExtras(e);
        // Plan gratis: aviso discreto con el límite de jugadores
        $('lobbyPlan').classList.toggle('hidden', Boolean(e.pro));
        if (!e.pro) {
            $('lobbyPlan').innerHTML = `<span class="font-black">Versión gratis</span> · hasta ${e.maxJugadores ?? 15} jugadores y 1 premio. `
                + '<a href="precios.html" target="_blank" class="pointer-events-auto font-black underline">Pásate a Pro</a>';
        }
        const cuenta = Boolean(e.inicioAutoEn);
        $('lobbyCuenta').classList.toggle('hidden', !cuenta);
        $('lobbyCuenta').classList.toggle('flex', cuenta);
        if (cuenta) $('lobbyCuentaSeg').textContent = String(segundosHasta(e.inicioAutoEn));

        const listo = vendidosN > 0;
        $('empezarBtn').disabled = !listo;
        $('empezarAyuda').textContent = listo
            ? `${plural(vendidosN, p.vendido, p.vendidos)} · ¡Todo listo!`
            : jugadores.length ? p.alguien : 'Esperando jugadores';
    }

    // Ronda, bote y bola dorada (lobby y panel de partida)
    function htmlExtras(e, tag = 'div') {
        const config = e?.config || {};
        const filas = [];
        if (config.rondasSeguidas) {
            filas.push(`<${tag} class="flex items-center justify-between gap-2 rounded-xl border-[2.5px] border-tinta bg-menta px-3 py-1.5">
                <span class="font-ui font-black uppercase tracking-wide">Ronda ${e.ronda ?? 1}</span><span class="font-ui text-xs font-bold">rondas seguidas</span></${tag}>`);
        }
        if (config.botePorcentaje > 0) {
            const bote = (e.bote || 0) + (e.estado === 'lobby' ? e.aporteRonda || 0 : 0);
            filas.push(`<${tag} class="flex items-center justify-between gap-2 rounded-xl border-[2.5px] border-tinta bg-fucsia px-3 py-1.5">
                <span class="font-ui font-black uppercase tracking-wide">Bote <span class="text-xs normal-case">· en ${config.boteBolas} bolas o menos</span></span>
                <span class="font-display text-lg">${bote.toLocaleString('es')}</span></${tag}>`);
        }
        if (config.bolaDorada) {
            filas.push(`<${tag} class="flex items-center justify-between gap-2 rounded-xl border-[2.5px] border-tinta bg-girasol px-3 py-1.5">
                <span class="font-ui font-black uppercase tracking-wide">Bola dorada <span class="text-xs normal-case">· premio ×2</span></span>
                <span class="font-display text-lg">${e.dorada ? escapar(`${show.columnaDe(e.dorada).letra}-${e.dorada}`) : '¿?'}</span></${tag}>`);
        }
        return filas.join('');
    }

    // Logo del evento (Pro): en la cabecera y en el lobby. La imagen se pide aparte, no viaja en el estado.
    let logoPintado = null;
    function pintarMarca(e) {
        if (e.logo === logoPintado) return;
        logoPintado = e.logo;
        const src = e.logo ? `/api/salas/${codigo}/logo?v=${encodeURIComponent(e.logo)}` : '';
        for (const id of ['marcaLogo', 'lobbyLogo']) {
            const img = $(id);
            img.classList.toggle('hidden', !src);
            if (src) {
                img.src = src;
                img.alt = `Logo de ${e.nombre || 'el evento'}`;
            } else img.removeAttribute('src');
        }
    }

    function pintarInfo(e) {
        const jugadores = e.jugadores || [];
        const conectados = jugadores.filter((j) => j.conectado).length;
        $('infoJugadores').textContent = `${conectados}/${jugadores.length} conectados`;
        $('infoPozo').textContent = pozoDe(e).toLocaleString('es');
        const premios = e.premios?.length ? e.premios : (e.config?.premios || []);
        $('infoPremios').innerHTML = htmlExtras(e, 'li') + premios.map((p, i) => {
            const enJuego = i === e.premioActual && e.estado !== 'lobby' && e.estado !== 'terminada';
            const ganadores = p.ganadores || [];
            const detalle = ganadores.length
                ? `<span class="truncate text-tinta/70">${ganadores.map((g) => escapar(g.apodo)).join(', ')}</span>`
                : enJuego ? '<span class="premio-en-juego">En juego</span>' : '<span class="text-tinta/40">Pendiente</span>';
            return `<li class="premio-fila ${enJuego ? 'activo' : ''} ${ganadores.length ? 'ganado' : ''}">
                <span class="font-ui text-[11px] font-black uppercase tracking-wide">${ganadores.length ? '✓ ' : ''}${escapar(nombrePremio(p.modalidad))}${p.doble ? ' ×2' : ''}</span>
                <span class="font-display text-xs">${(p.fichas ?? Math.floor((pozoDe(e) * p.porcentaje) / 100)).toLocaleString('es')}</span>
                <span class="col-span-2 flex min-w-0 font-ui text-[11px] font-bold">${detalle}</span>
            </li>`;
        }).join('');
    }

    function pintarVentana(e) {
        const abierta = Boolean(e.ventanaHasta) && e.estado === 'jugando';
        const el = $('ventanaBingo');
        if (abierta && !ventanaAbierta) {
            $('ventanaTitulo').textContent = esModoFila(e.config) ? '¡Fila completa!' : esModoElige(e.config) ? '¡Jugada completa!' : '¡Bingo cantado!';
            el.classList.remove('hidden');
            gsap.fromTo(el.firstElementChild, { scale: 2.5, rotation: -20, opacity: 0 }, { scale: 1, rotation: -3, opacity: 1, duration: 0.45, ease: 'back.out(2)' });
            if (show.sonido()) {
                sfx.golpe(0.8);
                sfx.cantar(show.voz(esModoAuto(e.config) ? 'fila' : 'bingo'));
            }
        } else if (!abierta && ventanaAbierta) {
            gsap.to(el.firstElementChild, { scale: 0.6, opacity: 0, duration: 0.25, ease: 'power2.in', onComplete: () => el.classList.add('hidden') });
        }
        ventanaAbierta = abierta;
    }

    function pintarControles(e) {
        if (!e) return;
        const conectado = $('conexion').dataset.estado === 'conectado';
        $('playBtn').disabled = !conectado || e.estado === 'terminada' || e.estado === 'lobby';
        $('velocidadBtn').disabled = !conectado;
        $('resetBtn').disabled = !conectado || e.estado === 'jugando' || e.estado === 'pausa';
        $('resetBtn').title = e.estado === 'terminada' ? 'Nueva partida (R)' : 'Disponible al terminar la partida';
        $('playBtn').setAttribute('aria-label', e.estado === 'pausa' ? 'Reanudar' : 'Pausar');
    }

    // Anillo de cuenta atrás: siguienteBolaEn viene en hora del servidor. Se convierte
    // a tiempo local al recibirlo y se acota para que un reloj desajustado no lo rompa.
    function pintarAnillo(e) {
        const objetivo = e.estado === 'jugando' && !e.ventanaHasta ? e.siguienteBolaEn : null;
        if (!objetivo) { cuenta = null; return; }
        if (cuenta?.objetivo === objetivo) return;
        const intervalo = e.config?.intervalo || 8000;
        const restante = gsap.utils.clamp(0, intervalo + 8000, objetivo - Date.now());
        cuenta = { objetivo, hasta: performance.now() + restante, total: Math.max(intervalo, restante) };
    }

    function progresoAnillo() {
        if (!cuenta) return 0;
        return gsap.utils.clamp(0, 1, 1 - (cuenta.hasta - performance.now()) / cuenta.total);
    }

    // ---------- Ganadores y fin ----------
    function htmlFilaGanadora(numeros) {
        return `<div class="flex gap-2 rounded-2xl border-[3px] border-tinta bg-white p-3">${numeros.map((x, c) => `
            <span class="fila-celda grid h-14 w-14 place-items-center rounded-full border-[3px] border-tinta font-display text-xl text-tinta"
                  style="background:${COLORES_LETRA[c]}">${x}</span>`).join('')}</div>`;
    }

    function htmlCartonGanador(g, modalidad) {
        if (modalidad === MODALIDAD_FILA) return Number.isInteger(g.carton) ? htmlFilaGanadora(numerosDeFila(g.carton)) : '';
        if (modalidad === MODALIDAD_ELIGE) return ultimo?.jugadas?.[g.carton] ? htmlFilaGanadora(ultimo.jugadas[g.carton]) : '';
        if (!ultimo?.serie || !Number.isInteger(g.carton)) return '';
        try {
            const carton = generarCarton(ultimo.serie, g.carton);
            const r = verificar(carton, new Set(ultimo.bolas || []), modalidad);
            return htmlCarton(carton, { marcadas: r.marcadas, clave: r.gana ? r.figura : [] });
        } catch {
            return '';
        }
    }

    // Bola dorada: cartel dorado gigante y voz
    function anunciarDorada({ numero, fichas: total }) {
        const el = document.createElement('div');
        el.className = 'aviso-dorada';
        el.innerHTML = `<p class="font-display text-4xl leading-none sm:text-6xl">¡Bola dorada!</p>
            <p class="mt-2 font-ui text-lg font-black">Salió el ${escapar(`${show.columnaDe(numero).letra}-${numero}`)} · el premio se duplica: ${fichas(total)}</p>`;
        document.body.append(el);
        gsap.timeline({ onComplete: () => el.remove() })
            .fromTo(el, { scale: 0.2, rotation: -12, autoAlpha: 0 }, { scale: 1, rotation: -3, autoAlpha: 1, duration: 0.6, ease: 'back.out(2.2)' })
            .to(el, { autoAlpha: 0, y: -40, duration: 0.5, ease: 'power2.in' }, '+=2.6');
        show.sacudir();
        if (show.sonido()) {
            sfx.fanfarria();
            gsap.delayedCall(0.6, () => sfx.cantar(show.voz('dorada')));
        }
    }

    // Reacción de un jugador: emoji que sube por la pantalla con su apodo
    function flotarReaccion(emoji, apodo) {
        if (document.hidden) return;
        const el = document.createElement('div');
        el.className = 'reaccion-show';
        el.innerHTML = `<span class="text-5xl sm:text-6xl">${escapar(emoji)}</span><span class="reaccion-apodo">${escapar(apodo)}</span>`;
        el.style.left = `${8 + Math.random() * 55}%`;
        document.body.append(el);
        setTimeout(() => el.remove(), 3200);
    }

    // Código para manejar la sala desde el móvil: se muestra en grande, vale 2 minutos y un solo uso
    function mostrarVinculo({ codigo: cifras, expira }) {
        document.querySelector('.vinculo-capa')?.remove();
        const url = `${location.origin}/anfitrion.html?sala=${codigo}`;
        const capa = document.createElement('div');
        capa.className = 'vinculo-capa';
        capa.innerHTML = `<div class="carta w-full max-w-sm p-5 text-center" role="dialog" aria-modal="true" aria-label="Controlar desde el móvil">
            <p class="font-display text-2xl">Controla la sala desde tu móvil</p>
            <div class="mx-auto mt-3 h-36 w-36 rounded-xl border-[3px] border-tinta bg-white p-1.5 [&>svg]:h-full [&>svg]:w-full">${svgQr(url)}</div>
            <p class="mt-2 break-all font-ui text-xs font-bold text-tinta/70">${escapar(url)}</p>
            <p class="etiqueta mt-3">Escribe este código en el móvil</p>
            <p class="font-display text-5xl tracking-[0.2em]">${escapar(cifras)}</p>
            <p class="mt-2 font-ui text-xs font-bold text-tinta/70">Vale <span data-hasta="${expira}">${segundosHasta(expira)}</span> s y una sola vez. No lo dejes a la vista del público.</p>
            <button type="button" class="boton mt-4 h-11 w-full bg-crema">Cerrar</button>
        </div>`;
        document.body.append(capa);
        const cerrar = () => capa.remove();
        capa.querySelector('button').addEventListener('click', cerrar);
        capa.addEventListener('click', (ev) => { if (ev.target === capa) cerrar(); });
        setTimeout(cerrar, Math.max(0, expira - Date.now()) + 500);
    }

    // Repetición de la bola decisiva a cámara lenta antes de la celebración
    function repeticion(numero, alTerminar) {
        if (show.reducirMovimiento || !Number.isInteger(numero)) return alTerminar();
        const { letra, color } = show.columnaDe(numero);
        const el = document.createElement('div');
        el.className = 'repeticion';
        el.innerHTML = `<div class="repeticion-barra arriba"></div><div class="repeticion-barra abajo"></div>
            <p class="repeticion-etiqueta">● Repetición · bola decisiva</p>
            <div class="repeticion-bola" style="--c:${color}"><b><small>${letra}</small>${numero}</b></div>`;
        document.body.append(el);
        const bola = el.querySelector('.repeticion-bola');
        gsap.timeline({ onComplete: () => { el.remove(); alTerminar(); } })
            .fromTo(el.querySelectorAll('.repeticion-barra'), { scaleY: 0 }, { scaleY: 1, duration: 0.35, ease: 'power2.out' })
            .from(el.querySelector('.repeticion-etiqueta'), { autoAlpha: 0, x: -30, duration: 0.3 }, 0.2)
            .fromTo(bola, { scale: 0.15, rotation: -540, x: -260, y: 160, filter: 'blur(6px)' },
                { scale: 1, rotation: 0, x: 0, y: 0, filter: 'blur(0px)', duration: 1.6, ease: 'power3.out' }, 0.25)
            .call(() => show.sacudir(), null, 1.55)
            .to(bola, { scale: 1.12, duration: 0.18, yoyo: true, repeat: 1, ease: 'power1.inOut' }, 1.6)
            .to(el, { autoAlpha: 0, duration: 0.3 }, '+=0.25');
    }

    function celebrar(mensaje) {
        const bolas = ultimo?.bolas || [];
        repeticion(bolas.at(-1), () => mostrarGanador(mensaje));
    }

    function mostrarGanador({ modalidad, ganadores = [], siguiente = null, bote = 0 }) {
        const nombre = nombrePremio(modalidad);
        const premios = ultimo?.premios || [];
        const indice = premios.findIndex((p) => p.modalidad === modalidad);
        const proximo = premios.find((p) => p.modalidad === siguiente);
        const varios = ganadores.length > 1;
        $('bingoEnLinea').innerHTML = `
            <p class="text-center etiqueta text-tinta/60">${indice >= 0 ? `Premio ${indice + 1} de ${premios.length}` : 'Premio'} · ${show.cantadas()} bolas</p>
            <h3 class="mt-1 text-center font-display text-3xl leading-none sm:text-4xl">¡${escapar(nombre)}!</h3>
            <ul class="mt-4 grid gap-2">${ganadores.map((g) => `
                <li class="flex items-center justify-between gap-3 rounded-xl border-[2.5px] border-tinta bg-papel px-3 py-2">
                    <span class="min-w-0">
                        <span class="block truncate font-ui text-lg font-black">${escapar(g.apodo)}</span>
                        <span class="etiqueta text-tinta/60">${palabras(ultimo).Uno} nº ${escapar(g.carton)}</span>
                    </span>
                    <span class="shrink-0 rounded-lg border-[2.5px] border-tinta bg-girasol px-2 py-1 font-display text-base shadow-duro-sm">+${Number(g.fichas || 0).toLocaleString('es')}</span>
                </li>`).join('')}
            </ul>
            ${bote ? `<p class="mt-3 rounded-xl border-[2.5px] border-tinta bg-fucsia px-3 py-2 text-center font-display text-xl">¡Y se lleva el bote! +${Number(bote).toLocaleString('es')}</p>` : ''}
            <div class="ganadores-cartones mt-4 flex flex-wrap justify-center gap-3 ${varios ? 'varios' : ''}">
                ${ganadores.slice(0, 3).map((g) => htmlCartonGanador(g, modalidad)).join('')}
            </div>
            <p class="mt-4 rounded-xl bg-tinta px-3 py-2 text-center font-ui font-black text-crema">${siguiente
                ? `Seguimos por: ${escapar(nombrePremio(siguiente))}${proximo?.fichas ? ` · ${fichas(proximo.fichas)}` : ''}`
                : '¡Era el último premio!'}</p>`;
        show.celebrarGanador();
        $('sello').classList.add('hidden');
        gsap.delayedCall(1.2, () => {
            if (!show.hayModal()) return;
            const sello = $('sello');
            sello.textContent = '¡Válido!';
            sello.style.background = '#19c3a0';
            sello.style.color = '#14112b';
            sello.style.borderColor = '#14112b';
            sello.classList.remove('hidden');
            gsap.fromTo(sello, { scale: 3.5, rotation: -35, autoAlpha: 0 }, { scale: 1, rotation: -12, autoAlpha: 1, duration: 0.42, ease: 'power4.in' });
        });
        gsap.from('#bingoEnLinea .carton-celda, #bingoEnLinea .fila-celda', { scale: 0, duration: 0.35, ease: 'back.out(2.5)', stagger: { amount: 0.35, from: 'center' }, delay: 0.9 });

        // El servidor reanuda el sorteo a los 6 s: el modal se cierra antes
        cierreGanador?.kill();
        cierreGanador = gsap.delayedCall(5.4, () => { if (show.hayModal()) show.cerrarModal(); });
    }

    function htmlFin(e) {
        const premios = e?.premios || [];
        const filas = premios.map((p) => {
            const ganadores = (p.ganadores || []).map((g) => `${escapar(g.apodo)} <span class="text-tinta/50">(nº ${escapar(g.carton)})</span>`).join(', ') || '—';
            return `<li class="flex items-baseline justify-between gap-4 border-t-2 border-tinta/15 py-1.5 text-left">
                <span class="font-ui text-sm font-black uppercase tracking-wide">${escapar(nombrePremio(p.modalidad))}</span>
                <span class="font-ui text-sm font-bold">${ganadores} · <span class="font-display">${Number(p.fichas || 0).toLocaleString('es')}</span></span>
            </li>`;
        }).join('');
        const ranking = [...(e?.jugadores || [])].filter((j) => (j.ganado || 0) > 0).sort((a, b) => b.ganado - a.ganado).slice(0, 5);
        const medallas = ['🥇', '🥈', '🥉', '4.', '5.'];
        const htmlRanking = ranking.length ? `<p class="etiqueta mt-4">Ranking de la noche</p>
            <ol class="mx-auto mt-1 max-w-md">${ranking.map((j, i) => `<li class="flex items-baseline justify-between gap-4 border-t-2 border-tinta/15 py-1 text-left font-ui text-sm font-bold">
                <span>${medallas[i]} ${escapar(j.apodo)}</span><span class="font-display">+${Number(j.ganado).toLocaleString('es')}</span></li>`).join('')}</ol>` : '';
        const siguienteRonda = e?.config?.rondasSeguidas && e?.siguienteRondaEn
            ? `<p class="mt-3 rounded-full bg-menta px-4 py-1.5 font-ui font-black">Ronda ${(e.ronda ?? 1) + 1} en <span class="font-display text-lg" data-hasta="${e.siguienteRondaEn}">${segundosHasta(e.siguienteRondaEn)}</span> s</p>` : '';
        return `<p class="font-display text-3xl sm:text-5xl">¡Partida terminada!</p>
            <p class="etiqueta mt-1">${e?.config?.rondasSeguidas ? `Ronda ${e.ronda ?? 1} · ` : ''}${plural((e?.bolas || []).length, 'bola', 'bolas')} · pozo de ${fichas(e?.pozo)}</p>
            <ol class="mx-auto mt-3 max-w-md">${filas}</ol>
            ${htmlRanking}
            ${siguienteRonda}
            <div class="mt-4 flex flex-wrap justify-center gap-2">
                ${e?.justo ? '<button id="finVerificarBtn" type="button" class="boton pointer-events-auto h-11 bg-menta px-4">Verificar partida</button>' : ''}
                <button id="finNuevaBtn" type="button" class="boton pointer-events-auto h-11 bg-tinta px-5 text-crema">Nueva partida</button>
            </div>
            <div id="finVerificacion" class="mx-auto mt-3 hidden max-w-md rounded-xl border-[2.5px] border-tinta px-3 py-2 text-left font-ui text-sm font-bold" aria-live="polite"></div>`;
    }

    // Recalcula la serie y el orden de las bolas con las semillas publicadas (src/justo.js)
    function comprobarPartida() {
        const caja = $('finVerificacion');
        const e = ultimo;
        const j = e?.justo;
        let resultado;
        if (!j?.semillaServidor) {
            resultado = { valida: false, errores: ['El servidor aún no ha revelado su semilla.'] };
        } else {
            resultado = verificarPartida({
                compromiso: j.compromiso,
                semillaServidor: j.semillaServidor,
                semillasClientes: j.semillasClientes || [],
                semillaClientes: j.semillaClientes,
                serie: e.serie,
                bolas: e.bolas || [],
                dorada: e.config?.bolaDorada ? e.dorada ?? null : null,
            });
        }
        caja.classList.remove('hidden');
        caja.style.background = resultado.valida ? '#19c3a0' : '#fff';
        caja.style.color = resultado.valida ? '#14112b' : '#ff5a36';
        caja.innerHTML = resultado.valida
            ? `✓ Partida verificada: las ${(e.bolas || []).length} bolas y la serie ${escapar(e.serie)} salen de la semilla comprometida`
                + ` (${escapar(j.compromiso.slice(0, 12))}…) y de las semillas de ${plural((j.semillasClientes || []).length, 'jugador', 'jugadores')}.`
            : `✕ No cuadra:<ul class="mt-1 list-disc pl-5">${resultado.errores.map((x) => `<li>${escapar(x)}</li>`).join('')}</ul>`;
        gsap.fromTo(caja, { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2.5)' });
    }

    // ---------- Aviso a pantalla completa ----------
    function mostrarAvisoSala(titulo, texto, acciones) {
        document.body.classList.remove('sala-cargando');
        $('salaAvisoTitulo').textContent = titulo;
        $('salaAvisoTexto').textContent = texto;
        $('salaAvisoAcciones').innerHTML = acciones.map((a) =>
            `<a href="${a.href}" class="boton h-12 ${a.clase}">${escapar(a.texto)}</a>`).join('');
        $('salaAviso').classList.replace('hidden', 'grid');
        pintarConexion('cerrado');
    }

    // ---------- Acciones del anfitrión ----------
    function alternar() {
        if (!ultimo) return;
        if (ultimo.estado === 'jugando') enviar({ tipo: 'pausar' });
        else if (ultimo.estado === 'pausa') enviar({ tipo: 'reanudar' });
        else if (ultimo.estado === 'lobby') show.avisar('Pulsa «¡Empezar!» cuando estéis listos');
    }

    function pedirReinicio() {
        if (!ultimo) return;
        if (ultimo.estado === 'jugando' || ultimo.estado === 'pausa') return show.avisar('La partida en curso tiene que terminar');
        if (ultimo.estado === 'lobby') return show.avisar('Ya estáis en la sala de espera');
        show.abrirModal('modalReset');
    }

    function controlador() {
        return {
            alternar,
            pedirReinicio,
            nuevaPartida: () => enviar({ tipo: 'nuevaPartida' }),
            velocidad: (intervalo) => {
                if (enviar({ tipo: 'velocidad', intervalo })) {
                    velocidadPedida = { valor: intervalo, hasta: Date.now() + 3000 };
                    show.avisar(`Una bola cada ${intervalo / 1000} segundos`);
                } else if (ultimo?.config?.intervalo) {
                    show.fijarVelocidad(ultimo.config.intervalo);
                }
            },
            progresoAnillo,
        };
    }

    return controlador();
}
