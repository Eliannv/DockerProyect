import Usuario from "../../dominio/entidades/Usuario.js";
import UsuarioEntradaPort from "../puertos/entrada/UsuarioEntradaPort.js";
import UsuarioSalidaPuerto from "../puertos/salida/UsuarioSalidaPuerto.js";

export default class UsuarioUsesCase extends UsuarioEntradaPort {
    constructor(usuarioSalidaPuerto){
        super();
        if (!(usuarioSalidaPuerto instanceof UsuarioSalidaPuerto)) {
            throw new Error("El caso de uso requiere una implementación de UsuarioSalidaPuerto");
        }
        this.usuarioSalidaPuerto = usuarioSalidaPuerto;
    }

    async crear(usuario) {
        const id = Date.now().toString();
        const persona = new Usuario(
            id,
            usuario.cedula,
            usuario.nombre,
            usuario.apellido,
            usuario.email
        );

        this.usuarioSalidaPuerto.guardar(persona);
        console.log('Ingreso al caso de uso');
        return "se creo " + usuario.nombre;
    }
}