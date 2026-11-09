package pe.carevalojesus.bingoshow.control

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardCapitalization
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.buildJsonArray
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put
import pe.carevalojesus.bingoshow.logica.PATRONES
import pe.carevalojesus.bingoshow.logica.nombreModalidad
import pe.carevalojesus.bingoshow.ui.Boton
import pe.carevalojesus.bingoshow.ui.Campo
import pe.carevalojesus.bingoshow.ui.Carta
import pe.carevalojesus.bingoshow.ui.Colores
import pe.carevalojesus.bingoshow.ui.Etiqueta
import pe.carevalojesus.bingoshow.ui.display
import pe.carevalojesus.bingoshow.ui.ui

private val TIPOS = listOf(
    Triple("carton", "Cartones", "Bingo clásico 5×5 con premios por figura"),
    Triple("fila", "Fila de 5", "15 filas de 5 números; gana la primera completa"),
    Triple("elige", "Elige tus 5", "Cada jugador arma sus 5 números"),
)
private val INTERVALOS = listOf(4000 to "4 s", 6000 to "6 s", 8000 to "8 s", 12000 to "12 s")
private val MARCADOS = listOf(Triple("libre", "Libre", "cada uno elige"), Triple("auto", "Automático", "se marca solo"), Triple("manual", "A mano", "sin marcar no cuenta"))

