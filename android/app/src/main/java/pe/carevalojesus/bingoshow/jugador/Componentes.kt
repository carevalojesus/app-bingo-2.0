package pe.carevalojesus.bingoshow.jugador

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.layout.widthIn
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import pe.carevalojesus.bingoshow.datos.Estado
import pe.carevalojesus.bingoshow.datos.PremioEnJuego
import pe.carevalojesus.bingoshow.logica.Carton
import pe.carevalojesus.bingoshow.logica.Casilla
import pe.carevalojesus.bingoshow.logica.LETRAS
import pe.carevalojesus.bingoshow.logica.detalleModalidad
import pe.carevalojesus.bingoshow.logica.nombreBola
import pe.carevalojesus.bingoshow.logica.nombreModalidad
import pe.carevalojesus.bingoshow.ui.Boton
import pe.carevalojesus.bingoshow.ui.Campo
import pe.carevalojesus.bingoshow.ui.Carta
import pe.carevalojesus.bingoshow.ui.Colores
import pe.carevalojesus.bingoshow.ui.Etiqueta
import pe.carevalojesus.bingoshow.ui.Ficha
import pe.carevalojesus.bingoshow.ui.Recuadro
import pe.carevalojesus.bingoshow.ui.colorDeBola
import pe.carevalojesus.bingoshow.ui.display
import pe.carevalojesus.bingoshow.ui.ui
import java.text.NumberFormat
import java.util.Locale

private val formato = NumberFormat.getIntegerInstance(Locale.forLanguageTag("es-PE"))
fun fmt(n: Int): String = formato.format(n)
fun fichas(n: Int) = "${fmt(n)} ${if (n == 1) "ficha" else "fichas"}"

// ---------- Cartón 5×5 ----------
@Composable
fun CartonVista(
    carton: Carton,
    marcadas: List<List<Boolean>>,
    clave: List<Casilla>,
    alTocar: ((Int) -> Unit)?,
    modifier: Modifier = Modifier,
) {
    Column(
        modifier
            .widthIn(max = 360.dp)
            .clip(RoundedCornerShape(18.dp))
            .background(Color.White)
            .border(3.dp, Colores.tinta, RoundedCornerShape(18.dp))
            .padding(10.dp),
        verticalArrangement = Arrangement.spacedBy(6.dp),
    ) {
        Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
            LETRAS.forEachIndexed { c, letra ->
                Box(
                    Modifier.weight(1f).height(40.dp).clip(RoundedCornerShape(8.dp)).background(Colores.columnas[c])
                        .border(2.5.dp, Colores.tinta, RoundedCornerShape(8.dp)),
                    contentAlignment = Alignment.Center,
                ) { Text(letra, style = display(22.sp, if (c == 3) Colores.crema else Colores.tinta)) }
            }
        }
        for (f in 0 until 5) {
            Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                for (c in 0 until 5) {
                    val numero = carton.valor(c, f)
                    val marcada = marcadas[c][f]
                    val esClave = (c to f) in clave
                    val forma = RoundedCornerShape(8.dp)
                    Box(
                        Modifier
                            .weight(1f)
                            .aspectRatio(1f)
                            .clip(forma)
                            .background(
                                when {
                                    numero == null -> Colores.girasol
                                    marcada -> Colores.columnas[c]
                                    else -> Color.White
                                },
                            )
                            .border(if (esClave) 4.dp else 2.5.dp, Colores.tinta, forma)
                            .then(if (numero != null && alTocar != null) Modifier.clickable { alTocar(numero) } else Modifier),
                        contentAlignment = Alignment.Center,
                    ) {
                        if (numero == null) {
                            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                                Text("★", style = display(18.sp))
                                Text("LIBRE", style = ui(8.sp, FontWeight.Black))
                            }
                        } else {
                            Text("$numero", style = display(20.sp, if (marcada && c == 3) Colores.crema else Colores.tinta))
                        }
                    }
                }
            }
        }
        Row(Modifier.fillMaxWidth().padding(horizontal = 2.dp), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.Bottom) {
            Text("BINGO SHOW", style = ui(10.sp, FontWeight.Black).copy(letterSpacing = 1.sp))
            Text(carton.codigo, style = display(14.sp))
        }
    }
}

