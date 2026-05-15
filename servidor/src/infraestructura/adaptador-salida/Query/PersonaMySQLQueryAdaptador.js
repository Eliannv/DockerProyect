import PersonaSalidaQueryPuerto from '../../../aplicacion/puertos/salida/Query/PersonaSalidaQueryPuerto.js';
import postgresql from '../../base-dato/Postgresql.js';

export default class PersonaMySQLQueryAdaptador extends PersonaSalidaQueryPuerto {

    async listar() {
        const resultado = await postgresql.query(
            'SELECT cedula, nombre, apellido1, apellido2, direccion FROM public.persona ORDER BY cedula'
        );
        return resultado.rows;
    }
}
