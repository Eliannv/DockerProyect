import {log} from '../utils/Logger.js';
import UsuarioUsesCase from '../../aplicacion/uses-cases/UsuarioUsesCase.js';
import UsuarioSQL from '../persistencia/UsuarioSQL.js';

const usuarioSQL = new UsuarioSQL();
const usuarioUsesCase = new UsuarioUsesCase(usuarioSQL);

export const crear = (req, res) => {
    const traceId = req.traceId;
    log('INFO', traceId, `UsuarioControlador: Iniciando creación de usuario`);
    log('DEBUG', traceId, `UsuarioControlador: Datos recibidos - ${JSON.stringify(req.body)}`);
    
    const resultado = usuarioUsesCase.crear(req.body, traceId);
    
    log('SUCCESS', traceId, `UsuarioControlador: Usuario creado con id ${resultado.id}`);
    log('INFO', traceId, `UsuarioControlador: Enviando respuesta al cliente`);
    
    res.json({
        id: resultado.id,
        mensaje: resultado.mensaje,
        traceId,
        trazabilidad: resultado.trazabilidad
    });
};
