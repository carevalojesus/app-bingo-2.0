import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as juego from '../worker/juego.js';
import { generarCarton, verificar } from '../src/carton.js';
import { nuevaSemilla, verificarPartida, compromisoDe } from '../src/justo.js';

const SERIE = 'AB23';

// Azar dirigido: serie fija y las bolas salen primero en el orden de `cola`
function azarDirigido(cola = []) {
    let contador = 0;
    return {
        hex: (largo) => String(++contador).padStart(largo, '0'),
        semilla: () => nuevaSemilla(),
        serie: () => SERIE,
        orden: () => [...cola, ...Array.from({ length: 75 }, (_, i) => i + 1).filter((n) => !cola.includes(n))],
    };
}

const numerosDe = (carton) => carton.columnas.flat().filter((n) => n !== null);
const primeraFila = (carton) => carton.columnas.map((col) => col[0]);

// Por defecto las pruebas usan salas Pro (sin límites); las del plan gratis lo piden con `pro: null`
const PRO = { tipo: 'evento', hasta: Date.UTC(2099, 0, 1) };
function nuevaSala(config = {}, azar = azarDirigido(), { pro = PRO } = {}) {
    const sala = juego.crearSala('K7Q2XM', config, { prueba: false, azar, pro, cuenta: 0 });
    const unir = (apodo, semilla) => juego.unirJugador(sala, { apodo, semilla }, azar).jugador;
    return { sala, azar, unir };
}

// Sala jugando con `jugadores` (apodo → cartones) y bolas dirigidas por `cola`
function salaJugando(jugadores, cola = [], config = {}, azar = azarDirigido(cola)) {
    const { sala, unir } = nuevaSala(config, azar);
    const ids = {};
    for (const [apodo, cartones] of Object.entries(jugadores)) {
        const j = unir(apodo, nuevaSemilla(16));
        ids[apodo] = j.id;
        cartones.forEach((n) => juego.elegirCarton(sala, j.id, n));
    }
    juego.iniciar(sala, 0, azar);
    return { sala, ids, azar };
}

// Saca las bolas siguientes avanzando el reloj y comprueba que son las esperadas
function sacar(sala, azar, numeros) {
    let ahora = sala.siguienteBolaEn;
    for (const n of numeros) {
        const eventos = juego.avanzar(sala, ahora);
        assert.equal(eventos[0].tipo, 'bola');
        assert.equal(eventos[0].numero, n);
        ahora = sala.siguienteBolaEn;
    }
    return ahora;
}

test('configuración: valores por defecto y validación', () => {
    const config = juego.validarConfig({}, { pro: true });
    assert.equal(config.cartones, 60);
    assert.equal(config.intervalo, 8000);
    assert.deepEqual(config.premios.map((p) => p.modalidad), ['linea', 'lleno']);
    assert.deepEqual(juego.validarConfig({}).premios, [{ modalidad: 'lleno', porcentaje: 100 }], 'plan gratis: cartón lleno');
    assert.equal(juego.validarConfig({ nombre: '  <b>Viernes</b> ' }).nombre, 'bViernes/b');
    assert.throws(() => juego.validarConfig({ cartones: 5 }), juego.ErrorJuego);
    assert.throws(() => juego.validarConfig({ intervalo: 5000 }), juego.ErrorJuego);
    assert.throws(() => juego.validarConfig({ intervalo: 150 }), juego.ErrorJuego);
    assert.equal(juego.validarConfig({ intervalo: 150 }, { prueba: true }).intervalo, 150);
    assert.throws(() => juego.validarConfig({ premios: [{ modalidad: 'linea', porcentaje: 50 }] }), /sumar 100/);
    assert.throws(() => juego.validarConfig({ premios: [{ modalidad: 'linea', porcentaje: 50 }, { modalidad: 'linea', porcentaje: 50 }] }), /repetir/);
    assert.throws(() => juego.validarConfig({ premios: [{ modalidad: 'x', porcentaje: 100 }] }), /Modalidad/);
    assert.throws(() => juego.validarConfig({ nombre: 'x'.repeat(41) }), juego.ErrorJuego);
    assert.ok(juego.codigoValido(juego.generarCodigo()));
});

test('jugadores: fichas iniciales una vez, reconexión con token y apodos repetidos', () => {
    const { sala, azar } = nuevaSala({ fichasIniciales: 50 });
    const { jugador: ana, nuevo } = juego.unirJugador(sala, { apodo: ' Ana ' }, azar);
    assert.ok(nuevo);
    assert.equal(ana.apodo, 'Ana');
    assert.equal(ana.fichas, 50);
    ana.fichas = 7;
    const otra = juego.unirJugador(sala, { apodo: 'Otro nombre', token: ana.token }, azar);
    assert.equal(otra.nuevo, false);
    assert.equal(otra.jugador.fichas, 7);
    assert.equal(sala.jugadores.length, 1);
    assert.equal(juego.unirJugador(sala, { apodo: 'ana' }, azar).jugador.apodo, 'ana 2');
    assert.equal(juego.unirJugador(sala, { apodo: 'Ana', token: 'desconocido' }, azar).jugador.apodo, 'Ana 3');
    assert.throws(() => juego.unirJugador(sala, { apodo: '  <> ' }, azar), /apodo/);
});

