import { UsuarioControlador } from "../adaptador-entrada/UsuarioControlador.js";
import UsuarioMongoCommandAdaptador from "../adaptador-salida/Command/UsuarioMongoCommandAdaptador.js";
import UsuarioMongoQueryAdaptador from "../adaptador-salida/Query/UsuarioMongoQueryAdaptador.js";

import UCommandCaso from "../../aplicacion/uses-cases/Command/UsuarioCommandUsesCase.js";
import UQueryCaso from "../../aplicacion/uses-cases/Query/UsuarioQueryUsesCase.js";

const usuarioMongoCommandBDSalida = new UsuarioMongoCommandAdaptador();
const usuarioMongoQueryBDSalida   = new UsuarioMongoQueryAdaptador();

const casoUsoCommandUsuario = new UCommandCaso(usuarioMongoCommandBDSalida);
const casoUsoQueryUsuario   = new UQueryCaso(usuarioMongoQueryBDSalida);

const usuarioControlador = new UsuarioControlador(casoUsoCommandUsuario, casoUsoQueryUsuario);

export { usuarioControlador };
