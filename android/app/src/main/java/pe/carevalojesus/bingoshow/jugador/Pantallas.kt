package pe.carevalojesus.bingoshow.jugador

import androidx.compose.animation.core.Animatable
import androidx.compose.animation.core.LinearEasing
import androidx.compose.animation.core.tween
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxWithConstraints
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.imePadding
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.safeDrawingPadding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.layout.widthIn
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.DisposableEffect
import androidx.compose.ui.platform.LocalView
import androidx.compose.ui.platform.LocalContext
import android.content.Intent
import androidx.compose.runtime.getValue
import androidx.compose.runtime.produceState
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.scale
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardCapitalization
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import kotlinx.coroutines.delay
import pe.carevalojesus.bingoshow.datos.EstadoConexion
import pe.carevalojesus.bingoshow.datos.Estado
import pe.carevalojesus.bingoshow.logica.generarCarton
import pe.carevalojesus.bingoshow.logica.letraDe
import pe.carevalojesus.bingoshow.logica.nombreBola
import pe.carevalojesus.bingoshow.logica.nombreModalidad
import pe.carevalojesus.bingoshow.logica.numerosDeFila
import pe.carevalojesus.bingoshow.logica.verificar
import pe.carevalojesus.bingoshow.ui.Boton
import pe.carevalojesus.bingoshow.ui.Campo
import pe.carevalojesus.bingoshow.ui.Carta
import pe.carevalojesus.bingoshow.ui.Colores
import pe.carevalojesus.bingoshow.ui.Etiqueta
import pe.carevalojesus.bingoshow.ui.Ficha
import pe.carevalojesus.bingoshow.ui.LogoBS
import pe.carevalojesus.bingoshow.ui.Pastilla
import pe.carevalojesus.bingoshow.ui.Recuadro
import pe.carevalojesus.bingoshow.ui.display
import pe.carevalojesus.bingoshow.ui.ui
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

/** Reloj que se actualiza 4 veces por segundo (cuentas atrás). */
@Composable
fun ahoraVivo(): Long {
    val ahora by produceState(System.currentTimeMillis()) {
        while (true) { value = System.currentTimeMillis(); delay(250) }
    }
    return ahora
}

// =====================================================================
// Entrar
// =====================================================================
@Composable
fun PantallaEntrar(vm: JugadorViewModel, alEscanear: () -> Unit, alVolver: () -> Unit) {
    Column(
        Modifier.fillMaxSize().verticalScroll(rememberScrollState()).safeDrawingPadding().imePadding().padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
    ) {
        Cabecera("Bingo Show", "", null, alVolver = alVolver)
        Column(Modifier.widthIn(max = 520.dp).fillMaxWidth()) {
            Text("Entra a jugar", Modifier.padding(top = 18.dp), style = display(30.sp, Colores.crema))
            Text("Escanea el QR de la pantalla del show o escribe el código de la sala.", Modifier.padding(top = 4.dp), style = ui(15.sp, FontWeight.Bold, Colores.crema.copy(alpha = 0.8f)))
            if (vm.expulsado) {
                Recuadro(Modifier.fillMaxWidth().padding(top = 14.dp), fondo = Colores.tomate) {
                    Text("El anfitrión te sacó de la sala.", style = ui(14.sp, FontWeight.Black, Colores.crema))
                }
            }
            Carta(Modifier.fillMaxWidth().padding(top = 18.dp)) {
                Boton("📷 Escanear el QR", alEscanear, Modifier.fillMaxWidth(), fondo = Colores.menta, alto = 54.dp)
                Etiqueta("Código de sala", Modifier.padding(top = 16.dp))
                Campo(
                    vm.codigoEntrada, vm::cambiarCodigo, Modifier.fillMaxWidth().padding(top = 6.dp), "K7Q2XM",
                    estilo = display(24.sp).copy(letterSpacing = 6.sp),
                    teclado = KeyboardOptions(capitalization = KeyboardCapitalization.Characters), alineacion = TextAlign.Center,
                )
                vm.infoSala?.let { info ->
                    Recuadro(Modifier.fillMaxWidth().padding(top = 8.dp)) {
                        Column {
                            Text(info.nombre.ifBlank { "Sala ${info.codigo}" }, style = display(16.sp))
                            val unidad = when (info.config?.tipo) { "fila" -> "fila"; "elige" -> "jugada"; else -> "cartón" }
                            Text(
                                listOfNotNull(
                                    if (info.estado == "lobby") "Eligiendo" else if (info.estado == "terminada") "Terminada" else "Jugando",
                                    "${info.jugadores} ${if (info.jugadores == 1) "jugador" else "jugadores"}",
                                    info.config?.let { "$unidad ${fichas(it.precioCarton)}" },
                                    info.config?.premios?.joinToString(" + ") { nombreModalidad(it.modalidad) },
                                ).joinToString(" · "),
                                style = ui(12.sp, FontWeight.Bold, Colores.tinta.copy(alpha = 0.75f)),
                            )
                        }
                    }
                }
                Etiqueta("Tu apodo", Modifier.padding(top = 14.dp))
                Campo(vm.apodoEntrada, { vm.apodoEntrada = it.take(20) }, Modifier.fillMaxWidth().padding(top = 6.dp), "Ej: Tía Rosa")
                vm.errorEntrada?.let { Text(it, Modifier.padding(top = 8.dp), style = ui(14.sp, FontWeight.Black, Colores.tomate)) }
                Boton("Entrar", { vm.entrar() }, Modifier.fillMaxWidth().padding(top = 16.dp), fondo = Colores.girasol, alto = 54.dp)
                Text(
                    "Las fichas son virtuales y no valen dinero en la app. Sin cuentas: este móvil recuerda tu sitio en la sala.",
                    Modifier.padding(top = 10.dp), style = ui(12.sp, FontWeight.Bold, Colores.tinta.copy(alpha = 0.7f)),
                )
            }
            Historial(vm)
        }
    }
}

