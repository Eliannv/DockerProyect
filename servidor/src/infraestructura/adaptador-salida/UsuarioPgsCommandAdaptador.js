import usuarioSalidaCommandPuerto from "../../aplicacion/puertos/salida/UsuarioSalidaCommandPuerto.js";
import ModeloUsuario, { sequelize } from '../modelos/ModeloUsuario.js';
import { Transaction } from 'sequelize';
import OutboxServicio from '../servicios/OutboxServicio.js';

/**
 * Adaptador PostgreSQL para operaciones de escritura (COMMAND) del Usuario
 * Implementa la persistencia de datos en PostgreSQL usando Sequelize
 * Utiliza transacciones para garantizar consistencia de datos
 */
export default class UsuarioPgsCommandAdaptador extends usuarioSalidaCommandPuerto {

    /**
     * Guardar un nuevo usuario en la base de datos
     * @param {Usuario} usuario - Entidad Usuario a crear
     * @returns {Object} Resultado con datos del usuario creado
     */
    guardar = async(usuario) => {
        const nombre = usuario.getNombre();
        const correo = usuario.getCorreo();
        const estado = usuario.getEstado();

        // Validaciones básicas
        if (nombre === "") {
            throw new Error("El nombre del usuario no puede estar vacío");
        }

        if (!correo || correo === "") {
            throw new Error("El correo del usuario no puede estar vacío");
        }

        if (estado === "") {
            throw new Error("El estado del usuario no puede estar vacío");
        }

        // Iniciar transacción con nivel de aislamiento READ_COMMITTED
        const transaction = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
        });

        try {
            // Crear usuario en la base de datos
            const usuarioCreado = await ModeloUsuario.create({
                nombre: nombre,
                correo: correo,
                estado: estado
            }, { transaction });

            // Registrar evento en Outbox para procesamiento asíncrono
            await OutboxServicio.registrarEvento({
                tipoEvento: 'UsuarioCreado',
                idAgregado: String(usuarioCreado.id),
                contenido: {
                    id: usuarioCreado.id,
                    nombre: usuarioCreado.nombre,
                    correo: usuarioCreado.correo,
                    estado: usuarioCreado.estado
                }
            }, transaction);

            await transaction.commit();
            console.log('Usuario guardado en PostgreSQL:', usuarioCreado.nombre);

            return {
                estado: "ok",
                usuario: {
                    usu_id: usuarioCreado.id,
                    usu_nombre: usuarioCreado.nombre,
                    usu_correo: usuarioCreado.correo,
                    usu_estado: usuarioCreado.estado
                }
            };
        } catch (e) {
            await transaction.rollback();
            console.error('Error al guardar usuario:', e);

            // Validar errores de base de datos específicos
            if (e.name === 'SequelizeUniqueConstraintError') {
                return {
                    estado: "error",
                    resultado: "El correo ya está registrado"
                };
            }

            return {
                estado: "error",
                resultado: "Error al guardar en la BD: " + e.message
            };
        }
    }

    /**
     * Actualizar datos de un usuario existente
     * @param {number} id - ID del usuario a actualizar
     * @param {Object} datosActualizacion - Campos a actualizar
     * @returns {Object} Resultado con datos del usuario actualizado
     */
    actualizar = async(id, datosActualizacion) => {
        const transaction = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
        });

        try {
            // Buscar usuario existente
            const usuario = await ModeloUsuario.findByPk(id, { transaction });

            if (!usuario) {
                await transaction.rollback();
                return {
                    estado: "error",
                    errores: ["Usuario no encontrado"],
                    codigo: "USUARIO_NO_ENCONTRADO"
                };
            }

            // Actualizar solo los campos proporcionados
            if (datosActualizacion.nombre) {
                usuario.nombre = datosActualizacion.nombre;
            }
            if (datosActualizacion.correo) {
                usuario.correo = datosActualizacion.correo;
            }
            if (datosActualizacion.estado) {
                usuario.estado = datosActualizacion.estado;
            }

            // Guardar cambios
            await usuario.save({ transaction });

            // Registrar evento en Outbox
            await OutboxServicio.registrarEvento({
                tipoEvento: 'UsuarioActualizado',
                idAgregado: String(usuario.id),
                contenido: {
                    id: usuario.id,
                    nombre: usuario.nombre,
                    correo: usuario.correo,
                    estado: usuario.estado
                }
            }, transaction);

            await transaction.commit();
            console.log('Usuario actualizado en PostgreSQL:', usuario.nombre);

            return {
                estado: "ok",
                usuario: {
                    usu_id: usuario.id,
                    usu_nombre: usuario.nombre,
                    usu_correo: usuario.correo,
                    usu_estado: usuario.estado
                }
            };
        } catch (e) {
            await transaction.rollback();
            console.error('Error al actualizar usuario:', e);

            if (e.name === 'SequelizeUniqueConstraintError') {
                return {
                    estado: "error",
                    errores: ["El correo ya está registrado"],
                    codigo: "CORREO_DUPLICADO"
                };
            }

            return {
                estado: "error",
                errores: ["Error al actualizar en la BD: " + e.message],
                codigo: "ERROR_BD"
            };
        }
    }

    /**
     * Eliminar un usuario (soft delete - marca como eliminado)
     * @param {number} id - ID del usuario a eliminar
     * @returns {Object} Resultado de la operación
     */
    eliminar = async(id) => {
        const transaction = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
        });

        try {
            const usuario = await ModeloUsuario.findByPk(id, { transaction });

            if (!usuario) {
                await transaction.rollback();
                return {
                    estado: "error",
                    errores: ["Usuario no encontrado"],
                    codigo: "USUARIO_NO_ENCONTRADO"
                };
            }

            // Soft delete: marca como eliminado sin borrar datos
            await usuario.destroy({ transaction });

            // Registrar evento en Outbox
            await OutboxServicio.registrarEvento({
                tipoEvento: 'UsuarioEliminado',
                idAgregado: String(id),
                contenido: {
                    id: id,
                    nombre: usuario.nombre
                }
            }, transaction);

            await transaction.commit();
            console.log('Usuario eliminado de PostgreSQL, ID:', id);

            return {
                estado: "ok"
            };
        } catch (e) {
            await transaction.rollback();
            console.error('Error al eliminar usuario:', e);
            return {
                estado: "error",
                errores: ["Error al eliminar en la BD: " + e.message],
                codigo: "ERROR_BD"
            };
        }
    }
}