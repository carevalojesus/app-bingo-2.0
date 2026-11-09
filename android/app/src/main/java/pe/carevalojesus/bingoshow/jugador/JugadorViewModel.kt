package pe.carevalojesus.bingoshow.jugador

import android.app.Application
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.mutableStateMapOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.compose.ui.graphics.ImageBitmap
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.int
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonPrimitive
import kotlinx.serialization.json.put
import pe.carevalojesus.bingoshow.datos.ConexionSala
import pe.carevalojesus.bingoshow.datos.ErrorServidor
import pe.carevalojesus.bingoshow.datos.Estado
import pe.carevalojesus.bingoshow.datos.EstadoConexion
import pe.carevalojesus.bingoshow.datos.Ganador
import pe.carevalojesus.bingoshow.datos.Partida
import pe.carevalojesus.bingoshow.datos.Preferencias
import pe.carevalojesus.bingoshow.datos.ResumenSala
import pe.carevalojesus.bingoshow.datos.cargarLogo
import pe.carevalojesus.bingoshow.datos.consultarSala
import pe.carevalojesus.bingoshow.datos.entero
import pe.carevalojesus.bingoshow.datos.json
import pe.carevalojesus.bingoshow.datos.mensaje
import pe.carevalojesus.bingoshow.datos.normalizarCodigo
import pe.carevalojesus.bingoshow.datos.texto
import pe.carevalojesus.bingoshow.datos.tipo
import pe.carevalojesus.bingoshow.logica.ResultadoVerificacion
import pe.carevalojesus.bingoshow.logica.SemillaCliente
import pe.carevalojesus.bingoshow.logica.nombreBola
import pe.carevalojesus.bingoshow.logica.verificarPartida
import pe.carevalojesus.bingoshow.ui.Efectos
import java.io.IOException

data class Aviso(val id: Long, val texto: String, val error: Boolean = false)
data class Celebracion(val modalidad: String, val ganadores: List<Ganador>, val siguiente: String?, val bote: Int)
data class Reaccion(val id: Long, val emoji: String, val apodo: String, val x: Float)

val REACCIONES = listOf("😱", "🔥", "👏", "😂", "🙏", "🍀")

/** Estado y acciones del jugador. Todo se dibuja a partir de la última instantánea `estado`. */
class JugadorViewModel(app: Application) : AndroidViewModel(app) {
    val prefs = Preferencias(app)
    val efectos = Efectos(app) { prefs.sonido }

    // ---------- Entrar ----------
    var codigoEntrada by mutableStateOf("")
    var apodoEntrada by mutableStateOf(prefs.apodo)
    var infoSala by mutableStateOf<ResumenSala?>(null)
    var errorEntrada by mutableStateOf<String?>(null)
    private var consulta: Job? = null

    // ---------- Sala ----------
    var codigo by mutableStateOf<String?>(null)
    var miId by mutableStateOf<String?>(null)
    var sala by mutableStateOf<Estado?>(null)
    var conexion by mutableStateOf(EstadoConexion.CERRADO)
    var expulsado by mutableStateOf(false)
    var logo by mutableStateOf<ImageBitmap?>(null)
    private var logoVersion: String? = null
    private var conexionSala: ConexionSala? = null
    private var bienvenido = false

    val avisos = mutableStateListOf<Aviso>()
    val reacciones = mutableStateListOf<Reaccion>()
    var celebracion by mutableStateOf<Celebracion?>(null)
    var cuentaHasta by mutableStateOf<Long?>(null)
    var cuentaMs by mutableStateOf(4000L)
    var ultimaBolaNueva by mutableStateOf(0L)

    val pendientes = mutableStateMapOf<Int, Boolean>()
    val cantando = mutableStateMapOf<Int, Long>()
    var marcarSolo by mutableStateOf(prefs.marcarSolo)
    var sonido by mutableStateOf(prefs.sonido)
    val marcas = mutableStateMapOf<Int, Set<Int>>()
    private var serieMarcas: String? = null
    var borrador by mutableStateOf(setOf<Int>())
    var pedido by mutableStateOf<Int?>(null)
    var verificacion by mutableStateOf<ResultadoVerificacion?>(null)
    private val completosAvisados = mutableSetOf<String>()
    private val falta1Avisados = mutableSetOf<String>()

