import { DataTypes } from 'sequelize';
import sequelize from '../base-dato/Postgresql.js';

const ModeloEventoOutbox = sequelize.define('eventos_outbox', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        field: 'id'
    },
    tipo_evento: {
        type: DataTypes.STRING(200),
        allowNull: false,
        field: 'tipo_evento'
    },
    id_agregado: {
        type: DataTypes.STRING(100),
        allowNull: true,
        field: 'id_agregado'
    },
    contenido: {
        type: DataTypes.JSONB,
        allowNull: false,
        field: 'contenido'
    },
    fecha_creacion: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'fecha_creacion'
    },
    procesado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'procesado'
    },
    fecha_procesado: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'fecha_procesado'
    }
}, {
    tableName: 'eventos_outbox',
    schema: 'public',
    freezeTableName: true,
    timestamps: false
});

export default ModeloEventoOutbox;