@Composable
private fun Historial(vm: JugadorViewModel) {
    val lista = remember { vm.prefs.historial() }
    if (lista.isEmpty()) return
    val fecha = remember { SimpleDateFormat("d MMM, HH:mm", Locale.forLanguageTag("es-PE")) }
    Carta(Modifier.fillMaxWidth().padding(top = 20.dp)) {
        val balance = lista.sumOf { it.ganado - it.gastado }
        Row(verticalAlignment = Alignment.CenterVertically) {
            Text("Tu historial", Modifier.weight(1f), style = display(20.sp))
            Text("${lista.size} partidas · balance ${if (balance >= 0) "+" else ""}${fmt(balance)}", style = ui(12.sp, FontWeight.Black))
        }
        Column(Modifier.padding(top = 8.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
            for (h in lista.take(10)) {
                Recuadro(Modifier.fillMaxWidth(), fondo = if (h.ganado > 0) Colores.girasol else Color.White) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Column(Modifier.weight(1f)) {
                            Text("${h.nombre.ifBlank { "Sala ${h.sala}" }} · ronda ${h.ronda}", style = ui(14.sp, FontWeight.Black), maxLines = 1, overflow = TextOverflow.Ellipsis)
                            Text("${fecha.format(Date(h.en))} · ${h.jugadas} ${h.unidad} · gastaste ${fmt(h.gastado)}", style = ui(11.sp, FontWeight.Bold, Colores.tinta.copy(alpha = 0.7f)))
                        }
                        Text(if (h.ganado > 0) "+${fmt(h.ganado)}" else "—", style = display(15.sp))
                    }
                }
            }
        }
        Text("Se guarda solo en este móvil.", Modifier.padding(top = 6.dp), style = ui(11.sp, FontWeight.Bold, Colores.tinta.copy(alpha = 0.6f)))
    }
}

@Composable
fun Cabecera(titulo: String, subtitulo: String, conexion: EstadoConexion?, logo: androidx.compose.ui.graphics.ImageBitmap? = null, sonido: Boolean? = null, alSonido: () -> Unit = {}, alVolver: (() -> Unit)? = null, voz: Boolean? = null, alVoz: () -> Unit = {}) {
    Row(Modifier.fillMaxWidth().widthIn(max = 560.dp), verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(10.dp)) {
        Box(Modifier.then(if (alVolver != null) Modifier.clickable(onClick = alVolver) else Modifier)) {
            if (logo != null) {
                Image(logo, "Logo del evento", Modifier.size(width = 72.dp, height = 36.dp).clip(RoundedCornerShape(8.dp)).background(Color.White).border(2.5.dp, Colores.tinta, RoundedCornerShape(8.dp)).padding(2.dp))
            } else LogoBS()
        }
        Column(Modifier.weight(1f)) {
            Text(titulo, style = display(16.sp, Colores.crema), maxLines = 1, overflow = TextOverflow.Ellipsis)
            if (subtitulo.isNotBlank()) Text(subtitulo.uppercase(), style = ui(10.sp, FontWeight.Black, Colores.crema.copy(alpha = 0.7f)).copy(letterSpacing = 1.6.sp), maxLines = 1, overflow = TextOverflow.Ellipsis)
        }
        if (conexion != null) {
            Pastilla(
                conexion.texto,
                when (conexion) { EstadoConexion.CONECTADO -> Colores.menta; EstadoConexion.RECONECTANDO -> Colores.tomate; else -> Colores.crema },
                if (conexion == EstadoConexion.RECONECTANDO) Colores.crema else Colores.tinta,
            )
        }
        if (voz != null) {
            Box(
                Modifier.size(42.dp).clip(RoundedCornerShape(10.dp)).background(if (voz) Colores.girasol else Colores.crema).border(2.5.dp, Colores.tinta, RoundedCornerShape(10.dp)).clickable(onClick = alVoz),
                contentAlignment = Alignment.Center,
            ) { Text(if (voz) "🗣️" else "🤐", style = ui(18.sp)) }
        }
        if (sonido != null) {
            Box(
                Modifier.size(42.dp).clip(RoundedCornerShape(10.dp)).background(Colores.crema).border(2.5.dp, Colores.tinta, RoundedCornerShape(10.dp)).clickable(onClick = alSonido),
                contentAlignment = Alignment.Center,
            ) { Text(if (sonido) "🔊" else "🔇", style = ui(18.sp)) }
        }
    }
}

