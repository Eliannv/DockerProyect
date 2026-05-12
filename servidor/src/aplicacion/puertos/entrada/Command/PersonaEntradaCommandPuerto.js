// Puerto de entrada para operaciones de escritura (Command)
export default class PersonaEntradaCommandPuerto {
    crear(personaDTO)         { throw new Error('Método crear no implementado'); }
    editar(cedula, personaDTO){ throw new Error('Método editar no implementado'); }
    eliminar(cedula)          { throw new Error('Método eliminar no implementado'); }
}
