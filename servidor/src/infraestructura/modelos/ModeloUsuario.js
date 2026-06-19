import { DataTypes } from 'sequelize';
import sequelize from '../base-dato/Postgresql.js';

/**
 * Modelo Sequelize para la tabla Usuario
 * Define la estructura de la tabla en la base de datos PostgreSQL
 */
const ModeloUsuario = sequelize.define('usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id",
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: "nombre"
    },
    correo: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        field: "correo"
    },
    estado: {
        type: DataTypes.ENUM('ACTIVO', 'INACTIVO'),
        allowNull: false,
        defaultValue: 'ACTIVO',
        field: "estado"
    },
    deleteat: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'deleteat'
    }
}, {
    tableName: 'usuario',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deleteat',
    schema: 'public',
    freezeTableName: true,
    paranoid: true // Habilita soft delete
});

export { sequelize };
export default ModeloUsuario;