    // ---------- Entrar ----------
    fun cambiarCodigo(texto: String) {
        codigoEntrada = normalizarCodigo(texto)
        errorEntrada = null
        infoSala = null
        consulta?.cancel()
        if (codigoEntrada.length == 6) {
            val c = codigoEntrada
            consulta = viewModelScope.launch {
                delay(250)
                infoSala = try {
                    consultarSala(c)
                } catch (e: ErrorServidor) {
                    errorEntrada = e.message; null
                } catch (_: IOException) {
                    errorEntrada = "No se pudo contactar con el servidor. Revisa tu conexión."; null
                }
            }
        }
    }

    fun entrar(codigoSala: String = codigoEntrada, apodo: String = apodoEntrada) {
        val c = normalizarCodigo(codigoSala)
        val limpio = apodo.replace(Regex("[<>]"), "").trim().take(20)
        if (c.length != 6) { errorEntrada = "El código tiene 6 caracteres."; return }
        if (limpio.isEmpty() && prefs.tokenJugador(c) == null) { errorEntrada = "Escribe un apodo (1 a 20 caracteres)."; return }
        if (limpio.isNotEmpty()) prefs.apodo = limpio
        conectar(c, limpio)
    }

    /** Abre una sala desde un enlace o un QR (bingo.carevalojesus.com/jugar?sala=XXXX). */
    fun abrirEnlace(c: String) {
        val limpio = normalizarCodigo(c)
        if (limpio.length != 6) return
        if (prefs.tokenJugador(limpio) != null) conectar(limpio, prefs.apodo)
        else cambiarCodigo(limpio)
    }

    private fun conectar(c: String, apodo: String) {
        conexionSala?.cerrar()
        codigo = c
        bienvenido = false
        expulsado = false
        sala = null
        miId = null
        logo = null
        logoVersion = null
        verificacion = null
        val conexionNueva = ConexionSala(c, viewModelScope) {
            buildJsonObject {
                put("rol", "jugador")
                put("apodo", apodo)
                prefs.tokenJugador(c)?.let { put("token", it) }
                put("semilla", prefs.semilla(c))
            }
        }
        conexionSala = conexionNueva
        viewModelScope.launch { conexionNueva.estado.collect { conexion = it } }
        viewModelScope.launch { conexionNueva.mensajes.collect(::recibir) }
        conexionNueva.abrir()
    }

    fun salir(olvidar: Boolean = false) {
        val c = codigo
        conexionSala?.cerrar()
        conexionSala = null
        if (olvidar && c != null) prefs.borrarTokenJugador(c)
        codigo = null
        sala = null
        miId = null
        celebracion = null
        cuentaHasta = null
    }

    private fun enviar(m: JsonObject): Boolean {
        val ok = conexionSala?.enviar(m) == true
        if (!ok) avisar("Sin conexión con la sala", true)
        return ok
    }

    fun avisar(texto: String, error: Boolean = false) {
        val aviso = Aviso(System.nanoTime(), texto, error)
        avisos.add(aviso)
        viewModelScope.launch {
            delay(if (error) 4500 else 3500)
            avisos.remove(aviso)
        }
    }

