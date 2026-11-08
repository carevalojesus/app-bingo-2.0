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
}
```

`modalidad` ∈ `PATRONES` de `src/carton.js` (`linea`, `esquinas`, `lleno`). Entre 1 y 3 premios, sin modalidades repetidas.

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
| `POST /api/salas` | Cuerpo: configuración (parcial; se completa con los valores por defecto y se valida). Respuesta `201 { codigo, tokenAnfitrion }`. `400 { error }` si es inválida. |
| `GET /api/salas/:codigo` | `200 { codigo, nombre, estado, jugadores: n, config }` o `404 { error }` |
| `GET /api/salas/:codigo/ws` | Upgrade a WebSocket. Sin parámetros: la identidad se manda en el primer mensaje. |

- `codigo`: 6 caracteres del alfabeto `ABCDEFGHJKMNPQRSTUVWXYZ23456789`, en mayúsculas. El Worker la
  normaliza (`toUpperCase`) y la usa como nombre del Durable Object (`idFromName`).
- Tokens: 32 caracteres hex aleatorios. Nunca se envían a otros clientes.
- Todo lo demás lo sirve Workers Static Assets desde la raíz del repo (ver `.assetsignore`).

## WebSocket

Mensajes JSON `{ tipo, ...datos }`. El primer mensaje del cliente debe ser `hola`; antes de eso el
servidor ignora todo lo demás. Mensajes de más de 4 KB o mal formados → `error`.

### Cliente → servidor

| tipo | datos | quién |
|---|---|---|
| `hola` | `{ rol: 'jugador', apodo, token? }` o `{ rol: 'anfitrion', token }` | todos |
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
npm run dev:worker     # wrangler dev en http://localhost:8787 (API + archivos estáticos)
npm test               # pruebas (cartones + lógica de la sala)
```

El modo sin conexión de siempre (`index.html` sin `?sala=`) debe seguir funcionando igual, también
abriéndolo con doble clic (`file://`).
