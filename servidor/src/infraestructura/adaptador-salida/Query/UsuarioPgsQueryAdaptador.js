import usuarioSalidaQueryPuerto from "../../../aplicacion/puertos/salida/Query/UsuarioSalidaQueryPuerto.js";
import postgresql from "../../base-dato/Postgresql.js";

export default class UsuarioPgsQueryAdaptador extends usuarioSalidaQueryPuerto{
    lista = async () => {
        console.log("Listando la tabla usuario...");
        const query = "SELECT * FROM public.usuario";
        const result = await postgresql.query(query);
        return{
            estado: "ok",
            resultado: result.rows
        }
    }
}