// ---------- Fila de 5 / jugada de Elige tus 5 ----------
@Composable
fun FilaNumeros(numeros: List<Int>, salidas: Set<Int>, tamano: Int = 52) {
    Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
        for (x in numeros) {
            val salio = x in salidas
            Box {
                Ficha(x, tamano.dp, Modifier.alpha(if (salio) 1f else 0.35f))
                if (salio) {
                    Box(
                        Modifier.align(Alignment.TopEnd).size(20.dp).clip(CircleShape).background(Colores.menta).border(2.dp, Colores.tinta, CircleShape),
                        contentAlignment = Alignment.Center,
                    ) { Text("✓", style = ui(11.sp, FontWeight.Black)) }
                }
            }
        }
    }
}

// ---------- Premios ----------
@Composable
fun ListaPremios(s: Estado, miId: String?, conGanadores: Boolean = false) {
    val (uno, _) = unidades(s)
    val lista = s.premios.ifEmpty { s.config.premios.map { PremioEnJuego(it.modalidad, it.porcentaje, s.pozoEstimado() * it.porcentaje / 100) } }
    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
        lista.forEachIndexed { i, p ->
            val enJuego = s.estado != "lobby" && s.premioActual == i
            val entregado = p.ganadores.isNotEmpty()
            Recuadro(Modifier.fillMaxWidth(), fondo = if (enJuego) Colores.girasol else if (entregado) Colores.papel else Color.White) {
                Column {
                    Row(Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
                        Text("${i + 1}. ${nombreModalidad(p.modalidad)}${if (p.doble) " ×2" else ""}", Modifier.weight(1f), style = ui(15.sp, FontWeight.Black))
                        Text("${fmt(p.fichas)} fichas", style = display(14.sp))
                    }
                    Text(
                        detalleModalidad(p.modalidad) + " · ${p.porcentaje} %" + (if (enJuego) " · En juego" else if (entregado) " · Entregado" else ""),
                        style = ui(12.sp, FontWeight.Bold, Colores.tinta.copy(alpha = 0.7f)),
                    )
                    if (conGanadores || entregado) {
                        for (g in p.ganadores) {
                            val yo = g.jugadorId == miId
                            Text(
                                "${g.apodo}${if (yo) " (tú)" else ""} · $uno ${g.carton} · ${fichas(g.fichas)}${if (g.bote > 0) " + bote ${fmt(g.bote)}" else ""}",
                                style = ui(12.sp, if (yo) FontWeight.Black else FontWeight.Bold),
                            )
                        }
                    }
                }
            }
        }
    }
}

// ---------- Ronda, bote y bola dorada ----------
@Composable
fun Extras(s: Estado) {
    val c = s.config
    if (c.botePorcentaje <= 0 && !c.bolaDorada) return
    Column(Modifier.padding(top = 12.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
        if (c.botePorcentaje > 0) {
            Recuadro(Modifier.fillMaxWidth(), fondo = Colores.fucsia) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Column(Modifier.weight(1f)) {
                        Text("Bote acumulado", style = ui(15.sp, FontWeight.Black))
                        Text("Para quien gane el último premio en ${c.boteBolas} bolas o menos", style = ui(12.sp))
                    }
                    Text(fmt(s.bote + if (s.estado == "lobby") s.aporteRonda else 0), style = display(20.sp))
                }
            }
        }
        if (c.bolaDorada) {
            Recuadro(Modifier.fillMaxWidth(), fondo = Colores.girasol) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Column(Modifier.weight(1f)) {
                        Text("Bola dorada", style = ui(15.sp, FontWeight.Black))
                        Text(if (s.doradaSalio) "Ya salió" else "Si sale antes del ganador, el premio se duplica", style = ui(12.sp))
                    }
                    Text(s.dorada?.let { nombreBola(it) } ?: "¿?", style = display(20.sp))
                }
            }
        }
    }
}

