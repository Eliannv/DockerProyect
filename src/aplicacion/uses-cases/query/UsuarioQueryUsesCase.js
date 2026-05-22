import Usuario from "../../../dominio/entidades/Usuario.js";
import UsuarioFiltro from "../../../dominio/filtros/UsuarioFiltro.js";

export default class UsuarioQueryUsesCase{
    constructor(adaptadorBDSalida){
        this.adaptadorBDSalida = adaptadorBDSalida;
    }
    async lista(){

        const filtros = [
            new UsuarioFiltro("Jostyn")
            
        ];
            const respuesta = await this.adaptadorBDSalida.lista(filtros);
            return {
                estado : "ok",
                resultado : respuesta
            }
    }
}
