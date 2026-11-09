// Durable Object único (idFromName('registro')) con el registro de códigos Pro y las estadísticas
// de salas creadas. Lo usa el panel de administración (admin.html) y la creación de salas.
//
// Claves:  c:<código normalizado> → { codigo, tipo, hasta, emitido, nota, cliente, importe, origen, revocado, salas: [] }
//          d:<AAAA-MM-DD>         → { gratis, pro }  (salas creadas ese día, UTC)
//          s:<código de sala>     → { codigo, nombre, pro, creada }  (salas que existen; se quitan al cerrarse o caducar)

import { DurableObject } from 'cloudflare:workers';

const MAX_SALAS_POR_CODIGO = 200; // historial de salas que se guarda por código
const DIAS_ESTADISTICAS = 30;
const dia = (t) => new Date(t).toISOString().slice(0, 10);

export class Registro extends DurableObject {
    async emitir({ normalizado, codigo, tipo, hasta, nota = '', cliente = '', importe = 0 }) {
        const registro = {
            codigo, tipo, hasta, emitido: Date.now(), nota, cliente, importe, origen: 'panel', revocado: false, salas: [],
        };
        await this.ctx.storage.put(`c:${normalizado}`, registro);
        return registro;
    }

    // ¿Está anulado? (los códigos que no están en el registro no lo están)
    async revocado(normalizado) {
        return Boolean((await this.ctx.storage.get(`c:${normalizado}`))?.revocado);
    }

    async fijarRevocado(normalizado, revocado) {
        const registro = await this.ctx.storage.get(`c:${normalizado}`);
        if (!registro) return null;
        registro.revocado = Boolean(revocado);
        await this.ctx.storage.put(`c:${normalizado}`, registro);
        return registro;
    }

    // Una sala creada: cuenta para las estadísticas y, si es Pro, se apunta en su código.
    // Un código generado fuera del panel (npm run codigo) se registra la primera vez que se usa.
    async anotarSala({ sala, pro = null, nombre = '' }) {
        const ahora = Date.now();
        await this.ctx.storage.put(`s:${sala}`, { codigo: sala, nombre, pro: Boolean(pro), creada: ahora });
        const claveDia = `d:${dia(ahora)}`;
        const cuenta = (await this.ctx.storage.get(claveDia)) ?? { gratis: 0, pro: 0 };
        cuenta[pro ? 'pro' : 'gratis'] += 1;
        await this.ctx.storage.put(claveDia, cuenta);
        if (!pro) return;
        const clave = `c:${pro.normalizado}`;
        const registro = (await this.ctx.storage.get(clave)) ?? {
            codigo: pro.codigo, tipo: pro.tipo, hasta: pro.hasta, emitido: null, nota: '', cliente: '', importe: 0,
            origen: 'externo', revocado: false, salas: [],
        };
        registro.salas = [{ sala, en: ahora }, ...registro.salas].slice(0, MAX_SALAS_POR_CODIGO);
        await this.ctx.storage.put(clave, registro);
    }

    async quitarSala(sala) {
        await this.ctx.storage.delete(`s:${sala}`);
    }

    async salas() {
        return [...(await this.ctx.storage.list({ prefix: 's:' })).values()].sort((a, b) => b.creada - a.creada);
    }

    async resumen() {
        const codigos = [...(await this.ctx.storage.list({ prefix: 'c:' })).values()]
            .sort((a, b) => (b.emitido ?? b.salas[0]?.en ?? 0) - (a.emitido ?? a.salas[0]?.en ?? 0));
        const hoy = Date.now();
        const dias = [];
        for (let i = DIAS_ESTADISTICAS - 1; i >= 0; i--) {
            const fecha = dia(hoy - i * 864e5);
            dias.push({ fecha, ...((await this.ctx.storage.get(`d:${fecha}`)) ?? { gratis: 0, pro: 0 }) });
        }
        return { codigos, dias };
    }
}
