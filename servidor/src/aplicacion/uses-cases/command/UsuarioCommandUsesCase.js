import Usuario from "../../../dominio/entidades/Usuario.js";

export default class UsuarioCommandUsesCase{
    constructor(adaptadorBDSalida){
        this.adaptadorBDSalida = adaptadorBDSalida;
    }
    async crear (dtoUsuario)  {
        const persona = new Usuario(null, dtoUsuario.getNombre());
        const result= await this.adaptadorBDSalida.guardar(persona);
        console.log('Ingreso al caso de uso');
        return  {
            estado : "ok",
            resultado: result.resultado
        };
    }
    async editar(dtoUsuario) {
        if (!dtoUsuario.getId()) {
            return {
                estado: "error",
                resultado: "El ID es requerido para actualizar"
            };
        }
        
        if (!dtoUsuario.getNombre()) {
            return {
                estado: "error",
                resultado: "El nombre es requerido para actualizar"
            };
        }
        
        const usuario = new Usuario(dtoUsuario.getId(), dtoUsuario.getNombre());
        const result = await this.adaptadorBDSalida.actualizar(usuario);
        console.log('Usuario actualizado exitosamente');
        return {
            estado: "ok",
            resultado: result.resultado
        };
    }
    
    async eliminar(dtoUsuario) {
        if (!dtoUsuario.getId()) {
            return {
                estado: "error",
                resultado: "El ID es requerido para eliminar"
            };
        }
        
        const result = await this.adaptadorBDSalida.eliminar(dtoUsuario.getId());
        if (result.estado === "error") {
            return {
                estado: "error",
                resultado: result.resultado
            };
        }
        console.log('Usuario eliminado exitosamente');
        return {
            estado: "ok",
            resultado: result.resultado
        };
    }
}
