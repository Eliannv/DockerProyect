/**
 * Middleware para registrar detalles de las solicitudes HTTP
 */
export const loggerMiddleware = (req, res, next) => {
    console.log(`Trace: ${req.traceId} | Método: ${req.method} | URL: ${req.url}`);
    next();
};