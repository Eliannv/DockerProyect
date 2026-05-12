import PersonaSalidaQueryPuerto from '../../../aplicacion/puertos/salida/Query/PersonaSalidaQueryPuerto.js';
import { personaStore } from '../PersonaStore.js';

export default class PersonaMySQLQueryAdaptador extends PersonaSalidaQueryPuerto {

    async listar() {
        return Array.from(personaStore.values());
    }
}
