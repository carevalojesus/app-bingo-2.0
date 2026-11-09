package pe.carevalojesus.bingoshow.ui

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.interaction.collectIsPressedAsState
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxScope
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ColumnScope
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.Typography
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.drawBehind
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Shape
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.Font
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontVariation
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.TextUnit
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import pe.carevalojesus.bingoshow.R
import pe.carevalojesus.bingoshow.logica.columnaDe
import pe.carevalojesus.bingoshow.logica.letraDe

// ---------- Colores (los mismos de tailwind.config.cjs) ----------
object Colores {
    val crema = Color(0xFFFFF3DF)
    val papel = Color(0xFFF3DFB8)
    val tinta = Color(0xFF14112B)
    val escenario = Color(0xFF1A0D36)
    val tomate = Color(0xFFFF5A36)
    val girasol = Color(0xFFFFC43D)
    val menta = Color(0xFF19C3A0)
    val cobalto = Color(0xFF3D6BFF)
    val fucsia = Color(0xFFFF4FA3)
    val morado = Color(0xFF3B2A6E)
    val columnas = listOf(tomate, girasol, menta, cobalto, fucsia)
}

fun colorDeBola(n: Int): Color = Colores.columnas[columnaDe(n)]

// ---------- Fuentes ----------
val Bungee = FontFamily(Font(R.font.bungee))

@OptIn(androidx.compose.ui.text.ExperimentalTextApi::class)
private fun archivo(peso: Int) = Font(
    R.font.archivo,
    weight = FontWeight(peso),
    variationSettings = FontVariation.Settings(FontVariation.weight(peso)),
)
val Archivo = FontFamily(archivo(500), archivo(700), archivo(800), archivo(900))

fun display(tamano: TextUnit, color: Color = Colores.tinta) =
    TextStyle(fontFamily = Bungee, fontSize = tamano, color = color, lineHeight = tamano * 1.05f)

fun ui(tamano: TextUnit = 15.sp, peso: FontWeight = FontWeight.Bold, color: Color = Colores.tinta) =
    TextStyle(fontFamily = Archivo, fontSize = tamano, fontWeight = peso, color = color, lineHeight = tamano * 1.3f)

@Composable
fun TemaBingo(contenido: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = darkColorScheme(
            background = Colores.escenario, surface = Colores.crema, primary = Colores.girasol,
            onPrimary = Colores.tinta, onSurface = Colores.tinta, onBackground = Colores.crema,
        ),
        typography = Typography(bodyLarge = ui(), bodyMedium = ui(14.sp)),
        content = contenido,
    )
}

// ---------- Sombra dura (shadow-duro: 5px 5px 0 tinta) ----------
fun Modifier.sombraDura(desplazamiento: Dp = 5.dp, radio: Dp = 16.dp, color: Color = Colores.tinta) = drawBehind {
    val d = desplazamiento.toPx()
    drawRoundRect(
        color = color,
        topLeft = Offset(d, d),
        size = size,
        cornerRadius = androidx.compose.ui.geometry.CornerRadius(radio.toPx()),
    )
}

// ---------- Tarjeta crema con borde y sombra (.carta) ----------
@Composable
fun Carta(
    modifier: Modifier = Modifier,
    fondo: Color = Colores.crema,
    relleno: Dp = 16.dp,
    contenido: @Composable ColumnScope.() -> Unit,
) {
    val forma = RoundedCornerShape(16.dp)
    Column(
        modifier
            .sombraDura(5.dp, 16.dp)
            .clip(forma)
            .background(fondo)
            .border(3.dp, Colores.tinta, forma)
            .padding(relleno),
        content = contenido,
    )
}

// ---------- Botón "físico" que se hunde al pulsarlo (.boton) ----------
@Composable
fun Boton(
    texto: String,
    alPulsar: () -> Unit,
    modifier: Modifier = Modifier,
    fondo: Color = Colores.crema,
    colorTexto: Color = Colores.tinta,
    alto: Dp = 48.dp,
    habilitado: Boolean = true,
    estilo: TextStyle = ui(14.sp, FontWeight.Black, colorTexto).copy(letterSpacing = 0.6.sp),
    mayusculas: Boolean = true,
) {
    val interaccion = remember { MutableInteractionSource() }
    val pulsado by interaccion.collectIsPressedAsState()
    val forma = RoundedCornerShape(12.dp)
    val hundido = if (pulsado && habilitado) 4.dp else 0.dp
    Box(
        modifier
            .height(alto)
            .alpha(if (habilitado) 1f else 0.4f)
            .then(if (hundido == 0.dp) Modifier.sombraDura(5.dp, 12.dp) else Modifier)
            .offset(hundido, hundido)
            .clip(forma)
            .background(fondo)
            .border(3.dp, Colores.tinta, forma)
            .clickable(interactionSource = interaccion, indication = null, enabled = habilitado, role = Role.Button, onClick = alPulsar)
            .padding(horizontal = 14.dp),
        contentAlignment = Alignment.Center,
    ) {
        Text(if (mayusculas) texto.uppercase() else texto, style = estilo, textAlign = TextAlign.Center, maxLines = 2)
    }
}

