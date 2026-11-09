package pe.carevalojesus.bingoshow.qr

import android.Manifest
import android.content.pm.PackageManager
import android.net.Uri
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.annotation.OptIn
import androidx.camera.core.CameraSelector
import androidx.camera.core.ExperimentalGetImage
import androidx.camera.core.ImageAnalysis
import androidx.camera.core.Preview
import androidx.camera.lifecycle.ProcessCameraProvider
import androidx.camera.view.PreviewView
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.safeDrawingPadding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberUpdatedState
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalLifecycleOwner
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.viewinterop.AndroidView
import androidx.core.content.ContextCompat
import com.google.mlkit.vision.barcode.BarcodeScannerOptions
import com.google.mlkit.vision.barcode.BarcodeScanning
import com.google.mlkit.vision.barcode.common.Barcode
import com.google.mlkit.vision.common.InputImage
import pe.carevalojesus.bingoshow.datos.normalizarCodigo
import pe.carevalojesus.bingoshow.ui.Boton
import pe.carevalojesus.bingoshow.ui.Carta
import pe.carevalojesus.bingoshow.ui.Colores
import pe.carevalojesus.bingoshow.ui.display
import pe.carevalojesus.bingoshow.ui.ui
import java.util.concurrent.Executors

/** Saca el código de sala de un QR: el enlace del show (…/jugar.html?sala=K7Q2XM) o el código suelto. */
fun codigoDeQr(texto: String): String? {
    val sala = runCatching { Uri.parse(texto).getQueryParameter("sala") }.getOrNull()
    val c = normalizarCodigo(sala ?: texto.trim())
    return c.takeIf { it.length == 6 && (sala != null || texto.trim().length == 6) }
}

@Composable
fun PantallaEscaner(alLeer: (String) -> Unit, alCerrar: () -> Unit) {
    val contexto = LocalContext.current
    var permiso by remember {
        mutableStateOf(ContextCompat.checkSelfPermission(contexto, Manifest.permission.CAMERA) == PackageManager.PERMISSION_GRANTED)
    }
    var negado by remember { mutableStateOf(false) }
    val pedir = rememberLauncherForActivityResult(ActivityResultContracts.RequestPermission()) { ok -> permiso = ok; negado = !ok }
    LaunchedEffect(Unit) { if (!permiso) pedir.launch(Manifest.permission.CAMERA) }

    Box(Modifier.fillMaxSize().background(Colores.escenario)) {
        if (permiso) Camara(alLeer)
        // Marco de mira
        Box(Modifier.align(Alignment.Center).size(250.dp).border(4.dp, Colores.girasol, RoundedCornerShape(24.dp)))
        Column(Modifier.align(Alignment.TopCenter).safeDrawingPadding().padding(16.dp)) {
            Carta(Modifier.fillMaxWidth()) {
                Text("Escanea el QR del show", style = display(20.sp))
                Text(
                    if (negado) "Sin permiso de cámara no se puede escanear. Escribe el código de la sala." else "Apunta a la pantalla donde se ve el bombo.",
                    style = ui(13.sp, FontWeight.Bold, Colores.tinta.copy(alpha = 0.7f)),
                )
            }
        }
        Box(Modifier.align(Alignment.BottomCenter).safeDrawingPadding().padding(16.dp)) {
            Boton("Escribir el código", alCerrar, Modifier.fillMaxWidth(), fondo = Colores.crema, alto = 52.dp)
        }
        if (!permiso && !negado) Text("Pidiendo permiso…", Modifier.align(Alignment.Center), style = ui(14.sp, FontWeight.Black, Colores.crema), textAlign = TextAlign.Center)
    }
}

@OptIn(ExperimentalGetImage::class)
@Composable
private fun Camara(alLeer: (String) -> Unit) {
    val contexto = LocalContext.current
    val ciclo = LocalLifecycleOwner.current
    val leer by rememberUpdatedState(alLeer)
    val hilo = remember { Executors.newSingleThreadExecutor() }
    val lector = remember {
        BarcodeScanning.getClient(BarcodeScannerOptions.Builder().setBarcodeFormats(Barcode.FORMAT_QR_CODE).build())
    }
    var leido by remember { mutableStateOf(false) }
    DisposableEffect(Unit) { onDispose { lector.close(); hilo.shutdown() } }

    AndroidView(
        factory = { ctx ->
            val vista = PreviewView(ctx).apply { scaleType = PreviewView.ScaleType.FILL_CENTER }
            val futuro = ProcessCameraProvider.getInstance(ctx)
            futuro.addListener({
                val proveedor = futuro.get()
                val vistaPrevia = Preview.Builder().build().also { it.surfaceProvider = vista.surfaceProvider }
                val analisis = ImageAnalysis.Builder().setBackpressureStrategy(ImageAnalysis.STRATEGY_KEEP_ONLY_LATEST).build()
                analisis.setAnalyzer(hilo) { imagen ->
                    val media = imagen.image
                    if (media == null || leido) { imagen.close(); return@setAnalyzer }
                    lector.process(InputImage.fromMediaImage(media, imagen.imageInfo.rotationDegrees))
                        .addOnSuccessListener { codigos ->
                            val c = codigos.firstNotNullOfOrNull { it.rawValue?.let(::codigoDeQr) }
                            if (c != null && !leido) { leido = true; leer(c) }
                        }
                        .addOnCompleteListener { imagen.close() }
                }
                runCatching {
                    proveedor.unbindAll()
                    proveedor.bindToLifecycle(ciclo, CameraSelector.DEFAULT_BACK_CAMERA, vistaPrevia, analisis)
                }
            }, ContextCompat.getMainExecutor(ctx))
            vista
        },
        modifier = Modifier.fillMaxSize(),
    )
}