// =====================================================================
// Sala
// =====================================================================
@Composable
fun PantallaSala(vm: JugadorViewModel) {
    val s = vm.sala
    val ahora = ahoraVivo()
    // Pantalla siempre encendida mientras hay partida (o cuenta atrás): no te pierdes bolas
    val vista = LocalView.current
    val encender = s?.enJuego == true || vm.cuentaHasta != null
    DisposableEffect(encender) {
        vista.keepScreenOn = encender
        onDispose { vista.keepScreenOn = false }
    }
    Box(Modifier.fillMaxSize()) {
        Column(
            Modifier.fillMaxSize().verticalScroll(rememberScrollState()).safeDrawingPadding().imePadding().padding(16.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
        ) {
            val estadoTexto = when {
                s == null -> ""
                s.jugador(vm.miId)?.admitido == false -> "En espera"
                s.estado == "lobby" -> "Eligiendo ${unidades(s).second}"
                s.estado == "jugando" -> "Jugando"
                s.estado == "pausa" -> "En pausa"
                else -> "Terminada"
            }
            Cabecera(
                s?.nombre?.ifBlank { null } ?: "Bingo Show", "Sala ${vm.codigo} · $estadoTexto", vm.conexion, vm.logo,
                vm.sonido, vm::cambiarSonido, voz = vm.voz, alVoz = vm::cambiarVoz,
            )
            Column(Modifier.widthIn(max = 520.dp).fillMaxWidth().padding(top = 16.dp)) {
                if (s == null) {
                    Carta(Modifier.fillMaxWidth()) { Text("Conectando con la sala…", style = ui(16.sp, FontWeight.Black)) }
                } else {
                    ResumenJugador(s, vm.miId)
                    when {
                        s.jugador(vm.miId)?.admitido == false -> VistaEspera(vm)
                        s.estado == "lobby" -> VistaLobby(vm, s, ahora)
                        s.enJuego -> VistaJuego(vm, s, ahora)
                        else -> VistaFin(vm, s, ahora)
                    }
                }
                Text(
                    "Salir de la sala", Modifier.align(Alignment.CenterHorizontally).padding(vertical = 24.dp).clickable { vm.salir() },
                    style = ui(12.sp, FontWeight.Black, Colores.crema.copy(alpha = 0.7f)).copy(letterSpacing = 1.sp),
                )
            }
        }
        Reacciones(vm)
        Avisos(vm, Modifier.align(Alignment.BottomCenter))
        vm.cuentaHasta?.let { hasta -> CuentaAtras(hasta, vm.cuentaMs, ahora) { vm.cuentaHasta = null } }
        vm.celebracion?.let { CapaCelebracion(vm, it) }
    }
}

@Composable
private fun ResumenJugador(s: Estado, miId: String?) {
    val yo = s.jugador(miId)
    if (yo == null) {
        Carta(Modifier.fillMaxWidth()) { Text("Conectado como observador: aún no apareces en la lista de jugadores.", style = ui(14.sp)) }
        return
    }
    Row(
        Modifier.fillMaxWidth().clip(RoundedCornerShape(16.dp)).background(Colores.crema).border(3.dp, Colores.tinta, RoundedCornerShape(16.dp)).padding(horizontal = 16.dp, vertical = 10.dp),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Column(Modifier.weight(1f)) {
            Etiqueta("Jugando como")
            Text(yo.apodo, style = display(18.sp), maxLines = 1, overflow = TextOverflow.Ellipsis)
        }
        Column(horizontalAlignment = Alignment.End) {
            Etiqueta("Tus fichas")
            Text(fmt(yo.fichas), style = display(24.sp))
        }
    }
}

// ---------- En espera (sala con admisión) ----------
@Composable
private fun VistaEspera(vm: JugadorViewModel) {
    Carta(Modifier.fillMaxWidth().padding(top = 16.dp)) {
        Text("⏳", Modifier.align(Alignment.CenterHorizontally), style = ui(36.sp))
        Text("Esperando al anfitrión", Modifier.fillMaxWidth(), style = display(22.sp), textAlign = TextAlign.Center)
        Text(
            "En esta sala el anfitrión admite a cada jugador y le asigna sus fichas. Cuando lo haga, podrás elegir.",
            Modifier.fillMaxWidth().padding(top = 4.dp), style = ui(14.sp, FontWeight.Bold, Colores.tinta.copy(alpha = 0.7f)), textAlign = TextAlign.Center,
        )
    }
    TarjetaPedirFichas(vm, "Pide tus fichas")
}

// ---------- Lobby ----------
@Composable
private fun VistaLobby(vm: JugadorViewModel, s: Estado, ahora: Long) {
    val c = s.config
    val (uno, varios) = unidades(s)
    Carta(Modifier.fillMaxWidth().padding(top = 16.dp)) {
        Text("Esperando a que el anfitrión empiece", style = display(19.sp))
        Text(
            when {
                c.esFila -> "Elige tus filas: cada una tiene 5 números, uno de cada letra. Gana la primera fila que complete sus 5 números y se lleva el pozo. No hace falta cantar."
                c.esElige -> "Arma tus jugadas: elige 5 números del 1 al 75 (o al azar). Gana quien complete sus 5 primero; si empatan, se reparte. No hace falta cantar."
                else -> "Elige tus cartones por número. Los números de cada cartón se revelan al empezar: así nadie puede elegir «el bueno»."
            },
            Modifier.padding(top = 4.dp), style = ui(14.sp, FontWeight.Bold, Colores.tinta.copy(alpha = 0.75f)),
        )
        TarjetaRonda(s, vm.miId, ahora, vm::repetir)
        if (!s.anfitrionConectado) Recuadro(Modifier.fillMaxWidth().padding(top = 8.dp), fondo = Colores.papel) { Text("El anfitrión no está conectado ahora mismo.", style = ui(12.sp, FontWeight.Black)) }
        Row(Modifier.fillMaxWidth().padding(top = 12.dp), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            Dato(uno.replaceFirstChar { it.uppercase() }, fmt(c.precioCarton), "fichas", modifier = Modifier.weight(1f))
            Dato("Máximo", fmt(c.maxCartonesPorJugador), "por jugador", modifier = Modifier.weight(1f))
            Dato("Pozo", fmt(s.pozoEstimado()), "fichas", Colores.girasol, Modifier.weight(1f))
        }
        Extras(s)
        Etiqueta("Premios", Modifier.padding(top = 14.dp, bottom = 6.dp))
        ListaPremios(s, vm.miId)
        BotonInvitar(vm, s)
    }

    val mios = s.misCartones(vm.miId)
    when {
        c.esElige -> Elige(vm, s, mios)
        else -> Carta(Modifier.fillMaxWidth().padding(top = 20.dp)) {
            Row(verticalAlignment = Alignment.Bottom) {
                Text(varios.replaceFirstChar { it.uppercase() }, Modifier.weight(1f), style = display(20.sp))
                Text("Tienes ${mios.size} de ${c.maxCartonesPorJugador}", style = ui(14.sp, FontWeight.Black))
            }
            Text("${s.vendidos} de ${c.cartones} vendidos · toca uno libre para elegirlo y uno tuyo para soltarlo.", style = ui(12.sp, FontWeight.Bold, Colores.tinta.copy(alpha = 0.7f)))
            if (mios.isNotEmpty()) Text("Tus $varios: ${mios.joinToString(", ")} · gastaste ${fichas(mios.size * c.precioCarton)}", Modifier.padding(top = 6.dp), style = ui(14.sp, FontWeight.Black))
            Spacer(Modifier.height(10.dp))
            if (c.esFila) {
                Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
                    for (n in 1..c.cartones) FilaVenta(vm, s, n)
                }
            } else {
                for (fila in (1..c.cartones).chunked(6)) {
                    Row(Modifier.fillMaxWidth().padding(bottom = 6.dp), horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                        for (n in fila) BotonCarton(vm, s, n, Modifier.weight(1f))
                        repeat(6 - fila.size) { Spacer(Modifier.weight(1f)) }
                    }
                }
            }
        }
    }
    if (c.admision) TarjetaPedirFichas(vm)
    if (!c.esAuto) {
        Carta(Modifier.fillMaxWidth().padding(top = 20.dp)) {
            Text(if (c.marcado == "libre") "¿Cómo quieres marcar?" else "Cómo se marca", style = display(20.sp))
            Spacer(Modifier.height(10.dp))
            SelectorMarcado(vm)
        }
    }
    Jugadores(s, vm.miId)
}

