// Configuración de cada columna del bingo (75 bolas, 15 por letra)
const LETRAS = [
    { letra: 'B', id: 'letra-b', color: '#f5365c' },
    { letra: 'I', id: 'letra-i', color: '#ffd600' },
    { letra: 'N', id: 'letra-n', color: '#2dce89' },
    { letra: 'G', id: 'letra-g', color: '#5e72e4' },
    { letra: 'O', id: 'letra-o', color: '#8965e0' },
];

const TOTAL_BOLAS = 75;
const INTERVALO_BOLA = 8000; // ms entre bola y bola

// Elementos del DOM
const numeroLetra = document.getElementById('numeroLetra');
const numeroBola = document.getElementById('numeroBola');
const numeroWrap = document.getElementById('numeroWrap');
const tiempo = document.getElementById('tiempo');
const playBtn = document.getElementById('playBtn');
const stopBtn = document.getElementById('stopBtn');
const bingoBtn = document.getElementById('bingoBtn');
const iconPlay = document.getElementById('iconPlay');

// Estado del juego
const bolos = mezclar(Array.from({ length: TOTAL_BOLAS }, (_, i) => i + 1));
let contador = -1;
let segundos = 0;
let generar = null;
let hora = null;
let jugando = false;
let terminado = false;

tiempo.textContent = '00:00';

// Devuelve la columna (B, I, N, G, O) a la que pertenece un número
function columnaDe(numero) {
    return LETRAS[Math.floor((numero - 1) / 15)];
}

// Mezcla Fisher-Yates
function mezclar(arreglo) {
    for (let i = arreglo.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arreglo[i], arreglo[j]] = [arreglo[j], arreglo[i]];
    }
    return arreglo;
}

function numeroPanel() {
    for (let i = 1; i <= TOTAL_BOLAS; i++) {
        const div = document.createElement('div');
        div.classList.add('num-wrap');
        div.textContent = i;
        div.id = 'num' + i;
        document.getElementById(columnaDe(i).id).appendChild(div);
    }
}

function generarNumero() {
    if (contador >= TOTAL_BOLAS - 1) {
        finDelJuego();
        return;
    }

    contador++;
    const numero = bolos[contador];
    const { letra, color } = columnaDe(numero);

    numeroLetra.textContent = letra;
    numeroBola.textContent = numero;
    numeroWrap.style.backgroundColor = color;
    numeroWrap.style.animation = 'animacion 3s infinite';

    const pintar = document.getElementById('num' + numero);
    pintar.style.backgroundColor = color;
    pintar.style.color = '#fff';

    // Si era la última bola, se termina el juego
    if (contador === TOTAL_BOLAS - 1) {
        finDelJuego();
    }
}

function cronometro() {
    segundos++;
    const m = String(Math.floor(segundos / 60)).padStart(2, '0');
    const s = String(segundos % 60).padStart(2, '0');
    tiempo.textContent = m + ':' + s;
}

function iniciar() {
    if (jugando || terminado) return;
    jugando = true;
    iconPlay.className = 'icon-pause';
    playBtn.setAttribute('aria-label', 'Pausar');
    generarNumero(); // la primera bola sale al instante
    if (terminado) return;
    generar = setInterval(generarNumero, INTERVALO_BOLA);
    hora = setInterval(cronometro, 1000);
}

function pausar() {
    clearInterval(generar);
    clearInterval(hora);
    generar = null;
    hora = null;
    jugando = false;
    iconPlay.className = 'icon-play_arrow';
    playBtn.setAttribute('aria-label', 'Iniciar');
}

function play() {
    if (jugando) {
        pausar();
    } else {
        iniciar();
    }
}

function finDelJuego() {
    pausar();
    terminado = true;
    playBtn.disabled = true;
    numeroWrap.style.animation = 'none';
}

function bingo() {
    if (contador < 0) {
        alert('El juego aún no ha comenzado.');
        return;
    }
    pausar();
    const cantadas = contador + 1;
    alert('¡BINGO!\nJuego en pausa para verificar el cartón.\n' +
        'Bolas cantadas: ' + cantadas + ' de ' + TOTAL_BOLAS + '.');
}

function reset() {
    if (confirm('¿Desea reiniciar el juego?')) {
        location.reload();
    }
}

playBtn.addEventListener('click', play);
stopBtn.addEventListener('click', reset);
bingoBtn.addEventListener('click', bingo);

numeroPanel();
