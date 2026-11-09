// Durable Object que limita cuántas salas puede crear una IP: hay uno por IP (idFromName)
// y guarda las horas de las últimas creaciones. Cuando ya no queda ninguna reciente se borra solo.

import { DurableObject } from 'cloudflare:workers';

export const LIMITE_SALAS = 10;          // salas por IP…
export const VENTANA_MS = 60 * 60 * 1000; // …en la última hora

export class Limitador extends DurableObject {
    async recientes(ahora) {
        return ((await this.ctx.storage.get('marcas')) ?? []).filter((t) => t > ahora - VENTANA_MS);
    }

    // ¿Puede crear otra sala? Devuelve { permitido, reintentarEn } (segundos hasta poder crear otra)
    async consultar(ahora = Date.now()) {
        const marcas = await this.recientes(ahora);
        if (marcas.length < LIMITE_SALAS) return { permitido: true, reintentarEn: 0 };
        return { permitido: false, reintentarEn: Math.ceil((marcas[0] + VENTANA_MS - ahora) / 1000) };
    }

    // Apunta una sala creada (solo cuentan las que se crean de verdad, no los formularios con errores)
    async apuntar(ahora = Date.now()) {
        const marcas = await this.recientes(ahora);
        marcas.push(ahora);
        await this.ctx.storage.put('marcas', marcas);
        await this.ctx.storage.setAlarm(marcas[0] + VENTANA_MS);
    }

    async alarm() {
        const ahora = Date.now();
        const marcas = await this.recientes(ahora);
        if (!marcas.length) return this.ctx.storage.deleteAll();
        await this.ctx.storage.put('marcas', marcas);
        await this.ctx.storage.setAlarm(marcas[0] + VENTANA_MS);
    }
}
