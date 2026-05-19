import UsuarioSalidaCommandPuerto from "../../aplicacion/puertos/salida/UsuarioSalidaCommandPuerto.js";
import postgresql from '../base-dato/Postgresql.js';

export default class UsuarioPgsCommandAdaptador extends UsuarioSalidaCommandPuerto {
  guardar = async (usuario) => {
    console.log("Se guardó usando el adaptador SQL");
    const query = `
      INSERT INTO public.usuario (cedula, nombre, apellido1, apellido2, direccion)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const result = await postgresql.query(query, [
      usuario.cedula ?? null,
      usuario.nombre,
      usuario.apellido1 ?? null,
      usuario.apellido2 ?? null,
      usuario.direccion ?? null,
    ]);

    return {
      estado: "exitoso",
      resultado: result.rows[0],
    };
  };

  eliminar = async (id) => {
    console.log("Se eliminó usando el adaptador SQL");
    const query = "DELETE FROM public.usuario WHERE id::text = $1 RETURNING *";
    const result = await postgresql.query(query, [String(id)]);

    if (result.rowCount === 0) {
      return {
        estado: "error",
        resultado: "Usuario no encontrado con id: " + id,
      };
    }

    return {
      estado: "exitoso",
      resultado: result.rows[0],
    };
  };

  editar = async (usuario) => {
    console.log("Se editó usando el adaptador SQL");
    const query = `
      UPDATE public.usuario
      SET cedula = $1,
          nombre = $2,
          apellido1 = $3,
          apellido2 = $4,
          direccion = $5
      WHERE id::text = $6
      RETURNING *
    `;
    const result = await postgresql.query(query, [
      usuario.cedula ?? null,
      usuario.nombre,
      usuario.apellido1 ?? null,
      usuario.apellido2 ?? null,
      usuario.direccion ?? null,
      String(usuario.id),
    ]);

    if (result.rowCount === 0) {
      return {
        estado: "error",
        resultado: "Usuario no encontrado para editar con id: " + usuario.id,
      };
    }

    return {
      estado: "exitoso",
      resultado: result.rows[0],
    };
  };
}
