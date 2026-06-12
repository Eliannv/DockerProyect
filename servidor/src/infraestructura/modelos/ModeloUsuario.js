import { DataTypes } from 'sequelize';
import sequelize from '../base-dato/Postgresql.js';

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
    deleteat:{
        type:DataTypes.DATE,
        allowNull:true,
        field:'deleteat'
    }


}, {
    tableName: 'usuario',
    timestamps: true, 
    deletedAt: 'deleteat',
    schema: 'public',
    freezeTableName: true,
    paranoid: true
});

export{sequelize};
export default ModeloUsuario;