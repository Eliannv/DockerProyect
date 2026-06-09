import usuarioSalidaQueryPuerto from "../../aplicacion/puertos/salida/UsuarioSalidaQueryPuerto.js";
import { conectaBD, conectarMongo } from '../base-dato/MongoDb.js'
import UsuarioFiltro from '../../dominio/filtros/UsuarioFiltro.js'

export default class UsuarioPgsQueryAdaptador extends usuarioSalidaQueryPuerto {
    lista = async(filtro = {}) => {
        await conectarMongo();
        this.db = conectaBD();
        this.collection = this.db.collection("usuarios");

        console.log('Listando la tabla usuario desde MongoDB..')

        let query = {};

        filtro.forEach(esp => {
            if (esp instanceof UsuarioFiltro) {
                query.nombre = { $regex: esp.nombre, $options: 'i' };
            }
        });

        console.log('Query construida:', query);

        const data = await this.collection
            .find(query)
            .toArray();

        return {
            estado: "ok",
            resultado: data
        }
    }
}