import { UsuarioDTO } from '../../aplicacion/dto/UsuarioDTO.js';
import UsuarioEntradaPort from "../../aplicacion/puertos/entrada/UsuarioEntradaPuerto.js"

/**
 * Controlador HTTP para las operaciones del Usuario
 * Maneja las solicitudes HTTP y traduce a casos de uso
 */
export class UsuarioControlador extends UsuarioEntradaPort {
    constructor(casoUsoCommand, casoUsoQuery) {
        super();
        this.casoUsoCommandUsuario = casoUsoCommand;
        this.casoUsoQueryUsuario = casoUsoQuery;
    }

    /**
     * POST /api/v1/usuarios - Crear un nuevo usuario
     * @param {Request} req - Objeto request con datos en body
     * @param {Response} res - Objeto response para enviar la respuesta
     */
    crear = async(req, res) => {
        try {
            if (!req.is('application/json')) {
                return res.enviarError('CONTENT_TYPE_INVALIDO', 'El Content-Type debe ser application/json', [], 400);
            }

            const datos = req.body;
            const dtoUsu = new UsuarioDTO(datos);

            const resultado = await this.casoUsoCommandUsuario.crear(dtoUsu);

            if (resultado.estado === 'error') {
                return res.enviarError('VALIDACION_FALLIDA', 'Datos inválidos', resultado.errores, 400);
            }

            return res.enviarExito(resultado.usuario, 'Usuario creado correctamente', 201);
        } catch (error) {
            console.error('Error al crear usuario:', error);
            return res.enviarError('ERROR_INTERNO', error.message, [], 500);
        }
    };

    /**
     * GET /api/v1/usuarios - Listar todos los usuarios
     * @param {Request} req - Objeto request
     * @param {Response} res - Objeto response para enviar la respuesta
     */
    lista = async(req, res) => {
        try {
            const resultado = await this.casoUsoQueryUsuario.listar();

            if (resultado.estado === 'error') {
                return res.enviarError('ERROR_LISTADO', 'Error al listar usuarios', resultado.errores, 500);
            }

            return res.enviarExito(resultado.usuarios, 'Usuarios listados correctamente', 200);
        } catch (error) {
            console.error('Error al listar usuarios:', error);
            return res.enviarError('ERROR_INTERNO', error.message, [], 500);
        }
    };

    /**
     * GET /api/v1/usuarios/:id - Obtener usuario por ID
     * @param {Request} req - Objeto request con ID en params
     * @param {Response} res - Objeto response para enviar la respuesta
     */
    obtenerPorId = async(req, res) => {
        try {
            const id = req.params.id;

            const resultado = await this.casoUsoQueryUsuario.obtenerPorId(id);

            if (resultado.estado === 'error') {
                if (resultado.codigo === 'USUARIO_NO_ENCONTRADO') {
                    return res.enviarError('USUARIO_NO_ENCONTRADO', 'Usuario no encontrado', [], 404);
                }
                return res.enviarError(resultado.codigo, resultado.errores[0], resultado.errores, 400);
            }

            return res.enviarExito(resultado.usuario, 'Usuario obtenido correctamente', 200);
        } catch (error) {
            console.error('Error al obtener usuario:', error);
            return res.enviarError('ERROR_INTERNO', error.message, [], 500);
        }
    };

    /**
     * PATCH /api/v1/usuarios/:id - Actualizar usuario parcialmente
     * @param {Request} req - Objeto request con ID en params y datos en body
     * @param {Response} res - Objeto response para enviar la respuesta
     */
    actualizar = async(req, res) => {
        try {
            if (!req.is('application/json')) {
                return res.enviarError('CONTENT_TYPE_INVALIDO', 'El Content-Type debe ser application/json', [], 400);
            }

            const id = req.params.id;
            const datos = req.body;
            const dtoUsu = new UsuarioDTO(datos);

            const resultado = await this.casoUsoCommandUsuario.actualizar(id, dtoUsu);

            if (resultado.estado === 'error') {
                if (resultado.codigo === 'USUARIO_NO_ENCONTRADO') {
                    return res.enviarError('USUARIO_NO_ENCONTRADO', 'Usuario no encontrado', [], 404);
                }
                return res.enviarError('VALIDACION_FALLIDA', 'Datos inválidos', resultado.errores, 400);
            }

            return res.enviarExito(resultado.usuario, 'Usuario actualizado correctamente', 200);
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
            return res.enviarError('ERROR_INTERNO', error.message, [], 500);
        }
    };

    /**
     * DELETE /api/v1/usuarios/:id - Eliminar usuario (soft delete)
     * @param {Request} req - Objeto request con ID en params
     * @param {Response} res - Objeto response para enviar la respuesta
     */
    eliminar = async(req, res) => {
        try {
            const id = req.params.id;

            if (!id || isNaN(parseInt(id))) {
                return res.enviarError('ID_INVALIDO', 'El ID debe ser un número válido', [], 400);
            }

            const resultado = await this.casoUsoCommandUsuario.eliminar(id);

            if (resultado.estado === 'error') {
                if (resultado.codigo === 'USUARIO_NO_ENCONTRADO') {
                    return res.enviarError('USUARIO_NO_ENCONTRADO', 'Usuario no encontrado', [], 404);
                }
                return res.enviarError('ERROR_ELIMINACION', resultado.errores[0], resultado.errores, 500);
            }

            return res.enviarVacio(204);
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            return res.enviarError('ERROR_INTERNO', error.message, [], 500);
        }
    };
}