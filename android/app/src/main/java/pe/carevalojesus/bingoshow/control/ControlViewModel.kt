package pe.carevalojesus.bingoshow.control

import android.app.Application
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put
import pe.carevalojesus.bingoshow.datos.ConexionSala
import pe.carevalojesus.bingoshow.datos.ErrorServidor
import pe.carevalojesus.bingoshow.datos.Estado
import pe.carevalojesus.bingoshow.datos.EstadoConexion
import pe.carevalojesus.bingoshow.datos.Preferencias
import pe.carevalojesus.bingoshow.datos.entero
import pe.carevalojesus.bingoshow.datos.json
import pe.carevalojesus.bingoshow.datos.mensaje
import pe.carevalojesus.bingoshow.datos.normalizarCodigo
import pe.carevalojesus.bingoshow.datos.texto
import pe.carevalojesus.bingoshow.datos.tipo
import pe.carevalojesus.bingoshow.datos.vincularAnfitrion
import pe.carevalojesus.bingoshow.ui.Efectos
import java.io.IOException
import pe.carevalojesus.bingoshow.datos.SERVIDOR
import pe.carevalojesus.bingoshow.datos.crearSala
import pe.carevalojesus.bingoshow.servicio.Notificador
import pe.carevalojesus.bingoshow.servicio.ServicioPartida
import pe.carevalojesus.bingoshow.logica.nombreBola

/** Control del anfitrión desde el móvil (como anfitrion.html): vincular, empezar, pausar, admitir y dar fichas. */
class ControlViewModel(app: Application) : AndroidViewModel(app) {
    val prefs = Preferencias(app)
    private val efectos = Efectos(app) { prefs.sonido }

    var codigoEntrada by mutableStateOf("")
    var cifrasEntrada by mutableStateOf("")
    var errorVincular by mutableStateOf<String?>(null)
    var vinculando by mutableStateOf(false)

    var codigo by mutableStateOf<String?>(null)
    var sala by mutableStateOf<Estado?>(null)
    var conexion by mutableStateOf(EstadoConexion.CERRADO)
    val avisos = mutableStateListOf<String>()
    /** Jugadores a los que se pulsó «Rechazar» una vez (falta confirmar). */
    val porRechazar = mutableStateListOf<String>()

    private var conexionSala: ConexionSala? = null
    private val contexto = app

    /** Código de 6 cifras para vincular el show de la tele (lo pide el anfitrión desde aquí). */
    var codigoShow by mutableStateOf<String?>(null)
    var codigoShowHasta by mutableStateOf(0L)

    // ---------- Crear sala desde la app ----------
    var creando by mutableStateOf(false)
    var errorCrear by mutableStateOf<String?>(null)

    fun crear(config: JsonObject) {
        creando = true
        errorCrear = null
        viewModelScope.launch {
            try {
                val (c, token) = crearSala(config)
                prefs.guardarTokenAnfitrion(c, token)
                conectar(c)
            } catch (e: ErrorServidor) {
                errorCrear = e.message
            } catch (_: IOException) {
                errorCrear = "No se pudo contactar con el servidor. Revisa la conexión."
            } finally {
                creando = false
            }
        }
    }

    /** Pide al servidor un código de un solo uso para que el show de la tele tome el control de la sala. */
    fun pedirCodigoShow() = enviar(mensaje("vincular"))

    fun enlaceJugar(): String = "$SERVIDOR/jugar.html?sala=${codigo ?: ""}"
    fun enlaceShow(): String = "$SERVIDOR/show.html?sala=${codigo ?: ""}"

    fun salasGuardadas() = prefs.salasAnfitrion()

    fun prepararCodigo(c: String) {
        val limpio = normalizarCodigo(c)
        codigoEntrada = limpio
        if (limpio.length == 6 && prefs.tokenAnfitrion(limpio) != null) conectar(limpio)
    }

    fun vincular() {
        val c = normalizarCodigo(codigoEntrada)
        val cifras = cifrasEntrada.filter(Char::isDigit)
        if (c.length != 6 || cifras.length != 6) { errorVincular = "Escribe el código de la sala y las 6 cifras."; return }
        vinculando = true
        errorVincular = null
        viewModelScope.launch {
            try {
                prefs.guardarTokenAnfitrion(c, vincularAnfitrion(c, cifras))
                cifrasEntrada = ""
                conectar(c)
            } catch (e: ErrorServidor) {
                errorVincular = e.message
            } catch (_: IOException) {
                errorVincular = "No se pudo contactar con el servidor."
            } finally {
                vinculando = false
            }
        }
    }

