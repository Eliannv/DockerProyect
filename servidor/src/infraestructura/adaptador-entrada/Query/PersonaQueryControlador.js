import { Buffer } from 'buffer';
import zlib from 'zlib';
import PersonaEntradaQueryPuerto from '../../../aplicacion/puertos/entrada/Query/PersonaEntradaQueryPuerto.js';
import PersonaQueryUsesCase from '../../../aplicacion/uses-cases/Query/PersonaQueryUsesCase.js';
import PersonaMySQLQueryAdaptador from '../../adaptador-salida/Query/PersonaMySQLQueryAdaptador.js';

export default class PersonaQueryControlador extends PersonaEntradaQueryPuerto {

    #casoUso;

    constructor() {
        super();
        const adaptador = new PersonaMySQLQueryAdaptador();
        this.#casoUso = new PersonaQueryUsesCase(adaptador);
    }

    listar = async (req, res) => {
        const idRequest = req.traceId;
        try {
            const resultado    = await this.#casoUso.listar();
            const json         = JSON.stringify(resultado);
            const tamanoJSON   = Buffer.byteLength(json);
            const resultBinario = Buffer.from(json);
            const tBinario     = Buffer.byteLength(resultBinario);
            const comprimir    = zlib.gzipSync(json);
            res.status(200).json({
                mensaje: 'Lista de personas obtenida',
                traceId: idRequest,
                total: resultado.length,
                resultadoJSON:  resultado,
                tamanoJSON:     tamanoJSON + ' bytes',
                resultBinario:  resultBinario,
                tamanoBinario:  tBinario + ' bytes',
                comprimir:      comprimir
            });
        } catch (e) {
            res.status(500).json({ mensaje: e.message, traceId: idRequest });
        }
    };
}
