import { MongoClient } from "mongodb";

const url = "mongodb://mongo:27017";
const cliente = new MongoClient(url);
const dbNombre = "hexagonalBD";
let db;

const usuariosSeed = [
    { id: "1", cedula: "1001", nombre: "Ana",    apellido1: "García",   apellido2: "López",    direccion: "Calle 1 #10-20" },
    { id: "2", cedula: "1002", nombre: "Carlos",  apellido1: "Martínez", apellido2: "Pérez",    direccion: "Carrera 5 #3-45" },
    { id: "3", cedula: "1003", nombre: "Lucía",   apellido1: "Rodríguez",apellido2: "Torres",   direccion: "Av. 8 #22-60" },
    { id: "4", cedula: "1004", nombre: "Miguel",  apellido1: "Sánchez",  apellido2: "Herrera",  direccion: "Calle 15 #9-11" },
    { id: "5", cedula: "1005", nombre: "Sofía",   apellido1: "Ramírez",  apellido2: "Vargas",   direccion: "Transversal 3 #7-8" }
];

const conectarMongo = async () => {
    await cliente.connect();
    db = cliente.db(dbNombre);
    await seedUsuarios();
};

const seedUsuarios = async () => {
    const coleccion = db.collection("usuario");
    const total = await coleccion.countDocuments();
    if (total === 0) {
        await coleccion.insertMany(usuariosSeed);
        console.log(`[Seed] ${usuariosSeed.length} usuarios insertados en MongoDB`);
    }
};

const conectaBD = () => db;

export { conectarMongo, conectaBD };
