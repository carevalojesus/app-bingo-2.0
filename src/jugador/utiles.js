// Utilidades de la vista del jugador: lectura de la instantánea `estado` (docs/en-linea.md),
// formatos y preferencias. Sin DOM, para poder probarlas con Node.
import { LETRAS, PATRONES, generarCarton, verificar } from '../carton.js';
import { MODALIDAD_FILA, INFO_FILA, MODALIDAD_ELIGE, INFO_ELIGE, esModoFila, esModoElige } from '../filas.js';

export const COLORES = ['#ff5a36', '#ffc43d', '#19c3a0', '#3d6bff', '#ff4fa3'];
export const TOTAL_BOLAS = 75;

export const columnaDe = (n) => {
    const c = Math.min(4, Math.max(0, Math.floor((n - 1) / 15)));
    return { c, letra: LETRAS[c], color: COLORES[c] };
};
export const nombreBola = (n) => `${columnaDe(n).letra}-${n}`;

export const esc = (texto) => String(texto ?? '').replace(/[&<>"']/g, (ch) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]);

export const fmt = (n) => Math.trunc(Number(n) || 0).toLocaleString('es-ES');
export const fichas = (n) => `${fmt(n)} ${Math.trunc(Number(n) || 0) === 1 ? 'ficha' : 'fichas'}`;
const infoModalidad = (m) => (m === MODALIDAD_FILA ? INFO_FILA : m === MODALIDAD_ELIGE ? INFO_ELIGE : PATRONES[m]);
export const nombreModalidad = (m) => infoModalidad(m)?.nombre ?? String(m ?? '');
export const detalleModalidad = (m) => infoModalidad(m)?.detalle ?? '';

// Palabras según el tipo de juego: cartones (bingo clásico) o filas («Fila de 5»)
export function unidad(sala) {
    if (esModoElige(sala?.config)) return { uno: 'jugada', varios: 'jugadas', Uno: 'Jugada', Varios: 'Jugadas', la: 'la', una: 'una', tuyo: 'tuya' };
    return esModoFila(sala?.config)
        ? { uno: 'fila', varios: 'filas', Uno: 'Fila', Varios: 'Filas', la: 'la', una: 'una', tuyo: 'tuya' }
        : { uno: 'cartón', varios: 'cartones', Uno: 'Cartón', Varios: 'Cartones', la: 'el', una: 'un', tuyo: 'tuyo' };
}

// Apodo como lo acepta el servidor: 1–20 caracteres tras trim, sin < ni >
export const limpiarApodo = (texto) => String(texto ?? '').replace(/[<>]/g, '').trim().slice(0, 20);

// ---------- Preferencias del móvil ----------
const PREFIJO = 'bingoshow.movil.';
export function leerPreferencia(clave, porDefecto) {
    try {
        const v = localStorage.getItem(PREFIJO + clave);
        return v === null ? porDefecto : JSON.parse(v);
    } catch {
        return porDefecto;
    }
}
export function guardarPreferencia(clave, valor) {
    try { localStorage.setItem(PREFIJO + clave, JSON.stringify(valor)); } catch { /* sin almacenamiento */ }
}

// ---------- Lectura de la instantánea ----------
export function miJugador(sala, miId) {
    return sala?.jugadores?.find((j) => j.id === miId) ?? null;
}

// Cartones del jugador: los de su ficha y los que figuran a su nombre en `ocupados`
export function misCartones(sala, miId) {
    if (!sala || !miId) return [];
    const numeros = new Set((miJugador(sala, miId)?.cartones ?? []).map(Number));
    for (const [numero, dueno] of Object.entries(sala.ocupados ?? {})) {
        if (dueno === miId) numeros.add(Number(numero));
    }
    return [...numeros].filter((n) => n >= 1).sort((a, b) => a - b);
}

export function apodoDe(sala, jugadorId) {
    return sala?.jugadores?.find((j) => j.id === jugadorId)?.apodo ?? null;
}

export const vendidos = (sala) => Object.keys(sala?.ocupados ?? {}).length;

// En el lobby el pozo aún no está fijado: ventas hasta ahora + lo que pone el anfitrión
export function pozoDe(sala) {
    if (!sala) return 0;
    if (sala.estado === 'lobby') {
        // Ventas menos lo que va al bote, más lo que pone el anfitrión (igual que el servidor)
        const ventas = vendidos(sala) * (sala.config?.precioCarton ?? 0);
        const aporte = Math.floor((ventas * (sala.config?.botePorcentaje ?? 0)) / 100);
        const estimado = ventas - aporte + (sala.config?.pozoExtra ?? 0);
        return Math.max(estimado, Number(sala.pozo) || 0);
    }
    return Number(sala.pozo) || 0;
}

// Premios con sus fichas (las de la instantánea o, si aún no se calcularon, el porcentaje del pozo)
export function premiosDe(sala) {
    if (!sala) return [];
    const lista = sala.premios?.length ? sala.premios : (sala.config?.premios ?? []);
    const pozo = pozoDe(sala);
    return lista.map((p, i) => ({
        indice: i,
        modalidad: p.modalidad,
        porcentaje: p.porcentaje,
        fichas: Number(p.fichas) || Math.floor((pozo * (p.porcentaje || 0)) / 100),
        ganadores: p.ganadores ?? [],
        doble: Boolean(p.doble),
        enJuego: sala.estado !== 'lobby' && sala.premioActual === i,
    }));
}

export function premioActual(sala) {
    if (!sala || sala.premioActual === null || sala.premioActual === undefined) return null;
    return premiosDe(sala)[sala.premioActual] ?? null;
}

// Fichas ganadas por el jugador en esta partida
export function gananciasDe(sala, miId) {
    return premiosDe(sala).reduce((total, p) =>
        total + p.ganadores.filter((g) => g.jugadorId === miId).reduce((s, g) => s + (Number(g.fichas) || 0) + (Number(g.bote) || 0), 0), 0);
}

// Estado de un cartón para dibujarlo: `marcas` son los números que el jugador ve marcados
// (todas las bolas si marca solo; si no, los que tocó y ya salieron).
export function analizarCarton(serie, numero, marcas, modalidad) {
    const carton = generarCarton(serie, numero);
    const r = verificar(carton, marcas, modalidad || 'linea');
    return {
        carton,
        marcadas: r.marcadas,
        completo: r.gana,
        clave: r.gana ? r.ganadoras.flat() : [],
        faltan: r.faltan,
    };
}
