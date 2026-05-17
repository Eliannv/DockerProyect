import UsuarioSalidaQueryPuerto from "../../aplicacion/puertos/salida/UsuarioSalidaQueryPuerto.js";
import postgresql from '../base-dato/Postgresql.js';

export default class UsuarioPgsQueryAdaptador extends UsuarioSalidaQueryPuerto {

  listar = async () => {
    console.log("Se leyeron los usuarios usando el adaptador SQL");
    const query = "SELECT * FROM public.usuario";
    const result = await postgresql.query(query);
    return {
      estado: "exitoso",
      resultado: result.rows,
    };
  };

  listarById = async (id) => {
    console.log(`Se buscó el usuario con id: ${id} usando el adaptador SQL`);
    const query = "SELECT * FROM public.usuario WHERE id::text = $1";
    const result = await postgresql.query(query, [String(id)]);

    if (result.rows.length > 0) {
      return {
        estado: "exitoso",
        resultado: result.rows[0],
      };
    }

    return {
      estado: "error",
      resultado: "Usuario no encontrado",
    };
  };
}
