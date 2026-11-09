package pe.carevalojesus.bingoshow.control

import android.content.Intent
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.imePadding
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.safeDrawingPadding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.layout.widthIn
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateMapOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.getValue
import androidx.compose.runtime.setValue
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.saveable.rememberSaveable
import pe.carevalojesus.bingoshow.jugador.ahoraVivo
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardCapitalization
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import pe.carevalojesus.bingoshow.datos.Estado
import pe.carevalojesus.bingoshow.jugador.Cabecera
import pe.carevalojesus.bingoshow.jugador.fmt
import pe.carevalojesus.bingoshow.ui.Boton
import pe.carevalojesus.bingoshow.ui.Campo
import pe.carevalojesus.bingoshow.ui.Carta
import pe.carevalojesus.bingoshow.ui.Colores
import pe.carevalojesus.bingoshow.ui.Etiqueta
import pe.carevalojesus.bingoshow.ui.Recuadro
import pe.carevalojesus.bingoshow.ui.display
import pe.carevalojesus.bingoshow.ui.ui
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

private val ESTADOS = mapOf("lobby" to "Sala de espera", "jugando" to "Jugando", "pausa" to "En pausa", "terminada" to "Terminada")
private val hora = SimpleDateFormat("HH:mm", Locale.forLanguageTag("es-PE"))

