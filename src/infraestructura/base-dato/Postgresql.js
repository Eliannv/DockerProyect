import pkg from 'pg';
const { Pool } = pkg;
const configPgsql = new Pool({
    host: 'host.docker.internal',
    port: 5432,
    user: 'postgres',
    password: 'UTMACH',
    database: 'arquitecturahexagonal',
    max:3
});
configPgsql.on('connect', () => {
    console.log('Nueva Conexion Creada');
    });

export default configPgsql;