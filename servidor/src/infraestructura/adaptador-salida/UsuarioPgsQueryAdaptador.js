import usuarioSalidaQueryPuerto from "../../aplicacion/puertos/salida/UsuarioSalidaQueryPuerto.js";
import UsuarioFiltro from "../../dominio/filtros/UsuarioFiltro.js";
import ModeloUsuario from "../modelos/ModeloUsuario.js";

export default class UsuarioPgsQueryAdaptador extends usuarioSalidaQueryPuerto {

    lista = async(filtro = {}) => {
        console.log('Listando la tabla usuario..')
        const where = {};
        filtro.forEach(esp => {
            if(esp instanceof UsuarioFiltro){
                if(esp.nombre){
                    where.nombre = esp.nombre;
                }
            }
        });

        const usuarios = await ModeloUsuario.findAll({ where });
        return {
            estado: "ok",
            resultado: usuarios
        }
    }
}