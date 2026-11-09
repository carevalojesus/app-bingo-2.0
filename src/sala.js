// Página para crear una sala en línea (sala.html). Ver docs/en-linea.md
import { crearSala, CLAVES, normalizarCodigo } from './en-linea/cliente.js';
import { PATRONES } from './carton.js';

const $ = (id) => document.getElementById(id);
const MAX_PREMIOS = 3;
const INTERVALOS = [4000, 6000, 8000, 12000];
// Campos numéricos: [id, mínimo, máximo, inicio del mensaje de error]
const NUMEROS = [
    ['cartones', 10, 300, 'Los cartones a la venta deben'],
    ['precioCarton', 0, 1000, 'El precio por cartón debe'],
    ['maxCartonesPorJugador', 1, 12, 'El máximo de cartones por jugador debe'],
    ['fichasIniciales', 0, 100000, 'Las fichas al unirse deben'],
    ['pozoExtra', 0, 100000, 'El pozo extra debe'],
];

const sinConexion = location.protocol === 'file:';
if (sinConexion) {
    $('avisoArchivo').classList.remove('hidden');
    $('crearBtn').disabled = true;
}

// ---------- Plan: código Pro y logo ----------
const PLAN_GRATIS = { premios: 1 };
let logo = null; // data URL ya reducida

const tieneCodigo = () => $('codigoPro').value.replace(/[^A-Za-z0-9]/g, '').length > 0;

function pintarPlan() {
    $('campoLogo').classList.toggle('hidden', !tieneCodigo());
    $('notaPremios').textContent = tieneCodigo()
        ? 'Con código Pro: hasta 3 premios encadenados.'
        : 'El plan gratis incluye 1 premio; con código Pro, hasta 3.';
    pintarResumen();
}
$('codigoPro').addEventListener('input', (e) => {
    e.target.value = e.target.value.toUpperCase();
    pintarPlan();
});

// Reduce la imagen a 256 px como máximo (WebP o, si el navegador no sabe, PNG)
async function reducirImagen(archivo) {
    const imagen = await createImageBitmap(archivo);
    const escala = Math.min(1, 256 / Math.max(imagen.width, imagen.height));
    const lienzo = document.createElement('canvas');
    lienzo.width = Math.max(1, Math.round(imagen.width * escala));
    lienzo.height = Math.max(1, Math.round(imagen.height * escala));
    lienzo.getContext('2d').drawImage(imagen, 0, 0, lienzo.width, lienzo.height);
    let url = lienzo.toDataURL('image/webp', 0.85);
    if (!url.startsWith('data:image/webp')) url = lienzo.toDataURL('image/png');
    return url;
}

function pintarLogo() {
    $('vistaLogo').innerHTML = logo ? `<img src="${logo}" alt="Logo del evento" class="h-full w-full object-contain">` : 'Logo';
    $('vistaLogo').classList.toggle('border-dashed', !logo);
    $('quitarLogo').classList.toggle('hidden', !logo);
}

$('archivoLogo').addEventListener('change', async (e) => {
    const archivo = e.target.files?.[0];
    e.target.value = '';
    if (!archivo) return;
    try {
        const url = await reducirImagen(archivo);
        if (url.length * 0.75 > 60 * 1024) throw new Error('grande');
        logo = url;
        mostrarErrores([]);
    } catch (error) {
        logo = null;
        mostrarErrores([error.message === 'grande'
            ? 'El logo sigue pesando más de 60 KB tras reducirlo. Prueba con una imagen más sencilla.'
            : 'No se pudo leer esa imagen. Usa un PNG, JPG o WebP.']);
    }
    pintarLogo();
});
$('quitarLogo').addEventListener('click', () => { logo = null; pintarLogo(); });

// ---------- Tipo de juego ----------
let tipo = 'carton';

const AYUDA_TIPO = {
    fila: 'Se venden 15 filas fijas; cada una lleva un número de cada letra (por ejemplo B-1, I-16, N-31, G-46, O-61). '
        + 'Gana la primera fila vendida que complete sus 5 números y se lleva todo el pozo. El servidor lo detecta solo: nadie tiene que cantar.',
    elige: 'Cada jugador elige sus propios 5 números (o pide unos al azar). Gana quien complete sus 5 primero; '
        + 'si varios lo hacen con la misma bola, el pozo se reparte. Nadie tiene que cantar.',
};
const UNIDAD = { carton: ['cartón', 'cartones'], fila: ['fila', 'filas'], elige: ['jugada', 'jugadas'] };
const NOMBRE_TIPO = { carton: 'Bingo clásico', fila: 'Fila de 5', elige: 'Elige tus 5' };
const NOMBRE_MARCADO = { libre: 'cada jugador elige cómo marcar', auto: 'marcado automático', manual: 'marcado a mano' };
let marcado = 'libre';

