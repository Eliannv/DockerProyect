/*import pkg from 'pg';
const { Pool } = pkg;
const configPgsql = new Pool({
    host: 'host.docker.internal',
    port: 5432,
    user: 'postgres',
    password: 'UTMACH',
    database: 'arquitecturahexagonal',
    max: 3
});
configPgsql.on('connect', () => {
    console.log('Nueva Conexion Creada');
});

export default configPgsql;

*/

import {Sequelize} from 'sequelize';

const sequelize = new Sequelize(
    "arquitecturahexagonal",
    "postgres",
    "admin",
    {
        host: "host.docker.internal",
        port: 5432,
        dialect: "postgres",
        logging: console.log,

    }

);
sequelize.authenticate()
    .then(() => {
        console.log('Conexión ORM a la base de datos establecida exitosamente.');
    })
    .catch((error) => {
        console.error('No se pudo conectar a la base de datos:', error);
    });

export default sequelize;