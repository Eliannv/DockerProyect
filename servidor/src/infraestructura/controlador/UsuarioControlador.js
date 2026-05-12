import {log} from '../utils/Logger.js';
import UsuarioCommandUsesCase from '../../aplicacion/uses-cases/Command/UsuarioCommandUsesCase.js';
import UsuarioSQL from '../persistencia/UsuarioSQL.js';

const usuarioSQL = new UsuarioSQL();
const usuarioUsesCase = new UsuarioCommandUsesCase(usuarioSQL);

export const crear = (req, res) => {
    const traceId = req.traceId;
    log('INFO', traceId, `UsuarioControlador: Iniciando creación de usuario`);
    log('DEBUG', traceId, `UsuarioControlador: Datos recibidos - ${JSON.stringify(req.body)}`);
    

    const resultado = usuarioUsesCase.crear(req.body, traceId);
    const adaptadorMysql = new usuarioSQL(req.body);
    const casoUsuario = new UsuarioCommandUsesCase(adaptadorMysql);
    log('SUCCESS', traceId, `UsuarioControlador: Usuario creado con id ${resultado.id}`);
    log('INFO', traceId, `UsuarioControlador: Enviando respuesta al cliente`);
    
    res.status(200).json({
        id: resultado.id,
        mensaje: resultado.mensaje,
        traceId: traceId,
        trazabilidad: resultado.trazabilidad
    });

    //Un caso de uso tiene entidades
    //Corrregir el caso de uso se está dependiendo del adaptador y el caso de uso no debe depender del adaptador.
    //En el controlador (adaptador de entrada) no se está obligando a usar un puerto de entrada.
    //En el controlador crear una clase que abstraiga un puerto de entrada t que el controlador use esa clase de usar directamente el caso de uso.
};
