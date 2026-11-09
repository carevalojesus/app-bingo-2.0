# Bingo Show en línea — especificación

Partidas en línea sobre **Cloudflare Workers + Durable Objects**. Decisiones tomadas:

- **Fichas virtuales**: no hay dinero. Cada jugador recibe fichas al entrar y las gasta en cartones.
- **Anfitrión + móviles**: el anfitrión proyecta el show 3D (`index.html?sala=CODIGO`); cada jugador
  usa una vista ligera en su móvil (`jugar.html?sala=CODIGO`), sin Three.js.
- **Sin cuentas**: se entra con código de sala + apodo; un token guardado en `localStorage` permite reconectarse.
- **El servidor es la autoridad**: saca las bolas (`crypto.getRandomValues`, en el momento, nunca un orden
  precalculado) y verifica cada ¡Bingo! con `verificar()` de `src/carton.js`.

## Piezas y responsables

| Pieza | Archivos |
|---|---|
| Servidor | `worker/` (Worker + Durable Object `Sala`), `wrangler.toml`, `.assetsignore`, `test/sala.test.mjs` |
| Cliente compartido | `src/en-linea/cliente.js` (conexión WebSocket con reconexión) — **ya escrito, no cambiar su API** |
| Jugador (móvil) | `jugar.html`, `src/jugador.js` |
| Anfitrión | `sala.html` + `src/sala.js` (crear sala), `index.html` + `src/main.js` + `src/en-linea/anfitrion.js` (show en modo en línea) |

`src/carton.js` y `src/carton-html.js` se comparten entre todos (el Worker importa `../src/carton.js`).

## Reglas del juego

**Configuración de la sala** (al crearla; valores por defecto entre paréntesis):

```js
{
  tipo: 'carton',                      // 'carton' (bingo clásico) | 'fila' («Fila de 5») | 'elige' («Elige tus 5»)
  nombre: 'Bingo de los viernes',      // opcional, 0–40 caracteres
  cartones: 60,                        // cartones a la venta, numerados 1..cartones (10–300)
  precioCarton: 10,                    // fichas por cartón (0–1000)
  maxCartonesPorJugador: 4,            // (1–12)
  fichasIniciales: 100,                // fichas al unirse (0–100000)
  intervalo: 8000,                     // ms entre bolas: 4000 | 6000 | 8000 | 12000
  premios: [                           // en orden; porcentajes suman 100
    { modalidad: 'linea', porcentaje: 30 },
    { modalidad: 'lleno', porcentaje: 70 },
  ],
  pozoExtra: 0,                        // fichas que pone el anfitrión además de las ventas (0–100000)
  marcado: 'libre',                    // solo bingo clásico: 'libre' (elige cada jugador) | 'auto' | 'manual'
  rondasSeguidas: false,               // al terminar: nueva ronda a los 12 s y arranque solo a los 30 s
  bolaDorada: false,                   // si sale antes del ganador, el premio en juego se duplica
  botePorcentaje: 0,                   // % de las ventas que va al bote acumulado (0–50)
  boteBolas: 35,                       // (5–75) el bote es de quien gane el último premio en ≤ estas bolas
}
```

`modalidad` ∈ `PATRONES` de `src/carton.js` (`linea`, `esquinas`, `lleno`, `letraL`, `letraT`, `letraX`, `marco`, `cuadro`). Entre 1 y 3 premios, sin modalidades repetidas.

**Modo «Fila de 5»** (`tipo: 'fila'`, `src/filas.js`): el servidor ignora `cartones` y `premios` y fija
15 filas y un único premio `{ modalidad: 'fila5', porcentaje: 100 }`. La fila *n* son los números
n, n+15, n+30, n+45 y n+60 (uno por letra); entre las 15 cubren las 75 bolas sin repetir, así que con
cada bola se completa como mucho una. Los mensajes `elegirCarton`/`soltarCarton` usan el número de fila.
Nadie canta: tras cada bola el servidor comprueba las filas vendidas y, si una se completa, abre la
ventana y la adjudica al cerrarla. El mensaje `bingo` se rechaza en este modo.

**Modo «Elige tus 5»** (`tipo: 'elige'`): cada jugada son 5 números que elige el jugador con
`{ tipo: 'elegirCarton', numeros: [5 enteros 1–75 distintos] }`; el servidor le pone número (1, 2, 3…)
y la publica en `estado.jugadas`. `cartones` es el máximo de jugadas de la sala. Las jugadas pueden
repetirse entre jugadores: si varias se completan con la misma bola, el premio se reparte.