test('lobby: fichas, máximo de cartones, dueño único y soltar devuelve fichas', () => {
    const { sala, unir } = nuevaSala({ precioCarton: 10, fichasIniciales: 30, maxCartonesPorJugador: 2, pozoExtra: 5 });
    const ana = unir('Ana');
    const beto = unir('Beto');

    juego.elegirCarton(sala, ana.id, 3);
    assert.equal(ana.fichas, 20);
    assert.equal(sala.ocupados[3], ana.id);
    assert.equal(sala.pozo, 15);
    assert.throws(() => juego.elegirCarton(sala, beto.id, 3), /ya tiene dueño/);
    assert.throws(() => juego.elegirCarton(sala, ana.id, 3), /ya es tuyo/);
    assert.throws(() => juego.elegirCarton(sala, ana.id, 61), /del 1 al 60/);
    juego.elegirCarton(sala, ana.id, 17);
    assert.throws(() => juego.elegirCarton(sala, ana.id, 20), /como máximo 2/);
    assert.deepEqual(ana.cartones, [3, 17]);

    juego.elegirCarton(sala, beto.id, 1);
    juego.elegirCarton(sala, beto.id, 2);
    beto.cartones.pop(); delete sala.ocupados[2]; // forzamos saldo sin pasar por soltar
    beto.fichas = 5;
    assert.throws(() => juego.elegirCarton(sala, beto.id, 4), /fichas suficientes/);

    assert.throws(() => juego.soltarCarton(sala, beto.id, 3), /no es tuyo/);
    juego.soltarCarton(sala, ana.id, 3);
    assert.equal(ana.fichas, 20);
    assert.equal(sala.ocupados[3], undefined);
    assert.deepEqual(ana.cartones, [17]);
});

test('iniciar sin cartones falla; al iniciar se revela la serie y sale la primera bola', () => {
    const { sala, azar, unir } = nuevaSala();
    unir('Ana');
    assert.throws(() => juego.iniciar(sala, 0, azar), /al menos un cartón/);
    assert.equal(juego.instantanea(sala).serie, null);

    juego.elegirCarton(sala, sala.jugadores[0].id, 5);
    const eventos = juego.iniciar(sala, 1000, azar);
    assert.equal(sala.estado, 'jugando');
    assert.equal(juego.instantanea(sala).serie, SERIE);
    assert.equal(sala.bolas.length, 1);
    assert.deepEqual(eventos.find((e) => e.tipo === 'bola'), { tipo: 'bola', numero: sala.bolas[0], indice: 0 });
    assert.equal(sala.siguienteBolaEn, 1000 + 8000);
    assert.deepEqual(sala.registro, [{ numero: sala.bolas[0], indice: 0, en: 1000 }]);
    assert.equal(sala.premioActual, 0);
    assert.throws(() => juego.elegirCarton(sala, sala.jugadores[0].id, 6), /antes de empezar/);
    assert.throws(() => juego.iniciar(sala, 0, azar), /ya empezó/);
});

test('las bolas salen todas, sin repetir, una por alarma', () => {
    const { sala, azar } = salaJugando({ Ana: [1] }, [], { premios: [{ modalidad: 'lleno', porcentaje: 100 }] });
    while (sala.bolas.length < 75) juego.avanzar(sala, sala.siguienteBolaEn);
    assert.equal(new Set(sala.bolas).size, 75);
    assert.equal(sala.registro.length, 75);
    assert.equal(juego.avanzar(sala, sala.siguienteBolaEn - 1), null, 'nada antes de tiempo');
});

test('bingo falso solo avisa; bingo válido abre la ventana y reparte al cerrarla', () => {
    const carton = generarCarton(SERIE, 7);
    const fila = primeraFila(carton);
    const { sala, ids, azar } = salaJugando({ Ana: [7], Beto: [8] }, fila, { precioCarton: 10, pozoExtra: 0 });

    const falso = juego.cantarBingo(sala, ids.Ana, 7, 100);
    const rechazo = falso.find((e) => e.tipo === 'bingoRechazado');
    assert.equal(rechazo.para, ids.Ana);
    assert.equal(rechazo.carton, 7);
    assert.ok(rechazo.faltan.length > 0);
    assert.ok(falso.some((e) => e.tipo === 'aviso' && !e.para));
    assert.equal(sala.ventanaHasta, null);
    assert.throws(() => juego.cantarBingo(sala, ids.Beto, 7, 100), /no es tuyo/);

    const ahora = sacar(sala, azar, fila.slice(1));
    assert.ok(verificar(carton, new Set(sala.bolas), 'linea').gana);
    juego.cantarBingo(sala, ids.Ana, 7, ahora);
    assert.equal(sala.ventanaHasta, ahora + 4000);
    assert.equal(sala.siguienteBolaEn, null);
    assert.equal(juego.proximoEvento(sala), ahora + 4000);
    assert.throws(() => juego.cantarBingo(sala, ids.Ana, 7, ahora), /ya cantó/);
    assert.equal(juego.avanzar(sala, ahora + 3999), null);

    const [ganador] = juego.avanzar(sala, ahora + 4000);
    assert.equal(ganador.tipo, 'ganador');
    assert.equal(ganador.modalidad, 'linea');
    assert.equal(ganador.siguiente, 'lleno');
    assert.deepEqual(ganador.ganadores, [{ jugadorId: ids.Ana, apodo: 'Ana', carton: 7, fichas: 6 }]); // 30 % de 20
    assert.equal(sala.jugadores.find((j) => j.id === ids.Ana).fichas, 90 + 6);
    assert.equal(sala.premioActual, 1);
    assert.equal(sala.siguienteBolaEn, ahora + 4000 + 6000);
});

test('ventana con varios ganadores: reparto a partes iguales y el resto al primero', () => {
    // Los tres cartones completan la misma línea (columna B) con las mismas bolas
    const cartones = [1, 2, 3].map((n) => generarCarton(SERIE, n));
    const bolas = [...new Set(cartones.flatMap((c) => c.columnas[0]))];
    const { sala, ids, azar } = salaJugando(
        { Ana: [1], Beto: [2], Caro: [3] }, bolas,
        { precioCarton: 0, pozoExtra: 100, premios: [{ modalidad: 'linea', porcentaje: 100 }] },
    );
    const ahora = sacar(sala, azar, bolas.slice(1));
    juego.cantarBingo(sala, ids.Beto, 2, ahora);
    juego.cantarBingo(sala, ids.Ana, 1, ahora + 100);
    juego.cantarBingo(sala, ids.Caro, 3, ahora + 200);
    assert.equal(sala.ventanaHasta, ahora + 4000, 'la ventana no se alarga');

    const [ganador] = juego.cerrarVentana(sala, ahora + 4000);
    assert.deepEqual(ganador.ganadores.map((g) => [g.apodo, g.fichas]), [['Beto', 34], ['Ana', 33], ['Caro', 33]]);
    assert.equal(ganador.siguiente, null);
    assert.equal(sala.estado, 'terminada');
    assert.equal(sala.premioActual, null);
    assert.equal(juego.proximoEvento(sala), null);
});