document.querySelectorAll('[data-marcado]').forEach((boton) => boton.addEventListener('click', () => {
    marcado = boton.dataset.marcado;
    document.querySelectorAll('[data-marcado]').forEach((b) => b.setAttribute('aria-checked', String(b.dataset.marcado === marcado)));
    pintarResumen();
}));

// Una línea con lo que se va a crear, para revisarlo antes de pulsar el botón
function pintarResumen() {
    const [uno, varios] = UNIDAD[tipo];
    const numero = (id) => Number($(id).value) || 0;
    const partes = [NOMBRE_TIPO[tipo]];
    if (tipo === 'fila') partes.push(`15 filas a ${numero('precioCarton')} fichas`);
    else partes.push(`${numero('cartones')} ${varios} a ${numero('precioCarton')} fichas`);
    partes.push(`máx. ${numero('maxCartonesPorJugador')} por jugador`);
    if (tipo === 'carton') {
        partes.push(premios.length === 1 ? '1 premio' : `${premios.length} premios`);
        partes.push(NOMBRE_MARCADO[marcado]);
    }
    const extras = [$('admision').checked && 'tú admites y das las fichas', $('rondasSeguidas').checked && 'rondas seguidas', $('bolaDorada').checked && 'bola dorada',
        numero('botePorcentaje') > 0 && 'bote'].filter(Boolean);
    if (extras.length) partes.push(extras.join(', '));
    partes.push(tieneCodigo() ? 'plan Pro (hasta 100 jugadores)' : 'plan gratis (hasta 15 jugadores)');
    $('resumenSala').textContent = partes.join(' · ');
    void uno;
}
$('admision').addEventListener('change', (e) => {
    $('campoMensajeFichas').classList.toggle('hidden', !e.target.checked);
    // Si las das tú, lo normal es que nadie reciba fichas automáticas
    if (e.target.checked && $('fichasIniciales').value === '100') $('fichasIniciales').value = '0';
    if (!e.target.checked && $('fichasIniciales').value === '0') $('fichasIniciales').value = '100';
});
$('formSala').addEventListener('input', pintarResumen);
$('formSala').addEventListener('change', pintarResumen);

function pintarTipo() {
    const auto = tipo !== 'carton';
    document.querySelectorAll('[data-tipo]').forEach((b) => b.setAttribute('aria-checked', String(b.dataset.tipo === tipo)));
    $('ayudaTipo').textContent = AYUDA_TIPO[tipo] ?? '';
    $('ayudaTipo').classList.toggle('hidden', !auto);
    $('campoCartones').classList.toggle('hidden', tipo === 'fila');
    $('campoPremios').classList.toggle('hidden', auto);
    document.querySelector('[data-etiqueta-total]').textContent = tipo === 'elige' ? 'Máximo de jugadas' : 'Cartones a la venta';
    document.querySelectorAll('[data-unidad]').forEach((el) => { el.textContent = UNIDAD[tipo][0]; });
    document.querySelectorAll('[data-unidades]').forEach((el) => { el.textContent = UNIDAD[tipo][1]; });
    $('campoMarcado').classList.toggle('hidden', auto);
    pintarResumen();
}

document.querySelectorAll('[data-tipo]').forEach((boton) => boton.addEventListener('click', () => {
    tipo = boton.dataset.tipo;
    pintarTipo();
    mostrarErrores([]);
}));

// ---------- Premios ----------
let premios = [{ modalidad: 'lleno', porcentaje: 100 }];

function pintarPremios() {
    $('premios').innerHTML = premios.map((p, i) => `
        <li class="flex items-center gap-2">
            <span class="grid h-9 w-9 shrink-0 place-items-center rounded-lg border-[2.5px] border-tinta bg-girasol font-display text-sm">${i + 1}</span>
            <select class="campo min-w-0 flex-1" data-premio="${i}" data-campo="modalidad" aria-label="Modalidad del premio ${i + 1}">
                ${Object.entries(PATRONES).map(([clave, { nombre }]) =>
                    `<option value="${clave}" ${clave === p.modalidad ? 'selected' : ''}>${nombre}</option>`).join('')}
            </select>
            <div class="relative w-24 shrink-0">
                <input type="number" inputmode="numeric" min="1" max="100" value="${p.porcentaje}" class="campo w-full pr-7"
                       data-premio="${i}" data-campo="porcentaje" aria-label="Porcentaje del pozo para el premio ${i + 1}">
                <span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 font-black text-tinta/50">%</span>
            </div>
            <button type="button" class="boton h-10 w-10 shrink-0 bg-crema" data-quitar="${i}" aria-label="Quitar el premio ${i + 1}" ${premios.length === 1 ? 'disabled' : ''}>✕</button>
        </li>`).join('');
    $('agregarPremio').disabled = premios.length >= MAX_PREMIOS;
    pintarSuma();
    pintarResumen();
}

