# Bingo Show

Un sorteo de bingo de 75 bolas con estilo de concurso de TV: bombo dorado en 3D
con las bolas girando con física, bombillas, focos, chispas y anuncios gigantes.

Hecho con **Three.js** (escena 3D), **GSAP** (animaciones) y **Tailwind CSS** (interfaz).

## Cómo usarlo

Abre `index.html` en el navegador (con doble clic funciona; no necesita internet ni servidor).

| Acción | Botón | Tecla |
|---|---|---|
| Iniciar / pausar | Botón amarillo redondo (el anillo muestra cuánto falta para la siguiente bola) | `Espacio` |
| ¡Bingo! | Botón rojo: pausa el juego y permite verificar el cartón | `B` |
| Reiniciar | Botón con flecha circular: las bolas vuelven al bombo | `R` |
| Velocidad | Botón `8s`: cambia entre 4, 6, 8 y 12 segundos por bola | |
| Sonido | Altavoz: efectos y voz que canta cada bola | |
| Pizarra (móvil) | Botón verde con cuadritos | `Esc` para cerrar |
| Cartones | Botón de cuadrícula junto al altavoz: abre la página para imprimir | |

## Cartones

En `carton.html` se imprimen cartones de 75 bolas (B 1–15, I 16–30, N 31–45 con centro libre,
G 46–60, O 61–75), de 1, 2 o 4 por hoja (A4 o Carta).

Cada cartón lleva un código como `K7QX-042`: **serie** + **número**. El cartón se genera a partir
de ese código, así que no se guarda en ningún sitio: el show lo reconstruye cuando hace falta.

1. En `carton.html`, elige o crea una serie, el rango de números y pulsa **Imprimir**.
2. Durante el juego, al cantar ¡Bingo!, elige la modalidad (línea, 4 esquinas o cartón lleno) y
   escribe el número del cartón (`42`) o su código completo (`K7QX-042`).
3. El show muestra el cartón con las bolas que ya salieron y dice si es válido o qué números faltan.

Guarda el código de serie: con él se pueden verificar los cartones en cualquier equipo.

## Jugar en línea

Además del show sin conexión, Bingo Show puede organizar partidas con los móviles de los jugadores.
Se juega con **fichas virtuales** (no hay dinero) y sin cuentas: basta un código de sala y un apodo.
Necesita el servidor (Cloudflare Workers + Durable Objects, carpeta `worker/`); con doble clic sobre
`index.html` solo funciona el modo sin conexión.

1. **Crear la sala** (anfitrión): botón **En línea** del show o `sala.html`. Se eligen los cartones a
   la venta, su precio en fichas, las fichas con las que entra cada jugador, la velocidad y los premios
   (línea, 4 esquinas y/o cartón lleno, con su porcentaje del pozo). Al crearla se abre el show en
   modo en línea (`index.html?sala=CODIGO`). La llave de anfitrión se guarda en ese navegador: desde
   otro dispositivo no se puede manejar la sala.
2. **Unirse** (jugadores): con el móvil en `jugar.html?sala=CODIGO` (el show muestra el código y el
   enlace para copiar) o en `jugar.html` escribiendo el código. Cada jugador pone su apodo, recibe sus
   fichas y elige cartones por número. Si se le cierra el navegador vuelve a entrar con el mismo enlace
   y conserva sus cartones y su saldo.
3. **Jugar**: el anfitrión pulsa **¡Empezar!**. El servidor saca las bolas, los móviles las marcan
   solos (se puede desactivar) y el jugador canta **¡Bingo!** desde su cartón. El servidor lo verifica
   y reparte el premio; los premios se juegan uno detrás de otro hasta el último. El anfitrión puede
   pausar, cambiar la velocidad, expulsar jugadores en la sala de espera y empezar una partida nueva.

**Fila de 5.** Al crear la sala se puede elegir este tipo de juego en vez del bingo clásico. Se venden
15 filas fijas de 5 números, uno de cada letra (la fila 1 es B-1, I-16, N-31, G-46 y O-61). Gana la
primera fila vendida que complete sus 5 números y se lleva todo el pozo. Nadie tiene que cantar: el
servidor lo detecta solo. Cada bola completa como mucho una fila, así que siempre hay un único ganador.

**Elige tus 5.** Cada jugador arma sus jugadas con 5 números (o al azar). Gana quien complete sus 5
primero; si varios lo hacen con la misma bola, el pozo se reparte.

