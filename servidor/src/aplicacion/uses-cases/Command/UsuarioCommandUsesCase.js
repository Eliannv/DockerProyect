import {log} from '../../../infraestructura/utils/Logger.js';
import Usuario from "../../../dominio/entidades/Usuario.js";

export default class UsuarioUsesCase{
    constructor(adaptadorSalida){
        this.adaptadorSalida = adaptadorSalida;
        //Se depende del adaptador el constructor.
    }

    async crear (nombre){
        const id = Date.now().toString();
        const nuevoUsuario = new Usuario(id, nombre);
        const result = await this.adaptadorSalida.guardar(nuevoUsuario);
        return {
            estado: 'success',
            resultado: result.resultado
        };
    }

    /*crear = (usuario, traceId) => {
        log('INFO', traceId, `UsuarioUsesCase.crear: Iniciando proceso de creación`);
        
        const id = Date.now().toString();
        log('DEBUG', traceId, `UsuarioUsesCase.crear: Generado id único: ${id}`);
        
        const nuevoUsuario = new Usuario(id, usuario.cedula, usuario.nombre, usuario.apellido, usuario.email);
        log('DEBUG', traceId, `UsuarioUsesCase.crear: Entidad Usuario creada`);
        
        log('INFO', traceId, `UsuarioUsesCase.crear: Guardando usuario en repositorio`);
        this.usuarioRepositorio.guardar(nuevoUsuario);
        
        log('SUCCESS', traceId, `UsuarioUsesCase.crear: Usuario guardado exitosamente`);
        
        return {
            id,
            mensaje: `Se creó el usuario ${nuevoUsuario.nombre}`,
            trazabilidad: [
                `[${traceId}] Solicitud recibida`,
                `[${traceId}] Validacion de datos`,
                `[${traceId}] Creacion de entidad Usuario`,
                `[${traceId}] Guardado en base de datos`
            ]
        };
    }*/
    
    /*editar = (id, usuario, traceId) => {
        log('INFO', traceId, `UsuarioUsesCase.editar: Iniciando edición de usuario ${id}`);
        this.usuarioRepositorio.actualizar(id, usuario, traceId);
        log('SUCCESS', traceId, `UsuarioUsesCase.editar: Usuario actualizado`);
        return {
            id,
            mensaje: `Se editó el usuario ${usuario.nombre}`
        };
    }

    listar = (traceId) => {
        log('INFO', traceId, `UsuarioUsesCase.listar: Obteniendo lista de usuarios`);
        const usuarios = this.usuarioRepositorio.listar();
        log('DEBUG', traceId, `UsuarioUsesCase.listar: ${usuarios.length} usuarios encontrados`);
        return usuarios;
    }*/
}