**Forma de marcar** (`marcado`): con `manual`, el mensaje `bingo` lleva `marcas` (números que el
jugador marcó en ese cartón) y el servidor comprueba el premio solo con los marcados que salieron:
si no lo marcó, no cuenta. Con `auto` los móviles marcan solos y no ofrecen el selector.

**Cuenta atrás**: al iniciar (también en rondas seguidas) la primera bola no sale al momento: el
servidor manda `{ tipo: 'cuenta', ms: 4000 }` y la saca al terminar (`CUENTA_INICIO`; 0 en modo prueba).
El show y los móviles muestran 3, 2, 1, ¡Ya!. El show sin conexión hace lo mismo al dar play.

**Admisión y fichas asignadas** (`admision: true`, `mensajeFichas`): los jugadores nuevos entran con
`admitido: false` y 0 fichas, y no pueden elegir. Mensajes: jugador → `{ tipo: 'pedirFichas', cantidad }`
(el anfitrión recibe `{ tipo: 'solicitud', jugadorId, apodo, cantidad }`); anfitrión → `{ tipo: 'admitir', jugadorId }`
(da las `fichasIniciales`), `{ tipo: 'darFichas', jugadorId, cantidad }` (negativa para corregir; admite si
estaba en espera) y `expulsar` (rechazar, también con la partida en marcha si está en espera). El jugador recibe
`{ tipo: 'admitido' }` y `{ tipo: 'fichas', cantidad, saldo }`. Cada asignación queda en `movimientos`, que junto
con `solicitudes` solo va en la instantánea del anfitrión (`instantanea(sala, { anfitrion: true })`).
La app no procesa pagos: lo que el organizador cobre fuera es cosa suya (`terminos.html`).

**Control desde el móvil** (`anfitrion.html`, `src/control.js`): el show pide `{ tipo: 'vincular' }` y recibe
`{ tipo: 'vinculo', codigo, expira }` (6 cifras, 2 minutos, un solo uso, se anula tras 5 fallos). El móvil
lo canjea en `POST /api/salas/:codigo/vincular { codigo }` → `{ tokenAnfitrion }` y se conecta como anfitrión.

**Extras** (cualquier tipo):
- *Rondas seguidas*: al terminar, `siguienteRondaEn` programa la nueva ronda; a quien tenga `repetir`
  (mensaje `{ tipo: 'repetir', valor }`) se le vuelve a comprar lo de la ronda anterior. En el lobby,
  `inicioAutoEn` arranca la ronda sola si hay ventas; el anfitrión puede pararla con `detenerCuenta`.
- *Bote*: al iniciar, `aporteRonda` (% de las ventas) pasa a `bote`. Si el último premio se gana en
  `boteBolas` bolas o menos, el evento `ganador` lleva `bote` y cada ganador su parte en `g.bote`.
- *Bola dorada*: `bolaDoradaDe(semillas)` en `src/justo.js` (verificable). Es secreta hasta que sale
  (evento `{ tipo: 'dorada', numero, fichas }`) o hasta el final.
- *Reacciones*: `{ tipo: 'reaccion', emoji }` (uno de `REACCIONES`, máx. 1 cada 800 ms); se reenvía a todos
  como `{ tipo: 'reaccion', emoji, apodo }` sin guardarse.
- *Ranking*: cada jugador lleva `ganado` (fichas ganadas en todas las rondas de la sala).

**Estados de la sala**: `lobby` → `jugando` ⇄ `pausa` → `terminada` → (nueva partida) `lobby`.

1. **Lobby**: los jugadores se unen (máx. 100) y reciben `fichasIniciales` **una sola vez por sala** (al
   reconectar o en partidas siguientes conservan su saldo). Eligen cartones por número: cada uno cuesta
   `precioCarton`, se descuenta al elegirlo y se devuelve al soltarlo. Un cartón solo puede tener un dueño.
   Solo en `lobby` se puede elegir/soltar.
2. **Iniciar** (anfitrión, con ≥ 1 cartón vendido): pozo = ventas + `pozoExtra`. Se genera una serie
   nueva para la partida **al iniciar** (`nuevaSerie()`), así nadie conoce los números de los cartones
   mientras elige. Sale la primera bola enseguida y luego una cada `intervalo` (alarma del Durable Object).