@Composable
private fun BotonCarton(vm: JugadorViewModel, s: Estado, n: Int, modifier: Modifier) {
    val dueno = s.dueno(n)
    val mio = dueno != null && dueno == vm.miId
    val fondo = when { mio -> Colores.girasol; dueno != null -> Colores.morado; else -> Color.White }
    Box(
        modifier.height(44.dp).alpha(if (vm.pendientes[n] == true) 0.5f else 1f).clip(RoundedCornerShape(10.dp)).background(fondo)
            .border(2.5.dp, Colores.tinta.copy(alpha = if (dueno != null && !mio) 0.6f else 1f), RoundedCornerShape(10.dp))
            .clickable { vm.tocarCartonLobby(n) },
        contentAlignment = Alignment.Center,
    ) { Text("$n", style = display(15.sp, if (dueno != null && !mio) Colores.crema.copy(alpha = 0.6f) else Colores.tinta)) }
}

@Composable
private fun FilaVenta(vm: JugadorViewModel, s: Estado, n: Int) {
    val dueno = s.dueno(n)
    val mio = dueno != null && dueno == vm.miId
    val ocupada = dueno != null && !mio
    Row(
        Modifier.fillMaxWidth().alpha(if (vm.pendientes[n] == true) 0.5f else 1f).clip(RoundedCornerShape(12.dp))
            .background(if (mio) Colores.girasol else if (ocupada) Colores.morado else Color.White)
            .border(2.5.dp, Colores.tinta, RoundedCornerShape(12.dp)).clickable { vm.tocarCartonLobby(n) }.padding(horizontal = 8.dp, vertical = 6.dp),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Text("$n", Modifier.width(28.dp), style = display(17.sp, if (ocupada) Colores.crema.copy(alpha = 0.7f) else Colores.tinta), textAlign = TextAlign.Center)
        Row(Modifier.weight(1f).alpha(if (ocupada) 0.4f else 1f), horizontalArrangement = Arrangement.SpaceBetween) {
            for (x in numerosDeFila(n)) Ficha(x, 40.dp)
        }
        Text(
            if (mio) "TUYA" else if (ocupada) "DE ${s.jugador(dueno)?.apodo?.uppercase() ?: "OTRO"}" else "LIBRE",
            Modifier.width(56.dp), style = ui(9.sp, FontWeight.Black, if (ocupada) Colores.crema.copy(alpha = 0.7f) else Colores.tinta), textAlign = TextAlign.End, maxLines = 2,
        )
    }
}

