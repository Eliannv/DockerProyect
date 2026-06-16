import { randomUUID } from 'crypto';
import ModeloEventoOutbox from '../modelos/ModeloEventoOutbox.js';

export default class OutboxServicio {
    static async registrarEvento({ tipoEvento, idAgregado = null, contenido = {} }, transaction) {
        if (!tipoEvento) {
            throw new Error('El tipo de evento es requerido para outbox');
        }

        return ModeloEventoOutbox.create({
            id: randomUUID(),
            tipo_evento: tipoEvento,
            id_agregado: idAgregado,
            contenido,
            fecha_creacion: new Date(),
            procesado: false,
            fecha_procesado: null
        }, { transaction });
    }

    static async obtenerPendientes(limit = 100) {
        return ModeloEventoOutbox.findAll({
            where: { procesado: false },
            order: [['fecha_creacion', 'ASC']],
            limit
        });
    }

    static async marcarProcesado(idEvento) {
        if (!idEvento) {
            throw new Error('El ID del evento es requerido para marcarlo como procesado');
        }

        const [actualizados] = await ModeloEventoOutbox.update({
            procesado: true,
            fecha_procesado: new Date()
        }, {
            where: { id: idEvento }
        });

        return actualizados > 0;
    }
}
