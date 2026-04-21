import { log } from '../utils/Logger.js';
import UsuarioEntradaPort from '../../aplicacion/puertos/entrada/UsuarioEntradaPuerto.js';
import UsuarioUsesCase from '../../aplicacion/uses-cases/UsuarioUsesCase.js';
import UsuarioMySQLAdaptador from '../adaptador-salida/UsuarioMySQLAdaptador.js';

class UsuarioControlador {
    constructor(usuarioEntradaPort) {
        if (!(usuarioEntradaPort instanceof UsuarioEntradaPort)) {
            throw new Error("El controlador requiere una implementación de UsuarioEntradaPort");
        }
        this.usuarioEntradaPort = usuarioEntradaPort;
    }

    crear = async (req, res) => {
        const traceId = req.traceId;
        log('INFO', traceId, `UsuarioControlador: Iniciando creación de usuario`);
        log('DEBUG', traceId, `UsuarioControlador: Datos recibidos - ${JSON.stringify(req.body)}`);

        const resultado = await this.usuarioEntradaPort.crear(req.body);
        log('SUCCESS', traceId, `UsuarioControlador: Usuario creado correctamente`);
        log('INFO', traceId, `UsuarioControlador: Enviando respuesta al cliente`);

        res.status(200).json({
            mensaje: 'Petición recibida correctamente',
            traceId,
            resultado
        });
    }
}

const usuarioSalidaPuerto = new UsuarioMySQLAdaptador();
const usuarioCasoUso = new UsuarioUsesCase(usuarioSalidaPuerto);
const usuarioControlador = new UsuarioControlador(usuarioCasoUso);

export const crear = usuarioControlador.crear;