test('premios encadenados: línea → lleno → terminada', () => {
    const carton = generarCarton(SERIE, 4);
    const fila = primeraFila(carton);
    const resto = numerosDe(carton).filter((n) => !fila.includes(n));
    const { sala, ids, azar } = salaJugando({ Ana: [4] }, [...fila, ...resto], { precioCarton: 10, fichasIniciales: 10 });
    assert.equal(sala.pozo, 10);

    let ahora = sacar(sala, azar, fila.slice(1));
    juego.cantarBingo(sala, ids.Ana, 4, ahora);
    // Mientras está abierta la ventana el lleno todavía no cuenta
    juego.cerrarVentana(sala, ahora + 4000);
    assert.equal(sala.premios[0].ganadores[0].fichas, 3);
    assert.equal(sala.premioActual, 1);
    assert.equal(sala.estado, 'jugando');

    const falso = juego.cantarBingo(sala, ids.Ana, 4, ahora + 4500);
    assert.ok(falso.some((e) => e.tipo === 'bingoRechazado'), 'para lleno aún faltan números');

    ahora = sacar(sala, azar, resto);
    juego.cantarBingo(sala, ids.Ana, 4, ahora);
    const [ganador] = juego.avanzar(sala, ahora + 4000);
    assert.equal(ganador.modalidad, 'lleno');
    assert.equal(ganador.ganadores[0].fichas, 7);
    assert.equal(sala.estado, 'terminada');
    assert.equal(sala.jugadores[0].fichas, 10);
});

test('bolas agotadas: se adjudican solos los premios pendientes', () => {
    const { sala, azar } = salaJugando(
        { Ana: [1], Beto: [2, 3] }, [],
        { precioCarton: 10, premios: [{ modalidad: 'esquinas', porcentaje: 20 }, { modalidad: 'lleno', porcentaje: 80 }] },
    );
    while (sala.bolas.length < 75) assert.equal(juego.avanzar(sala, sala.siguienteBolaEn)[0].tipo, 'bola');
    assert.equal(sala.estado, 'jugando');

    const eventos = juego.avanzar(sala, sala.siguienteBolaEn);
    assert.deepEqual(eventos.map((e) => e.modalidad), ['esquinas', 'lleno']);
    assert.deepEqual(eventos[0].ganadores.map((g) => [g.carton, g.fichas]), [[1, 2], [2, 2], [3, 2]]);
    assert.deepEqual(eventos[1].ganadores.map((g) => [g.carton, g.fichas]), [[1, 8], [2, 8], [3, 8]]);
    assert.equal(eventos[0].siguiente, 'lleno');
    assert.equal(eventos[1].siguiente, null);
    assert.equal(sala.estado, 'terminada');
    const fichas = Object.fromEntries(sala.jugadores.map((j) => [j.apodo, j.fichas]));
    assert.deepEqual(fichas, { Ana: 90 + 10, Beto: 80 + 20 });
});

test('pausa congela el sorteo y reanudar espera un intervalo; velocidad', () => {
    const { sala, azar } = salaJugando({ Ana: [1] });
    juego.pausar(sala);
    assert.equal(sala.estado, 'pausa');
    assert.equal(juego.proximoEvento(sala), null);
    assert.equal(juego.avanzar(sala, 1e12), null);
    assert.throws(() => juego.pausar(sala), juego.ErrorJuego);
    juego.reanudar(sala, 50000);
    assert.equal(sala.siguienteBolaEn, 58000);
    assert.throws(() => juego.cambiarVelocidad(sala, 5000, 50000), /intervalo/);
    juego.cambiarVelocidad(sala, 4000, 51000);
    assert.equal(sala.config.intervalo, 4000);
    assert.equal(sala.siguienteBolaEn, 55000);
    assert.throws(() => juego.nuevaPartida(sala), /Termina la partida/);
});

test('nueva partida conserva saldos y libera cartones', () => {
    const { sala, ids, azar } = salaJugando({ Ana: [1], Beto: [2] }, [], { premios: [{ modalidad: 'lleno', porcentaje: 100 }] });
    while (sala.estado !== 'terminada') juego.avanzar(sala, sala.siguienteBolaEn);
    const saldos = sala.jugadores.map((j) => j.fichas);
    juego.nuevaPartida(sala);
    assert.equal(sala.estado, 'lobby');
    assert.deepEqual(sala.jugadores.map((j) => j.fichas), saldos, 'no se devuelven fichas de una partida jugada');
    assert.deepEqual(sala.ocupados, {});
    assert.deepEqual(sala.bolas, []);
    assert.deepEqual(sala.registro, []);
    assert.equal(sala.serie, null);
    assert.ok(sala.premios.every((p) => p.ganadores.length === 0));
    assert.ok(sala.jugadores.every((j) => j.cartones.length === 0));

    // Desde el lobby sí se devuelven
    juego.elegirCarton(sala, ids.Ana, 9);
    const antes = sala.jugadores.find((j) => j.id === ids.Ana).fichas;
    juego.nuevaPartida(sala);
    assert.equal(sala.jugadores.find((j) => j.id === ids.Ana).fichas, antes + 10);
});