    // ---------- Mensajes del servidor ----------
    private fun recibir(m: JsonObject) {
        when (m.tipo) {
            "bienvenida" -> {
                bienvenido = true
                m.texto("jugadorId")?.let { miId = it }
                m.texto("token")?.let { t -> codigo?.let { prefs.guardarTokenJugador(it, t) } }
                m["estado"]?.let { nuevoEstado(it) }
            }
            "estado" -> m["estado"]?.let { nuevoEstado(it) }
            "bola" -> {
                ultimaBolaNueva = System.currentTimeMillis()
                celebracion = null
                efectos.vibrar(60)
                efectos.campana()
            }
            "ganador" -> {
                val ganadores = m["ganadores"]?.let { json.decodeFromJsonElement(kotlinx.serialization.builtins.ListSerializer(Ganador.serializer()), it) } ?: emptyList()
                celebracion = Celebracion(m.texto("modalidad") ?: "", ganadores, m.texto("siguiente"), m.entero("bote") ?: 0)
                if (ganadores.any { it.jugadorId == miId }) { efectos.vibrar(150, 80, 150, 80, 300); efectos.fanfarria() }
                else { efectos.vibrar(100); efectos.golpe() }
            }
            "bingoRechazado" -> {
                val carton = m.entero("carton") ?: 0
                cantando.remove(carton)
                val faltan = m["faltan"]?.jsonArray?.map { nombreBola(it.jsonPrimitive.int) } ?: emptyList()
                avisar(if (faltan.isEmpty()) "Cartón $carton: aún no es bingo." else "Cartón $carton: aún no es bingo. ${if (faltan.size == 1) "Falta" else "Faltan"} ${faltan.joinToString(", ")}.", true)
                efectos.vibrar(40, 60, 40)
                efectos.error()
            }
            "aviso" -> m.texto("texto")?.let { avisar(it) }
            "error" -> {
                if (!bienvenido) {
                    val c = codigo
                    salir(olvidar = true)
                    if (c != null) codigoEntrada = c
                    errorEntrada = m.texto("mensaje") ?: "No se pudo entrar a la sala."
                    return
                }
                pendientes.clear()
                avisar(m.texto("mensaje") ?: "Algo salió mal.", true)
            }
            "expulsado" -> {
                salir(olvidar = true)
                expulsado = true
                efectos.vibrar(80, 60, 80)
            }
            "cuenta" -> {
                celebracion = null
                cuentaMs = (m.entero("ms") ?: 4000).toLong()
                cuentaHasta = System.currentTimeMillis() + cuentaMs
            }
            "dorada" -> {
                avisar("¡Bola dorada! Salió el ${nombreBola(m.entero("numero") ?: 0)}: el premio se duplica a ${m.entero("fichas")} fichas.")
                efectos.vibrar(100, 50, 100, 50, 200)
                efectos.fanfarria()
            }
            "reaccion" -> {
                val emoji = m.texto("emoji") ?: return
                if (emoji !in REACCIONES) return
                val r = Reaccion(System.nanoTime(), emoji, m.texto("apodo") ?: "", (0.1f + Math.random().toFloat() * 0.8f))
                reacciones.add(r)
                viewModelScope.launch { delay(2600); reacciones.remove(r) }
            }
            "admitido" -> {
                avisar("¡El anfitrión te admitió! Ya puedes elegir.")
                efectos.vibrar(80, 60, 80)
                efectos.campana()
            }
            "fichas" -> {
                val n = m.entero("cantidad") ?: 0
                if (n > 0) pedido = null
                avisar(if (n > 0) "Recibiste $n fichas. Saldo: ${m.entero("saldo")}." else "El anfitrión corrigió tu saldo ($n). Saldo: ${m.entero("saldo")}.")
                efectos.vibrar(*if (n > 0) longArrayOf(60, 40, 120) else longArrayOf(60))
                if (n > 0) efectos.campana()
            }
        }
    }

