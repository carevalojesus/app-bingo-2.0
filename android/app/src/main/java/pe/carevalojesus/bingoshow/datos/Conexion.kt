package pe.carevalojesus.bingoshow.datos

import android.graphics.BitmapFactory
import androidx.compose.ui.graphics.ImageBitmap
import androidx.compose.ui.graphics.asImageBitmap
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharedFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.isActive
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.contentOrNull
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive
import kotlinx.serialization.json.put
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import okhttp3.Response
import okhttp3.WebSocket
import okhttp3.WebSocketListener
import pe.carevalojesus.bingoshow.BuildConfig
import java.io.IOException
import java.util.concurrent.TimeUnit
import kotlin.math.min
import kotlin.math.pow

val SERVIDOR: String = BuildConfig.SERVIDOR

val http: OkHttpClient = OkHttpClient.Builder()
    .connectTimeout(10, TimeUnit.SECONDS)
    .readTimeout(0, TimeUnit.MILLISECONDS) // WebSocket: sin límite de lectura
    .build()

fun normalizarCodigo(texto: String): String = texto.uppercase().filter { it in 'A'..'Z' || it in '0'..'9' }.take(6)

enum class EstadoConexion(val texto: String) {
    CONECTANDO("Conectando…"), CONECTADO("En línea"), RECONECTANDO("Reconectando…"), CERRADO("Sin conexión")
}

/**
 * WebSocket de una sala con reconexión (espera 0,5 s, 1 s, 2 s… hasta 8 s) y latido cada 25 s.
 * `hola` se pide en cada conexión, porque el token puede haber cambiado (p. ej. tras la bienvenida).
 */
class ConexionSala(
    private val codigo: String,
    private val alcance: CoroutineScope,
    private val hola: () -> JsonObject,
) {
    private val _estado = MutableStateFlow(EstadoConexion.CONECTANDO)
    val estado: StateFlow<EstadoConexion> = _estado
    private val _mensajes = MutableSharedFlow<JsonObject>(extraBufferCapacity = 256)
    val mensajes: SharedFlow<JsonObject> = _mensajes

    private var ws: WebSocket? = null
    private var cerrada = false
    private var intentos = 0
    private var latido: Job? = null
    private var reintento: Job? = null

    fun abrir() {
        _estado.value = if (intentos == 0) EstadoConexion.CONECTANDO else EstadoConexion.RECONECTANDO
        val url = SERVIDOR.replaceFirst("http", "ws") + "/api/salas/$codigo/ws"
        ws = http.newWebSocket(Request.Builder().url(url).build(), object : WebSocketListener() {
            override fun onOpen(webSocket: WebSocket, response: Response) {
                intentos = 0
                val saludo = buildJsonObject {
                    put("tipo", "hola")
                    hola().forEach { (k, v) -> put(k, v) }
                }
                webSocket.send(saludo.toString())
                _estado.value = EstadoConexion.CONECTADO
                latido?.cancel()
                latido = alcance.launch {
                    while (isActive) {
                        delay(25_000)
                        enviar(buildJsonObject { put("tipo", "ping") })
                    }
                }
            }

            override fun onMessage(webSocket: WebSocket, text: String) {
                val m = runCatching { json.parseToJsonElement(text).jsonObject }.getOrNull() ?: return
                if (m.tipo == "expulsado" || m.tipo == "salaCerrada") cerrada = true
                _mensajes.tryEmit(m)
            }

            // 4004 caducada o inexistente, 4005 cerrada por el administrador, 4006 cerrada por el anfitrión:
            // no se reconecta. Si el servidor no mandó salaCerrada (sala que ya no existe), se avisa igual.
            override fun onClosing(webSocket: WebSocket, code: Int, reason: String) {
                if (code in 4004..4006 && !cerrada) {
                    cerrada = true
                    _mensajes.tryEmit(buildJsonObject { put("tipo", "salaCerrada"); put("texto", "Esta sala ya no existe.") })
                }
                webSocket.close(1000, null)
            }

            override fun onClosed(webSocket: WebSocket, code: Int, reason: String) = alCerrar()
            override fun onFailure(webSocket: WebSocket, t: Throwable, response: Response?) = alCerrar()
        })
    }

    private fun alCerrar() {
        latido?.cancel()
        if (cerrada) {
            _estado.value = EstadoConexion.CERRADO
            return
        }
        _estado.value = EstadoConexion.RECONECTANDO
        val espera = min(8000.0, 500.0 * 2.0.pow(intentos++)).toLong()
        reintento?.cancel()
        reintento = alcance.launch {
            delay(espera)
            if (!cerrada) abrir()
        }
    }

    fun enviar(mensaje: JsonObject): Boolean = ws?.send(mensaje.toString()) ?: false

    fun cerrar() {
        cerrada = true
        reintento?.cancel()
        latido?.cancel()
        ws?.close(1000, "Adiós")
        _estado.value = EstadoConexion.CERRADO
    }
}

