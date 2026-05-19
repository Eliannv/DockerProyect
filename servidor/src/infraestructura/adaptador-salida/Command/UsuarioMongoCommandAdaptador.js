import usuarioSalidaCommandPuerto from "../../../aplicacion/puertos/salida/UsuarioSalidaCommandPuerto.js";
import { conectarMongo, conectaBD } from "../../base-dato/MongoDb.js";

export default class UsuarioMongoCommandAdaptador extends usuarioSalidaCommandPuerto {
    guardar = async (usuario) => {
        await conectarMongo();
        const db = conectaBD();
        const coleccion = db.collection("usuario");
        await coleccion.insertOne({ ...usuario });
        console.log('Guardado en MongoDB:', usuario.nombre);
        return {
            estado: "ok",
            resultado: `Usuario '${usuario.nombre}' guardado en MongoDB`
        };
    }
}
