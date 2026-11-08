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

## Desarrollo

El código fuente está en `src/` y se compila a `dist/` (que también se sube al repositorio).

```bash
npm install
npm run build   # compila dist/app.js y dist/styles.css
npm run dev     # recompila automáticamente al guardar
npm test        # pruebas de la generación y verificación de cartones
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

Tipografías: [Bungee](https://fonts.google.com/specimen/Bungee) y
[Archivo](https://fonts.google.com/specimen/Archivo) (licencia OFL, incluidas en `fonts/`).

La versión anterior (2.0) sigue disponible en `appBingo.html`.
