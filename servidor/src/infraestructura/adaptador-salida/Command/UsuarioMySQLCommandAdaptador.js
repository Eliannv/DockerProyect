import UsuarioSalidaCommondPuerto from "../../../aplicacion/puertos/salida/Command/UsuarioSalidaCommandPuerto.js";

export default class UsuarioMySQLCommondAdaptador extends UsuarioSalidaCommondPuerto {
    guardar = (usuario) => {
        console.log('Se guardó usando el adaptador SQL');
        return "Se guardo con exito en la BD:   " + usuario.nombre;
    }
}