3. **Cantar ¡Bingo!**: el jugador envía el número de uno de sus cartones. El servidor verifica contra la
   modalidad del **premio en juego** y las bolas ya salidas.
   - Falso: solo a ese jugador `bingoRechazado` (con los números que faltan); a todos un `aviso`.
   - Válido: el sorteo se detiene y se abre una **ventana de 4 s** para que otros que completaron con la
     misma bola también canten. Al cerrarla se reparte el premio a partes iguales entre los cartones
     ganadores (división entera; el resto va al primero que cantó), se emite `ganador` y se pasa al
     siguiente premio. Si no quedan premios → `terminada`. Si quedan, el sorteo sigue tras 6 s.
4. **Bolas agotadas** (75) con premios pendientes: el servidor revisa solo todos los cartones vendidos y
   adjudica cada premio pendiente a quien lo tenga (siempre hay alguien para `lleno`). Luego `terminada`.
5. **Pausa/reanudar** (anfitrión): congela la alarma; al reanudar la siguiente bola sale tras `intervalo`.
6. **Nueva partida** (anfitrión, desde `terminada` o `lobby`): vuelve a `lobby`, libera los cartones
   (sin devolver fichas si la partida terminó), vacía bolas y premios. Los jugadores y saldos se conservan.
7. **Expulsar** (anfitrión, solo en `lobby`): devuelve las fichas de sus cartones y cierra su conexión;
   su token deja de valer.

## HTTP

| Método y ruta | Cuerpo / respuesta |
|---|---|
| `POST /api/salas` | Cuerpo: configuración (parcial; se completa con los valores por defecto y se valida). Respuesta `201 { codigo, tokenAnfitrion }`. `400 { error }` si es inválida. `429 { error }` + `Retry-After` si la IP superó el límite. |
| `GET /api/salas/:codigo` | `200 { codigo, nombre, estado, jugadores: n, config }` o `404 { error }` |
| `GET /api/salas/:codigo/ws` | Upgrade a WebSocket. Sin parámetros: la identidad se manda en el primer mensaje. |

- `codigo`: 6 caracteres del alfabeto `ABCDEFGHJKMNPQRSTUVWXYZ23456789`, en mayúsculas. El Worker la
  normaliza (`toUpperCase`) y la usa como nombre del Durable Object (`idFromName`).
- Tokens: 32 caracteres hex aleatorios. Nunca se envían a otros clientes.
- Todo lo demás lo sirve Workers Static Assets desde la raíz del repo (ver `.assetsignore`).

**Planes** (`PLANES` en `worker/juego.js`): sin código, la sala es del plan gratis (15 jugadores y
1 premio; si no se mandan premios, cartón lleno). Con `codigoPro` válido es Pro (100 jugadores,
3 premios y logo). El Worker comprueba el código con la clave `CODIGOS_SECRETO` (secreto de
Cloudflare; en local, `.dev.vars`) y pasa `{ tipo, hasta }` al Durable Object. Un código falso o
caducado responde `400` **y gasta cupo del límite por IP**. La instantánea lleva `pro`,
`maxJugadores` y `logo` (versión). El logo (`config.logo`: data URL PNG/JPEG/WebP ≤ 60 KB, solo Pro)
se guarda aparte y se sirve en `GET /api/salas/:codigo/logo?v=…`; no viaja en el estado.

**Códigos Pro** (`src/codigos.js`): `PRO-XXXXXX-XXXXXX-XXXXXX`, base32 de Crockford con tipo,
hora de caducidad, azar y 40 bits de firma HMAC-SHA256. Se generan con `npm run codigo`
(`-- --dias 30` para un mes, `-- --verificar CÓDIGO` para comprobar uno).

**Panel de administración** (`admin.html`, `src/admin.js`, `worker/registro.js`): con la clave
`ADMIN_CLAVE` (secreto de Cloudflare; en local, `.dev.vars`) se generan códigos (Evento S/ 25 · 24 h,
Mensual S/ 60 · 30 días, Cortesía S/ 0), se anulan o reactivan, y se ven ingresos y salas creadas.
API (cabecera `Authorization: Bearer <ADMIN_CLAVE>`): `GET /api/admin/resumen`,
`POST /api/admin/codigos { plan, dias?, nota?, cliente? }`, `POST /api/admin/codigos/anular { codigo, anulado }`.
Los intentos con clave incorrecta gastan cupo del limitador de la IP (10 por hora). El registro es un
Durable Object único (`Registro`): un código anulado deja de servir para crear salas, y los códigos
generados con `npm run codigo` se registran (origen «terminal») la primera vez que se usan.

