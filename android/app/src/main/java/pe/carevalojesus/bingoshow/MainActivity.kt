package pe.carevalojesus.bingoshow

import android.content.Intent
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.SystemBarStyle
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.runtime.mutableStateOf
import pe.carevalojesus.bingoshow.ui.TemaBingo

class MainActivity : ComponentActivity() {
    private val enlace = mutableStateOf<Enlace?>(null)

    override fun onCreate(savedInstanceState: Bundle?) {
        enableEdgeToEdge(SystemBarStyle.dark(0xFF1A0D36.toInt()), SystemBarStyle.dark(0xFF1A0D36.toInt()))
        super.onCreate(savedInstanceState)
        if (savedInstanceState == null) enlace.value = enlaceDe(intent?.data)
        setContent { TemaBingo { App(enlace.value) } }
    }

    override fun onNewIntent(intent: Intent) {
        super.onNewIntent(intent)
        enlaceDe(intent.data)?.let { enlace.value = it }
    }
}
