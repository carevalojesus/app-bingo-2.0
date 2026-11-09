// Ejecuta todos los efectos de sonido con un AudioContext simulado: así se detectan errores
// como conectar un nodo a algo que no es un nodo (rompía el sorteo con el sonido activado).
import { test } from 'node:test';
import assert from 'node:assert/strict';

const conexiones = [];
const parametro = () => ({ value: 0, setValueAtTime() {}, exponentialRampToValueAtTime() {}, linearRampToValueAtTime() {}, setTargetAtTime() {} });
function nodo(tipo) {
    return {
        tipo, gain: parametro(), frequency: parametro(), Q: parametro(), detune: parametro(), playbackRate: parametro(),
        connect(destino) {
            assert.ok(destino && (typeof destino.connect === 'function' || destino.tipo === 'destino' || destino.value !== undefined),
                `${tipo} se conecta a algo que no es un nodo de audio`);
            conexiones.push([tipo, destino.tipo]);
            return destino;
        },
        start() {}, stop() {}, disconnect() {},
    };
}
class ContextoFalso {
    currentTime = 0;
    sampleRate = 8000;
    state = 'running';
    destination = { tipo: 'destino' };
    resume() {}
    createGain() { return nodo('ganancia'); }
    createOscillator() { return nodo('oscilador'); }
    createBiquadFilter() { return nodo('filtro'); }
    createBufferSource() { return nodo('fuente'); }
    createBuffer(_c, largo) { return { getChannelData: () => new Float32Array(largo) }; }
}
globalThis.window = { AudioContext: ContextoFalso };

const sfx = await import('../src/efectos.js');

test('todos los efectos suenan sin errores y pasan por el volumen general', () => {
    for (const efecto of ['redoble', 'silbido', 'campana', 'golpe', 'fanfarria']) {
        conexiones.length = 0;
        assert.doesNotThrow(() => sfx[efecto](), efecto);
        assert.ok(conexiones.length > 0, `${efecto} conecta algo`);
    }
    sfx.fijarVolumen({ efectos: 0.3, voz: 0.5 });
    assert.ok(conexiones.some(([, destino]) => destino === 'ganancia'), 'los efectos van a la ganancia general');
});