**Límite de salas** (`worker/limitador.js`): cada IP (`cf-connecting-ip`) puede crear como mucho
10 salas por hora. Lo lleva un Durable Object `Limitador` por IP, que se borra solo cuando ya no
quedan creaciones recientes. Solo cuentan las salas creadas (`201`), no las peticiones rechazadas.
En modo prueba la cabecera `x-prueba-ip` simula otra IP (lo usa `npm run test:e2e`).

**Caducidad**: una sala sin actividad durante 7 días (`CADUCIDAD_MS` en `worker/sala.js`) se borra
entera (estado, alarma y conexiones) y su código vuelve a dar `404`. Cuenta como actividad cualquier
cambio guardado (mensajes, bolas, rondas). Si a la hora de caducar hay alguien conectado, se aplaza.
En modo prueba la configuración puede llevar `caducidadMs` (≥ 300) para probarlo.

## WebSocket

Mensajes JSON `{ tipo, ...datos }`. El primer mensaje del cliente debe ser `hola`; antes de eso el
servidor ignora todo lo demás. Mensajes de más de 4 KB o mal formados → `error`.

### Cliente → servidor

| tipo | datos | quién |
|---|---|---|
| `hola` | `{ rol: 'jugador', apodo, token?, semilla? }` o `{ rol: 'anfitrion', token }` | todos |
| `elegirCarton` | `{ numero }` | jugador |
| `soltarCarton` | `{ numero }` | jugador |
| `bingo` | `{ numero }` (uno de sus cartones) | jugador |
| `iniciar` / `pausar` / `reanudar` / `nuevaPartida` | — | anfitrión |
| `velocidad` | `{ intervalo }` | anfitrión |
| `expulsar` | `{ jugadorId }` | anfitrión |
| `ping` | — | todos (respuesta `pong`) |

`hola` de jugador con `token` válido → reconecta a ese jugador (el apodo nuevo se ignora). Sin token o con
token desconocido → jugador nuevo (apodo 1–20 caracteres tras `trim`; se recorta y se quitan `<>`).
Apodo repetido en la sala → se le añade ` 2`, ` 3`, …

### Servidor → cliente

| tipo | datos |
|---|---|
| `bienvenida` | `{ rol, jugadorId?, token?, estado }` — `token` solo para un jugador nuevo |
| `estado` | `{ estado }` — instantánea completa; se envía a todos tras **cualquier** cambio |
| `bola` | `{ numero, indice }` — se envía justo **antes** del `estado` que la incluye (para animar) |
| `ganador` | `{ modalidad, ganadores: [{ jugadorId, apodo, carton, fichas }], siguiente: modalidad \| null }` |
| `bingoRechazado` | `{ carton, faltan: [n…] }` — solo al que cantó |
| `aviso` | `{ texto }` — mensaje corto para mostrar a todos |
| `error` | `{ mensaje }` — p. ej. «Ese cartón ya tiene dueño», «No tienes fichas suficientes» |
| `expulsado` | — y el servidor cierra la conexión |
| `pong` | — |

### Instantánea `estado`

```js
{
  codigo: 'K7Q2XM',
  nombre: 'Bingo de los viernes',
  estado: 'lobby' | 'jugando' | 'pausa' | 'terminada',
  config: { ... },                       // la configuración completa
  serie: 'AB23' | null,                  // null en lobby (se revela al iniciar)
  bolas: [12, 47, ...],                  // en orden de salida
  siguienteBolaEn: 1731070000000 | null, // epoch ms de la próxima bola (para el anillo de cuenta atrás)
  ventanaHasta: 1731070000000 | null,    // si hay una ventana de ¡Bingo! abierta
  pozo: 600,                             // fichas totales en juego
  premios: [ { modalidad, porcentaje, fichas, ganadores: [{ jugadorId, apodo, carton, fichas }] } ],
  premioActual: 0 | 1 | 2 | null,        // índice del premio en juego; null si terminó
  jugadores: [ { id, apodo, fichas, cartones: [3, 17], conectado } ],
  ocupados: { '3': 'jugadorId', '17': 'jugadorId' },
  anfitrionConectado: true,
  justo: {                               // partida verificable (ver sección «Partida verificable»)
    compromiso: 'hex64',                 // SHA-256 de la semilla del servidor; existe desde el lobby
    semillasClientes: [{ apodo, semilla }] | null, // fijadas al iniciar
    semillaClientes: 'hex64' | null,     // combinarSemillas(semillasClientes), fijada al iniciar
    semillaServidor: 'hex64' | null,     // solo se revela en `terminada`
  },
}
```

