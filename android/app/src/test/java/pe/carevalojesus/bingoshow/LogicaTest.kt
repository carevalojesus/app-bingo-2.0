package pe.carevalojesus.bingoshow

import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.boolean
import kotlinx.serialization.json.int
import kotlinx.serialization.json.intOrNull
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test
import pe.carevalojesus.bingoshow.logica.SemillaCliente
import pe.carevalojesus.bingoshow.logica.bolaDoradaDe
import pe.carevalojesus.bingoshow.logica.combinarSemillas
import pe.carevalojesus.bingoshow.logica.compromisoDe
import pe.carevalojesus.bingoshow.logica.generarCarton
import pe.carevalojesus.bingoshow.logica.numerosDeFila
import pe.carevalojesus.bingoshow.logica.ordenDeBolas
import pe.carevalojesus.bingoshow.logica.serieDePartida
import pe.carevalojesus.bingoshow.logica.verificar
import pe.carevalojesus.bingoshow.logica.verificarPartida

/** Compara la lógica de Kotlin con fixtures generados por el JavaScript original (scripts/fixtures-android.mjs). */
class LogicaTest {
    private val fixtures: JsonObject = Json.parseToJsonElement(
        javaClass.classLoader!!.getResource("fixtures.json")!!.readText(),
    ).jsonObject

    @Test
    fun losCartonesSonIdenticosALosDeLaWeb() {
        val cartones = fixtures["cartones"]!!.jsonArray
        assertTrue(cartones.size >= 30)
        for (c in cartones) {
            val o = c.jsonObject
            val serie = o["serie"]!!.jsonPrimitive.content
            val numero = o["numero"]!!.jsonPrimitive.int
            val esperado = o["columnas"]!!.jsonArray.map { col -> col.jsonArray.map { it.jsonPrimitive.intOrNull } }
            assertEquals("cartón $serie-$numero", esperado, generarCarton(serie, numero).columnas)
        }
    }

    @Test
    fun serieOrdenYBolaDoradaSonIdenticas() {
        for (p in fixtures["partidas"]!!.jsonArray) {
            val o = p.jsonObject
            val servidor = o["servidor"]!!.jsonPrimitive.content
            val semillas = o["semillas"]!!.jsonArray.map {
                SemillaCliente(it.jsonObject["apodo"]!!.jsonPrimitive.content, it.jsonObject["semilla"]!!.jsonPrimitive.content)
            }
            val combinada = combinarSemillas(semillas)
            assertEquals(o["combinada"]!!.jsonPrimitive.content, combinada)
            assertEquals(o["compromiso"]!!.jsonPrimitive.content, compromisoDe(servidor))
            assertEquals(o["serie"]!!.jsonPrimitive.content, serieDePartida(servidor, combinada))
            val orden = o["orden"]!!.jsonArray.map { it.jsonPrimitive.int }
            assertEquals(orden, ordenDeBolas(servidor, combinada))
            val dorada = o["dorada"]!!.jsonPrimitive.int
            assertEquals(dorada, bolaDoradaDe(servidor, combinada))
            val r = verificarPartida(compromisoDe(servidor), servidor, semillas, combinada, serieDePartida(servidor, combinada), orden.take(40), dorada)
            assertTrue(r.errores.joinToString(), r.valida)
            assertTrue(!verificarPartida(compromisoDe(servidor), servidor, semillas, combinada, "XXXX", orden.take(40)).valida)
        }
    }

    @Test
    fun lasFigurasSeComprueban_IgualQueEnLaWeb() {
        for (v in fixtures["verificaciones"]!!.jsonArray) {
            val o = v.jsonObject
            val patron = o["patron"]!!.jsonPrimitive.content
            val bolas = o["bolas"]!!.jsonArray.map { it.jsonPrimitive.int }.toSet()
            val r = verificar(generarCarton("K7QX", 7), bolas, patron)
            assertEquals("$patron con ${bolas.size}", o["gana"]!!.jsonPrimitive.boolean, r.gana)
            assertEquals("$patron con ${bolas.size}", o["faltan"]!!.jsonArray.map { it.jsonPrimitive.int }, r.faltan)
        }
    }

    @Test
    fun lasFilasCubrenLas75BolasSinRepetir() {
        val todas = (1..15).flatMap { numerosDeFila(it) }
        assertEquals(75, todas.toSet().size)
        assertEquals(listOf(1, 16, 31, 46, 61), numerosDeFila(1))
    }
}
