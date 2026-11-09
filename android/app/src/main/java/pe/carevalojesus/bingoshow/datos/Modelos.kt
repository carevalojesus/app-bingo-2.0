package pe.carevalojesus.bingoshow.datos

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json

// Instantánea `estado` que manda el servidor (worker/juego.js → instantanea). Protocolo: docs/en-linea.md
// Los campos que la app no conoce se ignoran: el servidor puede crecer sin romper la app.

val json = Json {
    ignoreUnknownKeys = true
    coerceInputValues = true
    explicitNulls = false
    encodeDefaults = false
}

@Serializable
data class Premio(val modalidad: String, val porcentaje: Int = 0)

@Serializable
data class Config(
    val tipo: String = "carton",
    val nombre: String = "",
    val cartones: Int = 0,
    val precioCarton: Int = 0,
    val maxCartonesPorJugador: Int = 0,
    val fichasIniciales: Int = 0,
    val intervalo: Int = 8000,
    val premios: List<Premio> = emptyList(),
    val pozoExtra: Int = 0,
    val marcado: String = "libre",
    val admision: Boolean = false,
    val mensajeFichas: String = "",
    val rondasSeguidas: Boolean = false,
    val bolaDorada: Boolean = false,
    val botePorcentaje: Int = 0,
    val boteBolas: Int = 0,
) {
    val esFila get() = tipo == "fila"
    val esElige get() = tipo == "elige"
    val esAuto get() = esFila || esElige
}

@Serializable
data class Ganador(val jugadorId: String = "", val apodo: String = "?", val carton: Int = 0, val fichas: Int = 0, val bote: Int = 0)

@Serializable
data class PremioEnJuego(
    val modalidad: String,
    val porcentaje: Int = 0,
    val fichas: Int = 0,
    val ganadores: List<Ganador> = emptyList(),
    val doble: Boolean = false,
    val bote: Int = 0,
)

@Serializable
data class Jugador(
    val id: String,
    val apodo: String,
    val fichas: Int = 0,
    val cartones: List<Int> = emptyList(),
    val conectado: Boolean = false,
    val ganado: Int = 0,
    val repetir: Boolean = true,
    val admitido: Boolean = true,
)

@Serializable
data class SemillaPublica(val apodo: String, val semilla: String)

@Serializable
data class Justo(
    val compromiso: String? = null,
    val semillasClientes: List<SemillaPublica>? = null,
    val semillaClientes: String? = null,
    val semillaServidor: String? = null,
)

@Serializable
data class Solicitud(val jugadorId: String, val apodo: String, val cantidad: Int, val en: Long = 0)

@Serializable
data class Movimiento(val en: Long = 0, val jugadorId: String = "", val apodo: String = "", val cantidad: Int = 0)

@Serializable
data class Estado(
    val codigo: String = "",
    val nombre: String = "",
    val estado: String = "lobby",
    val config: Config = Config(),
    val serie: String? = null,
    val bolas: List<Int> = emptyList(),
    val siguienteBolaEn: Long? = null,
    val ventanaHasta: Long? = null,
    val pozo: Int = 0,
    val premios: List<PremioEnJuego> = emptyList(),
    val premioActual: Int? = null,
    val jugadores: List<Jugador> = emptyList(),
    val ocupados: Map<String, String> = emptyMap(),
    val anfitrionConectado: Boolean = true,
    val ronda: Int = 1,
    val pro: Boolean = false,
    val maxJugadores: Int = 15,
    val logo: String? = null,
    val bote: Int = 0,
    val aporteRonda: Int = 0,
    val jugadas: Map<String, List<Int>> = emptyMap(),
    val dorada: Int? = null,
    val doradaSalio: Boolean = false,
    val siguienteRondaEn: Long? = null,
    val inicioAutoEn: Long? = null,
    val justo: Justo = Justo(),
    // Solo para el anfitrión
    val solicitudes: List<Solicitud> = emptyList(),
    val movimientos: List<Movimiento> = emptyList(),
) {
    val enJuego get() = estado == "jugando" || estado == "pausa"
    val vendidos get() = ocupados.size
    fun jugador(id: String?) = jugadores.firstOrNull { it.id == id }
    fun dueno(numero: Int) = ocupados[numero.toString()]
    fun premioEnJuego() = premioActual?.let { premios.getOrNull(it) }

    /** Pozo: en el lobby, ventas menos lo que va al bote más el extra (igual que el servidor). */
    fun pozoEstimado(): Int {
        if (estado != "lobby") return pozo
        val ventas = vendidos * config.precioCarton
        val aporte = ventas * config.botePorcentaje / 100
        return maxOf(pozo, ventas - aporte + config.pozoExtra)
    }

    fun misCartones(miId: String?): List<Int> {
        if (miId == null) return emptyList()
        val propios = (jugador(miId)?.cartones ?: emptyList()).toMutableSet()
        ocupados.forEach { (n, d) -> if (d == miId) n.toIntOrNull()?.let(propios::add) }
        return propios.filter { it >= 1 }.sorted()
    }
}

/** Resumen público de una sala (GET /api/salas/:codigo). */
@Serializable
data class ResumenSala(
    val codigo: String = "",
    val nombre: String = "",
    val estado: String = "",
    val jugadores: Int = 0,
    val pro: Boolean = false,
    val logo: String? = null,
    val config: Config? = null,
)