Los clientes **dibujan siempre a partir de la última instantánea**; los eventos (`bola`, `ganador`,
`bingoRechazado`, `aviso`) solo sirven para animaciones y sonidos.

## Cliente compartido (`src/en-linea/cliente.js`)

```js
import { conectarSala, crearSala, consultarSala, CLAVES } from './en-linea/cliente.js';

const conexion = conectarSala(codigo, {
  hola: () => ({ rol: 'jugador', apodo, token: localStorage... }), // se reenvía en cada reconexión
  alMensaje: (mensaje) => { ... },      // todos los mensajes del servidor
  alCambiarConexion: (estado) => { ... }, // 'conectando' | 'conectado' | 'reconectando' | 'cerrado'
});
conexion.enviar({ tipo: 'elegirCarton', numero: 7 });
conexion.cerrar();
```

Se reconecta solo con espera creciente (0,5 s → 8 s). No guarda nada; cada vista guarda su token en
`localStorage` con las claves de `CLAVES` (`CLAVES.jugador(codigo)`, `CLAVES.anfitrion(codigo)`).

## Desarrollo

```bash
npm run build          # compila dist/ (show, cartones, jugador, sala)
npm run dev:worker     # wrangler dev en http://localhost:8787 (otro puerto: npm run dev:worker -- --port 8790)
npm test               # pruebas (cartones + lógica de la sala)
```

El modo sin conexión de siempre (`index.html` sin `?sala=`) debe seguir funcionando igual, también
abriéndolo con doble clic (`file://`).

## Partida verificable («provably fair»)

Todo el cálculo está en `src/justo.js` (compartido por servidor y clientes, con pruebas en
`test/justo.test.mjs`). **No se usa `extraerBola`/`src/azar.js` en el servidor**: el orden sale de las semillas.

1. **Lobby** (al crear la sala y en cada `nuevaPartida`): el servidor genera
   `semillaServidor = nuevaSemilla()` (32 bytes del CSPRNG, secreta) y publica
   `justo.compromiso = compromisoDe(semillaServidor)`.
2. **Unirse**: el cliente del jugador genera `nuevaSemilla(16)` una vez por sala, la guarda en
   `localStorage` (clave `bingoshow.semilla.CODIGO`) y la envía en `hola.semilla`. El servidor acepta solo
   hex de 16–64 caracteres y conserva la **primera** que recibió de cada jugador (al reconectar no cambia).
   Si un jugador no envía semilla, el servidor no inventa una: simplemente no participa en la combinación.
3. **Iniciar**: `semillasClientes` = `{ apodo, semilla }` de los jugadores **con cartones** que tienen
   semilla; `semillaClientes = combinarSemillas(semillasClientes)`; la serie de los cartones es
   `serieDePartida(semillaServidor, semillaClientes)` (sustituye a `nuevaSerie()`); y la bola en la posición
   `k` (0-based) es `ordenDeBolas(semillaServidor, semillaClientes, k + 1)[k]` (o calcula el orden una vez
   y guárdalo en privado; nunca va en la instantánea hasta `terminada`).
4. **Terminada**: se publica `justo.semillaServidor`. Cualquiera ejecuta
   `verificarPartida({ compromiso, semillaServidor, semillasClientes, semillaClientes, serie, bolas })`
   → `{ valida, errores }`.

El registro de auditoría del servidor (número, orden y hora de cada bola) se sigue guardando.

## Notas del servidor

Decisiones del servidor (`worker/`) donde la especificación no lo fijaba:

- **Código**: `worker/juego.js` (reglas puras, sin E/S; reloj y azar inyectables), `worker/sala.js`
  (Durable Object: hibernación de WebSockets, storage, una sola alarma) y `worker/index.js` (rutas HTTP).
- **Reparto del pozo entre premios**: `floor(pozo × porcentaje / 100)` para cada premio; lo que sobra por
  redondeo va al **último** premio. Dentro de un premio, división entera entre cartones y el resto al
  primero que cantó.
- **Lobby**: `pozo` y `premios[].fichas` son una vista previa que se recalcula con cada venta.
  `premioActual` es `null` en `lobby` y en `terminada`.
- **¡Bingo!** se acepta en `jugando` y en `pausa` (también durante la pausa de 6 s tras un premio).
  Un mismo cartón no puede cantar dos veces en la misma ventana; la ventana no se alarga con cada canto.
  Un jugador puede ganar con varios cartones a la vez (cada cartón cuenta como un ganador).
