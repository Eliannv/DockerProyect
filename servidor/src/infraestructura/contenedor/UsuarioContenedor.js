import { UsuarioControlador } from "../adaptador-entrada/UsuarioControlador.js";
import UsuarioPgsCommandAdaptador from "../adaptador-salida/UsuarioPgsCommandAdaptador.js";
import UsuarioPgsQueryAdaptador from "../adaptador-salida/UsuarioPgsQueryAdaptador.js";
import UCommandCaso from "../../aplicacion/uses-cases/command/UsuarioCommandUsesCase.js"
import UQueryCaso from "../../aplicacion/uses-cases/query/UsuarioQueryUsesCase.js"

/**
 * Contenedor de Inyección de Dependencias para Usuario
 * 
 * Estructura de la arquitectura hexagonal:
 * - Controllers (Entrada): Reciben solicitudes HTTP
 * - Use Cases (Aplicación): Lógica de negocio CQRS
 * - Adapters (Salida): Persistencia en PostgreSQL
 * 
 * El contenedor instancia todos los componentes y los conecta entre sí
 */

// Inicializar adaptadores PostgreSQL para escritura y lectura
const adaptadorCommandPostgres = new UsuarioPgsCommandAdaptador();
const adaptadorQueryPostgres = new UsuarioPgsQueryAdaptador();

// Inicializar casos de uso con inyección de dependencias
const casoUsoCommandUsuario = new UCommandCaso(adaptadorCommandPostgres);
const casoUsoQueryUsuario = new UQueryCaso(adaptadorQueryPostgres);

// Inicializar controlador con los casos de uso
const usuarioControlador = new UsuarioControlador(casoUsoCommandUsuario, casoUsoQueryUsuario);

export { usuarioControlador }