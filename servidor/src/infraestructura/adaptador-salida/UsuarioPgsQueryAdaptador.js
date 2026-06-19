import usuarioSalidaQueryPuerto from "../../aplicacion/puertos/salida/UsuarioSalidaQueryPuerto.js";
import UsuarioFiltro from "../../dominio/filtros/UsuarioFiltro.js";
import ModeloUsuario from "../modelos/ModeloUsuario.js";

/**
 * Adaptador PostgreSQL para operaciones de lectura (QUERY) del Usuario
 * Implementa consultas a la base de datos usando Sequelize
 */
export default class UsuarioPgsQueryAdaptador extends usuarioSalidaQueryPuerto {

    /**
     * Listar todos los usuarios con filtros opcionales
     * @param {Array} filtro - Array de objetos UsuarioFiltro para búsqueda
     * @returns {Object} Resultado con lista de usuarios
     */
    lista = async(filtro = {}) => {
        try {
            console.log('Listando usuarios de PostgreSQL...');
            const where = {};

            // Aplicar filtros si existen
            if (Array.isArray(filtro)) {
                filtro.forEach(esp => {
                    if (esp instanceof UsuarioFiltro) {
                        if (esp.nombre) {
                            where.nombre = esp.nombre;
                        }
                    }
                });
            }

            // Consultar base de datos
            const usuarios = await ModeloUsuario.findAll({
                where,
                attributes: ['id', 'nombre', 'correo', 'estado', 'createdAt', 'updatedAt']
            });

            // Mapear a formato de la API (usu_ prefijo)
            const usuariosFormateados = usuarios.map(u => ({
                usu_id: u.id,
                usu_nombre: u.nombre,
                usu_correo: u.correo,
                usu_estado: u.estado
            }));

            return {
                estado: "ok",
                resultado: usuariosFormateados
            };
        } catch (error) {
            console.error('Error al listar usuarios:', error);
            return {
                estado: "error",
                resultado: error.message
            };
        }
    }

    /**
     * Obtener un usuario específico por ID
     * @param {number} id - ID del usuario a buscar
     * @returns {Object|null} Usuario formateado o null si no existe
     */
    obtenerPorId = async(id) => {
        try {
            console.log('Buscando usuario con ID:', id);
            const usuario = await ModeloUsuario.findByPk(id, {
                attributes: ['id', 'nombre', 'correo', 'estado', 'createdAt', 'updatedAt']
            });

            if (!usuario) {
                return null;
            }

            // Mapear a formato de la API (usu_ prefijo)
            return {
                usu_id: usuario.id,
                usu_nombre: usuario.nombre,
                usu_correo: usuario.correo,
                usu_estado: usuario.estado
            };
        } catch (error) {
            console.error('Error al obtener usuario por ID:', error);
            return null;
        }
    }
}