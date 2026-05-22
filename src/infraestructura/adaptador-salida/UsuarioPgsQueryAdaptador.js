import usuarioSalidaQueryPuerto from "../../aplicacion/puertos/salida/UsuarioSalidaQueryPuerto.js";
import UsuarioFiltro from "../../dominio/filtros/UsuarioFiltro.js";
import postgresql from '../base-dato/Postgresql.js'

export default class UsuarioPgsQueryAdaptador extends usuarioSalidaQueryPuerto {
    lista = async(filtro = {}) => {
        console.log('Listando la tabla usuario..')
        let query = "select * from public.usuario where 1=1";
        
        let contar = 1;
        let parametro = [];
        filtro.forEach(esp => {

        if(esp instanceof UsuarioFiltro){

            query+= ` AND nombre = $${contar}`;
            parametro.push(esp.nombre);
            
        }
            contar++;

        });

        console.log(query);
        const result = await postgresql.query(query, parametro);
        return {
            estado: "ok",
            resultado: result.rows
        }
    }
}