@Composable
private fun Elige(vm: JugadorViewModel, s: Estado, mios: List<Int>) {
    val c = s.config
    Carta(Modifier.fillMaxWidth().padding(top = 20.dp)) {
        Row(verticalAlignment = Alignment.Bottom) {
            Text("Tus jugadas", Modifier.weight(1f), style = display(20.sp))
            Text("Tienes ${mios.size} de ${c.maxCartonesPorJugador}", style = ui(14.sp, FontWeight.Black))
        }
        Text("${s.vendidos} de ${c.cartones} jugadas vendidas · cada una cuesta ${fichas(c.precioCarton)}.", style = ui(12.sp, FontWeight.Bold, Colores.tinta.copy(alpha = 0.7f)))
        for (id in mios) {
            Row(
                Modifier.fillMaxWidth().padding(top = 6.dp).clip(RoundedCornerShape(12.dp)).background(Colores.girasol).border(2.5.dp, Colores.tinta, RoundedCornerShape(12.dp)).padding(6.dp),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                Text("$id", Modifier.width(26.dp), style = display(15.sp), textAlign = TextAlign.Center)
                Row(Modifier.weight(1f), horizontalArrangement = Arrangement.SpaceBetween) { for (x in s.jugadas[id.toString()] ?: emptyList()) Ficha(x, 36.dp) }
                Spacer(Modifier.width(6.dp))
                Boton("Soltar", { vm.soltarJugada(id) }, alto = 36.dp, estilo = ui(11.sp, FontWeight.Black))
            }
        }
        if (mios.size >= c.maxCartonesPorJugador) {
            Text("Ya tienes el máximo de jugadas. Suelta una para armar otra.", Modifier.padding(top = 10.dp), style = ui(14.sp, FontWeight.Black))
            return@Carta
        }
        Etiqueta("Nueva jugada · ${vm.borrador.size}/5", Modifier.padding(top = 14.dp, bottom = 6.dp))
        Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(4.dp)) {
            listOf("B", "I", "N", "G", "O").forEachIndexed { i, l ->
                Box(Modifier.weight(1f).clip(RoundedCornerShape(6.dp)).background(Colores.columnas[i]).border(2.dp, Colores.tinta, RoundedCornerShape(6.dp)), contentAlignment = Alignment.Center) {
                    Text(l, style = display(14.sp))
                }
            }
        }
        for (f in 0 until 15) {
            Row(Modifier.fillMaxWidth().padding(top = 4.dp), horizontalArrangement = Arrangement.spacedBy(4.dp)) {
                for (col in 0 until 5) {
                    val n = col * 15 + f + 1
                    val activo = n in vm.borrador
                    Box(
                        Modifier.weight(1f).height(36.dp).clip(RoundedCornerShape(8.dp)).background(if (activo) Colores.columnas[col] else Color.White)
                            .border(2.5.dp, Colores.tinta, RoundedCornerShape(8.dp)).clickable { vm.tocarNumero(n) },
                        contentAlignment = Alignment.Center,
                    ) { Text("$n", style = display(14.sp)) }
                }
            }
        }
        Row(Modifier.fillMaxWidth().padding(top = 10.dp), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            Boton("🎲 Al azar", vm::numerosAlAzar, Modifier.weight(1f))
            Boton("Borrar", { vm.borrador = emptySet() }, Modifier.weight(1f), habilitado = vm.borrador.isNotEmpty())
        }
        Boton(
            if (vm.borrador.size == 5) "Comprar jugada · ${fichas(c.precioCarton)}" else "Elige ${5 - vm.borrador.size} más",
            vm::comprarJugada, Modifier.fillMaxWidth().padding(top = 8.dp), fondo = Colores.girasol, habilitado = vm.borrador.size == 5,
        )
    }
}

@Composable
private fun Jugadores(s: Estado, miId: String?) {
    val lista = s.jugadores.sortedWith(compareByDescending<pe.carevalojesus.bingoshow.datos.Jugador> { it.id == miId }.thenByDescending { it.conectado }.thenBy { it.apodo })
    Carta(Modifier.fillMaxWidth().padding(top = 20.dp)) {
        Text("Jugadores (${lista.size})", style = display(20.sp))
        for (j in lista) {
            Row(Modifier.padding(top = 6.dp).alpha(if (j.conectado) 1f else 0.5f), verticalAlignment = Alignment.CenterVertically) {
                Box(Modifier.size(10.dp).clip(CircleShape).background(if (j.conectado) Colores.menta else Colores.papel).border(2.dp, Colores.tinta, CircleShape))
                Spacer(Modifier.width(8.dp))
                Text("${j.apodo}${if (j.id == miId) " (tú)" else ""}", Modifier.weight(1f), style = ui(14.sp, if (j.id == miId) FontWeight.Black else FontWeight.Bold), maxLines = 1, overflow = TextOverflow.Ellipsis)
                Text("${j.cartones.size} ${if (j.cartones.size == 1) unidades(s).first else unidades(s).second}", style = ui(12.sp, FontWeight.Black))
            }
        }
    }
}

