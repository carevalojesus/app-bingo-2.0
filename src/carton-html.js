// Dibuja un cartón en HTML (página de impresión y verificación en el show).
import { LETRAS } from './carton.js';

const COLORES = ['#ff5a36', '#ffc43d', '#19c3a0', '#3d6bff', '#ff4fa3'];
const TEXTO_CLARO = [false, false, false, true, false];
const colorTexto = (c) => (TEXTO_CLARO[c] ? '#fff3df' : '#14112b');

// marcadas: matriz [c][f] de verificar(); clave: celdas [c, f] a resaltar;
// faltan: números que aún no salieron dentro de la figura resaltada.
export function htmlCarton(carton, { marcadas = null, clave = [], faltan = [] } = {}) {
    const enClave = new Set(clave.map(([c, f]) => `${c},${f}`));
    const pendientes = new Set(faltan);

    const cabecera = LETRAS.map((letra, c) =>
        `<div class="carton-letra" style="--c:${COLORES[c]};color:${colorTexto(c)}">${letra}</div>`).join('');

    let celdas = '';
    for (let f = 0; f < 5; f++) {
        for (let c = 0; c < 5; c++) {
            const n = carton.columnas[c][f];
            const clases = ['carton-celda'];
            let estilo = `--c:${COLORES[c]}`;
            if (n === null) clases.push('carton-libre');
            else if (marcadas) {
                if (marcadas[c][f]) {
                    clases.push('marcada');
                    estilo += `;color:${colorTexto(c)}`;
                } else if (!pendientes.has(n)) clases.push('apagada');
            }
            if (enClave.has(`${c},${f}`)) clases.push('clave');
            if (pendientes.has(n)) clases.push('falta');
            const contenido = n === null ? '<span>★</span>Libre' : n;
            celdas += `<div class="${clases.join(' ')}" style="${estilo}">${contenido}</div>`;
        }
    }

    return `<article class="carton" aria-label="Cartón ${carton.codigo}">` +
        `<div class="carton-fila" aria-hidden="true">${cabecera}</div>` +
        `<div class="carton-fila">${celdas}</div>` +
        `<footer class="carton-pie"><span>Bingo Show</span><span class="carton-codigo">${carton.codigo}</span></footer>` +
        '</article>';
}
