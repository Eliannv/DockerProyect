import UsuarioSalidaQueryPuerto from "../../../aplicacion/puertos/salida/Query/UsuarioSalidaQueryPuerto.js";

export default class UsuarioMySQLQueryAdaptador extends UsuarioSalidaQueryPuerto {
    // Array estático simulando una base de datos
    static NOMBRES = ["Ana García", "Juan Pérez", "María López", "Carlos Rodríguez", "Laura Martínez"];

    async obtenerNombre(indice) {
        console.log('Ejecutando query simulado para obtener nombre en índice:', indice);

        // Simular consulta a BD
        const nombre = UsuarioMySQLQueryAdaptador.NOMBRES[indice];

        if (!nombre) {
            throw new Error("Nombre no encontrado en el índice " + indice);
        }

        return {
            indice: indice,
            nombre: nombre
        };
    }

    async listarNombres() {
        console.log('Ejecutando query simulado para obtener todos los nombres');

        // Simular consulta a BD que retorna todos los registros
        return UsuarioMySQLQueryAdaptador.NOMBRES.map((nombre, indice) => ({
            indice: indice,
            nombre: nombre
        }));
    }
}