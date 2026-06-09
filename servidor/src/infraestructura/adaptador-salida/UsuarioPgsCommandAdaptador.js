import usuarioSalidaCommandPuerto from "../../aplicacion/puertos/salida/UsuarioSalidaCommandPuerto.js";
import postgresql from '../base-dato/Postgresql.js'

export default class UsuarioMySQLCommandAdaptador extends usuarioSalidaCommandPuerto {
    
    guardar = async (usuario) => {
        try {
           ModeloUsuario.create({
                nombre: usuario.getNombre()
            },{transaccion});

            (await transaction).commit();
            
        } catch (error) {
            (await transaction).rollback();
            return {
                estado: "error",
                resultado: "Error al guardar en la BD: " + error.message
            }
        }
    }
    actualizar = async (usuario) => {
        try {
            const result = await postgresql.query(
                'UPDATE public.usuario SET nombre = $1 WHERE id = $2 RETURNING id, nombre',
                [usuario.nombre, usuario.id]
            );
            
            if (result.rowCount === 0) {
                return {
                    estado: "error",
                    resultado: `No se encontró el usuario con ID ${usuario.id}`
                };
            }
            
            console.log('Usuario actualizado en PostgreSQL: ', usuario.nombre);
            return {
                estado: "ok",
                resultado: `Usuario con ID ${usuario.id} actualizado a: ${usuario.nombre}`
            };
            
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
            return {
                estado: "error",
                resultado: "Error al actualizar en la BD: " + error.message
            };
        }
    }
    
    eliminar = async (id) => {
        try {
            const existe = await postgresql.query(
                'SELECT id FROM public.usuario WHERE id = $1',
                [id]
            );
            
            if (existe.rowCount === 0) {
                return {
                    estado: "error",
                    resultado: `No se encontró el usuario con ID ${id}`
                };
            }
            
            const result = await postgresql.query(
                'DELETE FROM public.usuario WHERE id = $1 RETURNING id',
                [id]
            );
            
            console.log('Usuario eliminado de PostgreSQL, ID:', id);
            return {
                estado: "ok",
                resultado: `Usuario con ID ${id} eliminado exitosamente`
            };
            
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            return {
                estado: "error",
                resultado: "Error al eliminar en la BD: " + error.message
            };
        }
    }
}