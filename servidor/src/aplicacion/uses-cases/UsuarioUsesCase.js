import Usuario from "../../dominio/entidades/Usuario.js";
import UsuarioEntradaPort from "../puertos/entrada/UsuarioEntradaPuerto.js";

export default class UsuarioUsesCase extends UsuarioEntradaPort {
    constructor(UsuarioMySQLAdaptador) {
        super();
        this.UsuarioMySQLAdaptador = UsuarioMySQLAdaptador;
    }
    async crear(usuario) {
        const id = Date.now().toString();
        const persona = new Usuario(id, usuario.getNombre());
        await this.UsuarioMySQLAdaptador.guardar(persona);
        console.log('Ingreso al caso de uso');
        return { id: persona.id, nombre: persona.nombre };
    }
}