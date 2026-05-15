import { UsuarioControlador } from "../adaptador-entrada/UsuarioControlador.js";
import UsuarioCommandAdaptadorSalida from "../adaptador-salida/Command/UsuarioPgsCommandAdaptador.js";
import UsuarioQueryAdaptadorSalida from "../adaptador-salida/Query/UsuarioPgsQueryAdaptador.js";

import UCommandCaso from "../../aplicacion/uses-cases/Command/UsuarioCommandUsesCase.js"
import UQueryCaso from "../../aplicacion/uses-cases/Query/UsuarioQueryUsesCase.js"

const usuarioCommandPgsBDSalida =  new UsuarioCommandAdaptadorSalida();
const usuarioQueryPgsBDSalida =  new UsuarioQueryAdaptadorSalida();

const casoUsoCommandUsuario =  new UCommandCaso(usuarioCommandPgsBDSalida);  
const casoUsoQueryUsuario =  new UQueryCaso(usuarioQueryPgsBDSalida);  

const usuarioControlador = new UsuarioControlador(casoUsoCommandUsuario,casoUsoQueryUsuario);

export {usuarioControlador}  