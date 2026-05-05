import usuarioSalidaCommandPuerto from "../../aplicacion/puertos/salida/UsuarioSalidaCommandPuerto.js";

export default class UsuarioMySQLCommandAdaptador extends usuarioSalidaCommandPuerto{
    guardar = async (usuario) =>{
        console.log('Se guardó usando el adaptador SQL')
        return {
            estado: "ok",
            resultado: "se guardo con exito en la BD: " + usuario.nombre 
        }
    }
}