test('expulsar devuelve las fichas y el token deja de valer', () => {
    const { sala, azar, unir } = nuevaSala();
    const ana = unir('Ana');
    juego.elegirCarton(sala, ana.id, 1);
    juego.elegirCarton(sala, ana.id, 2);
    assert.equal(ana.fichas, 80);
    juego.expulsar(sala, ana.id);
    assert.equal(ana.fichas, 100);
    assert.deepEqual(sala.ocupados, {});
    assert.equal(sala.jugadores.length, 0);
    assert.equal(juego.unirJugador(sala, { apodo: 'Ana', token: ana.token }, azar).nuevo, true);
    assert.throws(() => juego.expulsar(sala, 'nadie'), /no está/);
});

test('la instantánea nunca contiene tokens ni el registro interno', () => {
    const { sala, ids } = salaJugando({ Ana: [1], Beto: [2] });
    const texto = JSON.stringify(juego.instantanea(sala)) + JSON.stringify(juego.resumen(sala));
    assert.ok(!texto.includes(sala.tokenAnfitrion));
    for (const j of sala.jugadores) assert.ok(!texto.includes(j.token));
    assert.ok(!/token/i.test(texto));
    const vista = juego.instantanea(sala);
    assert.deepEqual(Object.keys(vista).sort(), [
        'anfitrionConectado', 'aporteRonda', 'bolas', 'bote', 'codigo', 'config', 'dorada', 'doradaSalio', 'estado',
        'inicioAutoEn', 'jugadas', 'jugadores', 'justo', 'logo', 'maxJugadores', 'nombre', 'ocupados', 'pozo',
        'premioActual', 'premios', 'pro', 'ronda', 'serie', 'siguienteBolaEn', 'siguienteRondaEn', 'ventanaHasta',
    ]);
    assert.ok(!texto.includes(sala.semillaServidor), 'la semilla del servidor no se publica durante la partida');
    for (const j of sala.jugadores) assert.ok(!JSON.stringify(vista.jugadores).includes(j.semilla));
    assert.deepEqual(vista.ocupados, { 1: ids.Ana, 2: ids.Beto });
    assert.deepEqual(Object.keys(vista.jugadores[0]).sort(), ['admitido', 'apodo', 'cartones', 'conectado', 'fichas', 'ganado', 'id', 'repetir']);
    assert.equal(vista.movimientos, undefined, 'el registro de fichas no llega a los jugadores');
    assert.equal(vista.solicitudes, undefined);
    assert.ok(!JSON.stringify(vista).includes('vinculo'));
    assert.ok(!Object.keys(vista.jugadores[0]).includes('ultimos'));
    vista.jugadores[0].fichas = -1;
    assert.notEqual(sala.jugadores[0].fichas, -1, 'la instantánea es una copia');
});

test('permisos: un jugador no puede iniciar ni el anfitrión cantar bingo', () => {
    for (const tipo of ['iniciar', 'pausar', 'reanudar', 'nuevaPartida', 'velocidad', 'expulsar']) {
        assert.throws(() => juego.comprobarPermiso('jugador', tipo), /Solo el anfitrión/);
        assert.doesNotThrow(() => juego.comprobarPermiso('anfitrion', tipo));
    }
    for (const tipo of ['elegirCarton', 'soltarCarton', 'bingo']) {
        assert.throws(() => juego.comprobarPermiso('anfitrion', tipo), /Solo los jugadores/);
        assert.doesNotThrow(() => juego.comprobarPermiso('jugador', tipo));
    }
    assert.throws(() => juego.comprobarPermiso('jugador', 'hackear'), /desconocido/);

    const { sala } = nuevaSala();
    assert.ok(!juego.esAnfitrion(sala, ''));
    assert.ok(!juego.esAnfitrion(sala, undefined));
    assert.ok(juego.esAnfitrion(sala, sala.tokenAnfitrion));
    assert.throws(() => juego.elegirCarton(sala, 'intruso', 1), /No estás/);
});

test('partida verificable: compromiso en el lobby, semilla secreta hasta terminar y verificarPartida', () => {
    // Azar real (sin inyectar): la serie y las bolas salen de las semillas
    const sala = juego.crearSala('K7Q2XM', { premios: [{ modalidad: 'lleno', porcentaje: 100 }] }, { cuenta: 0 });
    let vista = juego.instantanea(sala);
    assert.match(vista.justo.compromiso, /^[0-9a-f]{64}$/);
    assert.equal(vista.justo.compromiso, compromisoDe(sala.semillaServidor));
    assert.deepEqual({ ...vista.justo, compromiso: null }, { compromiso: null, semillasClientes: null, semillaClientes: null, semillaServidor: null });

    const semillaAna = nuevaSemilla(16);
    const ana = juego.unirJugador(sala, { apodo: 'Ana', semilla: semillaAna }).jugador;
    juego.unirJugador(sala, { apodo: 'Ana', token: ana.token, semilla: nuevaSemilla(16) });
    assert.equal(ana.semilla, semillaAna, 'se conserva la primera semilla');
    const beto = juego.unirJugador(sala, { apodo: 'Beto', semilla: 'no-es-hex' }).jugador;
    assert.equal(beto.semilla, null, 'una semilla no válida se ignora');
    juego.unirJugador(sala, { apodo: 'Caro', semilla: nuevaSemilla(16) }); // sin cartones: no participa
    juego.elegirCarton(sala, ana.id, 1);
    juego.elegirCarton(sala, beto.id, 2);

    juego.iniciar(sala, 0);
    vista = juego.instantanea(sala);
    assert.deepEqual(vista.justo.semillasClientes, [{ apodo: 'Ana', semilla: semillaAna }]);
    assert.match(vista.justo.semillaClientes, /^[0-9a-f]{64}$/);
    assert.equal(vista.justo.semillaServidor, null);
    while (sala.estado === 'jugando') {
        assert.ok(!JSON.stringify(juego.instantanea(sala)).includes(sala.semillaServidor));
        juego.avanzar(sala, sala.siguienteBolaEn);
    }
    assert.equal(sala.estado, 'terminada');

    vista = juego.instantanea(sala);
    assert.equal(vista.justo.semillaServidor, sala.semillaServidor);
    const resultado = verificarPartida({ ...vista.justo, serie: vista.serie, bolas: vista.bolas });
    assert.deepEqual(resultado, { valida: true, errores: [] });
    assert.equal(verificarPartida({ ...vista.justo, serie: vista.serie, bolas: [...vista.bolas].reverse() }).valida, false);
    assert.deepEqual(sala.registro.map((r) => r.numero), vista.bolas, 'el registro de auditoría coincide');

    // Nueva partida: compromiso nuevo y la semilla anterior deja de publicarse
    const anterior = vista.justo.compromiso;
    juego.nuevaPartida(sala);
    vista = juego.instantanea(sala);
    assert.notEqual(vista.justo.compromiso, anterior);
    assert.equal(vista.justo.semillaServidor, null);
    assert.equal(vista.justo.semillasClientes, null);
});

