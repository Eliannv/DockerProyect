import PersonaEntradaQueryPuerto from '../../puertos/entrada/Query/PersonaEntradaQueryPuerto.js';

// Caso de uso de lectura — depende del puerto de salida (inyección de dependencias)
export default class PersonaQueryUsesCase extends PersonaEntradaQueryPuerto {

    #adaptadorSalida;

    constructor(adaptadorSalida) {
        super();
        this.#adaptadorSalida = adaptadorSalida;
    }

    async listar() {
        return await this.#adaptadorSalida.listar();
    }
}