    fun conectar(c: String) {
        val token = prefs.tokenAnfitrion(c) ?: return
        conexionSala?.cerrar()
        codigo = c
        sala = null
        val nueva = ConexionSala(c, viewModelScope) { buildJsonObject { put("rol", "anfitrion"); put("token", token) } }
        conexionSala = nueva
        viewModelScope.launch { nueva.estado.collect { conexion = it } }
        viewModelScope.launch { nueva.mensajes.collect(::recibir) }
        nueva.abrir()
        ServicioPartida.iniciar(contexto, "control")
    }

    private fun recibir(m: JsonObject) {
        when (m.tipo) {
            "error" -> {
                val texto = m.texto("mensaje") ?: "Error"
                if ("Token" in texto) {
                    codigo?.let(prefs::borrarTokenAnfitrion)
                    desconectar()
                    errorVincular = "Este móvil ya no está vinculado. Pide un código nuevo en el show."
                } else avisar(texto)
            }
            "bienvenida", "estado" -> m["estado"]?.let { e ->
                runCatching { json.decodeFromJsonElement(Estado.serializer(), e) }.getOrNull()?.let { nuevo ->
                    val antes = sala
                    sala = nuevo
                    // Alguien nuevo esperando a que lo admitas
                    val nuevos = nuevo.jugadores.filter { j -> !j.admitido && antes?.jugadores?.none { it.id == j.id } == true }
                    for (j in nuevos) {
                        efectos.vibrar(80, 50, 80); efectos.campana()
                        Notificador.alerta(contexto, "${j.apodo} quiere jugar", "Está esperando a que lo admitas en la sala ${nuevo.codigo}.")
                    }
                    actualizarNotificacion()
                }
            }
            "vinculo" -> {
                codigoShow = m.texto("codigo")
                codigoShowHasta = m.texto("expira")?.toDoubleOrNull()?.toLong() ?: (System.currentTimeMillis() + 120_000)
            }
            "solicitud" -> {
                val texto = "${m.texto("apodo") ?: "Alguien"} pide ${m.entero("cantidad") ?: 0} fichas"
                efectos.vibrar(80, 50, 80)
                efectos.campana()
                avisar(texto)
                Notificador.alerta(contexto, "Solicitud de fichas", texto)
            }
            "aviso" -> m.texto("texto")?.let(::avisar)
        }
    }

    fun avisar(texto: String) {
        avisos += texto
        viewModelScope.launch { delay(3000); avisos.remove(texto) }
    }

    private fun enviar(m: JsonObject) {
        if (conexionSala?.enviar(m) != true) avisar("Sin conexión con la sala")
    }

    fun accion(tipo: String) = enviar(mensaje(tipo))
    fun admitir(id: String) = enviar(mensaje("admitir", "jugadorId" to id))
    fun darFichas(id: String, cantidad: Int) = enviar(mensaje("darFichas", "jugadorId" to id, "cantidad" to cantidad))
    fun rechazar(id: String) {
        if (id !in porRechazar) { porRechazar += id; return }
        porRechazar.remove(id)
        enviar(mensaje("expulsar", "jugadorId" to id))
    }

    private fun actualizarNotificacion() {
        val s = sala ?: return
        val estado = when (s.estado) {
            "lobby" -> "Sala de espera · ${s.vendidos} vendidos"
            "jugando" -> s.bolas.lastOrNull()?.let { "Jugando · ${nombreBola(it)} · ${s.bolas.size}/75" } ?: "Jugando"
            "pausa" -> "En pausa · ${s.bolas.size}/75"
            else -> "Terminada"
        }
        val pendientes = s.jugadores.count { !it.admitido } + s.solicitudes.size
        Notificador.actualizar(contexto, "Control · ${s.nombre.ifBlank { "Sala ${s.codigo}" }}", "$estado · pozo ${s.pozo}${if (pendientes > 0) " · $pendientes pendientes" else ""}")
    }

    fun desconectar() {
        conexionSala?.cerrar()
        conexionSala = null
        codigoShow = null
        ServicioPartida.detener(contexto, "control")
        sala = null
        codigo = null
    }

    /** «Desvincular este móvil»: olvida la llave de esta sala. */
    fun desvincular() {
        codigo?.let(prefs::borrarTokenAnfitrion)
        desconectar()
    }

    /** Registro en CSV para cuadrar cuentas al final del evento. */
    fun registroCsv(): String {
        val filas = listOf(listOf("fecha", "jugador", "fichas")) + (sala?.movimientos ?: emptyList()).map {
            listOf(java.time.Instant.ofEpochMilli(it.en).toString(), it.apodo, it.cantidad.toString())
        }
        return filas.joinToString("\n") { f -> f.joinToString(",") { "\"${it.replace("\"", "\"\"")}\"" } }
    }

    override fun onCleared() {
        conexionSala?.cerrar()
        ServicioPartida.detener(contexto, "control")
        efectos.liberar()
    }
}
