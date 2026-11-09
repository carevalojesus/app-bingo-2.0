package pe.carevalojesus.bingoshow.datos

import android.content.Context
import android.content.SharedPreferences
import kotlinx.serialization.Serializable
import kotlinx.serialization.builtins.ListSerializer
import kotlinx.serialization.builtins.MapSerializer
import kotlinx.serialization.builtins.serializer
import java.security.SecureRandom

/** Lo que el móvil recuerda (como el localStorage de la web): tokens, apodo, preferencias e historial. */
class Preferencias(contexto: Context) {
    private val p: SharedPreferences = contexto.getSharedPreferences("bingoshow", Context.MODE_PRIVATE)

    var apodo: String
        get() = p.getString("apodo", "") ?: ""
        set(v) = p.edit().putString("apodo", v).apply()

    var marcarSolo: Boolean
        get() = p.getBoolean("marcarSolo", true)
        set(v) = p.edit().putBoolean("marcarSolo", v).apply()

    var sonido: Boolean
        get() = p.getBoolean("sonido", true)
        set(v) = p.edit().putBoolean("sonido", v).apply()

    fun tokenJugador(sala: String): String? = p.getString("jugador.$sala", null)
    fun guardarTokenJugador(sala: String, token: String) = p.edit().putString("jugador.$sala", token).apply()
    fun borrarTokenJugador(sala: String) = p.edit().remove("jugador.$sala").apply()

    fun tokenAnfitrion(sala: String): String? = p.getString("anfitrion.$sala", null)
    fun guardarTokenAnfitrion(sala: String, token: String) = p.edit().putString("anfitrion.$sala", token).apply()
    fun borrarTokenAnfitrion(sala: String) = p.edit().remove("anfitrion.$sala").apply()
    fun salasAnfitrion(): List<String> = p.all.keys.filter { it.startsWith("anfitrion.") }.map { it.removePrefix("anfitrion.") }.sorted()

    /** Semilla del jugador para esta sala (partida verificable): se crea una vez y se reutiliza. */
    fun semilla(sala: String): String {
        p.getString("semilla.$sala", null)?.let { return it }
        val bytes = ByteArray(16).also { SecureRandom().nextBytes(it) }
        val nueva = bytes.joinToString("") { "%02x".format(it.toInt() and 0xff) }
        p.edit().putString("semilla.$sala", nueva).apply()
        return nueva
    }

    // Marcas a mano por serie de partida: { cartón: [números] }
    private val serializadorMarcas = MapSerializer(String.serializer(), ListSerializer(Int.serializer()))
    fun marcas(serie: String): MutableMap<Int, Set<Int>> = runCatching {
        json.decodeFromString(serializadorMarcas, p.getString("marcas.$serie", "{}") ?: "{}")
            .mapKeys { it.key.toInt() }.mapValues { it.value.toSet() }.toMutableMap()
    }.getOrDefault(mutableMapOf())
    fun guardarMarcas(serie: String, marcas: Map<Int, Set<Int>>) {
        // Solo se guarda la última partida, para no acumular
        val viejas = p.all.keys.filter { it.startsWith("marcas.") && it != "marcas.$serie" }
        p.edit().apply {
            viejas.forEach(::remove)
            putString("marcas.$serie", json.encodeToString(serializadorMarcas, marcas.mapKeys { it.key.toString() }.mapValues { it.value.toList() }))
        }.apply()
    }

    // Historial de partidas (solo en este móvil)
    fun historial(): List<Partida> = runCatching {
        json.decodeFromString(ListSerializer(Partida.serializer()), p.getString("historial", "[]") ?: "[]")
    }.getOrDefault(emptyList())
    fun registrarPartida(partida: Partida) {
        val lista = historial()
        if (lista.any { it.clave == partida.clave }) return
        p.edit().putString("historial", json.encodeToString(ListSerializer(Partida.serializer()), (listOf(partida) + lista).take(30))).apply()
    }
}

@Serializable
data class Partida(
    val clave: String,
    val en: Long,
    val sala: String,
    val nombre: String = "",
    val ronda: Int = 1,
    val jugadas: Int = 0,
    val unidad: String = "cartones",
    val gastado: Int = 0,
    val ganado: Int = 0,
)
