import usuarioSalidaCommandPuerto from "../../../aplicacion/puertos/salida/UsuarioSalidaCommandPuerto.js";
import postgresql from '../../base-dato/Postgresql.js'

export default class UsuarioMySQLCommandAdaptador extends usuarioSalidaCommandPuerto{
     guardar = async (usuario) =>{
        console.log('Se guardó usando el adaptador SQL')
        return {
            estado: "ok", 
            resultado: "se guardo con exito en la BD: "+ usuario.nombre
        } 
    }
}