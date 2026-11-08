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

function nuevaSala(config = {}, azar = azarDirigido()) {
    const sala = juego.crearSala('K7Q2XM', config, { prueba: false, azar });
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
    const config = juego.validarConfig({});
    assert.equal(config.cartones, 60);
    assert.equal(config.intervalo, 8000);
    assert.deepEqual(config.premios.map((p) => p.modalidad), ['linea', 'lleno']);
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
        'anfitrionConectado', 'bolas', 'codigo', 'config', 'estado', 'jugadores', 'justo', 'nombre', 'ocupados',
        'pozo', 'premioActual', 'premios', 'serie', 'siguienteBolaEn', 'ventanaHasta',
    ]);
    assert.ok(!texto.includes(sala.semillaServidor), 'la semilla del servidor no se publica durante la partida');
    for (const j of sala.jugadores) assert.ok(!JSON.stringify(vista.jugadores).includes(j.semilla));
    assert.deepEqual(vista.ocupados, { 1: ids.Ana, 2: ids.Beto });
    assert.deepEqual(Object.keys(vista.jugadores[0]).sort(), ['apodo', 'cartones', 'conectado', 'fichas', 'id']);
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
    const sala = juego.crearSala('K7Q2XM', { premios: [{ modalidad: 'lleno', porcentaje: 100 }] });
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
    const sala = juego.crearSala('K7Q2XM', { premios: [{ modalidad: 'lleno', porcentaje: 100 }] });
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
    const rara = salaJugando({ Ana: [1] }).sala;
    rara.orden = [...rara.orden].reverse();
    assert.equal(juego.sanear(rara)[0].tipo, 'aviso');
    assert.equal(rara.estado, 'terminada');

    // sanear completa campos que falten en una sala de lobby
    const lobby = nuevaSala().sala;
    delete lobby.registro;
    delete lobby.ventana;
    assert.deepEqual(juego.sanear(lobby), []);
    assert.deepEqual([lobby.registro, lobby.ventana], [[], []]);
});
