import { log } from '../utils/Logger.js';
import UsuarioSalidaPuerto from "../../aplicacion/puertos/salida/UsuarioSalidaPuerto.js";

export default class UsuarioMySQLAdaptador extends UsuarioSalidaPuerto {
    constructor() {
        super();
        this.usuarios = new Map();
        log('DEBUG', 'INIT', `UsuarioSQL: Inicializado repositorio en memoria`);
    }

    guardar = (usuario, traceId = 'SIN_TRACE') => {
        log('INFO', traceId, `UsuarioSQL.guardar: Validando usuario ${usuario.nombre}`);

        if (!usuario.nombre || !usuario.cedula) {
            log('ERROR', traceId, `UsuarioSQL.guardar: Datos inválidos`);
            return "Datos inválidos";
        }

        log('INFO', traceId, `UsuarioSQL.guardar: Insertando en base de datos con id ${usuario.id}`);
        this.usuarios.set(usuario.id, { ...usuario });

        log('DEBUG', traceId, `UsuarioSQL.guardar: Total de usuarios en BD: ${this.usuarios.size}`);
        log('SUCCESS', traceId, `UsuarioSQL.guardar: Usuario ${usuario.nombre} guardado exitosamente`);

        return "se guardo con exito";
    }

    actualizar = (id, usuario, traceId = 'SIN_TRACE') => {
        log('INFO', traceId, `UsuarioSQL.actualizar: Buscando usuario ${id}`);

        if (this.usuarios.has(id)) {
            log('INFO', traceId, `UsuarioSQL.actualizar: Usuario encontrado, actualizando`);
            this.usuarios.set(id, { id, ...usuario });
            log('SUCCESS', traceId, `UsuarioSQL.actualizar: Usuario ${id} actualizado`);
            return "se actualizo con exito";
        }

        log('ERROR', traceId, `UsuarioSQL.actualizar: Usuario ${id} no encontrado`);
        return "Usuario no encontrado";
    }

    listar = () => {
        return Array.from(this.usuarios.values());
    }
}