**Extras de la sala** (al crearla): rondas seguidas con cuenta atrás y «repetir mis jugadas», bote
acumulado entre rondas, bola dorada (premio doble), más figuras para el clásico (L, T, X, marco y cuadro
central). En el show: QR para unirse, narrador con frases o en inglés/portugués (botón 🗣), reacciones
de los jugadores, repetición de la bola decisiva y ranking de la noche. En el móvil: aviso «¡te falta 1!»
e historial de partidas.

**Partida verificable.** Antes de empezar, el servidor publica el *compromiso* (SHA-256 de su semilla
secreta). Al empezar se combinan las semillas que generan los móviles de los jugadores, y de ambas
salen la serie de los cartones y el orden de las bolas. Al terminar se revela la semilla del servidor
y cualquiera puede pulsar **Verificar partida** (en el móvil o en el show) para recalcularlo todo: así
se comprueba que nadie, ni el servidor, eligió las bolas. El detalle está en `src/justo.js` y en
`docs/en-linea.md` (protocolo completo).

### Desarrollo y despliegue del modo en línea

```bash
npm run build                          # compila dist/ (show, cartones, jugador y sala)
npm run dev:worker -- --port 8790      # wrangler dev: API + archivos estáticos en http://localhost:8790
npm run dev:worker -- --port 8790 --var MODO_PRUEBA:1   # bolas desde 150 ms y ventanas cortas (pruebas)
PUERTO=8790 npm run test:e2e           # prueba de punta a punta contra el servidor (ver test/e2e-sala.mjs)
```

`wrangler dev` usa el puerto 8787 por defecto; si ya lo ocupa otro proyecto, pásale otro con `--port`.
Se recarga al guardar cualquier archivo del repositorio (y corta los WebSockets abiertos). Las salas
de desarrollo se guardan en `.wrangler/state`; bórrala si quieres empezar de cero.

Para publicar en Cloudflare (la primera vez, `npx wrangler login`):

```bash
npm run deploy   # compila y ejecuta wrangler deploy
```

Solo se publican `index.html`, `jugar.html`, `sala.html`, `carton.html`, `dist/` y `fonts/`
(lo demás está excluido en `.assetsignore`).

## Desarrollo

El código fuente está en `src/` y se compila a `dist/` (que también se sube al repositorio).

```bash
npm install
npm run build   # compila dist/app.js y dist/styles.css
npm run dev     # recompila automáticamente al guardar
npm test        # pruebas de cartones, partida verificable y reglas de la sala en línea
```

| Archivo | Contenido |
|---|---|
| `index.html` | Estructura de la interfaz |
| `src/main.js` | Lógica del juego, pizarra, historial, modales y atajos |
| `src/escenario.js` | Escena 3D: bombo, física de las bolas, luces, focos, chispas y cámara |
| `src/texturas.js` | Texturas de las bolas (el número pintado sobre la esfera) |
| `src/anuncio.js` | Anuncio gigante de cada bola, celebración de ¡Bingo!, sellos y confeti |
| `carton.html` + `src/cartones.js` | Página para generar e imprimir cartones |
| `src/carton.js` | Cartones con semilla y verificación de modalidades (sin dependencias) |
| `src/carton-html.js` | Dibujo de un cartón en HTML (impresión y modal de ¡Bingo!) |
| `src/efectos.js` | Sonidos sintetizados (redoble, silbido, golpe, campana, fanfarria) y voz |
| `src/styles.css` | Tipografías y componentes de Tailwind |
| `sala.html` + `src/sala.js` | Crear una sala en línea (anfitrión) |
| `src/en-linea/anfitrion.js` | Show en modo en línea: sala de espera, premios, ganadores y verificación |
| `jugar.html` + `src/jugador.js` | Vista del jugador en el móvil (`src/jugador/utiles.js`: lectura del estado) |
| `src/en-linea/cliente.js` | Conexión WebSocket con la sala (reconexión automática) |
| `src/justo.js` | Partida verificable: semillas, compromiso, serie y orden de las bolas |
| `src/azar.js` | Azar criptográfico para el sorteo sin conexión |
| `worker/` | Servidor: rutas HTTP (`index.js`), Durable Object de la sala (`sala.js`) y reglas puras (`juego.js`) |
| `wrangler.toml`, `.assetsignore` | Configuración de Cloudflare Workers y archivos que se publican |
| `docs/en-linea.md` | Especificación del modo en línea (reglas, HTTP y mensajes WebSocket) |
| `test/` | Pruebas (`npm test`) y prueba de punta a punta del servidor (`npm run test:e2e`) |

Tipografías: [Bungee](https://fonts.google.com/specimen/Bungee) y
[Archivo](https://fonts.google.com/specimen/Archivo) (licencia OFL, incluidas en `fonts/`).

La versión anterior (2.0) sigue disponible en `appBingo.html`.
