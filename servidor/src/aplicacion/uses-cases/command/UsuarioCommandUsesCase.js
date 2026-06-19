import Usuario from "../../../dominio/entidades/Usuario.js";

/**
 * Caso de uso para operaciones de escritura (COMMAND) del Usuario
 * Gestiona: crear, actualizar y eliminar usuarios
 */
export default class UsuarioCommandUsesCase {
    constructor(adaptadorBDSalida) {
        this.adaptadorBDSalida = adaptadorBDSalida;
    }

    /**
     * Crear un nuevo usuario
     * @param {UsuarioDTO} dtoUsuario - Datos del usuario a crear
     * @returns {Object} Resultado de la operación
     */
    async crear(dtoUsuario) {
        try {
            const errores = dtoUsuario.validarCreacion();
            if (errores.length > 0) {
                return {
                    estado: "error",
                    errores: errores,
                    codigo: "VALIDACION_FALLIDA"
                };
            }

            const usuario = new Usuario(null, dtoUsuario.getNombre(), dtoUsuario.getCorreo(), dtoUsuario.getEstado());
            const result = await this.adaptadorBDSalida.guardar(usuario);

            return {
                estado: "ok",
                usuario: result.usuario
            };
        } catch (error) {
            return {
                estado: "error",
                errores: [error.message],
                codigo: "ERROR_CREACION"
            };
        }
    }

    /**
     * Actualizar un usuario existente
     * @param {number} id - ID del usuario
     * @param {UsuarioDTO} dtoUsuario - Datos a actualizar
     * @returns {Object} Resultado de la operación
     */
    async actualizar(id, dtoUsuario) {
        try {
            const errores = dtoUsuario.validarActualizacion();
            if (errores.length > 0) {
                return {
                    estado: "error",
                    errores: errores,
                    codigo: "VALIDACION_FALLIDA"
                };
            }

            const datosActualizacion = {};
            if (dtoUsuario.getNombre()) datosActualizacion.nombre = dtoUsuario.getNombre();
            if (dtoUsuario.getCorreo()) datosActualizacion.correo = dtoUsuario.getCorreo();
            if (dtoUsuario.getEstado()) datosActualizacion.estado = dtoUsuario.getEstado();

            const result = await this.adaptadorBDSalida.actualizar(id, datosActualizacion);

            if (result.estado === "error") {
                return result;
            }

            return {
                estado: "ok",
                usuario: result.usuario
            };
        } catch (error) {
            return {
                estado: "error",
                errores: [error.message],
                codigo: "ERROR_ACTUALIZACION"
            };
        }
    }

    /**
     * Eliminar un usuario (soft delete)
     * @param {number} id - ID del usuario
     * @returns {Object} Resultado de la operación
     */
    async eliminar(id) {
        try {
            const result = await this.adaptadorBDSalida.eliminar(id);

            if (result.estado === "error") {
                return result;
            }

            return {
                estado: "ok"
            };
        } catch (error) {
            return {
                estado: "error",
                errores: [error.message],
                codigo: "ERROR_ELIMINACION"
            };
        }
    }
}