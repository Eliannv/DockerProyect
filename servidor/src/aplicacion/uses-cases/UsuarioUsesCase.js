import Usuario from "../../dominio/entidades/Usuario.js";

export default class UsuarioUsesCase{
    constructor(adaptadorBDSalida){
        this.adaptadorBDSalida = adaptadorBDSalida;
    }
    async crear (dtoUsuario){  {
        const id = Date.now().toString();
        const persona = new Usuario(id, dtoUsuario.getNombres());
        const result = await this.adaptadorBDSalida.guardar(persona);
        console.log("El resultado del caso de uso es: " + result);
        return {
            estado: "ok",
            resultado: result.resultado
        };
    }
}
}
