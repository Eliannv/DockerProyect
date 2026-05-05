import UsuarioEntradaPort from '../../aplicacion/puertos/entrada/UsuarioEntradaPuerto.js';
import usuarioCasoUso from '../../aplicacion/uses-cases/UsuarioUsesCase.js';
import usuarioMySQLCommandAdaptador from '../adaptador-salida/UsuarioMySQLCommandAdaptador.js'

export class UsuarioControlador extends UsuarioEntradaPort {
    crear = async (req,res)=>{


    const idRequest = req.traceId;
    const datos =  req.body;

    const dtoUsu = new UsuarioDTO(datos);

    console.log("Ingresamos al controlador con: " + idRequest + await dtoUsu.getNombres()); //si aqui usamos dtoUsu.nombre, violentamos el uso del getter

    const adaptadorBDSalida =  new usuarioMySQLCommandAdaptador();
    const casoUsoUsuario =  new usuarioCasoUso(adaptadorBDSalida);  
 
    const resultado = await casoUsoUsuario.crear(dtoUsu);

    res.status(200).json({
        mensaje: 'Petición recibida correctamente',
        traceId: idRequest,
        resultado : resultado
    })
}
}
