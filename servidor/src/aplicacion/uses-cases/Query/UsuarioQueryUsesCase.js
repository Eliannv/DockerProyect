import { NombreDTO } from "../../dto/NombreDTO.js";
import UsuarioEntradaQueryPuerto from "../../puertos/entrada/Query/UsuarioEntradaQueryPuerto.js";

export default class UsuarioQueryUsesCase extends UsuarioEntradaQueryPuerto {
    constructor(UsuarioMySQLQueryAdaptador) {
        super();
        this.UsuarioMySQLQueryAdaptador = UsuarioMySQLQueryAdaptador;
    }

    async obtenerNombre(indice) {
        console.log('Ingreso al caso de uso obtenerNombre con índice:', indice);

        // Obtener datos del adaptador de salida
        const datos = await this.UsuarioMySQLQueryAdaptador.obtenerNombre(indice);

        // Crear DTO de salida
        const nombreDTO = new NombreDTO(datos.indice, datos.nombre);

        return nombreDTO;
    }

    async lista(filtro = []) {
        console.log('Ingreso al caso de uso lista (PostgreSQL)');
        return await this.UsuarioMySQLQueryAdaptador.lista(filtro);
    }

    async listarNombres() {
        console.log('Ingreso al caso de uso listarNombres');

        // Obtener datos del adaptador de salida
        const datos = await this.UsuarioMySQLQueryAdaptador.listarNombres();

        // Crear DTOs de salida
        const nombreDTOs = datos.map(item => new NombreDTO(item.indice, item.nombre));

        return nombreDTOs;
    }
}