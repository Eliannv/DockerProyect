import { UsuarioControlador } from "../adaptador-entrada/UsuarioControlador.js";
import UsuarioMySQLCommandAdaptador from "../adaptador-salida/UsuarioPgsCommandAdaptador.js";
import UsuarioMySQLQueryAdaptador from "../adaptador-salida/UsuarioPgsQueryAdaptador.js";
import UsuarioCommandUsesCase from "../../aplicacion/uses-cases/command/UsuarioCommandUsesCase.js";
import UsuarioQueryUsesCase from "../../aplicacion/uses-cases/query/UsuarioQueryUsesCase.js";

const usuarioCommandPgsBDSalida = new UsuarioMySQLCommandAdaptador();
const usuarioQueryPgsBDSalida = new UsuarioMySQLQueryAdaptador();

const casoUsoCommandUsuario = new UsuarioCommandUsesCase(usuarioCommandPgsBDSalida);
const casoUsoQueryUsuario = new UsuarioQueryUsesCase(usuarioQueryPgsBDSalida);

const usuarioControlador = new UsuarioControlador(casoUsoCommandUsuario, casoUsoQueryUsuario);

export { usuarioControlador };