// ---------- Partida ----------
@Composable
private fun VistaJuego(vm: JugadorViewModel, s: Estado, ahora: Long) {
    val ultima = s.bolas.lastOrNull()
    val intervalo = s.config.intervalo.coerceAtLeast(1000)
    Carta(Modifier.fillMaxWidth().padding(top = 16.dp)) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            val escala = remember(vm.ultimaBolaNueva) { Animatable(if (vm.ultimaBolaNueva > 0) 0.4f else 1f) }
            LaunchedEffect(vm.ultimaBolaNueva) { escala.animateTo(1f, tween(450)) }
            Ficha(ultima, 92.dp, Modifier.scale(escala.value))
            Spacer(Modifier.width(14.dp))
            Column(Modifier.weight(1f)) {
                Etiqueta("Última bola")
                Text(ultima?.let { nombreBola(it) } ?: "—", style = display(30.sp))
                Text("${s.bolas.size}/75 bolas", style = ui(14.sp, FontWeight.Black))
                Row(Modifier.padding(top = 6.dp), horizontalArrangement = Arrangement.spacedBy(5.dp)) {
                    for (n in s.bolas.dropLast(1).takeLast(5).reversed()) Ficha(n, 32.dp)
                }
            }
            Anillo(s, ahora, intervalo)
        }
    }
    when {
        s.estado == "pausa" -> Recuadro(Modifier.fillMaxWidth().padding(top = 12.dp), fondo = Colores.cobalto) {
            Column {
                Text("Partida en pausa", style = display(17.sp, Colores.crema))
                Text("El anfitrión detuvo el sorteo. Seguirá en cuanto lo reanude.", style = ui(13.sp, FontWeight.Bold, Colores.crema))
            }
        }
        s.ventanaHasta != null -> Recuadro(Modifier.fillMaxWidth().padding(top = 12.dp), fondo = Colores.fucsia) {
            Column {
                if (s.config.esAuto) Text("¡Hay una ${unidades(s).first} completa! Comprobando…", style = display(17.sp))
                else {
                    Text("¡Alguien cantó bingo! ¿Tú también?", style = display(17.sp))
                    Text("Si tu cartón está completo, canta ahora.", style = ui(13.sp, FontWeight.Black))
                }
            }
        }
    }
    val premio = s.premioEnJuego()
    Carta(Modifier.fillMaxWidth().padding(top = 16.dp)) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            Column(Modifier.weight(1f)) {
                Etiqueta("Premio en juego")
                Text("${premio?.let { nombreModalidad(it.modalidad) } ?: "—"}${if (premio?.doble == true) " ×2" else ""}", style = display(20.sp))
                premio?.let { Text(pe.carevalojesus.bingoshow.logica.detalleModalidad(it.modalidad), style = ui(12.sp, FontWeight.Bold, Colores.tinta.copy(alpha = 0.7f))) }
            }
            Column(
                Modifier.clip(RoundedCornerShape(12.dp)).background(Colores.girasol).border(2.5.dp, Colores.tinta, RoundedCornerShape(12.dp)).padding(horizontal = 12.dp, vertical = 6.dp),
                horizontalAlignment = Alignment.CenterHorizontally,
            ) {
                Text(fmt(premio?.fichas ?: 0), style = display(20.sp))
                Text("FICHAS", style = ui(10.sp, FontWeight.Black))
            }
        }
        Extras(s)
    }
    Row(Modifier.fillMaxWidth().padding(top = 12.dp), horizontalArrangement = Arrangement.spacedBy(6.dp)) {
        for (e in REACCIONES) Boton(e, { vm.reaccionar(e) }, Modifier.weight(1f), alto = 44.dp, mayusculas = false, estilo = ui(20.sp))
    }
    Text("Tus ${unidades(s).second}", Modifier.padding(top = 20.dp), style = display(20.sp, Colores.crema))
    if (!s.config.esAuto) {
        Spacer(Modifier.height(8.dp))
        SelectorMarcado(vm)
        if (s.config.marcado == "libre") {
            Text(
                if (vm.marcaSolo()) "Cada bola que sale se marca sola en tus cartones. Tú solo cantas ¡Bingo!" else "Toca los números que ya salieron. Tu ¡Bingo! se comprueba con las bolas reales.",
                Modifier.padding(top = 6.dp), style = ui(12.sp, FontWeight.Bold, Colores.crema.copy(alpha = 0.7f)),
            )
        }
    } else {
        Text("Tus ${unidades(s).second} se marcan solas. Cuando una complete sus 5 números, el premio se entrega solo.", Modifier.padding(top = 4.dp), style = ui(12.sp, FontWeight.Bold, Colores.crema.copy(alpha = 0.7f)))
    }
    MisCartones(vm, s, ahora)
}

@Composable
private fun Anillo(s: Estado, ahora: Long, intervalo: Int) {
    val restante = s.siguienteBolaEn?.let { (it - ahora).coerceIn(0, intervalo.toLong()) }
    val fraccion = if (s.estado == "jugando" && s.ventanaHasta == null && restante != null) restante.toFloat() / intervalo else 0f
    val texto = when {
        s.estado == "pausa" -> "II"
        s.ventanaHasta != null -> "!"
        restante != null -> "${(restante + 999) / 1000}"
        else -> ""
    }
    Box(Modifier.size(64.dp), contentAlignment = Alignment.Center) {
        Canvas(Modifier.fillMaxSize()) {
            val trazo = 5.dp.toPx()
            drawCircle(Color.White, radius = size.minDimension / 2 - trazo / 2)
            drawCircle(Colores.tinta.copy(alpha = 0.15f), radius = size.minDimension / 2 - trazo / 2, style = Stroke(trazo))
            drawArc(Colores.tinta, -90f, 360f * fraccion, false, Offset(trazo / 2, trazo / 2), Size(size.width - trazo, size.height - trazo), style = Stroke(trazo))
        }
        Text(texto, style = display(18.sp))
    }
}

@Composable
private fun MisCartones(vm: JugadorViewModel, s: Estado, ahora: Long) {
    val mios = s.misCartones(vm.miId)
    val (uno, varios) = unidades(s)
    if (mios.isEmpty()) {
        Carta(Modifier.fillMaxWidth().padding(top = 12.dp)) { Text("No tienes $varios en esta partida. Sigue el show y elige en la siguiente.", style = ui(14.sp)) }
        return
    }
    val salidas = s.bolas.toSet()
    val completos = mutableListOf<String>()
    val casi = mutableListOf<Pair<String, String>>()
    if (s.config.esAuto) {
        val filas = mios.map { n ->
            val numeros = if (s.config.esFila) numerosDeFila(n) else s.jugadas[n.toString()] ?: emptyList()
            Triple(n, numeros, numeros.filter { it !in salidas })
        }.sortedWith(compareBy({ it.third.size }, { it.first }))
        for ((n, numeros, faltan) in filas) {
            val clave = "${s.serie}:$uno$n"
            if (faltan.isEmpty()) completos += clave
            if (faltan.size == 1) casi += clave to "$uno $n (${nombreBola(faltan[0])})"
            Carta(Modifier.fillMaxWidth().padding(top = 12.dp), fondo = if (faltan.isEmpty()) Colores.girasol else Colores.crema) {
                Row(Modifier.fillMaxWidth().padding(bottom = 8.dp), verticalAlignment = Alignment.CenterVertically) {
                    Text("${uno.replaceFirstChar { it.uppercase() }} $n", Modifier.weight(1f), style = display(17.sp))
                    when {
                        faltan.isEmpty() -> Pastilla("¡Completa!", Colores.girasol)
                        faltan.size == 1 -> Pastilla("¡Te falta 1!", Colores.tomate, Colores.crema)
                        else -> Text("TE FALTAN ${faltan.size}", style = ui(12.sp, FontWeight.Black))
                    }
                }
                FilaNumeros(numeros, salidas)
            }
        }
    } else {
        val serie = s.serie ?: return
        val modalidad = s.premioEnJuego()?.modalidad ?: "lleno"
        for (n in mios) {
            val carton = remember(serie, n) { generarCarton(serie, n) }
            val marcas = vm.marcasDe(n)
            val r = verificar(carton, marcas, modalidad)
            val clave = "$serie:$n:${s.premioActual}"
            if (r.gana) completos += clave
            if (!r.gana && r.faltan.size == 1) casi += clave to "cartón $n (${nombreBola(r.faltan[0])})"
            val bloqueado = (vm.cantando[n] ?: 0) > ahora
            Carta(Modifier.fillMaxWidth().padding(top = 12.dp), relleno = 12.dp) {
                Row(Modifier.fillMaxWidth().padding(bottom = 8.dp, start = 4.dp, end = 4.dp), verticalAlignment = Alignment.CenterVertically) {
                    Text("Cartón $n", Modifier.weight(1f), style = display(17.sp))
                    if (r.gana) Pastilla("¡${nombreModalidad(modalidad)}!", Colores.girasol)
                    else Text("TE ${if (r.faltan.size == 1) "FALTA" else "FALTAN"} ${r.faltan.size}", style = ui(12.sp, FontWeight.Black))
                }
                CartonVista(
                    carton, r.marcadas, if (r.gana) r.figura else emptyList(),
                    alTocar = if (vm.marcaSolo()) null else { numero -> vm.tocarCelda(n, numero) },
                    modifier = Modifier.align(Alignment.CenterHorizontally),
                )
                Boton(
                    if (bloqueado) "Comprobando…" else "¡Bingo!", { vm.cantar(n) }, Modifier.fillMaxWidth().padding(top = 12.dp),
                    fondo = if (r.gana) Colores.girasol else Colores.crema, alto = if (r.gana) 60.dp else 48.dp, habilitado = !bloqueado,
                    estilo = if (r.gana) display(22.sp) else ui(15.sp, FontWeight.Black), mayusculas = !r.gana,
                )
            }
        }
    }
    LaunchedEffect(completos.toList(), casi.toList()) { vm.avisarCartones(completos, casi) }
}

