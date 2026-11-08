import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
    generarCarton, verificar, parsearCodigo, nuevaSerie, serieValida, formatoCodigo,
} from '../src/carton.js';

test('el mismo código genera siempre el mismo cartón', () => {
    assert.deepEqual(generarCarton('K7QX', 42), generarCarton('K7QX', 42));
    assert.notDeepEqual(generarCarton('K7QX', 42).columnas, generarCarton('K7QX', 43).columnas);
    assert.notDeepEqual(generarCarton('K7QX', 42).columnas, generarCarton('K7QY', 42).columnas);
});

test('cada columna respeta su rango, sin repetidos, ordenada y con centro libre', () => {
    for (let n = 1; n <= 500; n++) {
        const { columnas } = generarCarton('AB23', n);
        assert.equal(columnas[2][2], null);
        columnas.forEach((col, c) => {
            assert.equal(col.length, 5);
            const nums = col.filter((x) => x !== null);
            assert.equal(nums.length, c === 2 ? 4 : 5);
            assert.equal(new Set(nums).size, nums.length);
            nums.forEach((x) => assert.ok(x >= c * 15 + 1 && x <= c * 15 + 15, `${x} fuera de rango en columna ${c}`));
            assert.deepEqual(nums, [...nums].sort((a, b) => a - b));
        });
    }
});

test('no hay cartones repetidos en una serie completa', () => {
    const vistos = new Set();
    for (let n = 1; n <= 999; n++) vistos.add(JSON.stringify(generarCarton('ZZ99', n).columnas));
    assert.equal(vistos.size, 999);
});

test('línea: gana con una fila contando el centro libre', () => {
    const carton = generarCarton('K7QX', 7);
    const filaCentral = carton.columnas.map((col) => col[2]).filter((n) => n !== null);
    const r = verificar(carton, new Set(filaCentral), 'linea');
    assert.equal(r.gana, true);
    assert.deepEqual(r.faltan, []);
});

test('línea: si no gana, indica la línea a la que le faltan menos números', () => {
    const carton = generarCarton('K7QX', 7);
    const colB = carton.columnas[0];
    const r = verificar(carton, new Set(colB.slice(0, 4)), 'linea');
    assert.equal(r.gana, false);
    assert.deepEqual(r.faltan, [colB[4]]);
});

test('4 esquinas y cartón lleno', () => {
    const carton = generarCarton('K7QX', 9);
    const { columnas: k } = carton;
    const esquinas = new Set([k[0][0], k[4][0], k[0][4], k[4][4]]);
    assert.equal(verificar(carton, esquinas, 'esquinas').gana, true);
    assert.equal(verificar(carton, esquinas, 'lleno').gana, false);
    assert.equal(verificar(carton, esquinas, 'lleno').faltan.length, 20);
    const todos = new Set(k.flat().filter((n) => n !== null));
    assert.equal(verificar(carton, todos, 'lleno').gana, true);
});

test('parsearCodigo acepta varios formatos', () => {
    assert.deepEqual(parsearCodigo('K7QX-042'), { serie: 'K7QX', numero: 42 });
    assert.deepEqual(parsearCodigo(' k7qx 42 '), { serie: 'K7QX', numero: 42 });
    assert.deepEqual(parsearCodigo('K7QX042'), { serie: 'K7QX', numero: 42 });
    assert.deepEqual(parsearCodigo('42', 'AB23'), { serie: 'AB23', numero: 42 });
    assert.ok(parsearCodigo('42').error);
    assert.ok(parsearCodigo('').error);
    assert.ok(parsearCodigo('K7QX-0').error);
    assert.ok(parsearCodigo('K7QX-1000').error);
    assert.ok(parsearCodigo('KIL0-5').error); // letras excluidas del alfabeto
});

test('nuevaSerie produce series válidas', () => {
    for (let i = 0; i < 200; i++) assert.ok(serieValida(nuevaSerie()));
    assert.equal(formatoCodigo('K7QX', 5), 'K7QX-005');
});
