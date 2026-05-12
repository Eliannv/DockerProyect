import UsuarioEntradaPort from '../../aplicacion/puertos/entrada/Command/UsuarioEntradaCommandPuerto.js';
import UsuarioMySQLCommondAdaptador from '../adaptador-salida/Command/UsuarioMySQLCommandAdaptador.js';
import UsuarioUsesCase from '../../aplicacion/uses-cases/Command/UsuarioCommandUsesCase.js';
import { usuarioDTO } from '../../aplicacion/dto/UsuarioDTO.js';
import {Buffer} from 'buffer';
import { buffer } from 'stream/consumers';

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
            tamanoJSON = Buffer.byteLength(JSON.stringify(resultado));

            const resultBinario = Buffer.from(JSON.stringify(resultado));
            const tBinario = Buffer.byteLength(resultBinario);
            
            const compresion = zlib.gzipSync(JSON.stringify(resultado));

            res.status(200).json({
                mensaje: 'Petición recibida correctamente',
                traceId: idRequest,
                resultadoJSON: resultado,
                tamanoJSON: tamanoJSON+ " bytes",
                resultBinario: resultBinario,
                tamanoBinario: tBinario+ " bytes ",
                comprimir: compresion
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
