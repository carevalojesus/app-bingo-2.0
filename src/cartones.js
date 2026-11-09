// Página de cartones: genera una serie y la prepara para imprimir.
import { generarCarton, nuevaSerie, normalizarSerie, serieValida, formatoCodigo, MAX_CARTONES } from './carton.js';
import { htmlCarton } from './carton-html.js';

const MAX_POR_TIRADA = 200; // límite de la vista previa
const $ = (id) => document.getElementById(id);

// La serie se comparte con el show (misma clave que src/main.js)
function leer(clave) {
    try { return JSON.parse(localStorage.getItem('bingoshow.' + clave)); } catch { return null; }
}
function guardar(clave, valor) {
    try { localStorage.setItem('bingoshow.' + clave, JSON.stringify(valor)); } catch { /* sin almacenamiento */ }
}

function leerOpciones() {
    const serie = normalizarSerie($('serie').value);
    const desde = Math.trunc(Number($('desde').value));
    const hasta = Math.trunc(Number($('hasta').value));
    const porHoja = Number($('porHoja').value);

    if (!serieValida(serie)) return { error: 'La serie son 4 caracteres (letras y números, sin I, L, O, 0 ni 1). Pulsa «Nueva» para crear una.' };
    if (!(desde >= 1 && hasta <= MAX_CARTONES && desde <= hasta)) return { error: `Elige un rango entre 1 y ${MAX_CARTONES}, con «desde» menor o igual que «hasta».` };
    if (hasta - desde + 1 > MAX_POR_TIRADA) return { error: `Como máximo ${MAX_POR_TIRADA} cartones por tirada.` };
    return { serie, desde, hasta, porHoja };
}

function dibujar() {
    const opciones = leerOpciones();
    const error = $('error');
    error.classList.toggle('hidden', !opciones.error);
    error.textContent = opciones.error ?? '';
    if (opciones.error) return null;

    const { serie, desde, hasta, porHoja } = opciones;
    let html = '';
    for (let inicio = desde; inicio <= hasta; inicio += porHoja) {
        let cartones = '';
        for (let n = inicio; n < Math.min(inicio + porHoja, hasta + 1); n++) cartones += htmlCarton(generarCarton(serie, n));
        html += `<section class="hoja hoja-${porHoja}">${cartones}</section>`;
    }
    $('hojas').innerHTML = html;

    const total = hasta - desde + 1;
    const hojas = Math.ceil(total / porHoja);
    $('resumen').textContent = `${total} ${total === 1 ? 'cartón' : 'cartones'} (${formatoCodigo(serie, desde)} a ${formatoCodigo(serie, hasta)}) · ${hojas} ${hojas === 1 ? 'hoja' : 'hojas'}`;
    return opciones;
}

$('serie').value = serieValida(normalizarSerie(leer('serie'))) ? leer('serie') : nuevaSerie();
$('opciones').addEventListener('input', dibujar);
$('nuevaSerieBtn').addEventListener('click', () => {
    $('serie').value = nuevaSerie();
    dibujar();
});
$('opciones').addEventListener('submit', (e) => {
    e.preventDefault();
    const opciones = dibujar();
    if (!opciones) return;
    // La serie que se imprime es la que el show usará al verificar solo con el número
    guardar('serie', opciones.serie);
    window.print();
});

// Las tipografías de los cartones deben estar cargadas antes de imprimir
document.fonts?.ready.then(dibujar);
dibujar();
