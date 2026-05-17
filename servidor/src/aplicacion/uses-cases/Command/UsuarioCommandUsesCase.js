import Usuario from "../../../dominio/entidades/Usuario.js";

export default class UsuarioCommandUsesCase {
    
    constructor(adaptadorBDCommand) {
        this.adaptadorBDCommand = adaptadorBDCommand;
    }

    async crear(usuarioDTO, datosCompletos) {
        const id = Date.now().toString();
        const persona = new Usuario(id, usuarioDTO.getCedula(), usuarioDTO.getNombre(), datosCompletos.apellido1, datosCompletos.apellido2, datosCompletos.direccion);
        const result = await this.adaptadorBDCommand.guardar(persona);
        console.log('Ingreso al caso de uso de creación');
        return result;
    }

    async eliminar(id) {
        console.log(`Ingreso al caso de uso de eliminar usuario con id: ${id}`);
        const result = await this.adaptadorBDCommand.eliminar(id);
        return result;
    }

    async editar(id, usuarioDTO, datosCompletos) {
        console.log(`Ingreso al caso de uso de editar usuario con id: ${id}`);
        const persona = new Usuario(id, usuarioDTO.getCedula(), usuarioDTO.getNombre(), datosCompletos.apellido1, datosCompletos.apellido2, datosCompletos.direccion);
        const result = await this.adaptadorBDCommand.editar(persona);
        return result;
    }

}