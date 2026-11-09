package pe.carevalojesus.bingoshow.logica

import java.nio.ByteBuffer
import java.security.MessageDigest

// Port de src/carton.js: el mismo código (serie + número) da siempre el mismo cartón que en la web y
// el servidor. SHA-256 en modo contador: bloque_k = SHA-256("bingoshow:carton:v2:SERIE:N" ‖ k (uint32 BE)),
// 8 palabras de 32 bits por bloque y enteros con muestreo por rechazo.

val LETRAS = listOf("B", "I", "N", "G", "O")

/** columnas[c][f]: columna c (B..O), fila f. El centro (N, fila 2) es libre: null. */
data class Carton(val serie: String, val numero: Int, val columnas: List<List<Int?>>) {
    val codigo: String get() = "$serie-${numero.toString().padStart(3, '0')}"
    fun valor(c: Int, f: Int): Int? = columnas[c][f]
}

/** Palabras de 32 bits (big endian) de un resumen SHA-256 o HMAC. */
internal fun palabras(bytes: ByteArray): LongArray {
    val buffer = ByteBuffer.wrap(bytes)
    return LongArray(bytes.size / 4) { buffer.int.toLong() and 0xffffffffL }
}

/** Entero uniforme en [0, n) a partir de un flujo de palabras de 32 bits (muestreo por rechazo). */
internal class Generador(private val siguiente: () -> Long) {
    fun enteroHasta(n: Int): Int {
        val rango = 1L shl 32
        val techo = rango - (rango % n)
        while (true) {
            val x = siguiente()
            if (x < techo) return (x % n).toInt()
        }
    }
}

private fun generadorDeterminista(etiqueta: String): Generador {
    val prefijo = etiqueta.toByteArray(Charsets.UTF_8)
    var k = 0L
    var cola = ArrayDeque<Long>()
    return Generador {
        if (cola.isEmpty()) {
            val entrada = ByteBuffer.allocate(prefijo.size + 4).put(prefijo).putInt(k.toInt()).array()
            k++
            cola = ArrayDeque(palabras(MessageDigest.getInstance("SHA-256").digest(entrada)).toList())
        }
        cola.removeFirst()
    }
}

fun generarCarton(serie: String, numero: Int): Carton {
    val gen = generadorDeterminista("bingoshow:carton:v2:$serie:$numero")
    val columnas = (0 until 5).map { c ->
        val bolsa = MutableList(15) { c * 15 + it + 1 }
        val cantidad = if (c == 2) 4 else 5
        for (i in 0 until cantidad) {
            val j = i + gen.enteroHasta(bolsa.size - i)
            val t = bolsa[i]; bolsa[i] = bolsa[j]; bolsa[j] = t
        }
        val columna: MutableList<Int?> = bolsa.take(cantidad).sorted().toMutableList()
        if (c == 2) columna.add(2, null)
        columna.toList()
    }
    return Carton(serie, numero, columnas)
}

// ---------- Modalidades (figuras) ----------
typealias Casilla = Pair<Int, Int> // (columna, fila)

data class Patron(val nombre: String, val detalle: String, val figuras: List<List<Casilla>>)

private val indices = 0 until 5
private val filas = indices.map { f -> indices.map { c -> c to f } }
private val columnasFig = indices.map { c -> indices.map { f -> c to f } }
private val diagonales = listOf(indices.map { it to it }, indices.map { it to 4 - it })
private fun unir(vararg listas: List<Casilla>): List<Casilla> = listas.toList().flatten().distinct()
private val interior = (1..3).flatMap { c -> (1..3).map { f -> c to f } }

val PATRONES: Map<String, Patron> = linkedMapOf(
    "linea" to Patron("Línea", "fila, columna o diagonal", filas + columnasFig + diagonales),
    "esquinas" to Patron("4 esquinas", "las cuatro esquinas", listOf(listOf(0 to 0, 4 to 0, 0 to 4, 4 to 4))),
    "lleno" to Patron("Cartón lleno", "los 24 números", listOf(filas.flatten())),
    "letraL" to Patron("Letra L", "columna B y fila de abajo", listOf(unir(columnasFig[0], filas[4]))),
    "letraT" to Patron("Letra T", "fila de arriba y columna N", listOf(unir(filas[0], columnasFig[2]))),
    "letraX" to Patron("Letra X", "las dos diagonales", listOf(unir(*diagonales.toTypedArray()))),
    "marco" to Patron("Marco", "todo el borde del cartón", listOf(unir(filas[0], filas[4], columnasFig[0], columnasFig[4]))),
    "cuadro" to Patron("Cuadro central", "los 8 números alrededor del centro", listOf(interior)),
)

data class Verificacion(
    val gana: Boolean,
    val figura: List<Casilla>,
    val faltan: List<Int>,
    /** marcadas[c][f] */
    val marcadas: List<List<Boolean>>,
)

/** Comprueba el cartón contra las bolas marcadas. Si no gana, devuelve la figura a la que le faltan menos. */
fun verificar(carton: Carton, salidas: Set<Int>, patron: String): Verificacion {
    val figuras = (PATRONES[patron] ?: PATRONES.getValue("linea")).figuras
    val ganadoras = mutableListOf<List<Casilla>>()
    var cercana: Pair<List<Casilla>, List<Int>>? = null
    for (figura in figuras) {
        val faltan = figura.mapNotNull { (c, f) -> carton.valor(c, f) }.filter { it !in salidas }
        if (faltan.isEmpty()) ganadoras += figura
        else if (cercana == null || faltan.size < cercana.second.size) cercana = figura to faltan
    }
    val marcadas = carton.columnas.map { col -> col.map { it == null || it in salidas } }
    return if (ganadoras.isNotEmpty()) Verificacion(true, ganadoras.flatten(), emptyList(), marcadas)
    else Verificacion(false, cercana!!.first, cercana.second.sorted(), marcadas)
}

// ---------- Columnas y colores ----------
fun columnaDe(n: Int): Int = ((n - 1) / 15).coerceIn(0, 4)
fun letraDe(n: Int): String = LETRAS[columnaDe(n)]
fun nombreBola(n: Int): String = "${letraDe(n)}-$n"

// ---------- Fila de 5 y Elige tus 5 (src/filas.js) ----------
const val TOTAL_FILAS = 15
const val MODALIDAD_FILA = "fila5"
const val MODALIDAD_ELIGE = "elige5"

fun numerosDeFila(n: Int): List<Int> = (0 until 5).map { n + it * 15 }

fun nombreModalidad(m: String?): String = when (m) {
    MODALIDAD_FILA -> "Fila de 5"
    MODALIDAD_ELIGE -> "Elige tus 5"
    else -> PATRONES[m]?.nombre ?: (m ?: "")
}

fun detalleModalidad(m: String?): String = when (m) {
    MODALIDAD_FILA -> "los 5 números de tu fila"
    MODALIDAD_ELIGE -> "los 5 números que elegiste"
    else -> PATRONES[m]?.detalle ?: ""
}
