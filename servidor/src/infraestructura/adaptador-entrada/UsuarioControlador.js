import { log } from '../utils/Logger.js';
import UsuarioEntradaPort from '../../aplicacion/puertos/entrada/UsuarioEntradaPuerto.js';
import UsuarioUsesCase from '../../aplicacion/uses-cases/UsuarioUsesCase.js';
import UsuarioMySQLAdaptador from '../adaptador-salida/UsuarioMySQLAdaptador.js';

export class UsuarioControlador extends UsuarioEntradaPort {
    /*constructor(usuarioEntradaPort) {
        if (!(usuarioEntradaPort instanceof UsuarioEntradaPort)) {
            throw new Error("El controlador requiere una implementación de UsuarioEntradaPort");
        }
        this.usuarioEntradaPort = usuarioEntradaPort;
    }*/

    crear = async (req, res) => {
        const traceId = req.traceId;
        const datos = req.body;
        log('INFO', traceId, `UsuarioControlador: Iniciando creación de usuario`);
        log('DEBUG', traceId, `UsuarioControlador: Datos recibidos - ${JSON.stringify(req.body)}`);
        const usuarioSalidaPuerto = new UsuarioMySQLAdaptador();
        const usuarioCasoUso = new UsuarioUsesCase(usuarioSalidaPuerto);
        const resultado = await usuarioCasoUso.crear(datos.nombre);
        log('SUCCESS', traceId, `UsuarioControlador: Usuario creado correctamente`);
        log('INFO', traceId, `UsuarioControlador: Enviando respuesta al cliente`);

        res.status(200).json({
            mensaje: 'Petición recibida correctamente',
            traceId,
            resultado
        });
    }
}
