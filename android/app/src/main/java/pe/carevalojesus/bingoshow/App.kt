package pe.carevalojesus.bingoshow

import android.content.Intent
import android.net.Uri
import androidx.activity.compose.BackHandler
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.safeDrawingPadding
import androidx.compose.foundation.layout.widthIn
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import android.Manifest
import android.os.Build
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import pe.carevalojesus.bingoshow.jugador.VistaPip
import pe.carevalojesus.bingoshow.servicio.Notificador
import pe.carevalojesus.bingoshow.control.ControlViewModel
import pe.carevalojesus.bingoshow.control.PantallaControl
import pe.carevalojesus.bingoshow.datos.SERVIDOR
import pe.carevalojesus.bingoshow.jugador.JugadorViewModel
import pe.carevalojesus.bingoshow.jugador.PantallaEntrar
import pe.carevalojesus.bingoshow.jugador.PantallaSala
import pe.carevalojesus.bingoshow.qr.PantallaEscaner
import pe.carevalojesus.bingoshow.ui.Boton
import pe.carevalojesus.bingoshow.ui.Carta
import pe.carevalojesus.bingoshow.ui.Colores
import pe.carevalojesus.bingoshow.ui.Ficha
import pe.carevalojesus.bingoshow.ui.Fondo
import pe.carevalojesus.bingoshow.ui.LogoBS
import pe.carevalojesus.bingoshow.ui.display
import pe.carevalojesus.bingoshow.ui.ui

enum class Vista { INICIO, ENTRAR, ESCANER, CONTROL }

const val ACCION_ESCANEAR = "pe.carevalojesus.bingoshow.ESCANEAR"
const val ACCION_CONTROL = "pe.carevalojesus.bingoshow.CONTROL"

/** Enlace abierto desde fuera (QR escaneado con la cámara, WhatsApp…). */
data class Enlace(val rol: String, val sala: String, val id: Long = System.nanoTime())

fun enlaceDe(intent: Intent?): Enlace? = when (intent?.action) {
    ACCION_ESCANEAR -> Enlace("escanear", "")
    ACCION_CONTROL -> Enlace("anfitrion", "")
    else -> enlaceDe(intent?.data)
}

fun enlaceDe(uri: Uri?): Enlace? {
    uri ?: return null
    val sala = uri.getQueryParameter("sala") ?: ""
    val ruta = uri.path ?: return null
    return when {
        ruta.startsWith("/jugar") -> Enlace("jugador", sala)
        ruta.startsWith("/anfitrion") -> Enlace("anfitrion", sala)
        else -> null
    }
}

@Composable
fun App(enlace: Enlace?, jugador: JugadorViewModel, control: ControlViewModel, enPip: Boolean, permitirPip: (Boolean) -> Unit) {
    var vista by rememberSaveable { mutableStateOf(Vista.INICIO) }

    LaunchedEffect(enlace?.id) {
        val e = enlace ?: return@LaunchedEffect
        when (e.rol) {
            "escanear" -> vista = Vista.ESCANER
            "anfitrion" -> { vista = Vista.CONTROL; control.prepararCodigo(e.sala) }
            else -> { if (jugador.codigo == null) jugador.abrirEnlace(e.sala); vista = Vista.ENTRAR }
        }
    }

    // Ventana flotante solo con partida en marcha y viendo la sala
    val jugando = vista == Vista.ENTRAR && jugador.codigo != null && jugador.sala?.enJuego == true
    LaunchedEffect(jugando) { permitirPip(jugando) }

    // Permiso de notificaciones (Android 13+): se pide al entrar en una sala, no al abrir la app
    val contexto = LocalContext.current
    val pedirPermiso = rememberLauncherForActivityResult(ActivityResultContracts.RequestPermission()) {}
    val enSala = jugador.codigo != null || control.codigo != null
    LaunchedEffect(enSala) {
        if (enSala && Build.VERSION.SDK_INT >= 33 && !Notificador.puedeNotificar(contexto)) pedirPermiso.launch(Manifest.permission.POST_NOTIFICATIONS)
    }

    if (enPip) { VistaPip(jugador); return }

    Fondo {
        when {
            vista == Vista.ESCANER -> {
                BackHandler { vista = Vista.ENTRAR }
                PantallaEscaner(
                    alLeer = { c -> jugador.abrirEnlace(c); vista = Vista.ENTRAR },
                    alCerrar = { vista = Vista.ENTRAR },
                )
            }
            vista == Vista.CONTROL -> {
                BackHandler { if (control.codigo != null) control.desconectar() else vista = Vista.INICIO }
                PantallaControl(control) { vista = Vista.INICIO }
            }
            jugador.codigo != null && vista == Vista.ENTRAR -> {
                BackHandler { jugador.salir() }
                PantallaSala(jugador)
            }
            vista == Vista.ENTRAR -> {
                BackHandler { vista = Vista.INICIO }
                PantallaEntrar(jugador, alEscanear = { vista = Vista.ESCANER }, alVolver = { vista = Vista.INICIO })
            }
            else -> Inicio(alJugar = { vista = Vista.ENTRAR }, alControlar = { vista = Vista.CONTROL })
        }
    }
}

