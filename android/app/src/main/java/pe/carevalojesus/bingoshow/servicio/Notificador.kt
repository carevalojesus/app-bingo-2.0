package pe.carevalojesus.bingoshow.servicio

import android.Manifest
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Build
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import androidx.core.content.ContextCompat
import pe.carevalojesus.bingoshow.MainActivity
import pe.carevalojesus.bingoshow.R

/**
 * Notificaciones de la app:
 * - «partida»: fija mientras estás en una sala (última bola, saldo…). La mantiene el ServicioPartida.
 * - «alertas»: con sonido, solo cuando la app no está a la vista (te falta 1, ganaste, te dieron fichas,
 *   alguien pide fichas…).
 */
object Notificador {
    const val CANAL_PARTIDA = "partida"
    const val CANAL_ALERTAS = "alertas"
    const val ID_PARTIDA = 1

    /** La app está a la vista (lo marca MainActivity en onStart/onStop). */
    @Volatile var enPrimerPlano = false

    /** Texto de la notificación fija; el servicio lo lee al arrancar. */
    @Volatile var titulo = "Bingo Show"
    @Volatile var texto = "Conectado a la sala"
    private var siguienteId = 100

    fun crearCanales(contexto: Context) {
        if (Build.VERSION.SDK_INT < 26) return
        val gestor = contexto.getSystemService(NotificationManager::class.java)
        gestor.createNotificationChannel(
            NotificationChannel(CANAL_PARTIDA, "Partida en curso", NotificationManager.IMPORTANCE_LOW).apply {
                description = "Última bola y estado de la sala mientras juegas"
                setShowBadge(false)
            },
        )
        gestor.createNotificationChannel(
            NotificationChannel(CANAL_ALERTAS, "Avisos del juego", NotificationManager.IMPORTANCE_HIGH).apply {
                description = "Te falta 1, ganaste, fichas recibidas y solicitudes de fichas"
                enableVibration(true)
            },
        )
    }

    fun abrirApp(contexto: Context): PendingIntent = PendingIntent.getActivity(
        contexto, 0,
        Intent(contexto, MainActivity::class.java).addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP),
        PendingIntent.FLAG_IMMUTABLE or PendingIntent.FLAG_UPDATE_CURRENT,
    )

    fun notificacionPartida(contexto: Context) = NotificationCompat.Builder(contexto, CANAL_PARTIDA)
        .setSmallIcon(R.drawable.ic_notificacion)
        .setColor(0xFFFF5A36.toInt())
        .setContentTitle(titulo)
        .setContentText(texto)
        .setStyle(NotificationCompat.BigTextStyle().bigText(texto))
        .setOngoing(true)
        .setOnlyAlertOnce(true)
        .setSilent(true)
        .setCategory(NotificationCompat.CATEGORY_PROGRESS)
        .setContentIntent(abrirApp(contexto))
        .build()

    fun puedeNotificar(contexto: Context) = Build.VERSION.SDK_INT < 33 ||
        ContextCompat.checkSelfPermission(contexto, Manifest.permission.POST_NOTIFICATIONS) == PackageManager.PERMISSION_GRANTED

    /** Actualiza la notificación fija (si el servicio está en marcha). */
    fun actualizar(contexto: Context, nuevoTitulo: String, nuevoTexto: String) {
        if (nuevoTitulo == titulo && nuevoTexto == texto) return
        titulo = nuevoTitulo
        texto = nuevoTexto
        if (!ServicioPartida.activo || !puedeNotificar(contexto)) return
        runCatching { NotificationManagerCompat.from(contexto).notify(ID_PARTIDA, notificacionPartida(contexto)) }
    }

    /** Aviso con sonido; solo si la app no está a la vista (dentro de la app ya se ve y suena). */
    fun alerta(contexto: Context, tituloAlerta: String, textoAlerta: String) {
        if (enPrimerPlano || !puedeNotificar(contexto)) return
        val n = NotificationCompat.Builder(contexto, CANAL_ALERTAS)
            .setSmallIcon(R.drawable.ic_notificacion)
            .setColor(0xFFFF5A36.toInt())
            .setContentTitle(tituloAlerta)
            .setContentText(textoAlerta)
            .setPriority(NotificationCompat.PRIORITY_HIGH)
            .setCategory(NotificationCompat.CATEGORY_EVENT)
            .setAutoCancel(true)
            .setContentIntent(abrirApp(contexto))
            .build()
        runCatching { NotificationManagerCompat.from(contexto).notify(siguienteId++, n) }
    }
}