@Composable
fun PantallaControl(vm: ControlViewModel, alVolver: () -> Unit) {
    val s = vm.sala
    var crear by rememberSaveable { mutableStateOf(false) }
    LaunchedEffect(vm.codigo) { if (vm.codigo != null) crear = false }
    Box(Modifier.fillMaxSize()) {
        Column(
            Modifier.fillMaxSize().verticalScroll(rememberScrollState()).safeDrawingPadding().imePadding().padding(16.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
        ) {
            Cabecera(
                s?.nombre?.ifBlank { null } ?: if (s != null) "Sala ${s.codigo}" else "Control del anfitrión",
                s?.let { "Sala ${it.codigo} · ${ESTADOS[it.estado] ?: it.estado}" } ?: "",
                if (vm.codigo != null) vm.conexion else null,
                alVolver = { vm.desconectar(); alVolver() },
            )
            Column(Modifier.widthIn(max = 520.dp).fillMaxWidth().padding(top = 16.dp)) {
                when {
                    vm.codigo == null && crear -> FormularioCrear(vm) { crear = false }
                    vm.codigo == null -> Vincular(vm) { crear = true }
                    s == null -> Carta(Modifier.fillMaxWidth()) { Text("Conectando con la sala…", style = ui(16.sp, FontWeight.Black)) }
                    else -> Panel(vm, s)
                }
            }
        }
        Column(
            Modifier.align(Alignment.BottomCenter).safeDrawingPadding().padding(16.dp).widthIn(max = 520.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp),
        ) {
            for (a in vm.avisos.takeLast(3)) {
                Box(
                    Modifier.fillMaxWidth().clip(RoundedCornerShape(14.dp)).background(Colores.crema).border(3.dp, Colores.tinta, RoundedCornerShape(14.dp)).padding(horizontal = 14.dp, vertical = 10.dp),
                ) { Text(a, style = ui(14.sp, FontWeight.Black)) }
            }
        }
    }
}

@Composable
private fun Vincular(vm: ControlViewModel, alCrear: () -> Unit) {
    Carta(Modifier.fillMaxWidth(), relleno = 20.dp) {
        Text("¿Sala nueva?", style = display(22.sp))
        Text("Créala desde aquí y luego abre el show con el bombo en la tele.", Modifier.padding(top = 2.dp), style = ui(13.sp, FontWeight.Bold, Colores.tinta.copy(alpha = 0.7f)))
        Boton("Crear sala", alCrear, Modifier.fillMaxWidth().padding(top = 12.dp), fondo = Colores.girasol, alto = 52.dp)
    }
    Spacer(Modifier.height(20.dp))
    Carta(Modifier.fillMaxWidth(), relleno = 20.dp) {
        Text("¿Ya tienes una sala?", style = display(22.sp))
        Text(
            "En el show, pulsa «📱 Controlar desde mi móvil» y escribe el código de 6 cifras que aparece.",
            Modifier.padding(top = 4.dp), style = ui(14.sp, FontWeight.Bold, Colores.tinta.copy(alpha = 0.7f)),
        )
        Etiqueta("Sala", Modifier.padding(top = 16.dp))
        Campo(
            vm.codigoEntrada, { vm.codigoEntrada = pe.carevalojesus.bingoshow.datos.normalizarCodigo(it) }, Modifier.fillMaxWidth().padding(top = 6.dp), "K7Q2XM",
            estilo = display(22.sp).copy(letterSpacing = 5.sp), teclado = KeyboardOptions(capitalization = KeyboardCapitalization.Characters),
        )
        Etiqueta("Código de 6 cifras", Modifier.padding(top = 12.dp))
        Campo(
            vm.cifrasEntrada, { vm.cifrasEntrada = it.filter(Char::isDigit).take(6) }, Modifier.fillMaxWidth().padding(top = 6.dp), "123456",
            estilo = display(26.sp).copy(letterSpacing = 8.sp), teclado = KeyboardOptions(keyboardType = KeyboardType.NumberPassword),
        )
        vm.errorVincular?.let { Text(it, Modifier.padding(top = 8.dp), style = ui(14.sp, FontWeight.Black, Colores.tomate)) }
        Boton(
            if (vm.vinculando) "Vinculando…" else "Vincular este móvil", vm::vincular, Modifier.fillMaxWidth().padding(top = 16.dp),
            fondo = Colores.girasol, alto = 52.dp, habilitado = !vm.vinculando,
        )
    }
    val guardadas = remember { vm.salasGuardadas() }
    if (guardadas.isNotEmpty()) {
        Carta(Modifier.fillMaxWidth().padding(top = 20.dp)) {
            Text("Salas vinculadas", style = display(20.sp))
            Text("Este móvil ya controla estas salas.", style = ui(12.sp, FontWeight.Bold, Colores.tinta.copy(alpha = 0.7f)))
            Column(Modifier.padding(top = 8.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                for (c in guardadas) Boton("Sala $c", { vm.conectar(c) }, Modifier.fillMaxWidth(), mayusculas = false, estilo = display(16.sp))
            }
        }
    }
}

@Composable
private fun Panel(vm: ControlViewModel, s: Estado) {
    val contexto = LocalContext.current
    Carta(Modifier.fillMaxWidth()) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            Column(Modifier.weight(1f)) {
                Etiqueta("Pozo")
                Text(fmt(s.pozo), style = display(30.sp))
            }
            Column(horizontalAlignment = Alignment.End) {
                Etiqueta("Bolas")
                Text("${s.bolas.size}/75", style = display(30.sp))
            }
        }
        Column(Modifier.padding(top = 14.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
            when (s.estado) {
                "lobby" -> {
                    Boton("¡Empezar!", { vm.accion("iniciar") }, Modifier.fillMaxWidth(), fondo = Colores.girasol, alto = 56.dp, habilitado = s.ocupados.isNotEmpty(), estilo = display(20.sp), mayusculas = false)
                    if (s.ocupados.isEmpty()) Text("Nadie ha elegido aún: espera a que haya jugadas para empezar.", style = ui(12.sp, FontWeight.Bold, Colores.tinta.copy(alpha = 0.7f)))
                    if (s.inicioAutoEn != null) Boton("Detener la cuenta atrás", { vm.accion("detenerCuenta") }, Modifier.fillMaxWidth(), alto = 44.dp)
                }
                "jugando" -> Boton("⏸ Pausar", { vm.accion("pausar") }, Modifier.fillMaxWidth(), alto = 56.dp)
                "pausa" -> Boton("▶ Seguir", { vm.accion("reanudar") }, Modifier.fillMaxWidth(), fondo = Colores.menta, alto = 56.dp)
                "terminada" -> Boton("Nueva partida", { vm.accion("nuevaPartida") }, Modifier.fillMaxWidth(), fondo = Colores.girasol, alto = 56.dp)
            }
        }
    }

    PantallaShow(vm, s)

    val pedidos = s.solicitudes.associateBy { it.jugadorId }
    val pendientes = s.jugadores.filter { !it.admitido || it.id in pedidos }
    if (pendientes.isNotEmpty()) {
        Carta(Modifier.fillMaxWidth().padding(top = 20.dp)) {
            Text("Pendientes", style = display(20.sp))
            Column(Modifier.padding(top = 10.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                for (j in pendientes) {
                    val pedido = pedidos[j.id]
                    val espera = !j.admitido
                    Recuadro(Modifier.fillMaxWidth(), fondo = if (espera) Colores.papel else Color.White) {
                        Column {
                            Text(j.apodo, style = ui(15.sp, FontWeight.Black))
                            Text(
                                listOfNotNull(if (espera) "en espera" else null, pedido?.let { "pide ${fmt(it.cantidad)} fichas (${hora.format(Date(it.en))})" }).joinToString(" · "),
                                style = ui(12.sp, FontWeight.Bold, Colores.tinta.copy(alpha = 0.6f)),
                            )
                            Row(Modifier.padding(top = 8.dp), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                                if (pedido != null) Boton("Dar ${fmt(pedido.cantidad)}", { vm.darFichas(j.id, pedido.cantidad) }, fondo = Colores.menta, alto = 40.dp, estilo = ui(12.sp, FontWeight.Black))
                                if (espera && pedido == null) Boton("Admitir", { vm.admitir(j.id) }, fondo = Colores.menta, alto = 40.dp, estilo = ui(12.sp, FontWeight.Black))
                                if (espera) {
                                    val seguro = j.id in vm.porRechazar
                                    Boton(if (seguro) "¿Seguro?" else "Rechazar", { vm.rechazar(j.id) }, fondo = if (seguro) Colores.tomate else Colores.crema, alto = 40.dp, estilo = ui(12.sp, FontWeight.Black))
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    val admitidos = s.jugadores.filter { it.admitido }
    val cantidades = remember { mutableStateMapOf<String, String>() }
    Carta(Modifier.fillMaxWidth().padding(top = 20.dp)) {
        Row(verticalAlignment = Alignment.Bottom) {
            Text("Jugadores", Modifier.weight(1f), style = display(20.sp))
            Text("${admitidos.size} jugando · ${s.jugadores.size - admitidos.size} en espera", style = ui(12.sp, FontWeight.Black))
        }
        if (admitidos.isEmpty()) Text("Aún no hay jugadores admitidos.", Modifier.padding(top = 8.dp), style = ui(14.sp, FontWeight.Bold, Colores.tinta.copy(alpha = 0.6f)))
        Column(Modifier.padding(top = 10.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
            for (j in admitidos) {
                Recuadro(Modifier.fillMaxWidth()) {
                    Column {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Text(
                                "${j.apodo}${if (j.conectado) "" else " · desconectado"}", Modifier.weight(1f),
                                style = ui(15.sp, FontWeight.Black, if (j.conectado) Colores.tinta else Colores.tinta.copy(alpha = 0.5f)), maxLines = 1, overflow = TextOverflow.Ellipsis,
                            )
                            Text(fmt(j.fichas), style = display(16.sp))
                            Text(" fichas", style = ui(11.sp, FontWeight.Black))
                        }
                        Row(Modifier.padding(top = 8.dp), horizontalArrangement = Arrangement.spacedBy(8.dp), verticalAlignment = Alignment.CenterVertically) {
                            Campo(
                                cantidades[j.id] ?: "", { cantidades[j.id] = it.filter(Char::isDigit).take(6) }, Modifier.weight(1f), "Fichas",
                                teclado = KeyboardOptions(keyboardType = KeyboardType.Number),
                            )
                            val dar = { signo: Int ->
                                val n = cantidades[j.id]?.toIntOrNull()
                                if (n == null || n < 1) vm.avisar("Escribe cuántas fichas.") else { vm.darFichas(j.id, signo * n); cantidades[j.id] = "" }
                            }
                            Boton("Dar", { dar(1) }, fondo = Colores.menta, alto = 44.dp, estilo = ui(12.sp, FontWeight.Black))
                            Boton("Quitar", { dar(-1) }, alto = 44.dp, estilo = ui(12.sp, FontWeight.Black))
                        }
                    }
                }
            }
        }
    }

    if (s.movimientos.isNotEmpty()) {
        val total = s.movimientos.sumOf { it.cantidad }
        Carta(Modifier.fillMaxWidth().padding(top = 20.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Text("Registro", Modifier.weight(1f), style = display(20.sp), maxLines = 1)
                Boton("Compartir CSV", {
                    val envio = Intent(Intent.ACTION_SEND).apply {
                        type = "text/csv"
                        putExtra(Intent.EXTRA_SUBJECT, "fichas-${s.codigo}.csv")
                        putExtra(Intent.EXTRA_TEXT, vm.registroCsv())
                    }
                    contexto.startActivity(Intent.createChooser(envio, "Registro de fichas"))
                }, alto = 36.dp, estilo = ui(11.sp, FontWeight.Black))
            }
            Text("Total asignado: ${fmt(total)} fichas en ${s.movimientos.size} ${if (s.movimientos.size == 1) "movimiento" else "movimientos"}", Modifier.padding(top = 4.dp), style = ui(13.sp, FontWeight.Black))
            Column(Modifier.padding(top = 8.dp)) {
                for (m in s.movimientos.reversed().take(50)) {
                    Row(Modifier.fillMaxWidth().padding(vertical = 4.dp), verticalAlignment = Alignment.CenterVertically) {
                        Text(hora.format(Date(m.en)), style = ui(13.sp, FontWeight.Bold, Colores.tinta.copy(alpha = 0.5f)))
                        Spacer(Modifier.width(6.dp))
                        Text(m.apodo, Modifier.weight(1f), style = ui(13.sp, FontWeight.Bold), maxLines = 1, overflow = TextOverflow.Ellipsis)
                        Text("${if (m.cantidad > 0) "+" else ""}${fmt(m.cantidad)}", style = display(14.sp, if (m.cantidad < 0) Colores.tomate else Colores.tinta))
                    }
                    Box(Modifier.fillMaxWidth().height(2.dp).background(Colores.tinta.copy(alpha = 0.1f)))
                }
            }
        }
    }

    Text(
        "DESVINCULAR ESTE MÓVIL", Modifier.fillMaxWidth().padding(vertical = 24.dp).clickable { vm.desvincular() },
        style = ui(12.sp, FontWeight.Black, Colores.crema.copy(alpha = 0.7f)).copy(letterSpacing = 1.sp), textAlign = TextAlign.Center,
    )
}

/** Llevar la sala a la pantalla grande e invitar a los jugadores. */
@Composable
private fun PantallaShow(vm: ControlViewModel, s: Estado) {
    val contexto = LocalContext.current
    val ahora = ahoraVivo()
    val compartir = { texto: String ->
        contexto.startActivity(Intent.createChooser(Intent(Intent.ACTION_SEND).apply { type = "text/plain"; putExtra(Intent.EXTRA_TEXT, texto) }, "Compartir"))
    }
    Carta(Modifier.fillMaxWidth().padding(top = 20.dp)) {
        Text("Pantalla del show", style = display(20.sp))
        Text(
            "En la tele o la laptop abre ${vm.enlaceShow().substringAfter("://")} y escribe ahí el código que generes aquí. Vale 2 minutos y un solo uso.",
            Modifier.padding(top = 4.dp), style = ui(13.sp, FontWeight.Bold, Colores.tinta.copy(alpha = 0.7f)),
        )
        val codigo = vm.codigoShow?.takeIf { vm.codigoShowHasta > ahora }
        if (codigo != null) {
            Recuadro(Modifier.fillMaxWidth().padding(top = 10.dp), fondo = Colores.girasol) {
                Column(Modifier.fillMaxWidth(), horizontalAlignment = Alignment.CenterHorizontally) {
                    Text(codigo.chunked(3).joinToString(" "), style = display(36.sp).copy(letterSpacing = 4.sp))
                    val seg = (vm.codigoShowHasta - ahora) / 1000
                    Text("Caduca en ${seg / 60}:${"%02d".format(seg % 60)}", style = ui(12.sp, FontWeight.Black))
                }
            }
        }
        Row(Modifier.fillMaxWidth().padding(top = 10.dp), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            Boton(if (codigo != null) "Otro código" else "Generar código", vm::pedirCodigoShow, Modifier.weight(1f), fondo = Colores.menta, alto = 46.dp, estilo = ui(12.sp, FontWeight.Black))
            Boton("Enviar enlace", { compartir("Show de Bingo Show (sala ${s.codigo}): ${vm.enlaceShow()}") }, Modifier.weight(1f), alto = 46.dp, estilo = ui(12.sp, FontWeight.Black))
        }
        Boton(
            "📤 Invitar jugadores", { compartir("¡Ven a jugar bingo${if (s.nombre.isNotBlank()) " en ${s.nombre}" else ""}! Sala ${s.codigo}: ${vm.enlaceJugar()}") },
            Modifier.fillMaxWidth().padding(top = 8.dp), fondo = Colores.girasol, alto = 46.dp,
        )
    }
}
