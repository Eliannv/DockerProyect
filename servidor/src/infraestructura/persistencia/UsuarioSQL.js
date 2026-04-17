import {log} from '../utils/Logger.js';
import UsuarioRepositorio from "../../aplicacion/puertos/salida/UsuarioRepositorio.js";

export default class UsuarioSQL extends UsuarioRepositorio{
    constructor(){
        super();
        this.usuarios = new Map();
        log('DEBUG', 'INIT', `UsuarioSQL: Inicializado repositorio en memoria`);
    }
    
    guardar = (usuario, id, traceId) =>{
        log('INFO', traceId, `UsuarioSQL.guardar: Validando usuario ${usuario.nombre}`);
        
        if(!usuario.nombre || !usuario.cedula){
            log('ERROR', traceId, `UsuarioSQL.guardar: Datos inválidos`);
            return "Datos inválidos";
        }
        
        log('INFO', traceId, `UsuarioSQL.guardar: Insertando en base de datos con id ${id}`);
        this.usuarios.set(id, { id, ...usuario });
        
        log('DEBUG', traceId, `UsuarioSQL.guardar: Total de usuarios en BD: ${this.usuarios.size}`);
        log('SUCCESS', traceId, `UsuarioSQL.guardar: Usuario ${usuario.nombre} guardado exitosamente`);
        
        return "se guardo con exito";
    }
    
    actualizar = (id, usuario, traceId) => {
        log('INFO', traceId, `UsuarioSQL.actualizar: Buscando usuario ${id}`);
        
        if(this.usuarios.has(id)){
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