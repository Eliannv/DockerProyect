import { log } from '../utils/Logger.js';
import UsuarioSalidaPuerto from "../../aplicacion/puertos/salida/UsuarioSalidaPuerto.js";

export default class UsuarioMySQLAdaptador extends UsuarioSalidaPuerto {
    constructor() {
        super();
        this.usuarios = new Map();
        log('DEBUG', 'INIT', `UsuarioSQL: Inicializado repositorio en memoria`);
    }

    guardar = (usuario) => {
        log('INFO', 'SIN_TRACE', `UsuarioSQL.guardar: Validando usuario ${usuario.nombre}`);
        log('SUCCESS', 'SIN_TRACE', `UsuarioSQL.guardar: Usuario ${usuario.nombre} guardado exitosamente`);

        return "se guardo con exito";
    }

    /*actualizar = (id, usuario, traceId = 'SIN_TRACE') => {
        log('INFO', 'SIN_TRACE', `UsuarioSQL.actualizar: Buscando usuario ${id}`);

        if (this.usuarios.has(id)) {
            log('INFO', 'SIN_TRACE', `UsuarioSQL.actualizar: Usuario encontrado, actualizando`);
            this.usuarios.set(id, { id, ...usuario });
            log('SUCCESS', 'SIN_TRACE', `UsuarioSQL.actualizar: Usuario ${id} actualizado`);
            return "se actualizo con exito";
        }

        log('ERROR', 'SIN_TRACE', `UsuarioSQL.actualizar: Usuario ${id} no encontrado`);
        return "Usuario no encontrado";
    }

    listar = () => {
        return Array.from(this.usuarios.values());
    }*/
}