// Cuenta atrás a pantalla completa (3, 2, 1, ¡Ya!) antes de la primera bola, para que todos
// estén atentos. La usan el show (sin conexión y en línea) y los móviles.
// Devuelve { cancelar }. `alTick(n)` se llama con 3, 2, 1 y 0 (0 = «¡Ya!»).

let actual = null;

export function cuentaAtras({ ms = 4000, alTick = () => {}, alTerminar = () => {} } = {}) {
    actual?.cancelar();
    const pasos = Math.max(1, Math.round(ms / 1000) - 1); // 4000 ms → 3, 2, 1 y ¡Ya!
    const capa = document.createElement('div');
    capa.className = 'cuenta-atras';
    capa.setAttribute('role', 'status');
    capa.setAttribute('aria-live', 'assertive');
    capa.innerHTML = '<p class="cuenta-etiqueta">¡Atentos!</p><p class="cuenta-numero"></p>';
    document.body.append(capa);
    const numero = capa.querySelector('.cuenta-numero');
    const temporizadores = [];
    let cancelado = false;

    const mostrar = (n) => {
        numero.textContent = n > 0 ? String(n) : '¡Ya!';
        numero.classList.toggle('ya', n === 0);
        // Reinicia la animación CSS en cada paso
        numero.classList.remove('latido');
        void numero.offsetWidth;
        numero.classList.add('latido');
        alTick(n);
    };

    const paso = ms / (pasos + 1);
    for (let i = 0; i <= pasos; i++) temporizadores.push(setTimeout(() => mostrar(pasos - i), i * paso));
    temporizadores.push(setTimeout(() => {
        capa.classList.add('saliendo');
        setTimeout(() => capa.remove(), 300);
        if (actual === control) actual = null;
        if (!cancelado) alTerminar();
    }, ms));

    const control = {
        cancelar() {
            cancelado = true;
            temporizadores.forEach(clearTimeout);
            capa.remove();
            if (actual === control) actual = null;
        },
    };
    actual = control;
    return control;
}
