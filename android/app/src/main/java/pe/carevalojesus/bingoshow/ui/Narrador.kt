package pe.carevalojesus.bingoshow.ui

import android.content.Context
import android.speech.tts.TextToSpeech
import pe.carevalojesus.bingoshow.logica.letraDe
import java.util.Locale

/** Canta las bolas con la voz del teléfono («¡B 7!»), como el narrador del show. */
class Narrador(contexto: Context) {
    private var listo = false
    private val voz: TextToSpeech = TextToSpeech(contexto.applicationContext) { estado ->
        if (estado != TextToSpeech.SUCCESS) return@TextToSpeech
        listo = listOf(Locale.forLanguageTag("es-PE"), Locale.forLanguageTag("es-US"), Locale.forLanguageTag("es-ES"), Locale.forLanguageTag("es"))
            .any { voz.isLanguageAvailable(it) >= TextToSpeech.LANG_AVAILABLE && voz.setLanguage(it) >= TextToSpeech.LANG_AVAILABLE }
        voz.setSpeechRate(0.95f)
    }

    fun bola(n: Int) = decir("${letraDe(n)}, $n")

    fun decir(texto: String) {
        if (listo) voz.speak(texto, TextToSpeech.QUEUE_FLUSH, null, "bingo")
    }

    fun liberar() {
        runCatching { voz.stop(); voz.shutdown() }
    }
}