    private fun nuevoEstado(elemento: kotlinx.serialization.json.JsonElement) {
        val nuevo = runCatching { json.decodeFromJsonElement(Estado.serializer(), elemento) }.getOrNull() ?: return
        val anterior = sala
        sala = nuevo
        pendientes.clear()
        if (nuevo.serie != null && nuevo.serie != serieMarcas) {
            serieMarcas = nuevo.serie
            marcas.clear()
            marcas.putAll(prefs.marcas(nuevo.serie))
        }
        if (anterior?.estado != nuevo.estado) {
            completosAvisados.clear()
            falta1Avisados.clear()
        }
        if (nuevo.estado == "lobby") cantando.clear()
        if (anterior != null && anterior.estado != "terminada" && nuevo.estado == "terminada") registrarHistorial(nuevo)
        // Logo del evento (Pro)
        if (nuevo.logo != logoVersion) {
            logoVersion = nuevo.logo
            val c = codigo
            logo = null
            if (nuevo.logo != null && c != null) viewModelScope.launch { logo = cargarLogo(c, nuevo.logo) }
        }
    }

    private fun registrarHistorial(s: Estado) {
        val mios = s.misCartones(miId)
        if (mios.isEmpty()) return
        val ganado = s.premios.sumOf { p -> p.ganadores.filter { it.jugadorId == miId }.sumOf { it.fichas + it.bote } }
        prefs.registrarPartida(
            Partida(
                clave = "${s.codigo}:${s.ronda}:${s.serie}", en = System.currentTimeMillis(), sala = s.codigo, nombre = s.nombre,
                ronda = s.ronda, jugadas = mios.size, unidad = unidades(s).second, gastado = mios.size * s.config.precioCarton, ganado = ganado,
            ),
        )
    }

    // ---------- Acciones del jugador ----------
    /** Forma de marcar en vigor: la que fija el anfitrión o, si la deja libre, la que eligió el jugador. */
    fun marcaSolo(): Boolean = when (sala?.config?.marcado) {
        "auto" -> true
        "manual" -> false
        else -> marcarSolo
    }

    fun cambiarModoMarcado(automatico: Boolean) {
        if (marcarSolo == automatico) return
        marcarSolo = automatico
        prefs.marcarSolo = automatico
        val s = sala
        if (!automatico && s?.serie != null) {
            for (n in s.misCartones(miId)) if (marcas[n] == null) marcas[n] = s.bolas.toSet()
            prefs.guardarMarcas(s.serie, marcas)
        }
        avisar(if (automatico) "Marcado automático: tus cartones se marcan solos." else "Marcas tú: toca los números que vayan saliendo.")
    }

    fun tocarCartonLobby(n: Int) {
        val s = sala ?: return
        if (s.estado != "lobby" || pendientes[n] == true) return
        val (uno, varios) = unidades(s)
        val dueno = s.dueno(n)
        if (dueno != null && dueno != miId) { avisar("${uno.replaceFirstChar { it.uppercase() }} $n ya es de ${s.jugador(dueno)?.apodo ?: "otro jugador"}."); return }
        if (dueno == miId) {
            if (enviar(mensaje("soltarCarton", "numero" to n))) pendientes[n] = true
            return
        }
        val yo = s.jugador(miId)
        if (s.misCartones(miId).size >= s.config.maxCartonesPorJugador) { avisar("Como máximo ${s.config.maxCartonesPorJugador} $varios por jugador.", true); return }
        if (yo != null && yo.fichas < s.config.precioCarton) { avisar("No tienes fichas suficientes: cuesta ${s.config.precioCarton} fichas.", true); return }
        if (enviar(mensaje("elegirCarton", "numero" to n))) pendientes[n] = true
    }

    // «Elige tus 5»
    fun tocarNumero(n: Int) {
        borrador = when {
            n in borrador -> borrador - n
            borrador.size < 5 -> borrador + n
            else -> { avisar("Ya elegiste 5 números. Quita uno o compra la jugada."); borrador }
        }
        efectos.vibrar(8)
    }

    fun numerosAlAzar() {
        borrador = (1..75).shuffled(java.security.SecureRandom()).take(5).toSet()
    }

    fun comprarJugada() {
        val s = sala ?: return
        if (borrador.size != 5) return
        val yo = s.jugador(miId)
        if (yo != null && yo.fichas < s.config.precioCarton) { avisar("No tienes fichas suficientes.", true); return }
        if (enviar(mensaje("elegirCarton", "numeros" to borrador.toList()))) { borrador = emptySet(); efectos.vibrar(30) }
    }

