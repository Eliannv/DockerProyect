import express from 'express'
import cors from 'cors'

import { traceMiddleWare } from './infraestructura/middleware/TraceMiddleware.js';
import { timeMiddleware } from './infraestructura/middleware/TimeMiddleware.js';
import { loggerMiddleware } from './infraestructura/middleware/LoggerMiddleware.js';
import { respuestaExitosaMiddleware } from './infraestructura/middleware/RespuestaMiddleware.js';
import { sequelize } from './infraestructura/modelos/ModeloUsuario.js';
import usuarioRutas from './infraestructura/rutas/moduloUsuarioRutas.js'

/**
 * Inicialización de la aplicación Express
 * API REST de Usuarios con arquitectura hexagonal
 */
const app = express();

/**
 * Configuración de middleware global
 */
app.use(cors());
app.use(express.json())

/**
 * Middleware personalizado para trazabilidad y observabilidad
 * - traceMiddleware: Genera ID único para cada solicitud
 * - timeMiddleware: Mide tiempo de respuesta
 * - loggerMiddleware: Registra detalles de la solicitud
 * - respuestaExitosaMiddleware: Estandariza formato de respuestas
 */
app.use(traceMiddleWare);
app.use(timeMiddleware);
app.use(loggerMiddleware);
app.use(respuestaExitosaMiddleware);

/**
 * Registrar rutas principales
 */
app.use('/api/v1/usuarios', usuarioRutas);

/**
 * Ruta de salud - Verifica que el servidor está funcionando
 */
app.get('/', (req, res) => {
    res.json({
        mensaje: 'API REST de Usuarios',
        version: '1.0.0',
        endpoint: '/api/v1/usuarios'
    });
});

/**
 * Manejo de rutas no encontradas
 */
app.use((req, res) => {
    res.enviarError('RUTA_NO_ENCONTRADA', 'La ruta solicitada no existe', [], 404);
});

/**
 * Manejo global de errores no capturados
 */
app.use((err, req, res, next) => {
    console.error('Error no manejado:', err);
    res.enviarError('ERROR_INTERNO', 'Error interno del servidor', [err.message], 500);
});

/**
 * Inicializar el servidor HTTP
 * 1. Sincronizar modelos con la base de datos
 * 2. Escuchar en puerto 3000
 */
const iniciarServidor = async() => {
    try {
        await sequelize.sync();
        app.listen(3000, () => {
            console.log('✓ Servidor corriendo en puerto 3000')
            console.log('✓ API disponible en: http://localhost:3000/api/v1/usuarios')
        })
    } catch (error) {
        console.error('✗ No se pudo inicializar la base de datos:', error);
    }
};

iniciarServidor();