// Redirección de la dirección antigua (*.workers.dev) al dominio propio
import { test } from 'node:test';
import assert from 'node:assert/strict';

// worker/index.js importa cloudflare:workers (vía las clases de Durable Objects): se prueba la función sola
const fuente = (await import('node:fs')).readFileSync(new URL('../worker/index.js', import.meta.url), 'utf8');
const cuerpo = fuente.match(/export function redireccionDominio[\s\S]*?\n}\n/)[0].replace('export ', '');
const redireccionDominio = new Function(`${cuerpo}; return redireccionDominio;`)();
const env = { DOMINIO: 'bingo.carevalojesus.com' };

test('workers.dev: las páginas van al dominio propio con ruta y parámetros', () => {
    const r = redireccionDominio(new URL('https://bingo-show.cuenta.workers.dev/show?sala=ABC123'), env);
    assert.equal(r.status, 301);
    assert.equal(r.headers.get('location'), 'https://bingo.carevalojesus.com/show?sala=ABC123');
    assert.equal(redireccionDominio(new URL('https://bingo-show.cuenta.workers.dev/'), env).headers.get('location'), 'https://bingo.carevalojesus.com/');
});

test('no se redirige la API, el dominio propio ni el desarrollo local', () => {
    assert.equal(redireccionDominio(new URL('https://bingo-show.cuenta.workers.dev/api/salas/ABC123/ws'), env), null);
    assert.equal(redireccionDominio(new URL('https://bingo.carevalojesus.com/show'), env), null);
    assert.equal(redireccionDominio(new URL('http://127.0.0.1:8787/'), env), null);
    assert.equal(redireccionDominio(new URL('https://bingo-show.cuenta.workers.dev/'), {}), null, 'sin DOMINIO no hace nada');
});
