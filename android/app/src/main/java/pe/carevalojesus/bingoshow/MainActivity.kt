package pe.carevalojesus.bingoshow

import android.app.PictureInPictureParams
import android.content.Intent
import android.content.res.Configuration
import android.os.Build
import android.os.Bundle
import android.util.Rational
import androidx.activity.ComponentActivity
import androidx.activity.SystemBarStyle
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.viewModels
import androidx.compose.runtime.mutableStateOf
import pe.carevalojesus.bingoshow.control.ControlViewModel
import pe.carevalojesus.bingoshow.jugador.JugadorViewModel
import pe.carevalojesus.bingoshow.servicio.Notificador
import pe.carevalojesus.bingoshow.ui.TemaBingo

class MainActivity : ComponentActivity() {
    private val enlace = mutableStateOf<Enlace?>(null)
    private val enPip = mutableStateOf(false)
    private val jugador: JugadorViewModel by viewModels()
    private val control: ControlViewModel by viewModels()

    /** Hay partida en marcha: al salir de la app pasa a ventana flotante. */
    private var pipPermitido = false

    override fun onCreate(savedInstanceState: Bundle?) {
        enableEdgeToEdge(SystemBarStyle.dark(0xFF1A0D36.toInt()), SystemBarStyle.dark(0xFF1A0D36.toInt()))
        super.onCreate(savedInstanceState)
        Notificador.crearCanales(this)
        if (savedInstanceState == null) enlace.value = enlaceDe(intent)
        setContent {
            TemaBingo {
                App(enlace.value, jugador, control, enPip.value, ::permitirPip)
            }
        }
    }

    override fun onNewIntent(intent: Intent) {
        super.onNewIntent(intent)
        enlaceDe(intent)?.let { enlace.value = it }
    }

    override fun onStart() {
        super.onStart()
        Notificador.enPrimerPlano = true
    }

    override fun onStop() {
        Notificador.enPrimerPlano = false
        super.onStop()
    }

    private fun parametrosPip(): PictureInPictureParams? {
        if (Build.VERSION.SDK_INT < 26) return null
        return PictureInPictureParams.Builder().setAspectRatio(Rational(16, 9)).apply {
            if (Build.VERSION.SDK_INT >= 31) setAutoEnterEnabled(pipPermitido)
        }.build()
    }

    fun permitirPip(permitido: Boolean) {
        if (pipPermitido == permitido) return
        pipPermitido = permitido
        if (Build.VERSION.SDK_INT >= 26) runCatching { parametrosPip()?.let(::setPictureInPictureParams) }
    }

    // Android 8–11: no hay entrada automática, se entra al pulsar Inicio
    override fun onUserLeaveHint() {
        super.onUserLeaveHint()
        if (pipPermitido && Build.VERSION.SDK_INT in 26..30) runCatching { parametrosPip()?.let(::enterPictureInPictureMode) }
    }

    override fun onPictureInPictureModeChanged(enModoPip: Boolean, nuevaConfig: Configuration) {
        super.onPictureInPictureModeChanged(enModoPip, nuevaConfig)
        enPip.value = enModoPip
    }
}
