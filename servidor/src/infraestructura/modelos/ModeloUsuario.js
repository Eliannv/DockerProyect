import { DataTypes } from 'sequelize';
import sequelize from '../base-dato/Postgresql.js';

const ModeloUsuario = sequelize.define('usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    delete_at: {
        type: DataTypes.timestamps,
        allowNull: true,
        field: 'delete_at',
    }
}, {
    tableName: 'usuario',
    timestamps: false,
    schema: 'public',
    freezeTableName: true,
    paranoid: true,
    deletedAt: 'delete_at'
});

export {sequelize};
export default ModeloUsuario;
