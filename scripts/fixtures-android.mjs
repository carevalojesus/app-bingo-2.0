// Genera android/app/src/test/resources/fixtures.json con el JavaScript original, para comprobar que
// la app de Android (Kotlin) produce exactamente los mismos cartones, órdenes de bolas y figuras.
//   node scripts/fixtures-android.mjs
import { writeFileSync } from 'node:fs';
import { generarCarton, verificar, PATRONES } from '../src/carton.js';
import { combinarSemillas, serieDePartida, ordenDeBolas, bolaDoradaDe, compromisoDe } from '../src/justo.js';

const cartones = [];
for (const serie of ['K7QX', 'AB23', 'ZZZZ', 'M9PT']) {
    for (const numero of [1, 2, 7, 42, 99, 150, 300, 999]) cartones.push({ serie, numero, columnas: generarCarton(serie, numero).columnas });
}

const partidas = [];
const servidores = ['00'.repeat(32), 'a1b2c3d4'.repeat(8), 'f57df4ab4a9e7a28ff76b33b52e290ccee57da60a7dd445145078e16aaf3359e', '1234'.repeat(16)];
const grupos = [[], [{ apodo: 'Ana', semilla: 'ab'.repeat(8) }], [{ apodo: 'Beto', semilla: '0f'.repeat(16) }, { apodo: 'Ana', semilla: 'cd'.repeat(8) }, { apodo: 'Tía Gladys', semilla: '9e'.repeat(12) }]];
for (const servidor of servidores) {
    for (const semillas of grupos) {
        const combinada = combinarSemillas(semillas);
        partidas.push({
            servidor, semillas, combinada, compromiso: compromisoDe(servidor),
            serie: serieDePartida(servidor, combinada), orden: ordenDeBolas(servidor, combinada), dorada: bolaDoradaDe(servidor, combinada),
        });
    }
}

// Verificación de figuras con bolas parciales
const verificaciones = [];
const orden = ordenDeBolas(servidores[1], combinarSemillas([]));
for (const patron of Object.keys(PATRONES)) {
    for (const cuantas of [10, 30, 50]) {
        const carton = generarCarton('K7QX', 7);
        const r = verificar(carton, new Set(orden.slice(0, cuantas)), patron);
        verificaciones.push({ patron, bolas: orden.slice(0, cuantas), gana: r.gana, faltan: r.faltan });
    }
}

writeFileSync(new URL('../android/app/src/test/resources/fixtures.json', import.meta.url), JSON.stringify({ cartones, partidas, verificaciones }));
console.log(`fixtures: ${cartones.length} cartones, ${partidas.length} partidas, ${verificaciones.length} verificaciones`);
