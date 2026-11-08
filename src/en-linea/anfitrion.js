// Show en modo en línea (index.html?sala=CODIGO): el anfitrión proyecta el
// escenario y el servidor saca las bolas. Protocolo: docs/en-linea.md
//
// main.js solo crea este controlador si hay ?sala= en la URL; sin él, el show
// funciona sin conexión y este módulo no hace ninguna petición.
import { gsap } from 'gsap';
import { conectarSala, consultarSala, CLAVES, normalizarCodigo } from './cliente.js';
import { PATRONES, generarCarton, verificar } from '../carton.js';
import { htmlCarton } from '../carton-html.js';
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
const nombrePremio = (modalidad) => PATRONES[modalidad]?.nombre ?? modalidad;
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
            { texto: 'Show sin conexión', href: 'index.html', clase: 'bg-crema' },
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
                    { texto: 'Show sin conexión', href: 'index.html', clase: 'bg-crema' },
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
        $('copiarBtn').addEventListener('click', copiarEnlace);
        $('lobbyEnlace').addEventListener('focus', (ev) => ev.target.select());
        $('empezarBtn').addEventListener('click', () => {
            if (ultimo?.estado === 'lobby' && enviar({ tipo: 'iniciar' })) $('empezarBtn').disabled = true;
        });
        $('lobbyJugadores').addEventListener('click', (ev) => {
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
        return Math.max(e.pozo || 0, vendidos(e) * (e.config?.precioCarton || 0) + (e.config?.pozoExtra || 0));
    }

    function pintarLobby(e) {
        const config = e.config || {};
        const total = config.cartones || 0;
        const vendidosN = vendidos(e);
        const pozo = pozoDe(e);
        $('lobbyNombre').textContent = e.nombre || `Sala ${codigo}`;
        $('lobbyPozo').textContent = pozo.toLocaleString('es');
        $('lobbyVendidos').textContent = vendidosN;
        $('lobbyTotal').textContent = total;
        $('lobbyBarra').style.width = `${total ? (vendidosN / total) * 100 : 0}%`;
        $('lobbyReglas').textContent =
            `${fichas(config.precioCarton)} por cartón · máx. ${config.maxCartonesPorJugador ?? '—'} por jugador · ${fichas(config.fichasIniciales)} al entrar`;
        $('lobbyPremios').innerHTML = (config.premios || []).map((p, i) => `
            <li class="flex items-center justify-between gap-3 rounded-xl border-[2.5px] border-tinta bg-papel px-3 py-2">
                <span class="flex items-center gap-2">
                    <span class="grid h-7 w-7 place-items-center rounded-lg border-[2.5px] border-tinta bg-girasol font-display text-sm">${i + 1}</span>
                    <span class="font-ui font-black uppercase tracking-wide">${escapar(nombrePremio(p.modalidad))}</span>
                </span>
                <span class="text-right font-ui font-bold"><span class="font-display">${Math.floor((pozo * p.porcentaje) / 100).toLocaleString('es')}</span> <span class="text-tinta/50">· ${p.porcentaje}%</span></span>
            </li>`).join('');

        const jugadores = e.jugadores || [];
        $('lobbyConectados').textContent = `${jugadores.filter((j) => j.conectado).length}/${jugadores.length}`;
        $('lobbyJugadores').innerHTML = jugadores.length ? jugadores.map((j) => `
            <li class="flex items-center gap-3 rounded-xl border-[2.5px] border-tinta bg-white px-3 py-2 ${j.conectado ? '' : 'opacity-60'}">
                <span class="h-3 w-3 shrink-0 rounded-full border-2 border-tinta ${j.conectado ? 'bg-menta' : 'bg-tinta/20'}" title="${j.conectado ? 'Conectado' : 'Desconectado'}"></span>
                <span class="min-w-0 flex-1">
                    <span class="block truncate font-ui font-black">${escapar(j.apodo)}</span>
                    <span class="flex flex-wrap gap-1 pt-0.5">${(j.cartones || []).length
                        ? j.cartones.map((n) => `<span class="rounded-md border-2 border-tinta bg-girasol px-1.5 font-display text-[11px] leading-5">${n}</span>`).join('')
                        : '<span class="font-ui text-xs font-bold text-tinta/50">Sin cartones</span>'}</span>
                </span>
                <span class="shrink-0 text-right font-ui text-xs font-bold text-tinta/60">${fichas(j.fichas)}</span>
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

        const listo = vendidosN > 0;
        $('empezarBtn').disabled = !listo;
        $('empezarAyuda').textContent = listo
            ? `${plural(vendidosN, 'cartón vendido', 'cartones vendidos')} · ¡Todo listo!`
            : jugadores.length ? 'Esperando a que alguien elija un cartón' : 'Esperando jugadores';
    }

    function pintarInfo(e) {
        const jugadores = e.jugadores || [];
        const conectados = jugadores.filter((j) => j.conectado).length;
        $('infoJugadores').textContent = `${conectados}/${jugadores.length} conectados`;
        $('infoPozo').textContent = pozoDe(e).toLocaleString('es');
        const premios = e.premios?.length ? e.premios : (e.config?.premios || []);
        $('infoPremios').innerHTML = premios.map((p, i) => {
            const enJuego = i === e.premioActual && e.estado !== 'lobby' && e.estado !== 'terminada';
            const ganadores = p.ganadores || [];
            const detalle = ganadores.length
                ? `<span class="truncate text-tinta/70">${ganadores.map((g) => escapar(g.apodo)).join(', ')}</span>`
                : enJuego ? '<span class="premio-en-juego">En juego</span>' : '<span class="text-tinta/40">Pendiente</span>';
            return `<li class="premio-fila ${enJuego ? 'activo' : ''} ${ganadores.length ? 'ganado' : ''}">
                <span class="font-ui text-[11px] font-black uppercase tracking-wide">${ganadores.length ? '✓ ' : ''}${escapar(nombrePremio(p.modalidad))}</span>
                <span class="font-display text-xs">${(p.fichas ?? Math.floor((pozoDe(e) * p.porcentaje) / 100)).toLocaleString('es')}</span>
                <span class="col-span-2 flex min-w-0 font-ui text-[11px] font-bold">${detalle}</span>
            </li>`;
        }).join('');
    }

    function pintarVentana(e) {
        const abierta = Boolean(e.ventanaHasta) && e.estado === 'jugando';
        const el = $('ventanaBingo');
        if (abierta && !ventanaAbierta) {
            el.classList.remove('hidden');
            gsap.fromTo(el.firstElementChild, { scale: 2.5, rotation: -20, opacity: 0 }, { scale: 1, rotation: -3, opacity: 1, duration: 0.45, ease: 'back.out(2)' });
            if (show.sonido()) {
                sfx.golpe(0.8);
                sfx.cantar('¡Bingo!');
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
    function htmlCartonGanador(g, modalidad) {
        if (!ultimo?.serie || !Number.isInteger(g.carton)) return '';
        try {
            const carton = generarCarton(ultimo.serie, g.carton);
            const r = verificar(carton, new Set(ultimo.bolas || []), modalidad);
            return htmlCarton(carton, { marcadas: r.marcadas, clave: r.gana ? r.figura : [] });
        } catch {
            return '';
        }
    }

    function celebrar({ modalidad, ganadores = [], siguiente = null }) {
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
                        <span class="etiqueta text-tinta/60">Cartón nº ${escapar(g.carton)}</span>
                    </span>
                    <span class="shrink-0 rounded-lg border-[2.5px] border-tinta bg-girasol px-2 py-1 font-display text-base shadow-duro-sm">+${Number(g.fichas || 0).toLocaleString('es')}</span>
                </li>`).join('')}
            </ul>
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
        gsap.from('#bingoEnLinea .carton-celda', { scale: 0, duration: 0.35, ease: 'back.out(2.5)', stagger: { amount: 0.35, from: 'center' }, delay: 0.9 });

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
        return `<p class="font-display text-3xl sm:text-5xl">¡Partida terminada!</p>
            <p class="etiqueta mt-1">${plural((e?.bolas || []).length, 'bola', 'bolas')} · pozo de ${fichas(e?.pozo)}</p>
            <ol class="mx-auto mt-3 max-w-md">${filas}</ol>
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
