import { Sequelize } from 'sequelize';

// Configuración de conexión a PostgreSQL
// Utiliza variables de entorno si están disponibles, sino usa valores por defecto
const sequelize = new Sequelize(
    process.env.DB_NAME || "arquitecturahexagonal",
    process.env.DB_USER || "postgres",
    process.env.DB_PASSWORD || "admin", {
        host: process.env.DB_HOST || "localhost",
        port: Number(process.env.DB_PORT || 5432),
        dialect: "postgres",
        logging: false,
    }
);

// Verificar conexión a la base de datos
sequelize.authenticate()
    .then(() => {
        console.log('✓ Conexión a PostgreSQL establecida correctamente');
    })
    .catch((error) => {
        console.error('✗ Error de conexión a PostgreSQL:', error.message);
    });

export default sequelize;