// ---------- Etiqueta pequeña en mayúsculas (.etiqueta) ----------
@Composable
fun Etiqueta(texto: String, modifier: Modifier = Modifier, color: Color = Colores.tinta.copy(alpha = 0.6f)) {
    Text(texto.uppercase(), modifier, style = ui(11.sp, FontWeight.Black, color).copy(letterSpacing = 1.6.sp))
}

// ---------- Campo de texto (.campo) ----------
@Composable
fun Campo(
    valor: String,
    alCambiar: (String) -> Unit,
    modifier: Modifier = Modifier,
    marcador: String = "",
    estilo: TextStyle = ui(17.sp, FontWeight.Bold),
    teclado: KeyboardOptions = KeyboardOptions.Default,
    alineacion: TextAlign = TextAlign.Start,
) {
    val forma = RoundedCornerShape(12.dp)
    Box(
        modifier
            .height(52.dp)
            .clip(forma)
            .background(Color.White)
            .border(3.dp, Colores.tinta, forma)
            .padding(horizontal = 14.dp),
        contentAlignment = Alignment.CenterStart,
    ) {
        if (valor.isEmpty()) {
            Text(marcador, Modifier.fillMaxWidth(), style = estilo.copy(color = Colores.tinta.copy(alpha = 0.35f), textAlign = alineacion))
        }
        BasicTextField(
            value = valor,
            onValueChange = alCambiar,
            singleLine = true,
            textStyle = estilo.copy(textAlign = alineacion),
            keyboardOptions = teclado,
            modifier = Modifier.fillMaxWidth(),
        )
    }
}

// ---------- Bola de bingo en 2D (.ficha) ----------
@Composable
fun Ficha(numero: Int?, tamano: Dp = 44.dp, modifier: Modifier = Modifier) {
    val color = if (numero == null) Colores.morado else colorDeBola(numero)
    Box(
        modifier
            .size(tamano)
            .clip(CircleShape)
            .background(color)
            .drawBehind {
                // Brillo arriba a la izquierda, como el radial-gradient de la web
                drawCircle(
                    Brush.radialGradient(
                        listOf(Color.White.copy(alpha = 0.9f), Color.Transparent),
                        center = Offset(size.width * 0.3f, size.height * 0.26f),
                        radius = size.minDimension * 0.16f,
                    ),
                )
            }
            .border(BorderStroke(if (tamano > 60.dp) 4.dp else 3.dp, Colores.tinta), CircleShape),
        contentAlignment = Alignment.Center,
    ) {
        Box(
            Modifier
                .size(tamano * 0.66f)
                .clip(CircleShape)
                .background(Color.White)
                .border(2.dp, Colores.tinta, CircleShape),
            contentAlignment = Alignment.Center,
        ) {
            if (numero == null) {
                Text("?", style = display((tamano.value * 0.32f).sp))
            } else {
                Column(horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.Center) {
                    Text(letraDe(numero), style = display((tamano.value * 0.13f).sp).copy(lineHeight = (tamano.value * 0.13f).sp))
                    Text("$numero", style = display((tamano.value * 0.27f).sp).copy(lineHeight = (tamano.value * 0.27f).sp))
                }
            }
        }
    }
}

// ---------- Pastilla redondeada (estado de conexión, avisos) ----------
@Composable
fun Pastilla(texto: String, fondo: Color, colorTexto: Color = Colores.tinta, modifier: Modifier = Modifier) {
    Box(
        modifier
            .clip(RoundedCornerShape(50))
            .background(fondo)
            .border(2.5.dp, Colores.tinta, RoundedCornerShape(50))
            .padding(horizontal = 10.dp, vertical = 4.dp),
    ) {
        Text(texto.uppercase(), style = ui(11.sp, FontWeight.Black, colorTexto).copy(letterSpacing = 1.sp))
    }
}

/** Recuadro con borde (sin sombra), como los dl/li de la web. */
@Composable
fun Recuadro(
    modifier: Modifier = Modifier,
    fondo: Color = Color.White,
    forma: Shape = RoundedCornerShape(12.dp),
    discontinuo: Boolean = false,
    contenido: @Composable BoxScope.() -> Unit,
) {
    Box(
        modifier
            .clip(forma)
            .background(fondo)
            .border(if (discontinuo) 2.dp else 2.5.dp, Colores.tinta.copy(alpha = if (discontinuo) 0.5f else 1f), forma)
            .padding(horizontal = 12.dp, vertical = 8.dp),
        content = contenido,
    )
}

/** Logo «B S» de la cabecera. */
@Composable
fun LogoBS() {
    Row(horizontalArrangement = Arrangement.spacedBy(2.dp)) {
        for ((letra, color, giro) in listOf(Triple("B", Colores.tomate, -6f), Triple("S", Colores.girasol, 5f))) {
            Box(
                Modifier
                    .size(28.dp)
                    .graphicsGiro(giro)
                    .clip(RoundedCornerShape(6.dp))
                    .background(color)
                    .border(2.5.dp, Colores.tinta, RoundedCornerShape(6.dp)),
                contentAlignment = Alignment.Center,
            ) { Text(letra, style = display(14.sp)) }
        }
    }
}

fun Modifier.graphicsGiro(grados: Float) = this.graphicsLayer { rotationZ = grados }

@Composable
fun Fondo(contenido: @Composable BoxScope.() -> Unit) {
    Box(Modifier.fillMaxSize().background(Colores.escenario), content = contenido)
}