// ---------- Fin ----------
@Composable
private fun VistaFin(vm: JugadorViewModel, s: Estado, ahora: Long) {
    val yo = s.jugador(vm.miId)
    val ganado = s.premios.sumOf { p -> p.ganadores.filter { it.jugadorId == vm.miId }.sumOf { it.fichas + it.bote } }
    Carta(Modifier.fillMaxWidth().padding(top = 16.dp)) {
        Etiqueta("Partida terminada", Modifier.align(Alignment.CenterHorizontally))
        Text(if (ganado > 0) "¡Ganaste ${fichas(ganado)}!" else "Esta vez no hubo suerte", Modifier.fillMaxWidth(), style = display(24.sp), textAlign = TextAlign.Center)
        yo?.let { Text("Tu saldo: ${fmt(it.fichas)} fichas", Modifier.fillMaxWidth().padding(top = 6.dp), style = ui(15.sp, FontWeight.Bold), textAlign = TextAlign.Center) }
        Text("${s.bolas.size} bolas · pozo de ${fichas(s.pozo)}", Modifier.fillMaxWidth(), style = ui(13.sp, FontWeight.Bold, Colores.tinta.copy(alpha = 0.7f)), textAlign = TextAlign.Center)
    }
    Carta(Modifier.fillMaxWidth().padding(top = 20.dp)) {
        Text("Resultados", style = display(20.sp))
        Spacer(Modifier.height(8.dp))
        ListaPremios(s, vm.miId, conGanadores = true)
    }
    Ranking(s, vm.miId)
    if (s.config.admision) TarjetaPedirFichas(vm, "¿Quieres más fichas?")
    if (s.config.rondasSeguidas) Carta(Modifier.fillMaxWidth().padding(top = 20.dp)) { TarjetaRonda(s, vm.miId, ahora, vm::repetir) }
    TarjetaVerificar(vm)
    Recuadro(Modifier.fillMaxWidth().padding(top = 20.dp), fondo = Colores.papel) {
        Column(Modifier.fillMaxWidth(), horizontalAlignment = Alignment.CenterHorizontally) {
            Text("Esperando nueva partida…", style = display(17.sp))
            Text("Cuando el anfitrión la abra podrás elegir ${unidades(s).second} otra vez. Tu saldo se conserva.", style = ui(13.sp), textAlign = TextAlign.Center)
        }
    }
}