function pintarSuma() {
    const suma = premios.reduce((t, p) => t + (Number(p.porcentaje) || 0), 0);
    const el = $('sumaPremios');
    el.textContent = `Suma: ${suma}%${suma === 100 ? ' ✓' : ' (debe ser 100)'}`;
    el.className = `etiqueta ${suma === 100 ? 'text-menta' : 'text-tomate'}`;
}

$('premios').addEventListener('input', (e) => {
    const campo = e.target.dataset.campo;
    if (!campo) return;
    const premio = premios[Number(e.target.dataset.premio)];
    premio[campo] = e.target.value;
    pintarSuma();
});
$('premios').addEventListener('click', (e) => {
    const boton = e.target.closest('[data-quitar]');
    if (!boton || premios.length === 1) return;
    premios.splice(Number(boton.dataset.quitar), 1);
    pintarPremios();
});
$('agregarPremio').addEventListener('click', () => {
    if (premios.length >= MAX_PREMIOS) return;
    const libre = Object.keys(PATRONES).find((m) => !premios.some((p) => p.modalidad === m)) ?? 'linea';
    premios.push({ modalidad: libre, porcentaje: 0 });
    pintarPremios();
    $('premios').querySelector(`[data-premio="${premios.length - 1}"][data-campo="porcentaje"]`)?.focus();
});

// ---------- Validación ----------
function leerConfig() {
    const errores = [];
    const config = { tipo, nombre: $('nombre').value.trim() };
    if (tieneCodigo()) {
        config.codigoPro = $('codigoPro').value.trim();
        if (logo) config.logo = logo;
    }
    if (tipo === 'carton') config.marcado = marcado;
    config.admision = $('admision').checked;
    if (config.admision) config.mensajeFichas = $('mensajeFichas').value.trim().slice(0, 200);
    if (config.nombre.length > 40) errores.push('El nombre puede tener como máximo 40 caracteres.');
    const fila = tipo === 'fila';

    for (const [id, min, max, nombre] of NUMEROS) {
        if (fila && id === 'cartones') continue;
        const texto = $(id).value.trim();
        const valor = Number(texto);
        if (texto === '' || !Number.isInteger(valor) || valor < min || valor > max) {
            errores.push(`${nombre} ser un número entero entre ${min.toLocaleString('es')} y ${max.toLocaleString('es')}.`);
        }
        config[id] = valor;
    }

    config.intervalo = Number($('intervalo').value);
    if (!INTERVALOS.includes(config.intervalo)) errores.push('Elige una velocidad de la lista.');

    config.rondasSeguidas = $('rondasSeguidas').checked;
    config.bolaDorada = $('bolaDorada').checked;
    config.botePorcentaje = Number($('botePorcentaje').value.trim());
    if (!Number.isInteger(config.botePorcentaje) || config.botePorcentaje < 0 || config.botePorcentaje > 50) {
        errores.push('El porcentaje para el bote debe ser un número entero entre 0 y 50.');
    } else if (config.botePorcentaje > 0) {
        config.boteBolas = Number($('boteBolas').value.trim());
        if (!Number.isInteger(config.boteBolas) || config.boteBolas < 5 || config.boteBolas > 75) {
            errores.push('Las bolas para ganar el bote deben ser un número entero entre 5 y 75.');
        }
    }

    // Precio y máximo valen igual para filas; solo cambia la palabra del mensaje
    const [uno, varios] = UNIDAD[tipo];
    if (tipo !== 'carton') {
        return { config, errores: errores.map((e) => e.replace('por cartón', `por ${uno}`).replace('de cartones', `de ${varios}`).replace('Los cartones a la venta deben', 'El máximo de jugadas debe')) };
    }

    config.premios = premios.map((p) => ({ modalidad: p.modalidad, porcentaje: Number(p.porcentaje) }));
    if (config.premios.length < 1 || config.premios.length > MAX_PREMIOS) errores.push('Tiene que haber entre 1 y 3 premios.');
    if (new Set(config.premios.map((p) => p.modalidad)).size !== config.premios.length) errores.push('No repitas la misma modalidad en dos premios.');
    if (config.premios.some((p) => !Number.isInteger(p.porcentaje) || p.porcentaje < 1 || p.porcentaje > 100)) {
        errores.push('Cada premio necesita un porcentaje entero entre 1 y 100.');
    } else {
        const suma = config.premios.reduce((t, p) => t + p.porcentaje, 0);
        if (suma !== 100) errores.push(`Los porcentajes de los premios deben sumar 100 (ahora suman ${suma}).`);
    }
    if (!tieneCodigo() && config.premios.length > PLAN_GRATIS.premios) {
        errores.push('El plan gratis incluye 1 premio. Quita los demás o escribe tu código Pro (hasta 3 premios).');
    }
    return { config, errores };
}

