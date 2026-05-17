import pkg from 'pg';

const { Pool } = pkg;

const configPgsql = new Pool({
    host: 'host.docker.internal',
    port: 5432,
    user: 'postgres',
    password: 'admin',
    database: 'arquitecturahexagonal'
});

export default configPgsql;