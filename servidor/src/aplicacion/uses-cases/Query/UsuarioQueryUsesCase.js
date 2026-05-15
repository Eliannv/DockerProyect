import Usuario from "../../../dominio/entidades/Usuario.js";

export default class UsuarioQueryUsesCase{
    constructor(adaptadorBDSalida){
        this.adaptadorBDSalida = adaptadorBDSalida;
    }
    async lista(){
            const respuesta = await this.adaptadorBDSalida.lista();
            return {
                estado : "ok",
                resultado : respuesta
            }
    }
}
