import { test } from 'node:test';
import assert from 'node:assert/strict';
import { generarCodigoPro, validarCodigoPro, normalizarCodigoPro } from '../src/codigos.js';

const SECRETO = 'a1'.repeat(32);
const OTRO = 'b2'.repeat(32);
const AHORA = Date.UTC(2026, 10, 8, 15);

test('códigos Pro: se generan, validan y caducan', () => {
    const { codigo, hasta, tipo } = generarCodigoPro(SECRETO, { dias: 1, ahora: AHORA });
    assert.match(codigo, /^PRO-[0-9A-HJKMNP-TV-Z]{6}-[0-9A-HJKMNP-TV-Z]{6}-[0-9A-HJKMNP-TV-Z]{6}$/);
    assert.equal(tipo, 'evento');
    assert.equal(hasta, Date.UTC(2026, 10, 9, 15), 'válido 24 horas desde que se genera');
    assert.equal(validarCodigoPro(SECRETO, codigo, AHORA + 23 * 3600e3).valido, true, 'por la noche del mismo día sigue valiendo');
    assert.deepEqual(validarCodigoPro(SECRETO, codigo, AHORA), { valido: true, tipo: 'evento', hasta });
    assert.equal(validarCodigoPro(SECRETO, codigo, hasta).valido, false);
    assert.match(validarCodigoPro(SECRETO, codigo, hasta).motivo, /caducó/);
    const mensual = generarCodigoPro(SECRETO, { dias: 30, tipo: 2, ahora: AHORA });
    assert.equal(validarCodigoPro(SECRETO, mensual.codigo, AHORA + 29 * 864e5).tipo, 'mensual');
});

test('códigos Pro: firma con otra clave, alterados o mal escritos no valen', () => {
    const { codigo } = generarCodigoPro(SECRETO, { dias: 5, ahora: AHORA });
    assert.equal(validarCodigoPro(OTRO, codigo, AHORA).valido, false);
    // Cambiar cualquier carácter (también el último, que lleva bits de relleno) invalida el código
    for (const posicion of [4, 12, 18, codigo.length - 1]) {
        const original = codigo[posicion];
        for (const otro of ['0', '1', 'Z']) {
            if (otro === original) continue;
            const alterado = codigo.slice(0, posicion) + otro + codigo.slice(posicion + 1);
            assert.equal(validarCodigoPro(SECRETO, alterado, AHORA).valido, false, `alterado en ${posicion}: ${alterado}`);
        }
    }
    assert.match(validarCodigoPro(SECRETO, 'PRO-123', AHORA).motivo, /formato/);
    // Minúsculas, espacios y letras confundibles se aceptan
    const escrito = codigo.toLowerCase().replace(/-/g, ' ').replace(/0/g, 'o').replace(/1/g, 'l');
    assert.equal(validarCodigoPro(SECRETO, escrito, AHORA).valido, true);
    assert.equal(normalizarCodigoPro(' pro-abc '), 'ABC');
});

test('códigos Pro: cada código es distinto aunque se generen el mismo día', () => {
    const codigos = new Set(Array.from({ length: 50 }, () => generarCodigoPro(SECRETO, { ahora: AHORA }).codigo));
    assert.equal(codigos.size, 50);
    assert.throws(() => generarCodigoPro('corta', {}), /secreta/);
});
