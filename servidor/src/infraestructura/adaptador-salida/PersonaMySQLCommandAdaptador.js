import PersonaSalidaCommandPuerto from '../../aplicacion/puertos/salida/PersonaSalidaCommandPuerto.js';
import { personaStore } from './PersonaStore.js';

export default class PersonaMySQLCommandAdaptador extends PersonaSalidaCommandPuerto {

    async guardar(persona) {
        if (personaStore.has(persona.cedula)) {
            throw new Error(`La cédula ${persona.cedula} ya está registrada`);
        }
        personaStore.set(persona.cedula, persona);
        return { estado: 'creado', persona };
    }

    async actualizar(cedula, persona) {
        if (!personaStore.has(cedula)) {
            throw new Error(`No existe persona con cédula ${cedula}`);
        }
        personaStore.set(cedula, persona);
        return { estado: 'actualizado', persona };
    }

    async eliminar(cedula) {
        if (!personaStore.has(cedula)) {
            throw new Error(`No existe persona con cédula ${cedula}`);
        }
        personaStore.delete(cedula);
        return { estado: 'eliminado', cedula };
    }
}
