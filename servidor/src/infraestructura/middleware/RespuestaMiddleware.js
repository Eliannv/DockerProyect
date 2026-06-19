/**
 * Middleware para estandarizar respuestas exitosas y errores
 * Proporciona métodos helper para respuestas REST consistentes
 */
export const respuestaExitosaMiddleware = (req, res, next) => {
    /**
     * Enviar respuesta exitosa
     * @param {*} data - Datos a devolver
     * @param {string} message - Mensaje descriptivo
     * @param {number} statusCode - Código HTTP
     */
    res.enviarExito = (data, message, statusCode = 200) => {
        const respuesta = {
            data: data || {},
            message: message || 'Operación exitosa',
            meta: {
                traceId: req.traceId || 'N/A',
                timestamp: new Date().toISOString(),
                path: req.originalUrl || req.path
            },
            links: {
                self: req.originalUrl || req.path,
                list: '/api/v1/usuarios'
            }
        };

        res.status(statusCode).json(respuesta);
    };

    /**
     * Enviar respuesta vacía (para DELETE)
     * @param {number} statusCode - Código HTTP
     */
    res.enviarVacio = (statusCode = 204) => {
        res.status(statusCode).send();
    };

    /**
     * Enviar respuesta de error
     * @param {string} code - Código de error
     * @param {string} message - Mensaje de error
     * @param {array} details - Detalles del error
     * @param {number} statusCode - Código HTTP
     */
    res.enviarError = (code, message, details = [], statusCode = 400) => {
        const respuesta = {
            error: {
                code: code,
                message: message,
                details: details
            },
            meta: {
                traceId: req.traceId || 'N/A',
                timestamp: new Date().toISOString(),
                path: req.originalUrl || req.path
            }
        };

        res.status(statusCode).json(respuesta);
    };

    next();
};