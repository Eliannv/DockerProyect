import UsuarioEntradaPort from '../../aplicacion/puertos/entrada/UsuarioEntradaPuerto.js';
import UsuarioMySQLCommondAdaptador from '../adaptador-salida/UsuarioMySQLCommondAdaptador.js';
import UsuarioUsesCase from '../../aplicacion/uses-cases/UsuarioUsesCase.js';
import { usuarioDTO } from '../../aplicacion/dto/UsuarioDTO.js';

class UsuarioController extends UsuarioEntradaPort {
    constructor() {
        super();
        this.adaptador = new UsuarioMySQLCommondAdaptador();
        this.casoUsuario = new UsuarioUsesCase(this.adaptador);
    }

    async crear(req, res) {
        const idRequest = req.traceId;
        const datos = req.body;
        console.log("Ingresamos al controlador con:", idRequest, datos);

        try {
            const dtoUsu = new usuarioDTO(datos);
            const resultado = await this.casoUsuario.crear(dtoUsu);
            res.status(200).json({
                mensaje: 'Petición recibida correctamente',
                traceId: idRequest,
                resultado,
            });
        } catch (error) {
            console.error('Error en crear usuario:', error);
            res.status(500).json({
                mensaje: 'Error interno al crear usuario',
                error: error.message,
                traceId: idRequest,
            });
        }
    }
}

const controller = new UsuarioController();

export const crear = (req, res) => controller.crear(req, res);