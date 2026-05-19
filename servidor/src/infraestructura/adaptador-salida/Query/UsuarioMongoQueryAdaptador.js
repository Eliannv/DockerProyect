import usuarioSalidaQueryPuerto from "../../../aplicacion/puertos/salida/UsuarioSalidaQueryPuerto.js";
import { conectarMongo, conectaBD } from "../../base-dato/MongoDb.js";

export default class UsuarioMongoQueryAdaptador extends usuarioSalidaQueryPuerto {
    lista = async () => {
        await conectarMongo();
        this.db = conectaBD();
        this.collection = this.db.collection("usuario");
        const data = await this.collection.find().toArray();
        return {
            estado: "ok",
            resultado: data
        };
    }
}
