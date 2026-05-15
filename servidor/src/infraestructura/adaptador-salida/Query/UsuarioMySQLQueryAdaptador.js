import UsuarioSalidaQueryPuerto from "../../../aplicacion/puertos/salida/Query/UsuarioSalidaQueryPuerto.js";
import postgresql from "../../base-dato/Postgresql.js";

export default class UsuarioMySQLQueryAdaptador extends UsuarioSalidaQueryPuerto {
    async obtenerNombre(indice) {
        const resultado = await postgresql.query(
            'SELECT id AS indice, nombre FROM public.usuario ORDER BY id OFFSET $1 LIMIT 1',
            [indice]
        );

        if (resultado.rowCount === 0) {
            throw new Error('Nombre no encontrado en el índice ' + indice);
        }

        return resultado.rows[0];
    }

    async listarNombres() {
        const resultado = await postgresql.query(
            'SELECT id AS indice, nombre FROM public.usuario ORDER BY id'
        );

        return resultado.rows;
    }
}