@Composable
private fun Inicio(alJugar: () -> Unit, alControlar: () -> Unit) {
    val contexto = LocalContext.current
    Column(
        Modifier.fillMaxSize().verticalScroll(rememberScrollState()).safeDrawingPadding().padding(20.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
    ) {
        Spacer(Modifier.height(24.dp))
        LogoBS()
        Text("Bingo Show", Modifier.padding(top = 14.dp), style = display(44.sp, Colores.crema), textAlign = TextAlign.Center)
        Text(
            "El bingo con show en vivo: juega desde tu móvil mientras el bombo gira en la pantalla grande.",
            Modifier.widthIn(max = 420.dp).padding(top = 6.dp), style = ui(15.sp, FontWeight.Bold, Colores.crema.copy(alpha = 0.8f)), textAlign = TextAlign.Center,
        )
        Row(Modifier.padding(vertical = 24.dp), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            for (n in listOf(7, 22, 38, 51, 69)) Ficha(n, 48.dp)
        }
        Column(Modifier.widthIn(max = 420.dp).fillMaxWidth(), verticalArrangement = Arrangement.spacedBy(14.dp)) {
            Carta(Modifier.fillMaxWidth()) {
                Text("Quiero jugar", style = display(22.sp))
                Text("Escanea el QR del show o escribe el código de la sala.", Modifier.padding(top = 2.dp), style = ui(13.sp, FontWeight.Bold, Colores.tinta.copy(alpha = 0.7f)))
                Boton("Jugar", alJugar, Modifier.fillMaxWidth().padding(top = 12.dp), fondo = Colores.girasol, alto = 54.dp, estilo = display(20.sp), mayusculas = false)
            }
            Carta(Modifier.fillMaxWidth()) {
                Text("Soy anfitrión", style = display(22.sp))
                Text("Controla tu sala desde el móvil: empieza, pausa, admite jugadores y asigna fichas.", Modifier.padding(top = 2.dp), style = ui(13.sp, FontWeight.Bold, Colores.tinta.copy(alpha = 0.7f)))
                Boton("Control del anfitrión", alControlar, Modifier.fillMaxWidth().padding(top = 12.dp), fondo = Colores.menta, alto = 50.dp)
            }
            Text(
                "Crear salas y el show con el bombo 3D →",
                Modifier.fillMaxWidth().clickable { contexto.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(SERVIDOR))) }.padding(vertical = 10.dp),
                style = ui(13.sp, FontWeight.Black, Colores.crema.copy(alpha = 0.8f)), textAlign = TextAlign.Center,
            )
        }
    }
}
