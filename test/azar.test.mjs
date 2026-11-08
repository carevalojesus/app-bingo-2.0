import { test } from 'node:test';
import assert from 'node:assert/strict';
import { enteroAleatorio, extraerBola, mezclar } from '../src/azar.js';

// Fuente falsa que devuelve una secuencia fija de palabras de 32 bits
const secuencia = (...valores) => {
    let i = 0;
    return (arreglo) => { arreglo[0] = valores[i++]; };
};

// Chi-cuadrado contra una distribución uniforme
function chiCuadrado(cuentas) {
    const total = cuentas.reduce((a, b) => a + b, 0);
    const esperado = total / cuentas.length;
    return cuentas.reduce((suma, c) => suma + (c - esperado) ** 2 / esperado, 0);
}

test('enteroAleatorio queda siempre dentro del rango', () => {
    for (const n of [1, 2, 7, 15, 75]) {
        for (let i = 0; i < 2000; i++) {
            const x = enteroAleatorio(n);
            assert.ok(Number.isInteger(x) && x >= 0 && x < n);
        }
    }
    assert.throws(() => enteroAleatorio(0), RangeError);
    assert.throws(() => enteroAleatorio(1.5), RangeError);
});

test('muestreo por rechazo: descarta el tramo final que causaría sesgo de módulo', () => {
    // Con n = 75, techo = 2^32 - (2^32 % 75). Valores >= techo se rechazan.
    const techo = 2 ** 32 - (2 ** 32 % 75);
    assert.equal(enteroAleatorio(75, secuencia(techo, techo + 5, 2 ** 32 - 1, 151)), 151 % 75);
    assert.equal(enteroAleatorio(75, secuencia(techo - 1)), (techo - 1) % 75);
});

test('extraerBola saca cada número una sola vez y vacía el bombo', () => {
    const restantes = Array.from({ length: 75 }, (_, i) => i + 1);
    const salidas = [];
    while (restantes.length) salidas.push(extraerBola(restantes));
    assert.deepEqual([...salidas].sort((a, b) => a - b), Array.from({ length: 75 }, (_, i) => i + 1));
    assert.throws(() => extraerBola(restantes), RangeError);
});

test('la primera bola es uniforme entre las 75 (chi-cuadrado)', () => {
    const cuentas = new Array(75).fill(0);
    for (let i = 0; i < 75000; i++) {
        const restantes = Array.from({ length: 75 }, (_, k) => k + 1);
        cuentas[extraerBola(restantes) - 1]++;
    }
    // 74 grados de libertad: media 74; 150 está muy por encima del percentil 99,9999
    assert.ok(chiCuadrado(cuentas) < 150, `chi² = ${chiCuadrado(cuentas).toFixed(1)}`);
});

test('mezclar: cada número cae en cada posición con la misma frecuencia', () => {
    // 5 elementos → 25 casillas (número, posición); 20 000 mezclas
    const cuentas = new Array(25).fill(0);
    for (let i = 0; i < 20000; i++) {
        mezclar([0, 1, 2, 3, 4]).forEach((n, pos) => cuentas[n * 5 + pos]++);
    }
    for (let n = 0; n < 5; n++) {
        const fila = cuentas.slice(n * 5, n * 5 + 5);
        assert.ok(chiCuadrado(fila) < 40, `número ${n}: chi² = ${chiCuadrado(fila).toFixed(1)}`);
    }
});
