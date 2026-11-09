package pe.carevalojesus.bingoshow.logica

import java.security.MessageDigest
import javax.crypto.Mac
import javax.crypto.spec.SecretKeySpec

// Port de src/justo.js: partida verificable. El servidor publica el compromiso (SHA-256 de su
// semilla) antes de empezar; al terminar revela la semilla y cualquiera comprueba que la serie de
// los cartones y el orden de las bolas salen de ella y de las semillas de los jugadores.

private const val ALFABETO_SERIE = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"
private const val LARGO_SERIE = 4

fun desdeHex(hex: String): ByteArray {
    require(hex.length % 2 == 0 && hex.all { it in "0123456789abcdefABCDEF" }) { "hex no válido" }
    return ByteArray(hex.length / 2) { hex.substring(it * 2, it * 2 + 2).toInt(16).toByte() }
}

fun aHex(bytes: ByteArray): String = bytes.joinToString("") { "%02x".format(it.toInt() and 0xff) }

fun sha256Hex(bytes: ByteArray): String = aHex(MessageDigest.getInstance("SHA-256").digest(bytes))

fun compromisoDe(semillaServidor: String): String = sha256Hex(desdeHex(semillaServidor))

data class SemillaCliente(val apodo: String, val semilla: String)

/** Combina las semillas de los jugadores sin depender del orden de llegada. */
fun combinarSemillas(semillas: List<SemillaCliente>): String {
    val lineas = semillas.map { "${it.apodo}:${it.semilla}" }.sorted()
    return sha256Hex(lineas.joinToString("\n").toByteArray(Charsets.UTF_8))
}

/** Flujo de enteros uniformes a partir de HMAC(semillaServidor, "etiqueta:bloque"). */
private fun flujo(semillaServidor: String, etiqueta: String): Generador {
    val mac = Mac.getInstance("HmacSHA256").apply { init(SecretKeySpec(desdeHex(semillaServidor), "HmacSHA256")) }
    var bloque = 0
    val cola = ArrayDeque<Long>()
    return Generador {
        if (cola.isEmpty()) cola.addAll(palabras(mac.doFinal("$etiqueta:${bloque++}".toByteArray(Charsets.UTF_8))).toList())
        cola.removeFirst()
    }
}

fun serieDePartida(semillaServidor: String, semillaClientes: String): String {
    val gen = flujo(semillaServidor, "bingoshow:serie:v1:$semillaClientes")
    return (0 until LARGO_SERIE).map { ALFABETO_SERIE[gen.enteroHasta(ALFABETO_SERIE.length)] }.joinToString("")
}

fun ordenDeBolas(semillaServidor: String, semillaClientes: String, cuantas: Int = 75): List<Int> {
    val restantes = (1..75).toMutableList()
    return (0 until minOf(cuantas, 75)).map { k ->
        val gen = flujo(semillaServidor, "bingoshow:bola:v1:$semillaClientes:$k")
        restantes.removeAt(gen.enteroHasta(restantes.size))
    }
}

fun bolaDoradaDe(semillaServidor: String, semillaClientes: String): Int =
    flujo(semillaServidor, "bingoshow:dorada:v1:$semillaClientes").enteroHasta(75) + 1

data class ResultadoVerificacion(val valida: Boolean, val errores: List<String>)

fun verificarPartida(
    compromiso: String?,
    semillaServidor: String?,
    semillasClientes: List<SemillaCliente>,
    semillaClientes: String?,
    serie: String?,
    bolas: List<Int>,
    dorada: Int? = null,
): ResultadoVerificacion {
    val errores = mutableListOf<String>()
    try {
        if (semillaServidor == null || compromiso == null) return ResultadoVerificacion(false, listOf("El servidor aún no ha revelado su semilla."))
        if (compromisoDe(semillaServidor) != compromiso) errores += "La semilla revelada no coincide con el compromiso publicado al principio."
        val combinada = combinarSemillas(semillasClientes)
        if (combinada != semillaClientes) errores += "Las semillas de los jugadores no dan la semilla combinada publicada."
        if (serieDePartida(semillaServidor, combinada) != serie) errores += "La serie de los cartones no sale de las semillas."
        val orden = ordenDeBolas(semillaServidor, combinada)
        val distinta = bolas.indices.firstOrNull { bolas[it] != orden[it] }
        if (distinta != null) errores += "La bola nº ${distinta + 1} (${bolas[distinta]}) no es la que tocaba (${orden[distinta]})."
        if (dorada != null && bolaDoradaDe(semillaServidor, combinada) != dorada) errores += "La bola dorada no sale de las semillas."
    } catch (e: Exception) {
        errores += "Datos no válidos: ${e.message}"
    }
    return ResultadoVerificacion(errores.isEmpty(), errores)
}