function mostrarErrores(errores) {
    const caja = $('errores');
    caja.classList.toggle('hidden', errores.length === 0);
    // Los mensajes pueden venir del servidor: siempre como texto
    const escapar = (texto) => String(texto).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
    caja.innerHTML = errores.length === 1
        ? escapar(errores[0])
        : `<ul class="list-disc pl-5">${errores.map((e) => `<li>${escapar(e)}</li>`).join('')}</ul>`;
}

$('formSala').addEventListener('submit', async (e) => {
    e.preventDefault();
    if (sinConexion) return mostrarErrores(['Abre esta página desde el servidor para crear salas.']);
    const { config, errores } = leerConfig();
    mostrarErrores(errores);
    // Si el error está en una sección plegada, se abre
    if (errores.some((e) => /bote|velocidad|fichas al|pozo/i.test(e))) $('masOpciones').open = true;
    if (errores.some((e) => /código Pro|plan gratis/i.test(e))) $('seccionPro').open = true;
    if (errores.length) return $('errores').scrollIntoView({ behavior: 'smooth', block: 'center' });

    const boton = $('crearBtn');
    boton.disabled = true;
    boton.textContent = 'Creando…';
    try {
        const { codigo, tokenAnfitrion } = await crearSala(config);
        try {
            localStorage.setItem(CLAVES.anfitrion(codigo), tokenAnfitrion);
        } catch {
            throw new Error('El navegador no deja guardar datos (¿modo privado?): sin eso no podrías volver a tu sala.');
        }
        location.href = `show.html?sala=${encodeURIComponent(codigo)}`;
    } catch (error) {
        mostrarErrores([error instanceof TypeError ? 'No se pudo contactar con el servidor. Revisa la conexión e inténtalo otra vez.' : error.message]);
        boton.disabled = false;
        boton.textContent = 'Crear sala';
    }
});

// ---------- Abrir una sala mía ----------
function salasGuardadas() {
    const prefijo = CLAVES.anfitrion('');
    const codigos = [];
    try {
        for (let i = 0; i < localStorage.length; i++) {
            const clave = localStorage.key(i);
            if (clave?.startsWith(prefijo)) codigos.push(clave.slice(prefijo.length));
        }
    } catch { /* sin almacenamiento */ }
    return codigos.filter((c) => normalizarCodigo(c) === c && c.length === 6).sort();
}

function tieneToken(codigo) {
    try { return Boolean(localStorage.getItem(CLAVES.anfitrion(codigo))); } catch { return false; }
}

const guardadas = salasGuardadas();
if (guardadas.length) {
    const lista = $('salasGuardadas');
    lista.classList.replace('hidden', 'flex');
    lista.innerHTML = guardadas.map((c) =>
        `<li><a href="show.html?sala=${c}" class="boton h-9 bg-crema px-3 font-display text-sm normal-case tracking-wider">${c}</a></li>`).join('');
}

$('codigoAbrir').addEventListener('input', (e) => { e.target.value = normalizarCodigo(e.target.value); });
$('formAbrir').addEventListener('submit', (e) => {
    e.preventDefault();
    const codigo = normalizarCodigo($('codigoAbrir').value);
    const error = $('errorAbrir');
    let texto = '';
    if (codigo.length !== 6) texto = 'El código tiene 6 caracteres.';
    else if (!tieneToken(codigo)) texto = 'Esa sala no se creó en este dispositivo. Si quieres jugar, únete desde el móvil.';
    error.textContent = texto;
    error.classList.toggle('hidden', !texto);
    if (!texto) location.href = `show.html?sala=${codigo}`;
});

pintarPremios();