test('sala guardada sin orden (versión anterior): se reconstruye desde las semillas o termina limpia', () => {
    // Azar real: el orden reconstruido tiene que ser el comprometido
    const sala = juego.crearSala('K7Q2XM', { premios: [{ modalidad: 'lleno', porcentaje: 100 }] }, { cuenta: 0 });
    const ana = juego.unirJugador(sala, { apodo: 'Ana', semilla: nuevaSemilla(16) }).jugador;
    juego.elegirCarton(sala, ana.id, 1);
    juego.iniciar(sala, 0);
    for (let i = 0; i < 8; i++) juego.avanzar(sala, sala.siguienteBolaEn);
    const original = [...sala.orden];

    delete sala.orden; // como una sala guardada antes de que existiera `orden`
    assert.deepEqual(juego.sanear(sala), []);
    assert.deepEqual(sala.orden, original);
    delete sala.orden;
    assert.deepEqual(juego.avanzar(sala, sala.siguienteBolaEn), [{ tipo: 'bola', numero: original[9], indice: 9 }]);
    while (sala.estado === 'jugando') juego.avanzar(sala, sala.siguienteBolaEn);
    const vista = juego.instantanea(sala);
    assert.equal(verificarPartida({ ...vista.justo, serie: vista.serie, bolas: vista.bolas }).valida, true);

    // Sin semillas no se puede reconstruir: la partida termina con un aviso y se devuelven las fichas
    const vieja = salaJugando({ Ana: [1, 2] }).sala;
    for (let i = 0; i < 5; i++) juego.avanzar(vieja, vieja.siguienteBolaEn);
    const fichasAntes = vieja.jugadores[0].fichas;
    delete vieja.orden;
    vieja.semillaServidor = undefined;
    const eventos = juego.avanzar(vieja, vieja.siguienteBolaEn);
    assert.equal(eventos.length, 1);
    assert.equal(eventos[0].tipo, 'aviso');
    assert.equal(vieja.estado, 'terminada');
    assert.equal(juego.proximoEvento(vieja), null, 'no queda ninguna alarma pendiente');
    assert.equal(vieja.jugadores[0].fichas, fichasAntes + 20);
    assert.throws(() => juego.sacarBola(vieja, 0), juego.ErrorJuego);

    // Un orden que no cuadra con las bolas ya salidas tampoco se acepta
    // (sin la semilla de los jugadores, para que tampoco se pueda reconstruir: si no, 1 de cada 75
    // veces el orden recalculado coincidiría con la bola dirigida y la prueba fallaría al azar)
    const rara = salaJugando({ Ana: [1] }).sala;
    rara.orden = [...rara.orden].reverse();
    rara.justo.semillaClientes = null;
    assert.equal(juego.sanear(rara)[0].tipo, 'aviso');
    assert.equal(rara.estado, 'terminada');

    // sanear completa campos que falten en una sala de lobby
    const lobby = nuevaSala().sala;
    delete lobby.registro;
    delete lobby.ventana;
    assert.deepEqual(juego.sanear(lobby), []);
    assert.deepEqual([lobby.registro, lobby.ventana], [[], []]);
});

// ---------- Modo «Fila de 5» ----------
test('fila de 5: tablero fijo de 15 filas que reparte las 75 bolas sin repetir', async () => {
    const { numerosDeFila, TOTAL_FILAS } = await import('../src/filas.js');
    assert.deepEqual(numerosDeFila(1), [1, 16, 31, 46, 61]);
    assert.deepEqual(numerosDeFila(15), [15, 30, 45, 60, 75]);
    const todos = Array.from({ length: TOTAL_FILAS }, (_, i) => numerosDeFila(i + 1)).flat();
    assert.equal(new Set(todos).size, 75);
    assert.throws(() => numerosDeFila(16), RangeError);
});

test('fila de 5: la configuración fija 15 filas y un premio con todo el pozo', () => {
    const config = juego.validarConfig({ tipo: 'fila', cartones: 200, premios: [{ modalidad: 'linea', porcentaje: 100 }], precioCarton: 5 });
    assert.equal(config.tipo, 'fila');
    assert.equal(config.cartones, 15);
    assert.deepEqual(config.premios, [{ modalidad: 'fila5', porcentaje: 100 }]);
    assert.equal(juego.validarConfig({}).tipo, 'carton');
    assert.throws(() => juego.validarConfig({ tipo: 'loteria' }), /tipo/);
});