@Composable
fun TarjetaRonda(s: Estado, miId: String?, ahora: Long, alRepetir: (Boolean) -> Unit) {
    if (!s.config.rondasSeguidas) return
    val yo = s.jugador(miId)
    Recuadro(Modifier.fillMaxWidth().padding(top = 12.dp), fondo = Colores.menta) {
        Column {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Text("Ronda ${s.ronda}", Modifier.weight(1f), style = display(18.sp))
                val hasta = if (s.estado == "lobby") s.inicioAutoEn else if (s.estado == "terminada") s.siguienteRondaEn else null
                if (hasta != null) {
                    val seg = maxOf(0L, (hasta - ahora + 999) / 1000)
                    Text(if (s.estado == "lobby") "Empieza en $seg s" else "Siguiente ronda en $seg s", style = ui(14.sp, FontWeight.Black))
                }
            }
            if (yo != null) {
                Row(Modifier.padding(top = 6.dp).clickable { alRepetir(!yo.repetir) }, verticalAlignment = Alignment.CenterVertically) {
                    CasillaMarca(yo.repetir)
                    Spacer(Modifier.width(8.dp))
                    Text("Repetir mis ${unidades(s).second} en la siguiente ronda", style = ui(14.sp, FontWeight.Black))
                }
            }
        }
    }
}

@Composable
fun CasillaMarca(marcada: Boolean) {
    Box(
        Modifier.size(22.dp).clip(RoundedCornerShape(5.dp)).background(if (marcada) Colores.tinta else Color.White)
            .border(2.5.dp, Colores.tinta, RoundedCornerShape(5.dp)),
        contentAlignment = Alignment.Center,
    ) { if (marcada) Text("✓", style = ui(13.sp, FontWeight.Black, Colores.crema)) }
}

// ---------- Selector de marcado ----------
@Composable
fun SelectorMarcado(vm: JugadorViewModel) {
    when (vm.sala?.config?.marcado) {
        "auto" -> Recuadro(Modifier.fillMaxWidth(), fondo = Colores.menta) {
            Text("El anfitrión eligió marcado automático: tus cartones se marcan solos. Tú solo cantas ¡Bingo!", style = ui(14.sp, FontWeight.Black))
        }
        "manual" -> Recuadro(Modifier.fillMaxWidth(), fondo = Colores.girasol) {
            Text("El anfitrión eligió marcar a mano: toca cada número que salga. Si no lo marcas, no cuenta para tu ¡Bingo!", style = ui(14.sp, FontWeight.Black))
        }
        else -> Row(
            Modifier.fillMaxWidth().clip(RoundedCornerShape(16.dp)).background(Colores.crema).border(3.dp, Colores.tinta, RoundedCornerShape(16.dp)).padding(6.dp),
            horizontalArrangement = Arrangement.spacedBy(6.dp),
        ) {
            for ((auto, titulo, detalle) in listOf(Triple(true, "Automático", "se marcan solos"), Triple(false, "Yo marco", "toco cada número"))) {
                val activo = vm.marcarSolo == auto
                Column(
                    Modifier.weight(1f).clip(RoundedCornerShape(12.dp)).background(if (activo) Colores.tinta else Colores.crema)
                        .border(2.5.dp, Colores.tinta, RoundedCornerShape(12.dp)).clickable { vm.cambiarModoMarcado(auto) }.padding(vertical = 10.dp),
                    horizontalAlignment = Alignment.CenterHorizontally,
                ) {
                    val color = if (activo) Colores.crema else Colores.tinta
                    Text(titulo.uppercase(), style = ui(13.sp, FontWeight.Black, color))
                    Text(detalle, style = ui(11.sp, FontWeight.Bold, color.copy(alpha = 0.8f)))
                }
            }
        }
    }
}

// ---------- Pedir fichas (salas con admisión) ----------
@Composable
fun TarjetaPedirFichas(vm: JugadorViewModel, titulo: String = "¿Necesitas fichas?") {
    val s = vm.sala ?: return
    var otra by remember { mutableStateOf("") }
    Carta(Modifier.fillMaxWidth().padding(top = 20.dp)) {
        Text(titulo, style = display(20.sp))
        if (s.config.mensajeFichas.isNotBlank()) {
            Recuadro(Modifier.fillMaxWidth().padding(top = 8.dp), fondo = Colores.papel) { Text(s.config.mensajeFichas, style = ui(14.sp, FontWeight.Black)) }
        }
        vm.pedido?.let {
            Recuadro(Modifier.fillMaxWidth().padding(top = 8.dp), fondo = Colores.girasol) {
                Text("Pediste ${fichas(it)}. Espera a que el anfitrión te las asigne.", style = ui(14.sp, FontWeight.Black))
            }
        }
        Text(if (vm.pedido != null) "Puedes cambiar tu pedido:" else "Pide al anfitrión las fichas que quieras:", Modifier.padding(top = 10.dp), style = ui(12.sp, FontWeight.Bold, Colores.tinta.copy(alpha = 0.7f)))
        Row(Modifier.fillMaxWidth().padding(top = 8.dp), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            for (n in listOf(20, 50, 100)) Boton("$n", { vm.pedirFichas(n) }, Modifier.weight(1f), alto = 44.dp)
        }
        Row(Modifier.fillMaxWidth().padding(top = 8.dp), horizontalArrangement = Arrangement.spacedBy(8.dp), verticalAlignment = Alignment.CenterVertically) {
            Campo(otra, { otra = it.filter(Char::isDigit).take(6) }, Modifier.weight(1f), "Otra cantidad", teclado = KeyboardOptions(keyboardType = KeyboardType.Number))
            Boton("Pedir", { vm.pedirFichas(otra.toIntOrNull() ?: 0); otra = "" }, fondo = Colores.girasol)
        }
    }
}

