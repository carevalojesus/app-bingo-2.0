// Narrador del show: cómo se canta cada bola. Modos (se guardan en este navegador):
//   'normal'  → «B, 15»
//   'frases'  → «B, 15… ¡la niña bonita!» (dichos de bingo, inventados o populares)
//   'en' / 'pt' → la letra y el número en inglés o portugués
export const MODOS_VOZ = [
    { id: 'normal', nombre: 'Voz normal', lang: 'es-ES' },
    { id: 'frases', nombre: 'Voz con frases', lang: 'es-ES' },
    { id: 'en', nombre: 'Voice in English', lang: 'en-US' },
    { id: 'pt', nombre: 'Voz em português', lang: 'pt-BR' },
];

const FRASES = {
    1: 'el uno, como ninguno', 2: 'el dos, ¡qué arroz!', 3: 'el tres, al revés', 4: 'el cuatro, ¡qué retrato!',
    5: 'el cinco, ¡dale un brinco!', 7: 'el siete de la suerte', 8: 'el ocho, ¡qué bizcocho!', 9: 'el nueve, ¡cómo llueve!',
    10: 'el diez, ¡otra vez!', 11: 'las dos patitas', 12: 'la docena', 13: 'el de la mala suerte',
    15: 'la niña bonita', 20: 'veinte, ¡qué valiente!', 22: 'los dos patitos', 25: 'Navidad, Navidad',
    30: 'treinta, ¡qué calor!', 33: 'la edad de Cristo', 40: 'cuarenta, ¡cuenta y cuenta!', 44: 'cuatro y cuatro, a bailar',
    45: 'el último de la N', 50: 'medio siglo', 55: 'los dos cincos, ¡qué brincos!', 60: 'sesenta, ¡qué tormenta!',
    61: 'empieza la O', 66: 'los dos seises', 70: 'setenta, ¡se calienta!', 75: 'la última del bombo',
};

export function leerModoVoz() {
    try { return localStorage.getItem('bingoshow.voz') || 'normal'; } catch { return 'normal'; }
}

export function guardarModoVoz(id) {
    try { localStorage.setItem('bingoshow.voz', id); } catch { /* sin almacenamiento */ }
}

export const infoModoVoz = (id) => MODOS_VOZ.find((m) => m.id === id) ?? MODOS_VOZ[0];

// Devuelve { texto, lang } para decir la bola
export function textoBola(letra, numero, modo = leerModoVoz()) {
    const { lang } = infoModoVoz(modo);
    if (modo === 'frases' && FRASES[numero]) return { texto: `${letra}, ${numero}… ¡${FRASES[numero]}!`, lang };
    return { texto: `${letra}, ${numero}`, lang };
}

// Frase corta para un momento del show en el idioma elegido
export function textoMomento(clave, modo = leerModoVoz()) {
    const textos = {
        bingo: { es: '¡Bingo!', en: 'Bingo!', pt: 'Bingo!' },
        fila: { es: '¡Fila completa!', en: 'Full row!', pt: 'Linha completa!' },
        dorada: { es: '¡Bola dorada! ¡Premio doble!', en: 'Golden ball! Double prize!', pt: 'Bola dourada! Prêmio em dobro!' },
    };
    const idioma = modo === 'en' || modo === 'pt' ? modo : 'es';
    return { texto: textos[clave]?.[idioma] ?? '', lang: infoModoVoz(modo).lang };
}