test('fila de 5: el servidor entrega el premio solo a la primera fila vendida completa', () => {
    // La fila 2 (2, 17, 32, 47, 62) se completa antes que la 3; la fila 1 no está vendida
    const cola = [1, 16, 31, 46, 61, 2, 17, 32, 47, 62];
    const { sala, ids, azar } = salaJugando({ Ana: [2], Beto: [3] }, cola, { tipo: 'fila', precioCarton: 5, pozoExtra: 10 });
    assert.equal(sala.pozo, 20);
    assert.throws(() => juego.cantarBingo(sala, ids.Ana, 2, 1), /no hace falta cantar/);

    let ahora = sacar(sala, azar, cola.slice(1, 9)); // la fila 1 completa (sin dueño) no abre ventana
    assert.equal(sala.ventanaHasta, null);
    const eventos = juego.avanzar(sala, ahora);   // sale el 62: fila 2 completa
    assert.equal(eventos[0].numero, 62);
    assert.match(eventos[1].texto, /Ana \(fila 2\)/);
    assert.notEqual(sala.ventanaHasta, null);
    assert.equal(sala.siguienteBolaEn, null);

    const [ganador] = juego.avanzar(sala, sala.ventanaHasta);
    assert.equal(ganador.tipo, 'ganador');
    assert.equal(ganador.modalidad, 'fila5');
    assert.deepEqual(ganador.ganadores.map((g) => [g.apodo, g.carton, g.fichas]), [['Ana', 2, 20]]);
    assert.equal(sala.estado, 'terminada');
    assert.equal(sala.jugadores.find((j) => j.id === ids.Ana).fichas, 100 - 5 + 20);
});

test('fila de 5: mensajes en femenino y límite por jugador', () => {
    const { sala, unir } = nuevaSala({ tipo: 'fila', maxCartonesPorJugador: 1 });
    const ana = unir('Ana');
    const beto = unir('Beto');
    juego.elegirCarton(sala, ana.id, 4);
    assert.throws(() => juego.elegirCarton(sala, ana.id, 4), /Esa fila ya es tuya/);
    assert.throws(() => juego.elegirCarton(sala, beto.id, 4), /Esa fila ya tiene dueño/);
    assert.throws(() => juego.elegirCarton(sala, ana.id, 5), /como máximo 1 filas/);
    assert.throws(() => juego.soltarCarton(sala, beto.id, 4), /Esa fila no es tuya/);
    assert.throws(() => juego.elegirCarton(sala, beto.id, 16), /La fila debe ser un número del 1 al 15/);
});

// ---------- Rondas seguidas, bote, bola dorada, «Elige tus 5», ranking ----------
test('figuras nuevas: L, T, X, marco y cuadro central', async () => {
    const { PATRONES } = await import('../src/carton.js');
    const carton = generarCarton(SERIE, 1);
    const todas = new Set(numerosDe(carton));
    for (const clave of ['letraL', 'letraT', 'letraX', 'marco', 'cuadro']) {
        assert.ok(PATRONES[clave], clave);
        assert.ok(verificar(carton, todas, clave).gana, `${clave} con todas las bolas`);
        assert.ok(!verificar(carton, new Set(), clave).gana, `${clave} sin bolas`);
    }
    assert.equal(PATRONES.marco.figuras[0].length, 16);
    assert.equal(PATRONES.letraX.figuras[0].length, 9);
    assert.equal(PATRONES.cuadro.figuras[0].length, 9);
});

test('elige tus 5: jugadas propias, empates repartidos y validación', () => {
    const cola = [3, 9, 21, 40, 70];
    const { sala, unir } = nuevaSala({ tipo: 'elige', precioCarton: 10, cartones: 10 }, azarDirigido(cola));
    const ana = unir('Ana', nuevaSemilla(16));
    const beto = unir('Beto', nuevaSemilla(16));
    assert.throws(() => juego.elegirCarton(sala, ana.id, null, [1, 2, 3, 4]), /exactamente 5/);
    assert.throws(() => juego.elegirCarton(sala, ana.id, null, [1, 1, 2, 3, 4]), /No repitas/);
    assert.throws(() => juego.elegirCarton(sala, ana.id, null, [1, 2, 3, 4, 76]), /1 al 75/);
    juego.elegirCarton(sala, ana.id, null, [70, 3, 9, 21, 40]);
    juego.elegirCarton(sala, beto.id, null, [3, 9, 21, 40, 70]);
    juego.elegirCarton(sala, beto.id, null, [1, 2, 4, 5, 6]);
    assert.deepEqual(sala.jugadas[1], [3, 9, 21, 40, 70]);
    juego.soltarCarton(sala, beto.id, 3);
    assert.equal(sala.jugadas[3], undefined);

    juego.iniciar(sala, 0, azarDirigido(cola));
    let ahora = sala.siguienteBolaEn;
    for (let i = 0; i < 4; i++) { juego.avanzar(sala, ahora); ahora = sala.siguienteBolaEn ?? ahora; }
    assert.notEqual(sala.ventanaHasta, null, 'las dos jugadas se completan con el 70');
    const [ganador] = juego.avanzar(sala, sala.ventanaHasta);
    assert.equal(ganador.modalidad, 'elige5');
    assert.deepEqual(ganador.ganadores.map((g) => [g.apodo, g.fichas]), [['Ana', 10], ['Beto', 10]]);
});

test('bola dorada: duplica el premio en juego y se puede verificar', () => {
    const { sala, ids, azar } = salaJugando({ Ana: [1] }, [], { bolaDorada: true, precioCarton: 10 });
    assert.ok(Number.isInteger(sala.dorada));
    assert.equal(juego.instantanea(sala).dorada, null, 'secreta hasta que sale');
    const indice = sala.orden.indexOf(sala.dorada);
    const premioAntes = sala.premios[0].fichas;
    let ahora = sala.siguienteBolaEn;
    let evento = null;
    for (let i = 1; i <= indice; i++) {
        const eventos = juego.avanzar(sala, ahora);
        evento = eventos.find((e) => e.tipo === 'dorada') ?? evento;
        ahora = sala.siguienteBolaEn;
    }
    if (indice > 0) {
        assert.equal(evento?.numero, sala.dorada);
        assert.equal(sala.premios[0].fichas, premioAntes * 2);
        assert.equal(juego.instantanea(sala).dorada, sala.dorada);
    }
    void ids; void azar;
});

