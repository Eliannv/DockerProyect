import UsuarioMySQLCommondAdaptador from "../adaptador-salida/command/UsuarioMySQLCommondAdaptador";
import UsuarioMySQLQueryAdaptador from "../adaptador-salida/query/UsuarioMySQLQueryAdaptador";

const usuarioCommandPgsBDSalida = new UsuarioMySQLCommondAdaptador();
const usuarioQueryPgsBDSalida = new UsuarioMySQLQueryAdaptador

const casoUsoCommandUsuario = new UCommandCaso(usuarioCommandPgsBDSalida)
const casoUsoQueryUsuario = new UQueryCaso(usuarioQueryPgsBDSalida)

const usuarioControlador = new UsuarioControlador(casoUsoCommandUsuario, casoUsoQueryUsuario)

export {usuarioControlador};