// ---------- Ranking de la noche ----------
@Composable
fun Ranking(s: Estado, miId: String?) {
    val lista = s.jugadores.filter { it.ganado > 0 }.sortedByDescending { it.ganado }.take(10)
    if (lista.isEmpty()) return
    val medallas = listOf("🥇", "🥈", "🥉")
    Carta(Modifier.fillMaxWidth().padding(top = 20.dp)) {
        Text("Ranking de la noche", style = display(20.sp))
        Text("Fichas ganadas en todas las rondas · ronda ${s.ronda}", style = ui(12.sp, FontWeight.Bold, Colores.tinta.copy(alpha = 0.7f)))
        Column(Modifier.padding(top = 8.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
            lista.forEachIndexed { i, j ->
                Recuadro(Modifier.fillMaxWidth(), fondo = if (j.id == miId) Colores.girasol else Color.White) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Text("${medallas.getOrElse(i) { "${i + 1}." }} ${j.apodo}${if (j.id == miId) " (tú)" else ""}", Modifier.weight(1f), style = ui(15.sp, FontWeight.Black), maxLines = 1, overflow = TextOverflow.Ellipsis)
                        Text("+${fmt(j.ganado)}", style = display(15.sp))
                    }
                }
            }
        }
    }
}

// ---------- Partida verificable ----------
@Composable
fun TarjetaVerificar(vm: JugadorViewModel) {
    val s = vm.sala ?: return
    if (s.justo.compromiso == null) return
    Carta(Modifier.fillMaxWidth().padding(top = 20.dp)) {
        Text("Partida verificable", style = display(20.sp))
        if (s.justo.semillaServidor == null) {
            Text("Esta partida no publicó la semilla del servidor: no se puede verificar.", style = ui(13.sp))
            return@Carta
        }
        Text("Comprueba en tu móvil que nadie cambió las bolas ni los cartones después de empezar.", style = ui(13.sp, FontWeight.Bold, Colores.tinta.copy(alpha = 0.75f)))
        Boton("Verificar partida", vm::verificar, Modifier.fillMaxWidth().padding(top = 10.dp), fondo = Colores.girasol)
        vm.verificacion?.let { r ->
            Recuadro(Modifier.fillMaxWidth().padding(top = 10.dp), fondo = if (r.valida) Colores.menta else Colores.tomate) {
                Text(
                    if (r.valida) "✓ Partida verificada: el orden de las bolas y los cartones salen de las semillas comprometidas."
                    else "La verificación falló:\n" + r.errores.joinToString("\n") { "• $it" },
                    style = ui(13.sp, FontWeight.Black),
                )
            }
        }
    }
}

@Composable
fun Dato(titulo: String, valor: String, pie: String, fondo: Color = Color.White, modifier: Modifier = Modifier) {
    Column(
        modifier.clip(RoundedCornerShape(12.dp)).background(fondo).border(2.5.dp, Colores.tinta, RoundedCornerShape(12.dp)).padding(vertical = 8.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
    ) {
        Etiqueta(titulo)
        Text(valor, style = display(18.sp))
        Text(pie.uppercase(), style = ui(9.sp, FontWeight.Black), textAlign = TextAlign.Center)
    }
}

@Composable
fun BolaColor(n: Int) = colorDeBola(n)
