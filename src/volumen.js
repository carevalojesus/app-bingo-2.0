// Panel de sonido (show y móvil): silenciar y regular por separado el volumen de los
// efectos y el de la voz del narrador. Los volúmenes se guardan en este navegador.
import * as sfx from './efectos.js';

const CLAVE = 'bingoshow.volumen';
const POR_DEFECTO = { efectos: 0.8, voz: 1 };
const acotar = (v, d) => (Number.isFinite(v) ? Math.min(1, Math.max(0, v)) : d);

export function leerVolumen() {
    try {
        const v = JSON.parse(localStorage.getItem(CLAVE) ?? 'null');
        return { efectos: acotar(v?.efectos, POR_DEFECTO.efectos), voz: acotar(v?.voz, POR_DEFECTO.voz) };
    } catch {
        return { ...POR_DEFECTO };
    }
}

function guardarVolumen(volumen) {
    try { localStorage.setItem(CLAVE, JSON.stringify(volumen)); } catch { /* sin almacenamiento */ }
}

// Aplica los volúmenes guardados (llamar al arrancar la página)
export function aplicarVolumenGuardado() {
    sfx.fijarVolumen(leerVolumen());
}

// boton: el botón del altavoz, que ahora abre el panel.
// activo(): ¿está el sonido encendido?; alternar(): enciende/apaga; probar(): suena un ejemplo.
export function crearPanelSonido(boton, { activo, alternar, probar }) {
    const volumen = leerVolumen();
    sfx.fijarVolumen(volumen);

    const panel = document.createElement('div');
    panel.className = 'panel-sonido carta';
    panel.hidden = true;
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Sonido');
    panel.innerHTML = `
        <div class="flex items-center justify-between gap-3">
            <p class="font-display text-lg leading-none">Sonido</p>
            <button type="button" data-silencio role="switch" class="interruptor-sonido" aria-label="Sonido activado">
                <span class="interruptor-bola"></span>
            </button>
        </div>
        <div data-controles class="mt-3 grid gap-3">
            <label class="block">
                <span class="flex items-center justify-between font-ui text-xs font-black uppercase tracking-wide">
                    Efectos <output data-valor="efectos"></output></span>
                <input type="range" min="0" max="100" step="5" data-vol="efectos" class="control-volumen mt-1 w-full" aria-label="Volumen de los efectos">
            </label>
            <label class="block">
                <span class="flex items-center justify-between font-ui text-xs font-black uppercase tracking-wide">
                    Voz del narrador <output data-valor="voz"></output></span>
                <input type="range" min="0" max="100" step="5" data-vol="voz" class="control-volumen mt-1 w-full" aria-label="Volumen de la voz">
            </label>
            <button type="button" data-probar class="boton h-10 w-full bg-girasol text-xs">Probar</button>
        </div>`;
    document.body.append(panel);

    const $p = (sel) => panel.querySelector(sel);

    function pintar() {
        const encendido = activo();
        $p('[data-silencio]').setAttribute('aria-checked', String(encendido));
        $p('[data-silencio]').setAttribute('aria-label', encendido ? 'Sonido activado' : 'Sonido apagado');
        $p('[data-controles]').classList.toggle('opacity-40', !encendido);
        for (const clave of ['efectos', 'voz']) {
            const porcentaje = Math.round(volumen[clave] * 100);
            $p(`[data-vol="${clave}"]`).value = String(porcentaje);
            $p(`[data-vol="${clave}"]`).disabled = !encendido;
            $p(`[data-valor="${clave}"]`).textContent = `${porcentaje} %`;
        }
        $p('[data-probar]').disabled = !encendido;
    }

    // Debajo del botón, sin salirse de la pantalla
    function colocar() {
        const r = boton.getBoundingClientRect();
        const ancho = panel.offsetWidth || 260;
        panel.style.top = `${Math.round(r.bottom + 10)}px`;
        panel.style.left = `${Math.round(Math.min(window.innerWidth - ancho - 16, Math.max(16, r.right - ancho)))}px`;
    }

    function abrir() {
        pintar();
        panel.hidden = false;
        colocar();
        boton.setAttribute('aria-expanded', 'true');
        $p('[data-silencio]').focus({ preventScroll: true });
    }

    function cerrar({ devolverFoco = false } = {}) {
        if (panel.hidden) return;
        panel.hidden = true;
        boton.setAttribute('aria-expanded', 'false');
        if (devolverFoco) boton.focus({ preventScroll: true });
    }

    boton.setAttribute('aria-haspopup', 'dialog');
    boton.setAttribute('aria-expanded', 'false');
    boton.addEventListener('click', (e) => {
        e.stopPropagation();
        if (panel.hidden) abrir();
        else cerrar();
    });
    $p('[data-silencio]').addEventListener('click', () => {
        alternar();
        pintar();
    });
    panel.addEventListener('input', (e) => {
        const clave = e.target.dataset?.vol;
        if (!clave) return;
        volumen[clave] = Number(e.target.value) / 100;
        sfx.fijarVolumen(volumen);
        guardarVolumen(volumen);
        $p(`[data-valor="${clave}"]`).textContent = `${e.target.value} %`;
    });
    // Al soltar el deslizador se oye cómo queda
    panel.addEventListener('change', (e) => {
        if (e.target.dataset?.vol && activo()) probar(e.target.dataset.vol);
    });
    $p('[data-probar]').addEventListener('click', () => probar('todo'));
    document.addEventListener('click', (e) => {
        if (!panel.hidden && !panel.contains(e.target) && e.target !== boton) cerrar();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !panel.hidden) {
            e.stopPropagation();
            cerrar({ devolverFoco: true });
        }
    }, true);
    window.addEventListener('resize', () => { if (!panel.hidden) colocar(); });

    return { pintar, cerrar };
}
