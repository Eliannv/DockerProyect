// Puerto de salida para operaciones de escritura (Command)
export default class PersonaSalidaCommandPuerto {
    async guardar(persona)              { throw new Error('Método guardar no implementado'); }
    async actualizar(cedula, persona)   { throw new Error('Método actualizar no implementado'); }
    async eliminar(cedula)              { throw new Error('Método eliminar no implementado'); }
}
