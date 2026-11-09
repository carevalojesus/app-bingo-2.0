package pe.carevalojesus.bingoshow.ui

import android.content.Context
import android.media.AudioManager
import android.media.ToneGenerator
import android.os.Build
import android.os.VibrationEffect
import android.os.Vibrator
import android.os.VibratorManager

/** Vibración y sonidos cortos (como vibrar() y sonar() de la web). */
class Efectos(contexto: Context, private val sonidoActivo: () -> Boolean) {
    private val vibrador: Vibrator? = if (Build.VERSION.SDK_INT >= 31) {
        (contexto.getSystemService(Context.VIBRATOR_MANAGER_SERVICE) as? VibratorManager)?.defaultVibrator
    } else {
        @Suppress("DEPRECATION")
        contexto.getSystemService(Context.VIBRATOR_SERVICE) as? Vibrator
    }
    private val tonos: ToneGenerator? = runCatching { ToneGenerator(AudioManager.STREAM_MUSIC, 70) }.getOrNull()

    /** Patrón como en la web: [vibra, pausa, vibra, …] en milisegundos. */
    fun vibrar(vararg patron: Long) {
        val v = vibrador ?: return
        if (!v.hasVibrator() || patron.isEmpty()) return
        runCatching {
            if (patron.size == 1) v.vibrate(VibrationEffect.createOneShot(patron[0], VibrationEffect.DEFAULT_AMPLITUDE))
            else v.vibrate(VibrationEffect.createWaveform(longArrayOf(0, *patron), -1))
        }
    }

    fun campana() = tono(ToneGenerator.TONE_PROP_BEEP2, 180)
    fun golpe() = tono(ToneGenerator.TONE_PROP_BEEP, 90)
    fun fanfarria() = tono(ToneGenerator.TONE_CDMA_ALERT_CALL_GUARD, 600)
    fun error() = tono(ToneGenerator.TONE_PROP_NACK, 200)

    private fun tono(tipo: Int, ms: Int) {
        if (!sonidoActivo()) return
        runCatching { tonos?.startTone(tipo, ms) }
    }

    fun liberar() {
        runCatching { tonos?.release() }
    }
}
