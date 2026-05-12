import UsuarioEntradaQueryPuerto from '../../../aplicacion/puertos/entrada/Query/UsuarioEntradaQueryPuerto.js';
import UsuarioMySQLQueryAdaptador from '../../adaptador-salida/Query/UsuarioMySQLQueryAdaptador.js';
import UsuarioQueryUsesCase from '../../../aplicacion/uses-cases/Query/UsuarioQueryUsesCase.js';

class UsuarioQueryControlador extends UsuarioEntradaQueryPuerto {
    constructor() {
        super();
        this.adaptador = new UsuarioMySQLQueryAdaptador();
        this.casoUsoQuery = new UsuarioQueryUsesCase(this.adaptador);
    }

    async obtenerNombre(req, res) {
        const idRequest = req.traceId;
        const { indice } = req.params;

        try {
            // Validar que el índice sea un número
            if (indice === undefined || indice === null || isNaN(indice)) {
                return res.status(400).json({
                    mensaje: 'El índice es requerido y debe ser numérico',
                    traceId: idRequest,
                });
            }

            const indiceNum = parseInt(indice, 10);

            // Validar que el índice esté dentro del rango válido
            if (indiceNum < 0 || indiceNum >= 5) {
                return res.status(400).json({
                    mensaje: 'El índice debe estar entre 0 y 4',
                    traceId: idRequest,
                });
            }

            console.log("Ingresamos al controlador de query con:", idRequest, indiceNum);

            const resultado = await this.casoUsoQuery.obtenerNombre(indiceNum);

            res.status(200).json({
                mensaje: 'Nombre obtenido correctamente',
                traceId: idRequest,
                datos: {
                    indice: resultado.getIndice(),
                    nombre: resultado.getNombre()
                }
            });
        } catch (error) {
            console.error('Error en obtenerNombre:', error);
            res.status(500).json({
                mensaje: 'Error interno al obtener nombre',
                error: error.message,
                traceId: idRequest,
            });
        }
    }

    async listarNombres(req, res) {
        const idRequest = req.traceId;

        try {
            console.log("Ingresamos al controlador de query listar con:", idRequest);

            const resultados = await this.casoUsoQuery.listarNombres();

            res.status(200).json({
                mensaje: 'Nombres obtenidos correctamente',
                traceId: idRequest,
                datos: resultados.map(dto => ({
                    indice: dto.getIndice(),
                    nombre: dto.getNombre()
                }))
            });
        } catch (error) {
            console.error('Error en listarNombres:', error);
            res.status(500).json({
                mensaje: 'Error interno al listar nombres',
                error: error.message,
                traceId: idRequest,
            });
        }
    }
}

const controllerQuery = new UsuarioQueryControlador();

export const obtenerNombre = (req, res) => controllerQuery.obtenerNombre(req, res);
export const listarNombres = (req, res) => controllerQuery.listarNombres(req, res);