test('bote: se acumula entre rondas y se lo lleva quien gana en pocas bolas', () => {
    // Fila 2 completa en la bola 5: dentro del límite de 10
    const cola = [2, 17, 32, 47, 62];
    const config = { tipo: 'fila', precioCarton: 10, botePorcentaje: 20, boteBolas: 10, rondasSeguidas: true };
    const { sala, ids } = salaJugando({ Ana: [2], Beto: [3] }, cola, config);
    assert.equal(sala.bote, 4, '20 % de 20 fichas');
    assert.equal(sala.pozo, 16);
    let ahora = sala.siguienteBolaEn;
    for (let i = 0; i < 4; i++) { juego.avanzar(sala, ahora); ahora = sala.siguienteBolaEn ?? ahora; }
    const [ganador] = juego.avanzar(sala, sala.ventanaHasta);
    assert.equal(ganador.bote, 4);
    assert.equal(ganador.ganadores[0].bote, 4);
    assert.equal(sala.bote, 0);
    const ana = sala.jugadores.find((j) => j.id === ids.Ana);
    assert.equal(ana.fichas, 100 - 10 + 16 + 4);
    assert.equal(ana.ganado, 20);

    // Rondas seguidas: tras terminar, nueva ronda sola con las mismas filas y cuenta atrás
    assert.equal(sala.estado, 'terminada');
    assert.notEqual(sala.siguienteRondaEn, null);
    const [aviso] = juego.avanzar(sala, sala.siguienteRondaEn);
    assert.match(aviso.texto, /Ronda 2/);
    assert.equal(sala.estado, 'lobby');
    assert.deepEqual(sala.ocupados, { 2: ids.Ana, 3: ids.Beto });
    assert.equal(ana.fichas, 100 - 10 + 16 + 4 - 10);
    assert.notEqual(sala.inicioAutoEn, null);
    juego.avanzar(sala, sala.inicioAutoEn);
    assert.equal(sala.estado, 'jugando');
});

test('rondas seguidas: quien desactiva «repetir» no compra y el anfitrión puede parar la cuenta', () => {
    const { sala, ids } = salaJugando({ Ana: [2], Beto: [3] }, [2, 17, 32, 47, 62], { tipo: 'fila', rondasSeguidas: true });
    juego.fijarRepetir(sala, ids.Beto, false);
    let ahora = sala.siguienteBolaEn;
    for (let i = 0; i < 4; i++) { juego.avanzar(sala, ahora); ahora = sala.siguienteBolaEn ?? ahora; }
    juego.avanzar(sala, sala.ventanaHasta);
    juego.avanzar(sala, sala.siguienteRondaEn);
    assert.deepEqual(sala.ocupados, { 2: ids.Ana });
    juego.detenerCuenta(sala);
    assert.equal(sala.inicioAutoEn, null);
    assert.equal(juego.proximoEvento(sala), null);
});

test('verificación con bola dorada: la publicada sale de las semillas y una falsa se detecta', () => {
    const { sala } = salaJugando({ Ana: [1] }, [], { bolaDorada: true }, juego.AZAR);
    juego.interrumpir(sala);
    const vista = juego.instantanea(sala);
    const datos = {
        compromiso: vista.justo.compromiso, semillaServidor: vista.justo.semillaServidor, semillasClientes: vista.justo.semillasClientes,
        semillaClientes: vista.justo.semillaClientes, serie: vista.serie, bolas: vista.bolas,
    };
    assert.equal(verificarPartida({ ...datos, dorada: vista.dorada }).valida, true);
    const falsa = vista.dorada === 75 ? 74 : vista.dorada + 1;
    assert.match(verificarPartida({ ...datos, dorada: falsa }).errores.join(' '), /bola dorada/);
});

// ---------- Planes ----------
test('plan gratis: 1 premio y 15 jugadores; el Pro desbloquea 3 premios y 100 jugadores', () => {
    const dos = { premios: [{ modalidad: 'linea', porcentaje: 30 }, { modalidad: 'lleno', porcentaje: 70 }] };
    assert.throws(() => nuevaSala(dos, azarDirigido(), { pro: null }), /plan gratis incluye 1 premio/);
    const { sala, unir } = nuevaSala({}, azarDirigido(), { pro: null });
    assert.equal(sala.pro, null);
    assert.equal(juego.instantanea(sala).maxJugadores, 15);
    for (let i = 1; i <= 15; i++) unir(`J${i}`);
    assert.throws(() => unir('J16'), /plan gratis admite 15/);

    const pro = nuevaSala(dos);
    assert.equal(juego.instantanea(pro.sala).pro, true);
    assert.equal(juego.instantanea(pro.sala).maxJugadores, 100);
    for (let i = 1; i <= 16; i++) pro.unir(`J${i}`);
    assert.equal(pro.sala.jugadores.length, 16);
});

test('plan: las salas guardadas antes de los planes conservan sus límites', () => {
    const { sala } = nuevaSala();
    delete sala.pro;
    juego.sanear(sala);
    assert.equal(juego.instantanea(sala).pro, true);
});

// ---------- Cuenta atrás y forma de marcar ----------
test('cuenta atrás: al empezar no sale bola hasta que termina', () => {
    const { sala, unir, azar } = nuevaSala({}, azarDirigido([7, 8]));
    sala.cuentaInicio = juego.CUENTA_INICIO;
    juego.elegirCarton(sala, unir('Ana').id, 1);
    const eventos = juego.iniciar(sala, 1000, azar);
    assert.deepEqual(eventos.map((e) => e.tipo), ['aviso', 'cuenta']);
    assert.equal(eventos[1].ms, juego.CUENTA_INICIO);
    assert.equal(sala.bolas.length, 0);
    assert.equal(juego.proximoEvento(sala), 1000 + juego.CUENTA_INICIO);
    assert.equal(juego.avanzar(sala, 1000 + juego.CUENTA_INICIO - 1), null);
    assert.equal(juego.avanzar(sala, 1000 + juego.CUENTA_INICIO)[0].numero, 7);
});

