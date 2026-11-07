# Bingo 3D

Una app para cantar el bingo de 75 bolas, con bola 3D, animaciones y tablero en vivo.

Hecha con **Three.js** (3D), **GSAP** (animaciones) y **Tailwind CSS** (estilos).

## Cómo usarla

Abre `index.html` en el navegador (con doble clic funciona; no necesita internet ni servidor).

- **Iniciar / Pausar**: botón principal o tecla `Espacio`.
- **¡Bingo!**: botón rojo o tecla `B`. Pausa el juego y permite verificar los números del cartón.
- **Reiniciar**: botón circular o tecla `R`.
- **Velocidad**: una bola cada 4, 6, 8 o 12 segundos.
- **Sonido**: botón del altavoz (efectos y voz que canta cada bola).

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
| `src/main.js` | Lógica del juego, tablero, historial, modales y atajos |
| `src/bola3d.js` | Bola 3D (Three.js) y su animación de caída |
| `src/fondo3d.js` | Fondo 3D con bolas flotando |
| `src/efectos.js` | Sonidos, voz y confeti |
| `src/styles.css` | Fuentes y componentes de Tailwind |

La versión anterior (2.0) sigue disponible en `appBingo.html`.
