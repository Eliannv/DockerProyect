import usuarioSalidaCommandPuerto from "../../aplicacion/puertos/salida/UsuarioSalidaCommandPuerto.js";
import ModeloUsuario, {sequelize} from '../modelos/ModeloUsuario.js';
import { Transaction } from 'sequelize';
import OutboxServicio from '../servicios/OutboxServicio.js';

export default class UsuarioMySQLCommandAdaptador extends usuarioSalidaCommandPuerto {
    
    /*guardar = async (usuario) => {
        try {
            const result = await postgresql.query(
                'INSERT INTO public.usuario (nombre) VALUES ($1) RETURNING id',
                [usuario.nombre]
            );
            const idGenerado = result.rows[0].id;
            usuario.id = idGenerado;
            console.log('Usuario guardado en PostgreSQL: ', usuario.nombre);
            
            return {
                estado: "ok",
                resultado: "Se guardó con éxito en la BD: " + usuario.nombre
            };
            
        } catch (error) {
            console.error('Error al guardar usuario:', error);
            if (error.code === '23505') {
                return {
                    estado: "error",
                    resultado: "El ID del usuario ya existe"
                };
            }
            return {
                estado: "error",
                resultado: "Error al guardar en la BD: " + error.message
            };
        }
    }*/

        guardar = async (usuario) => {
            const nombre = usuario.getNombre();


            if(nombre === ""){
                throw new Error("El nombre del usuario no puede estar vacío");
            }

            const transaction = await sequelize.transaction({
                    isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
            });
            try {
                const usuarioCreado = await ModeloUsuario.create({
                    nombre: usuario.getNombre()
                }, { transaction });

                await OutboxServicio.registrarEvento({
                    tipoEvento: 'UsuarioCreado',
                    idAgregado: String(usuarioCreado.id),
                    contenido: {
                        id: usuarioCreado.id,
                        nombre: usuarioCreado.nombre
                    }
                }, transaction);
                
                await transaction.commit();
                console.log('Se guardo usando el adaptador SQL')
                return {
                    estado: "ok",
                    resultado: "Se guardó con éxito en la BD: " + usuario.getNombre()
                };
            } catch (e) {
                await transaction.rollback();
                return {
                    estado: "error",
                    resultado: "Error al guardar en la BD: " + e.message
                };
            }
        }

        actualizar = async (usuario) => {
            const id = usuario.getId();
            const nombre = usuario.getNombre();

            if (!id) {
                throw new Error("El ID del usuario no puede estar vacío");
            }

            if (!nombre) {
                throw new Error("El nombre del usuario no puede estar vacío");
            }

            const transaction = await sequelize.transaction({
                isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
            });

            try {
                const usuarioExistente = await ModeloUsuario.findByPk(id, { transaction });
                if (!usuarioExistente) {
                    throw new Error(`No existe un usuario con ID ${id}`);
                }

                usuarioExistente.nombre = nombre;
                await usuarioExistente.save({ transaction });

                await OutboxServicio.registrarEvento({
                    tipoEvento: 'UsuarioActualizado',
                    idAgregado: String(usuarioExistente.id),
                    contenido: {
                        id: usuarioExistente.id,
                        nombre: usuarioExistente.nombre
                    }
                }, transaction);

                await transaction.commit();
                console.log('Se actualizó usando el adaptador SQL');
                return {
                    estado: "ok",
                    resultado: `Usuario con ID ${id} actualizado a: ${nombre}`
                };
            } catch (e) {
                await transaction.rollback();
                return {
                    estado: "error",
                    resultado: "Error al actualizar en la BD: " + e.message
                };
            }
        }

        eliminar = async (id) => {
            const transaction = await sequelize.transaction({
                    isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
            });

            try {

                if (!id) {
                    throw new Error("El ID del usuario no puede estar vacío");
                }

                const usuarioExistente = await ModeloUsuario.findByPk(id, { transaction });
                if (!usuarioExistente) {
                    throw new Error(`No existe un usuario con ID ${id}`);
                }

                await OutboxServicio.registrarEvento({
                    tipoEvento: 'UsuarioEliminado',
                    idAgregado: String(usuarioExistente.id),
                    contenido: {
                        id: usuarioExistente.id,
                        nombre: usuarioExistente.nombre
                    }
                }, transaction);

                await usuarioExistente.destroy({ transaction });
                await transaction.commit();
                console.log('Se eliminó usando el adaptador SQL')
                return {
                    estado: "ok",
                    resultado: "Se eliminó con éxito en la BD. ID: " + id
                };
            } catch (e) {
                await transaction.rollback();
                return {
                    estado: "error",
                    resultado: "Error al eliminar en la BD: " + e.message
                };
            }
        }
}