test('marcado manual: el ¡Bingo! cuenta solo lo que el jugador marcó', () => {
    const carton = generarCarton(SERIE, 1);
    const fila = primeraFila(carton);
    const { sala, ids } = salaJugando({ Ana: [1] }, fila, { marcado: 'manual', premios: [{ modalidad: 'linea', porcentaje: 100 }] });
    sacar(sala, null, fila.slice(1));
    assert.throws(() => juego.cantarBingo(sala, ids.Ana, 1, 0), /marcas/);
    const sinUna = juego.cantarBingo(sala, ids.Ana, 1, 0, fila.slice(1));
    assert.equal(sinUna[0].tipo, 'bingoRechazado', 'no marcó el primer número: no cuenta');
    // Marcar algo que no salió tampoco sirve
    assert.equal(juego.cantarBingo(sala, ids.Ana, 1, 0, [...fila.slice(1), 999])[0].tipo, 'bingoRechazado');
    juego.cantarBingo(sala, ids.Ana, 1, 0, fila);
    assert.notEqual(sala.ventanaHasta, null, 'con todo marcado, sí');
    assert.equal(juego.validarConfig({ tipo: 'fila', marcado: 'manual' }).marcado, 'auto');
    assert.throws(() => juego.validarConfig({ marcado: 'raro' }), /marcar/);
});

// ---------- Admisión, fichas asignadas y vinculación ----------
test('admisión: en espera sin fichas; el anfitrión admite, asigna, corrige y queda registrado', () => {
    const { sala, unir } = nuevaSala({ admision: true, fichasIniciales: 0, precioCarton: 10, mensajeFichas: 'Pide tus fichas <al anfitrión>' });
    assert.equal(sala.config.mensajeFichas, 'Pide tus fichas al anfitrión', 'sin < ni >');
    const ana = unir('Ana');
    assert.equal(ana.admitido, false);
    assert.equal(ana.fichas, 0);
    assert.throws(() => juego.elegirCarton(sala, ana.id, 1), /admita/);

    const [solicitud] = juego.pedirFichas(sala, ana.id, 50, 1000);
    assert.deepEqual([solicitud.tipo, solicitud.para, solicitud.cantidad], ['solicitud', 'anfitrion', 50]);
    assert.deepEqual(juego.instantanea(sala, { anfitrion: true }).solicitudes.map((x) => [x.apodo, x.cantidad]), [['Ana', 50]]);

    const [evento] = juego.darFichas(sala, ana.id, 50, 2000);
    assert.deepEqual([evento.tipo, evento.para, evento.saldo], ['fichas', ana.id, 50]);
    assert.equal(ana.admitido, true, 'dar fichas también admite');
    assert.equal(ana.solicitud, null);
    juego.elegirCarton(sala, ana.id, 1);
    assert.equal(ana.fichas, 40);
    assert.throws(() => juego.darFichas(sala, ana.id, -41, 3000), /solo tiene 40/);
    juego.darFichas(sala, ana.id, -5, 3000);
    const vista = juego.instantanea(sala, { anfitrion: true });
    assert.deepEqual(vista.movimientos.map((m) => [m.apodo, m.cantidad]), [['Ana', 50], ['Ana', -5]]);
    assert.throws(() => juego.darFichas(sala, ana.id, 0, 0), /distinto de 0/);
});

test('admisión: admitir da las fichas al entrar; rechazar funciona aunque la partida haya empezado', () => {
    const { sala, unir } = nuevaSala({ admision: true, fichasIniciales: 30 });
    const ana = unir('Ana');
    const beto = unir('Beto');
    const eventos = juego.admitir(sala, ana.id, 1000);
    assert.ok(eventos.some((e) => e.tipo === 'admitido' && e.para === ana.id));
    assert.equal(ana.fichas, 30);
    assert.throws(() => juego.admitir(sala, ana.id, 1000), /ya está admitido/);
    juego.elegirCarton(sala, ana.id, 1);
    juego.iniciar(sala, 0);
    juego.expulsar(sala, beto.id); // en espera: se puede rechazar con la partida en marcha
    assert.equal(sala.jugadores.length, 1);
    assert.throws(() => juego.expulsar(sala, ana.id), /lobby/);
    const sinAdmision = nuevaSala().sala;
    assert.throws(() => juego.pedirFichas(sinAdmision, juego.unirJugador(sinAdmision, { apodo: 'X' }).jugador.id, 10, 0), /se reparten solas/);
});

test('vinculación: código de 6 cifras, un solo uso, caduca y se anula tras 5 fallos', () => {
    const { sala } = nuevaSala();
    const [ev] = juego.crearVinculo(sala, 0);
    assert.match(ev.codigo, /^\d{6}$/);
    assert.equal(ev.para, 'anfitrion');
    assert.equal(juego.usarVinculo(sala, ev.codigo, 1000), sala.tokenAnfitrion);
    assert.throws(() => juego.usarVinculo(sala, ev.codigo, 1000), /caducó/, 'un solo uso');
    const [otro] = juego.crearVinculo(sala, 0);
    assert.throws(() => juego.usarVinculo(sala, otro.codigo, 3 * 60 * 1000), /caducó/);
    const [tercero] = juego.crearVinculo(sala, 0);
    const malo = tercero.codigo === '000000' ? '111111' : '000000';
    for (let i = 0; i < 5; i++) assert.throws(() => juego.usarVinculo(sala, malo, 1000), /incorrecto/);
    assert.throws(() => juego.usarVinculo(sala, tercero.codigo, 1000), /caducó/, 'tras 5 fallos ya no vale');
});
