package pe.carevalojesus.bingoshow.servicio

import android.app.Service
import android.content.Context
import android.content.Intent
import android.content.pm.ServiceInfo
import android.os.Build
import android.os.IBinder
import androidx.core.app.ServiceCompat
import androidx.core.content.ContextCompat

/**
 * Servicio en primer plano mientras estás en una sala (jugando o controlando): mantiene viva la
 * conexión aunque cambies a WhatsApp y muestra la notificación fija con la última bola.
 * No hace trabajo propio: la conexión vive en los ViewModel; esto solo evita que Android la corte.
 */
class ServicioPartida : Service() {
    override fun onBind(intent: Intent?): IBinder? = null

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        Notificador.crearCanales(this)
        val tipo = if (Build.VERSION.SDK_INT >= 34) ServiceInfo.FOREGROUND_SERVICE_TYPE_SPECIAL_USE else 0
        runCatching {
            ServiceCompat.startForeground(this, Notificador.ID_PARTIDA, Notificador.notificacionPartida(this), tipo)
            activo = true
        }.onFailure { stopSelf() }
        return START_NOT_STICKY
    }

    override fun onDestroy() {
        activo = false
        super.onDestroy()
    }

    companion object {
        @Volatile var activo = false
        /** Quién lo necesita ahora mismo (jugador, control): se para cuando no queda nadie. */
        private val usuarios = mutableSetOf<String>()

        @Synchronized fun iniciar(contexto: Context, quien: String) {
            usuarios += quien
            if (activo) return
            runCatching { ContextCompat.startForegroundService(contexto, Intent(contexto, ServicioPartida::class.java)) }
        }

        @Synchronized fun detener(contexto: Context, quien: String) {
            usuarios -= quien
            if (usuarios.isNotEmpty()) return
            runCatching { contexto.stopService(Intent(contexto, ServicioPartida::class.java)) }
            activo = false
        }
    }
}
