import Usuario from "../../../dominio/entidades/Usuario.js";

export default class UsuarioCommandUsesCase{
    constructor(adaptadorBDSalida){
        this.adaptadorBDSalida = adaptadorBDSalida;
    }
    async crear (dtoUsuario)  {
        const id = Date.now().toString();
        const persona = new Usuario(id, dtoUsuario.getNombre());
        const result= await this.adaptadorBDSalida.guardar(persona);
        console.log('Ingreso al caso de uso');
        return  {
            estado : "ok",
            resultado: result.resultado
        };
    }
}
