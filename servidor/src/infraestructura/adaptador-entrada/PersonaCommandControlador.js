import { Buffer } from 'buffer';
import zlib from 'zlib';
import { PersonaDTO } from '../../aplicacion/dto/PersonaDTO.js';
import PersonaEntradaCommandPuerto from '../../aplicacion/puertos/entrada/PersonaEntradaCommandPuerto.js';
import PersonaCommandUsesCase from '../../aplicacion/uses-cases/PersonaCommandUsesCase.js';
import PersonaMySQLCommandAdaptador from '../adaptador-salida/PersonaMySQLCommandAdaptador.js';

export default class PersonaCommandControlador extends PersonaEntradaCommandPuerto {

    #casoUso;

    constructor() {
        super();
        // Inyección de dependencias: el controlador recibe el caso de uso
        // que a su vez recibe el adaptador de salida
        const adaptador = new PersonaMySQLCommandAdaptador();
        this.#casoUso = new PersonaCommandUsesCase(adaptador);
    }

    #construirRespuesta(resultado) {
        const json        = JSON.stringify(resultado);
        const tamanoJSON  = Buffer.byteLength(json);
        const resultBinario = Buffer.from(json);
        const tBinario    = Buffer.byteLength(resultBinario);
        const comprimir   = zlib.gzipSync(json);
        return {
            resultadoJSON:  resultado,
            tamanoJSON:     tamanoJSON + ' bytes',
            resultBinario:  resultBinario,
            tamanoBinario:  tBinario + ' bytes',
            comprimir:      comprimir
        };
    }

    crear = async (req, res) => {
        const idRequest = req.traceId;
        const dto = new PersonaDTO(req.body);
        if (!dto.esValido()) {
            return res.status(400).json({ mensaje: 'Faltan campos: cedula, nombre, apellido1, apellido2, direccion', traceId: idRequest });
        }
        try {
            const resultado = await this.#casoUso.crear(dto);
            res.status(201).json({ mensaje: 'Persona creada correctamente', traceId: idRequest, ...this.#construirRespuesta(resultado) });
        } catch (e) {
            res.status(409).json({ mensaje: e.message, traceId: idRequest });
        }
    };

    editar = async (req, res) => {
        const idRequest = req.traceId;
        const { cedula } = req.body;
        const dto = new PersonaDTO(req.body);
        if (!cedula) {
            return res.status(400).json({ mensaje: 'Se requiere cedula en el body', traceId: idRequest });
        }
        try {
            const resultado = await this.#casoUso.editar(cedula, dto);
            res.status(200).json({ mensaje: 'Persona actualizada correctamente', traceId: idRequest, ...this.#construirRespuesta(resultado) });
        } catch (e) {
            res.status(404).json({ mensaje: e.message, traceId: idRequest });
        }
    };

    eliminar = async (req, res) => {
        const idRequest = req.traceId;
        const { cedula } = req.body;
        if (!cedula) {
            return res.status(400).json({ mensaje: 'Se requiere cedula en el body', traceId: idRequest });
        }
        try {
            const resultado = await this.#casoUso.eliminar(cedula);
            res.status(200).json({ mensaje: 'Persona eliminada correctamente', traceId: idRequest, ...this.#construirRespuesta(resultado) });
        } catch (e) {
            res.status(404).json({ mensaje: e.message, traceId: idRequest });
        }
    };
}
