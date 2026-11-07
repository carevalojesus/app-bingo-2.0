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

## Desarrollo

El código fuente está en `src/` y se compila a `dist/` (que también se sube al repositorio).

```bash
npm install
npm run build   # compila dist/app.js y dist/styles.css
npm run dev     # recompila automáticamente al guardar
```

| Archivo | Contenido |
|---|---|
| `index.html` | Estructura de la interfaz |
| `src/main.js` | Lógica del juego, pizarra, historial, modales y atajos |
| `src/escenario.js` | Escena 3D: bombo, física de las bolas, luces, focos, chispas y cámara |
| `src/texturas.js` | Texturas de las bolas (el número pintado sobre la esfera) |
| `src/anuncio.js` | Anuncio gigante de cada bola, celebración de ¡Bingo!, sellos y confeti |
| `src/efectos.js` | Sonidos sintetizados (redoble, silbido, golpe, campana, fanfarria) y voz |
| `src/styles.css` | Tipografías y componentes de Tailwind |

Tipografías: [Bungee](https://fonts.google.com/specimen/Bungee) y
[Archivo](https://fonts.google.com/specimen/Archivo) (licencia OFL, incluidas en `fonts/`).

La versión anterior (2.0) sigue disponible en `appBingo.html`.