val JsonObject.tipo: String? get() = this["tipo"]?.jsonPrimitive?.contentOrNull
fun JsonObject.texto(clave: String): String? = (this[clave] as? kotlinx.serialization.json.JsonPrimitive)?.contentOrNull
fun JsonObject.entero(clave: String): Int? = texto(clave)?.toDoubleOrNull()?.toInt()

// ---------- HTTP ----------
class ErrorServidor(mensaje: String) : Exception(mensaje)

private fun mensajeDeError(cuerpo: String, codigo: Int): String =
    runCatching { json.parseToJsonElement(cuerpo).jsonObject.texto("error") }.getOrNull() ?: "Error $codigo"

suspend fun consultarSala(codigo: String): ResumenSala = withContext(Dispatchers.IO) {
    val r = http.newCall(Request.Builder().url("$SERVIDOR/api/salas/$codigo").build()).execute()
    r.use {
        val cuerpo = it.body.string()
        if (!it.isSuccessful) throw ErrorServidor(if (it.code == 404) "No hay ninguna sala con el código $codigo." else mensajeDeError(cuerpo, it.code))
        json.decodeFromString(ResumenSala.serializer(), cuerpo)
    }
}

/** Crea una sala (POST /api/salas, como sala.html). Devuelve (código, llave de anfitrión). */
suspend fun crearSala(config: JsonObject): Pair<String, String> = withContext(Dispatchers.IO) {
    val r = http.newCall(Request.Builder().url("$SERVIDOR/api/salas").post(config.toString().toRequestBody("application/json".toMediaType())).build()).execute()
    r.use {
        val texto = it.body.string()
        if (!it.isSuccessful) throw ErrorServidor(mensajeDeError(texto, it.code))
        val o = json.parseToJsonElement(texto).jsonObject
        (o.texto("codigo") ?: throw ErrorServidor("Respuesta no válida.")) to (o.texto("tokenAnfitrion") ?: throw ErrorServidor("Respuesta no válida."))
    }
}

/** Canjea el código de 6 cifras que muestra el show por la llave de anfitrión. */
suspend fun vincularAnfitrion(codigo: String, cifras: String): String = withContext(Dispatchers.IO) {
    val cuerpo = buildJsonObject { put("codigo", cifras) }.toString().toRequestBody("application/json".toMediaType())
    val r = http.newCall(Request.Builder().url("$SERVIDOR/api/salas/$codigo/vincular").post(cuerpo).build()).execute()
    r.use {
        val texto = it.body.string()
        if (!it.isSuccessful) throw ErrorServidor(mensajeDeError(texto, it.code))
        json.parseToJsonElement(texto).jsonObject.texto("tokenAnfitrion") ?: throw ErrorServidor("Respuesta no válida.")
    }
}

suspend fun cargarLogo(codigo: String, version: String): ImageBitmap? = withContext(Dispatchers.IO) {
    try {
        http.newCall(Request.Builder().url("$SERVIDOR/api/salas/$codigo/logo?v=$version").build()).execute().use {
            if (!it.isSuccessful) return@use null
            val bytes = it.body.bytes()
            BitmapFactory.decodeByteArray(bytes, 0, bytes.size)?.asImageBitmap()
        }
    } catch (_: IOException) {
        null
    }
}

fun mensaje(tipo: String, vararg campos: Pair<String, Any?>): JsonObject = buildJsonObject {
    put("tipo", tipo)
    for ((k, v) in campos) {
        when (v) {
            null -> Unit
            is String -> put(k, v)
            is Number -> put(k, v)
            is Boolean -> put(k, v)
            is JsonElement -> put(k, v)
            is List<*> -> put(k, kotlinx.serialization.json.JsonArray(v.map { kotlinx.serialization.json.JsonPrimitive(it as Number) }))
            else -> put(k, v.toString())
        }
    }
}