    fun soltarJugada(id: Int) {
        if (pendientes[id] == true) return
        if (enviar(mensaje("soltarCarton", "numero" to id))) pendientes[id] = true
    }

    fun pedirFichas(cantidad: Int) {
        if (cantidad !in 1..100000) { avisar("Pide entre 1 y 100.000 fichas.", true); return }
        if (enviar(mensaje("pedirFichas", "cantidad" to cantidad))) {
            pedido = cantidad
            efectos.vibrar(20)
            avisar("Pedido enviado: $cantidad fichas.")
        }
    }

    fun tocarCelda(carton: Int, numero: Int) {
        val s = sala ?: return
        if (marcaSolo()) return
        if (numero !in s.bolas) { avisar("El ${nombreBola(numero)} todavía no ha salido."); efectos.vibrar(30); return }
        val actual = marcas[carton] ?: emptySet()
        marcas[carton] = if (numero in actual) actual - numero else actual + numero
        s.serie?.let { prefs.guardarMarcas(it, marcas) }
        efectos.vibrar(15)
    }

    fun marcasDe(carton: Int): Set<Int> {
        val salidas = sala?.bolas?.toSet() ?: emptySet()
        return if (marcaSolo()) salidas else (marcas[carton] ?: emptySet()).filter { it in salidas }.toSet()
    }

    fun cantar(numero: Int) {
        val s = sala ?: return
        if (!s.enJuego) return
        if ((cantando[numero] ?: 0) > System.currentTimeMillis()) return
        val m = if (s.config.marcado == "manual") mensaje("bingo", "numero" to numero, "marcas" to (marcas[numero] ?: emptySet()).toList())
        else mensaje("bingo", "numero" to numero)
        if (!enviar(m)) return
        cantando[numero] = System.currentTimeMillis() + 2500
        efectos.vibrar(50)
        viewModelScope.launch { delay(2600); cantando.remove(numero) }
    }

    fun reaccionar(emoji: String) {
        if (enviar(mensaje("reaccion", "emoji" to emoji))) efectos.vibrar(10)
    }

    fun repetir(valor: Boolean) {
        enviar(mensaje("repetir", "valor" to valor))
    }

    fun cambiarSonido() {
        sonido = !sonido
        prefs.sonido = sonido
        if (sonido) efectos.campana()
    }

    /** Avisos de «¡completo!» y «¡te falta 1!» (una vez por cartón y premio). */
    fun avisarCartones(completos: List<String>, casi: List<Pair<String, String>>) {
        val s = sala ?: return
        if (s.estado != "jugando") return
        val nuevosCompletos = completos.filter { completosAvisados.add(it) }
        val nuevosCasi = casi.filter { falta1Avisados.add(it.first) }
        if (nuevosCompletos.isNotEmpty()) { efectos.vibrar(120, 80, 120); efectos.fanfarria() }
        else if (nuevosCasi.isNotEmpty()) {
            avisar("¡Te falta 1! ${nuevosCasi.joinToString(" · ") { it.second }}")
            efectos.vibrar(60, 40, 60, 40, 60)
            efectos.golpe()
        }
    }

    fun verificar() {
        val s = sala ?: return
        val j = s.justo
        verificacion = verificarPartida(
            j.compromiso, j.semillaServidor, j.semillasClientes?.map { SemillaCliente(it.apodo, it.semilla) } ?: emptyList(),
            j.semillaClientes, s.serie, s.bolas, if (s.config.bolaDorada) s.dorada else null,
        )
    }

    override fun onCleared() {
        conexionSala?.cerrar()
        efectos.liberar()
    }
}

/** («cartón», «cartones») según el tipo de juego. */
fun unidades(s: Estado?): Pair<String, String> = when {
    s?.config?.esElige == true -> "jugada" to "jugadas"
    s?.config?.esFila == true -> "fila" to "filas"
    else -> "cartón" to "cartones"
}
