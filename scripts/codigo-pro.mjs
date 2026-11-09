// Genera o comprueba códigos Pro con la clave secreta de .dev.vars (CODIGOS_SECRETO).
//
//   npm run codigo                       → código de 24 horas (un evento)
//   npm run codigo -- --dias 30          → código de 30 días (mensual)
//   npm run codigo -- --dias 7 --tipo cortesia
//   npm run codigo -- --verificar PRO-XXXXXX-XXXXXX-XXXXXX
//
// La misma clave tiene que estar en Cloudflare: npx wrangler secret put CODIGOS_SECRETO
import { readFileSync } from 'node:fs';
import { generarCodigoPro, validarCodigoPro } from '../src/codigos.js';

const TIPOS = { evento: 1, mensual: 2, cortesia: 3 };

function leerSecreto() {
    if (process.env.CODIGOS_SECRETO) return process.env.CODIGOS_SECRETO;
    try {
        const linea = readFileSync(new URL('../.dev.vars', import.meta.url), 'utf8').match(/^CODIGOS_SECRETO\s*=\s*"?([0-9a-fA-F]+)"?\s*$/m);
        if (linea) return linea[1];
    } catch { /* sin .dev.vars */ }
    console.error('No encuentro CODIGOS_SECRETO (ni en el entorno ni en .dev.vars).');
    process.exit(1);
}

const args = process.argv.slice(2);
const opcion = (nombre) => { const i = args.indexOf(`--${nombre}`); return i === -1 ? undefined : args[i + 1]; };
const secreto = leerSecreto();
const fecha = (t) => new Date(t).toLocaleString('es', { dateStyle: 'full', timeStyle: 'short' }) + ' (hora de este equipo)';

const aVerificar = opcion('verificar');
if (aVerificar) {
    const r = validarCodigoPro(secreto, aVerificar);
    console.log(r.valido ? `✔ Válido (${r.tipo}) hasta el ${fecha(r.hasta)}` : `✘ ${r.motivo}`);
    process.exit(r.valido ? 0 : 1);
}

const dias = Number(opcion('dias') ?? 1);
const nombreTipo = opcion('tipo') ?? (dias >= 28 ? 'mensual' : 'evento');
if (!TIPOS[nombreTipo]) {
    console.error(`Tipo desconocido: ${nombreTipo}. Usa evento, mensual o cortesia.`);
    process.exit(1);
}
const { codigo, hasta } = generarCodigoPro(secreto, { dias, tipo: TIPOS[nombreTipo] });
console.log(`\n  ${codigo}\n\n  Tipo: ${nombreTipo} · ${dias} ${dias === 1 ? 'día' : 'días'} · válido hasta el ${fecha(hasta)}\n`);