- **Pausa con la ventana abierta**: la ventana se cierra a su hora igualmente; si la sala sigue en pausa,
  no se programa la siguiente bola hasta `reanudar`. Reanudar con la ventana abierta no adelanta nada.
- **Bolas agotadas**: tras la bola 75 se espera un `intervalo` normal (para que se pueda cantar); si
  nadie abrió ventana, se adjudican los premios pendientes en orden a todos los cartones vendidos que
  los cumplen (con 75 bolas, todos), ordenados por número de cartón; el resto va al de número menor.
  Se emite un `ganador` por premio.
- **`velocidad`**: solo admite 4000/6000/8000/12000 (en modo prueba, cualquier entero 150–12000).
  Si hay una bola programada, la cuenta atrás se reinicia con el nuevo intervalo.
- **`nuevaPartida`** solo desde `lobby` o `terminada` (no se puede abortar una partida en juego).
- **Apodos**: se quitan `<>`, se hace `trim` y se recortan a 20 caracteres; el duplicado se compara sin
  distinguir mayúsculas (`Ana` y `ana` → `ana 2`).
- **Expulsado**: su token se borra, así que si vuelve con él entra como jugador nuevo (con
  `fichasIniciales` otra vez); `cliente.js` ya no reconecta tras `expulsado`.
- **`hola` fallido** (token de anfitrión no válido, apodo vacío, sala llena, rol desconocido): se envía
  `error` y el servidor cierra el socket (códigos 4003 / 4000). Un segundo `hola` en un socket ya
  identificado → `error`.
- **`ping`** se responde con `pong` incluso antes de `hola` (auto-respuesta de Cloudflare que no despierta
  al Durable Object; requiere que el cliente envíe exactamente `{"tipo":"ping"}`, como hace `cliente.js`).
- **Conectado**: un jugador está `conectado` si tiene al menos un socket abierto (puede abrir varias pestañas).
- **Eventos y `estado`**: los eventos de una acción (`bola`, `ganador`, `aviso`, `bingoRechazado`…) se
  envían primero y después la instantánea `estado` a todos los sockets identificados. Al que acaba de
  hacer `hola` no se le repite el `estado` porque ya lo lleva en `bienvenida`.
- **Mensajes**: más de 4096 caracteres, binarios o JSON sin `tipo` → `error`.
- **Partida verificable**: el orden de las 75 bolas se calcula una vez al iniciar con `ordenDeBolas` y se
  guarda en privado (storage), junto a `semillaServidor`. Una `semilla` de `hola` que no sea hex de 16–64
  caracteres se ignora (no impide entrar). `generarCodigo` (código de sala) usa su propio muestreo por
  rechazo sobre `crypto.getRandomValues`.
- **Registro de auditoría**: `[{ numero, indice, en }]` por partida, **solo en storage** (no va en la
  instantánea; las bolas y su orden ya son públicos en `bolas`). Se vacía al iniciar y en `nuevaPartida`.
- **Salas guardadas con otra forma** (p. ej. creadas por una versión anterior del servidor y recargadas a
  mitad de partida): al despertar, el Durable Object completa los campos que falten (`juego.sanear`). Si
  la partida en curso no tiene `orden`, se recalcula con las semillas (`repararOrden`); si no se puede o
  no cuadra con las bolas ya salidas, la partida pasa a `terminada` con un `aviso` (`interrumpir`: si aún
  no se había entregado ningún premio, se devuelven las fichas de los cartones). Un error inesperado en la
  alarma hace lo mismo, así que la alarma nunca queda reintentando en bucle ni los clientes esperando.
- **Modo prueba** (`wrangler dev --var MODO_PRUEBA:1`): `intervalo` desde 150 ms, ventana de ¡Bingo! de
  300 ms y pausa tras premio de 400 ms. Se fija al crear la sala.
- **Archivos estáticos**: solo `index.html`, `jugar.html`, `sala.html`, `carton.html`, `dist/` y `fonts/`
  (ver `.assetsignore`). Workers Static Assets redirige `/x.html` → `/x` (307) conservando la consulta.
- **Pruebas de punta a punta**: `npm run test:e2e` (puerto 8787; otro con `PUERTO=8788 npm run test:e2e`).
  Si en el puerto ya corre este Worker en modo prueba lo usa; si no hay nada, arranca
  `wrangler dev --var MODO_PRUEBA:1` con estado temporal y lo cierra al terminar. Si `wrangler dev` recarga
  a mitad de prueba (porque se editó un archivo del repo), los sockets se cortan y la prueba falla: repítela.
