import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHmac, createHash } from 'node:crypto';
import {
    hmacSha256, sha256Hex, nuevaSemilla, compromisoDe, combinarSemillas,
    serieDePartida, ordenDeBolas, verificarPartida, desdeHex, aHex,
} from '../src/justo.js';
import { serieValida } from '../src/carton.js';

const hex = (palabras) => Array.from(palabras, (p) => p.toString(16).padStart(8, '0')).join('');
const bytes = (t) => new TextEncoder().encode(t);

test('HMAC-SHA256 coincide con el de Node (RFC 2104), con claves cortas y largas', () => {
    for (const clave of ['', 'clave', 'k'.repeat(64), 'k'.repeat(100)]) {
        for (const mensaje of ['', 'bingoshow:bola:v1:abc:0', 'x'.repeat(200)]) {
            assert.equal(hex(hmacSha256(bytes(clave), bytes(mensaje))), createHmac('sha256', clave).update(mensaje).digest('hex'));
        }
    }
    assert.equal(sha256Hex(bytes('abc')), createHash('sha256').update('abc').digest('hex'));
});

test('hex de ida y vuelta, y semillas de 32 bytes', () => {
    const s = nuevaSemilla();
    assert.match(s, /^[0-9a-f]{64}$/);
    assert.equal(aHex(desdeHex(s)), s);
    assert.throws(() => desdeHex('xyz'));
});

test('combinarSemillas no depende del orden de llegada', () => {
    const a = [{ apodo: 'Ana', semilla: 'aa' }, { apodo: 'Beto', semilla: 'bb' }];
    assert.equal(combinarSemillas(a), combinarSemillas([...a].reverse()));
    assert.notEqual(combinarSemillas(a), combinarSemillas([{ apodo: 'Ana', semilla: 'ab' }, a[1]]));
});

test('el orden de bolas es una permutación de 1..75, determinista y distinto por semillas', () => {
    const s = nuevaSemilla();
    const orden = ordenDeBolas(s, 'clientes');
    assert.deepEqual([...orden].sort((x, y) => x - y), Array.from({ length: 75 }, (_, i) => i + 1));
    assert.deepEqual(ordenDeBolas(s, 'clientes'), orden);
    assert.notDeepEqual(ordenDeBolas(s, 'otros'), orden);
    assert.deepEqual(ordenDeBolas(s, 'clientes', 10), orden.slice(0, 10));
    assert.ok(serieValida(serieDePartida(s, 'clientes')));
});

test('la primera bola es uniforme entre semillas (chi-cuadrado)', () => {
    const cuentas = new Array(75).fill(0);
    for (let i = 0; i < 15000; i++) cuentas[ordenDeBolas(nuevaSemilla(16), 'c', 1)[0] - 1]++;
    const esperado = 15000 / 75;
    const chi = cuentas.reduce((s, c) => s + (c - esperado) ** 2 / esperado, 0);
    assert.ok(chi < 150, `chi² = ${chi.toFixed(1)}`);
});

test('verificarPartida acepta una partida honesta y detecta cada trampa', () => {
    const semillaServidor = nuevaSemilla();
    const semillasClientes = [{ apodo: 'Ana', semilla: nuevaSemilla(16) }, { apodo: 'Beto', semilla: nuevaSemilla(16) }];
    const semillaClientes = combinarSemillas(semillasClientes);
    const honesta = {
        compromiso: compromisoDe(semillaServidor),
        semillaServidor,
        semillasClientes,
        semillaClientes,
        serie: serieDePartida(semillaServidor, semillaClientes),
        bolas: ordenDeBolas(semillaServidor, semillaClientes).slice(0, 40), // partida que acabó en la bola 40
    };
    assert.deepEqual(verificarPartida(honesta), { valida: true, errores: [] });

    const otraSemilla = nuevaSemilla();
    assert.equal(verificarPartida({ ...honesta, semillaServidor: otraSemilla }).valida, false);
    assert.equal(verificarPartida({ ...honesta, semillasClientes: semillasClientes.slice(1) }).valida, false);
    assert.equal(verificarPartida({ ...honesta, serie: 'ZZZZ' }).valida, false);
    const cambiadas = [...honesta.bolas];
    [cambiadas[3], cambiadas[4]] = [cambiadas[4], cambiadas[3]];
    const r = verificarPartida({ ...honesta, bolas: cambiadas });
    assert.equal(r.valida, false);
    assert.match(r.errores[0], /bola nº 4/);
    assert.equal(verificarPartida({ ...honesta, semillaServidor: 'no-hex' }).valida, false);
});
