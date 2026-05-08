import PersonaEntradaCommandPuerto from '../puertos/entrada/PersonaEntradaCommandPuerto.js';
import Persona from '../../dominio/entidades/Persona.js';

// Caso de uso de escritura — depende del puerto de salida (inyección de dependencias)
export default class PersonaCommandUsesCase extends PersonaEntradaCommandPuerto {

    #adaptadorSalida;

    constructor(adaptadorSalida) {
        super();
        this.#adaptadorSalida = adaptadorSalida;
    }

    async crear(dto) {
        const persona = new Persona(dto.cedula, dto.nombre, dto.apellido1, dto.apellido2, dto.direccion);
        return await this.#adaptadorSalida.guardar(persona);
    }

    async editar(cedula, dto) {
        const persona = new Persona(cedula, dto.nombre, dto.apellido1, dto.apellido2, dto.direccion);
        return await this.#adaptadorSalida.actualizar(cedula, persona);
    }

    async eliminar(cedula) {
        return await this.#adaptadorSalida.eliminar(cedula);
    }
}