/** Crear una sala desde el móvil (lo mismo que sala.html, con un premio; con código Pro, el show la mejora). */
@Composable
fun FormularioCrear(vm: ControlViewModel, alCancelar: () -> Unit) {
    var tipo by rememberSaveable { mutableStateOf("carton") }
    var nombre by rememberSaveable { mutableStateOf("") }
    var cartones by rememberSaveable { mutableStateOf("60") }
    var precio by rememberSaveable { mutableStateOf("10") }
    var maximo by rememberSaveable { mutableStateOf("4") }
    var iniciales by rememberSaveable { mutableStateOf("100") }
    var intervalo by rememberSaveable { mutableStateOf(8000) }
    var marcado by rememberSaveable { mutableStateOf("libre") }
    var modalidad by rememberSaveable { mutableStateOf("lleno") }
    var admision by rememberSaveable { mutableStateOf(false) }
    var rondas by rememberSaveable { mutableStateOf(false) }
    var dorada by rememberSaveable { mutableStateOf(false) }
    var codigoPro by rememberSaveable { mutableStateOf("") }
    var error by rememberSaveable { mutableStateOf<String?>(null) }

    Carta(Modifier.fillMaxWidth(), relleno = 20.dp) {
        Text("Crear una sala", style = display(24.sp))
        Text("Los jugadores entran con el código o el QR. El show con el bombo lo abres luego en la tele.", Modifier.padding(top = 4.dp), style = ui(13.sp, FontWeight.Bold, Colores.tinta.copy(alpha = 0.7f)))

        Etiqueta("Nombre del evento", Modifier.padding(top = 16.dp))
        Campo(nombre, { nombre = it.take(40) }, Modifier.fillMaxWidth().padding(top = 6.dp), "Ej: Kermés del colegio", teclado = KeyboardOptions(capitalization = KeyboardCapitalization.Sentences))

        Etiqueta("Tipo de juego", Modifier.padding(top = 14.dp))
        Column(Modifier.padding(top = 6.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
            for ((clave, titulo, detalle) in TIPOS) Opcion(tipo == clave, titulo, detalle) { tipo = clave }
        }

        Row(Modifier.fillMaxWidth().padding(top = 14.dp), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            if (tipo != "fila") Numero(if (tipo == "elige") "Jugadas" else "Cartones", cartones, { cartones = it }, Modifier.weight(1f))
            Numero("Precio", precio, { precio = it }, Modifier.weight(1f))
            Numero("Máximo", maximo, { maximo = it }, Modifier.weight(1f))
        }
        Numero("Fichas al entrar", iniciales, { iniciales = it }, Modifier.fillMaxWidth().padding(top = 10.dp))

        if (tipo == "carton") {
            Etiqueta("Premio", Modifier.padding(top = 14.dp))
            Column(Modifier.padding(top = 6.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                for (fila in PATRONES.keys.chunked(2)) Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                    for (m in fila) Chip(modalidad == m, nombreModalidad(m), Modifier.weight(1f)) { modalidad = m }
                    if (fila.size == 1) Box(Modifier.weight(1f))
                }
            }
            Etiqueta("Marcado", Modifier.padding(top = 14.dp))
            Row(Modifier.padding(top = 6.dp), horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                for ((clave, titulo, _) in MARCADOS) Chip(marcado == clave, titulo, Modifier.weight(1f)) { marcado = clave }
            }
            Text(MARCADOS.first { it.first == marcado }.third, Modifier.padding(top = 4.dp), style = ui(12.sp, FontWeight.Bold, Colores.tinta.copy(alpha = 0.6f)))
        }

        Etiqueta("Velocidad", Modifier.padding(top = 14.dp))
        Row(Modifier.padding(top = 6.dp), horizontalArrangement = Arrangement.spacedBy(6.dp)) {
            for ((ms, texto) in INTERVALOS) Chip(intervalo == ms, texto, Modifier.weight(1f)) { intervalo = ms }
        }

        Etiqueta("Extras", Modifier.padding(top = 14.dp))
        Column(Modifier.padding(top = 6.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
            Opcion(admision, "Tú admites y das las fichas", "Cada jugador espera a que lo admitas y le asignes fichas") {
                admision = !admision
                if (admision && iniciales == "100") iniciales = "0"
                if (!admision && iniciales == "0") iniciales = "100"
            }
            Opcion(rondas, "Rondas seguidas", "Al terminar, empieza otra sola") { rondas = !rondas }
            Opcion(dorada, "Bola dorada", "Si sale, el premio se duplica") { dorada = !dorada }
        }

        Etiqueta("Código Pro (opcional)", Modifier.padding(top = 14.dp))
        Campo(codigoPro, { codigoPro = it.uppercase().take(30) }, Modifier.fillMaxWidth().padding(top = 6.dp), "PRO-XXXXXX-XXXXXX-XXXX", teclado = KeyboardOptions(capitalization = KeyboardCapitalization.Characters))

        (error ?: vm.errorCrear)?.let { Text(it, Modifier.padding(top = 10.dp), style = ui(14.sp, FontWeight.Black, Colores.tomate)) }
        Boton(
            if (vm.creando) "Creando…" else "Crear sala", {
                val r = armarConfig(tipo, nombre, cartones, precio, maximo, iniciales, intervalo, marcado, modalidad, admision, rondas, dorada, codigoPro)
                error = r.second
                r.first?.let(vm::crear)
            },
            Modifier.fillMaxWidth().padding(top = 16.dp), fondo = Colores.girasol, alto = 54.dp, habilitado = !vm.creando,
        )
        Text(
            "Cancelar", Modifier.fillMaxWidth().clickable(onClick = alCancelar).padding(top = 14.dp),
            style = ui(13.sp, FontWeight.Black, Colores.tinta.copy(alpha = 0.6f)), textAlign = TextAlign.Center,
        )
    }
}

private fun armarConfig(
    tipo: String, nombre: String, cartones: String, precio: String, maximo: String, iniciales: String, intervalo: Int,
    marcado: String, modalidad: String, admision: Boolean, rondas: Boolean, dorada: Boolean, codigoPro: String,
): Pair<JsonObject?, String?> {
    fun entero(t: String, min: Int, max: Int, nombreCampo: String): Int {
        val v = t.trim().toIntOrNull()
        if (v == null || v < min || v > max) throw IllegalArgumentException("$nombreCampo: un número entre $min y $max.")
        return v
    }
    return try {
        val nCartones = if (tipo == "fila") 15 else entero(cartones, 10, 300, if (tipo == "elige") "Jugadas" else "Cartones")
        val nPrecio = entero(precio, 0, 1000, "Precio")
        val nMax = entero(maximo, 1, 12, "Máximo por jugador")
        val nIniciales = entero(iniciales, 0, 100000, "Fichas al entrar")
        buildJsonObject {
            put("tipo", tipo)
            put("nombre", nombre.trim())
            if (tipo != "fila") put("cartones", nCartones)
            put("precioCarton", nPrecio)
            put("maxCartonesPorJugador", nMax)
            put("fichasIniciales", nIniciales)
            put("pozoExtra", 0)
            put("intervalo", intervalo)
            put("admision", admision)
            put("rondasSeguidas", rondas)
            put("bolaDorada", dorada)
            put("botePorcentaje", 0)
            if (tipo == "carton") {
                put("marcado", marcado)
                put("premios", buildJsonArray { add(buildJsonObject { put("modalidad", modalidad); put("porcentaje", 100) }) })
            }
            if (codigoPro.isNotBlank()) put("codigoPro", codigoPro.trim())
        } to null
    } catch (e: IllegalArgumentException) {
        null to e.message
    }
}

@Composable
private fun Numero(etiqueta: String, valor: String, alCambiar: (String) -> Unit, modifier: Modifier) {
    Column(modifier) {
        Etiqueta(etiqueta)
        Campo(valor, { alCambiar(it.filter(Char::isDigit).take(6)) }, Modifier.fillMaxWidth().padding(top = 6.dp), teclado = KeyboardOptions(keyboardType = KeyboardType.Number))
    }
}

@Composable
private fun Chip(activo: Boolean, texto: String, modifier: Modifier, alPulsar: () -> Unit) {
    Box(
        modifier.height(42.dp).clip(RoundedCornerShape(10.dp)).background(if (activo) Colores.tinta else Color.White)
            .border(2.5.dp, Colores.tinta, RoundedCornerShape(10.dp)).clickable(onClick = alPulsar),
        contentAlignment = Alignment.Center,
    ) { Text(texto, style = ui(12.sp, FontWeight.Black, if (activo) Colores.crema else Colores.tinta), textAlign = TextAlign.Center, maxLines = 1) }
}

@Composable
private fun Opcion(activo: Boolean, titulo: String, detalle: String, alPulsar: () -> Unit) {
    Row(
        Modifier.fillMaxWidth().clip(RoundedCornerShape(12.dp)).background(if (activo) Colores.girasol else Color.White)
            .border(2.5.dp, Colores.tinta, RoundedCornerShape(12.dp)).clickable(onClick = alPulsar).padding(horizontal = 12.dp, vertical = 10.dp),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Box(
            Modifier.size(22.dp).clip(RoundedCornerShape(6.dp)).background(if (activo) Colores.tinta else Color.White).border(2.5.dp, Colores.tinta, RoundedCornerShape(6.dp)),
            contentAlignment = Alignment.Center,
        ) { if (activo) Text("✓", style = ui(13.sp, FontWeight.Black, Colores.crema)) }
        Column(Modifier.padding(start = 10.dp)) {
            Text(titulo, style = ui(14.sp, FontWeight.Black))
            Text(detalle, style = ui(12.sp, FontWeight.Bold, Colores.tinta.copy(alpha = 0.65f)))
        }
    }
}

