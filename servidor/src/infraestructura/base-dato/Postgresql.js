import pkg from 'pg';
const {Pool} = pkg;
const configPgsql = new Pool( {
    host: 'postgres',
    port: 5432,
    user: 'admin',
    password: 'admin',
    database: 'arquitecturahexagonal'});
    
await configPgsql.query(`
    CREATE TABLE IF NOT EXISTS public.persona (
        cedula varchar(50) PRIMARY KEY,
        nombre varchar(100) NOT NULL,
        apellido1 varchar(100) NOT NULL,
        apellido2 varchar(100) NOT NULL,
        direccion varchar(255) NOT NULL
    )
`);

export default configPgsql;   