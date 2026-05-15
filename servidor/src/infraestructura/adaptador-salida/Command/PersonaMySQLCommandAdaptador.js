import PersonaSalidaCommandPuerto from '../../../aplicacion/puertos/salida/Command/PersonaSalidaCommandPuerto.js';
import postgresql from '../../base-dato/Postgresql.js';

export default class PersonaMySQLCommandAdaptador extends PersonaSalidaCommandPuerto {

    async guardar(persona) {
        const resultado = await postgresql.query(
            `INSERT INTO public.persona (cedula, nombre, apellido1, apellido2, direccion)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING cedula, nombre, apellido1, apellido2, direccion`,
            [persona.cedula, persona.nombre, persona.apellido1, persona.apellido2, persona.direccion]
        );
        return { estado: 'creado', persona: resultado.rows[0] };
    }

    async actualizar(cedula, persona) {
        const resultado = await postgresql.query(
            `UPDATE public.persona
             SET nombre = $1, apellido1 = $2, apellido2 = $3, direccion = $4
             WHERE cedula = $5
             RETURNING cedula, nombre, apellido1, apellido2, direccion`,
            [persona.nombre, persona.apellido1, persona.apellido2, persona.direccion, cedula]
        );

        if (resultado.rowCount === 0) {
            throw new Error(`No existe persona con cédula ${cedula}`);
        }

        return { estado: 'actualizado', persona: resultado.rows[0] };
    }

    async eliminar(cedula) {
        const resultado = await postgresql.query(
            'DELETE FROM public.persona WHERE cedula = $1 RETURNING cedula',
            [cedula]
        );

        if (resultado.rowCount === 0) {
            throw new Error(`No existe persona con cédula ${cedula}`);
        }

        return { estado: 'eliminado', cedula };
    }
}
