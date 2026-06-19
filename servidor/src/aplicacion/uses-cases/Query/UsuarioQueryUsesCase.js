/**
 * Caso de uso para operaciones de lectura (QUERY) del Usuario
 * Gestiona: listar usuarios y obtener usuario por ID
 */
export default class UsuarioQueryUsesCase {
    constructor(adaptadorBDSalida) {
        this.adaptadorBDSalida = adaptadorBDSalida;
    }

    /**
     * Listar todos los usuarios
     * @returns {Object} Resultado con lista de usuarios
     */
    async listar() {
        try {
            const filtros = [];
            const respuesta = await this.adaptadorBDSalida.lista(filtros);

            if (respuesta.estado === "error") {
                return {
                    estado: "error",
                    errores: [respuesta.resultado],
                    codigo: "ERROR_LISTADO"
                };
            }

            return {
                estado: "ok",
                usuarios: respuesta.resultado
            };
        } catch (error) {
            return {
                estado: "error",
                errores: [error.message],
                codigo: "ERROR_LISTADO"
            };
        }
    }

    /**
     * Obtener usuario por ID
     * @param {number} id - ID del usuario
     * @returns {Object} Resultado con datos del usuario
     */
    async obtenerPorId(id) {
        try {
            if (!id || isNaN(parseInt(id))) {
                return {
                    estado: "error",
                    errores: ["El ID debe ser un número válido"],
                    codigo: "ID_INVALIDO"
                };
            }

            const usuario = await this.adaptadorBDSalida.obtenerPorId(id);

            if (!usuario) {
                return {
                    estado: "error",
                    errores: ["Usuario no encontrado"],
                    codigo: "USUARIO_NO_ENCONTRADO"
                };
            }

            return {
                estado: "ok",
                usuario: usuario
            };
        } catch (error) {
            return {
                estado: "error",
                errores: [error.message],
                codigo: "ERROR_CONSULTA"
            };
        }
    }
}