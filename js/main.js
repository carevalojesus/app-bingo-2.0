//variables

let letraB = document.getElementById('letra-b');
let letraI = document.getElementById('letra-i');
let letraN = document.getElementById('letra-n');
let letraG = document.getElementById('letra-g');
let letraO = document.getElementById('letra-o');

let numeroLetra = document.getElementById('numeroLetra');
let numeroBola = document.getElementById('numeroBola');

let tiempo = document.getElementById('tiempo');
tiempo.textContent = "00:00";

let playBtn = document.getElementById('playBtn');
let stopBtn = document.getElementById('stopBtn');

let bingobtn = document.getElementById('bingoBtn');

let numeroWrap = document.getElementById('numeroWrap');

let bolos = [];

let iconPlay = document.getElementById('iconPlay');
let iconStop = document.getElementById('iconStop');

let m=0;
let s=0;

let contador = -1;

for (let i = 1; i <= 75; i++) {
    bolos.push(i);
}

let generar, hora;

console.log(bolos);

function numeroPanel() {

    for (let i = 1; i <= 75; i++) {

        let div = document.createElement('div');
        div.classList.add('num-wrap');

        if (i < 16) {
            div.textContent = i;
            div.setAttribute('id','num'+i);
            letraB.appendChild(div);
        }

        if (i > 15 && i < 31) {
            div.textContent = i;
            div.setAttribute('id','num'+i);
            letraI.appendChild(div);
        }

        if (i > 30 && i < 46) {
            div.textContent = i;
            div.setAttribute('id','num'+i);
            letraN.appendChild(div);
        }

        if (i > 45 && i < 61) {
            div.textContent = i;
            div.setAttribute('id','num'+i);
            letraG.appendChild(div);
        }

        if (i > 60 && i < 76) {
            div.textContent = i;
            div.setAttribute('id','num'+i);
            letraO.appendChild(div);
        }
    }
}

/*lista = bolos.sort(function () {
    return Math.random() - 0.5;
});*/


var i,j,k;

for (i = bolos.length; i; i--) {
    j = Math.floor(Math.random() * i);
    k = bolos[i - 1];
    bolos[i - 1] = bolos[j];
    bolos[j] = k;
}

console.log(bolos);


function generarNumero() {

        contador++;

        if (bolos[contador] < 16) {
            let numero = bolos[contador];
            numeroLetra.textContent = "B";
            numeroBola.textContent = bolos[contador];
            numeroWrap.style.backgroundColor = '#f5365c';
            let pintar = document.getElementById('num'+numero);
            pintar.style.backgroundColor ='#f5365c';
            pintar.style.color ='#fff';
            numeroWrap.style.animation = 'animacion 3s infinite';
        }

        if (bolos[contador] > 15 && bolos[contador] < 31) {
            let numero = bolos[contador];
            numeroLetra.textContent = "I";
            numeroBola.textContent = bolos[contador];
            numeroWrap.style.backgroundColor = '#ffd600';
            let pintar = document.getElementById('num'+numero);
            pintar.style.backgroundColor ='#ffd600';
            pintar.style.color ='#fff';
            numeroWrap.style.animation = 'animacion 3s infinite';
        }

        if (bolos[contador] > 30 && bolos[contador] < 46) {
            let numero = bolos[contador];
            numeroLetra.textContent = "N";
            numeroBola.textContent = bolos[contador];
            numeroWrap.style.backgroundColor = '#2dce89';
            let pintar = document.getElementById('num'+numero);
            pintar.style.backgroundColor ='#2dce89';
            pintar.style.color ='#fff';
            numeroWrap.style.animation = 'animacion 3s infinite';
        }

        if (bolos[contador] > 45 && bolos[contador] < 61) {
            let numero = bolos[contador];
            numeroLetra.textContent = "G";
            numeroBola.textContent = bolos[contador];
            numeroWrap.style.backgroundColor = '#5e72e4';
            let pintar = document.getElementById('num'+numero);
            pintar.style.backgroundColor ='#5e72e4';
            pintar.style.color ='#fff';
            numeroWrap.style.animation = 'animacion 3s infinite';
        }

        if (bolos[contador] > 60 && bolos[contador] < 76) {
            let numero = bolos[contador];
            numeroLetra.textContent = "O";
            numeroBola.textContent = bolos[contador];
            numeroWrap.style.backgroundColor = '#8965e0';
            let pintar = document.getElementById('num'+numero);
            pintar.style.backgroundColor ='#8965e0';
            pintar.style.color ='#fff';
            numeroWrap.style.animation = 'animacion 3s infinite';
        }

        if (bolos[contador] == 76) {
            numeroLetra.textContent = "";
            numeroBola.textContent = "";
            numeroWrap.style.backgroundColor = '#ffffff';
        }

}

function cronometro() {

    let mAux, sAux;
    s++;

    if (s>59) {
        m++;
        s=0;
    }

    if (s<10){sAux="0"+s;}else{sAux=s;}
    if (m<10){mAux="0"+m;}else{mAux=m;}

    tiempo.textContent = mAux + ":" + sAux;
}

playBtn.addEventListener('click', play);
stopBtn.addEventListener('click',reset);


function play() {

    if (iconPlay.getAttribute('class') == 'icon-pause') {
        iconPlay.className = 'icon-play_arrow';
        clearInterval(generar);
        clearInterval(hora);

    } else  {
        generar = setInterval('generarNumero()',8000);
        hora = setInterval('cronometro()',1000);
        iconPlay.className = 'icon-pause';

    }

}

function reset() {

    if (confirm('Desea reiniciar el juego')) {
        location.reload();
    }

}

numeroPanel();