// =====================================================================
// Capas: avisos, reacciones, cuenta atrás y celebración
// =====================================================================
@Composable
private fun Avisos(vm: JugadorViewModel, modifier: Modifier) {
    Column(modifier.safeDrawingPadding().padding(16.dp).widthIn(max = 520.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
        for (a in vm.avisos.takeLast(3)) {
            Box(
                Modifier.fillMaxWidth().clip(RoundedCornerShape(14.dp)).background(if (a.error) Colores.tomate else Colores.crema)
                    .border(3.dp, Colores.tinta, RoundedCornerShape(14.dp)).padding(horizontal = 14.dp, vertical = 10.dp),
            ) { Text(a.texto, style = ui(14.sp, FontWeight.Black, if (a.error) Colores.crema else Colores.tinta)) }
        }
    }
}

@Composable
private fun Reacciones(vm: JugadorViewModel) {
    BoxWithConstraints(Modifier.fillMaxSize()) {
        val alto = maxHeight
        val ancho = maxWidth
        for (r in vm.reacciones) {
            val subida = remember(r.id) { Animatable(0f) }
            LaunchedEffect(r.id) { subida.animateTo(1f, tween(2600, easing = LinearEasing)) }
            Text(
                r.emoji,
                Modifier.offset(x = ancho * r.x, y = alto * (0.85f - 0.5f * subida.value)).alpha(1f - subida.value),
                style = ui(34.sp),
            )
        }
    }
}

/** «¡Atentos!» 3, 2, 1, ¡Ya! antes de la primera bola. */
@Composable
fun CuentaAtras(hasta: Long, ms: Long, ahora: Long, alTerminar: () -> Unit) {
    val restante = hasta - ahora
    if (restante <= -300) { LaunchedEffect(hasta) { alTerminar() }; return }
    val pasos = maxOf(1, (ms / 1000).toInt() - 1)
    val paso = ms / (pasos + 1)
    val transcurrido = (ms - restante).coerceAtLeast(0)
    val n = (pasos - (transcurrido / paso).toInt()).coerceAtLeast(0)
    val escala = remember(n) { Animatable(2.2f) }
    LaunchedEffect(n) { escala.animateTo(1f, tween(450)) }
    Box(Modifier.fillMaxSize().background(Color(0xD90A0618)), contentAlignment = Alignment.Center) {
        Column(horizontalAlignment = Alignment.CenterHorizontally) {
            Pastilla("¡Atentos!", Colores.tomate, Colores.crema)
            Text(if (n > 0) "$n" else "¡Ya!", Modifier.scale(escala.value), style = display(if (n > 0) 140.sp else 96.sp, if (n > 0) Colores.girasol else Colores.menta))
        }
    }
}

@Composable
private fun CapaCelebracion(vm: JugadorViewModel, c: Celebracion) {
    val mios = c.ganadores.filter { it.jugadorId == vm.miId }
    val total = mios.sumOf { it.fichas + it.bote }
    val (uno, _) = unidades(vm.sala)
    LaunchedEffect(c) { delay(12_000); if (vm.celebracion == c) vm.celebracion = null }
    Box(Modifier.fillMaxSize().background(Color(0xB3140F2B)).clickable { vm.celebracion = null }.padding(20.dp), contentAlignment = Alignment.Center) {
        Carta(Modifier.widthIn(max = 420.dp).fillMaxWidth().clickable(enabled = false) {}) {
            Etiqueta(nombreModalidad(c.modalidad), Modifier.align(Alignment.CenterHorizontally))
            Text(if (mios.isNotEmpty()) "¡Ganaste!" else "¡${nombreModalidad(c.modalidad)}!", Modifier.fillMaxWidth(), style = display(34.sp), textAlign = TextAlign.Center)
            if (mios.isNotEmpty()) Recuadro(Modifier.fillMaxWidth().padding(top = 10.dp), fondo = Colores.girasol) { Text("Te llevas ${fichas(total)}.", style = ui(15.sp, FontWeight.Black)) }
            if (c.bote > 0) Recuadro(Modifier.fillMaxWidth().padding(top = 8.dp), fondo = Colores.fucsia) { Text("¡Y se lleva el bote de ${fichas(c.bote)}!", style = ui(15.sp, FontWeight.Black)) }
            for (g in c.ganadores) {
                val yo = g.jugadorId == vm.miId
                Recuadro(Modifier.fillMaxWidth().padding(top = 8.dp), fondo = if (yo) Colores.girasol else Color.White) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Text("${g.apodo}${if (yo) " (tú)" else ""} · $uno ${g.carton}", Modifier.weight(1f), style = ui(14.sp, FontWeight.Black))
                        Text(fmt(g.fichas), style = display(15.sp))
                    }
                }
            }
            Text(
                if (c.siguiente != null) "Sigue el juego: ahora va ${nombreModalidad(c.siguiente)}." else "No quedan premios: fin de la partida.",
                Modifier.padding(top = 12.dp), style = ui(14.sp, FontWeight.Bold),
            )
            Boton("Seguir", { vm.celebracion = null }, Modifier.fillMaxWidth().padding(top = 14.dp), fondo = Colores.menta)
        }
    }
}

@Composable
private fun BotonInvitar(vm: JugadorViewModel, s: Estado) {
    val contexto = LocalContext.current
    Boton(
        "📤 Invitar a la sala", {
            val texto = "¡Ven a jugar bingo conmigo${if (s.nombre.isNotBlank()) " en ${s.nombre}" else ""}! Sala ${s.codigo}: ${vm.enlaceSala()}"
            contexto.startActivity(Intent.createChooser(Intent(Intent.ACTION_SEND).apply { type = "text/plain"; putExtra(Intent.EXTRA_TEXT, texto) }, "Invitar"))
        },
        Modifier.fillMaxWidth().padding(top = 14.dp), fondo = Colores.menta, alto = 46.dp,
    )
}

/** Ventana flotante (picture-in-picture): última bola y cuánto te falta. */
@Composable
fun VistaPip(vm: JugadorViewModel) {
    val s = vm.sala
    val ultima = s?.bolas?.lastOrNull()
    val salidas = s?.bolas?.toSet() ?: emptySet()
    val mios = vm.misNumeros()
    Row(Modifier.fillMaxSize().background(Colores.escenario).padding(8.dp), verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
        Ficha(ultima, 64.dp)
        Column(Modifier.weight(1f)) {
            Text(ultima?.let { nombreBola(it) } ?: "—", style = display(20.sp, Colores.crema))
            Text("${s?.bolas?.size ?: 0}/75", style = ui(11.sp, FontWeight.Black, Colores.crema.copy(alpha = 0.8f)))
            if (mios.isNotEmpty()) Text("Tuyos: ${mios.count { it in salidas }}/${mios.size}", style = ui(11.sp, FontWeight.Black, Colores.girasol))
            if (s?.estado == "pausa") Text("EN PAUSA", style = ui(10.sp, FontWeight.Black, Colores.tomate))
        }
    }
}

// Letra de la columna para accesibilidad (no se usa en la vista, pero útil en pruebas)
fun etiquetaBola(n: Int) = "${letraDe(n)} $n"
