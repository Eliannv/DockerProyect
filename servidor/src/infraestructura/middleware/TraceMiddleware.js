import { randomUUID } from 'crypto';

/**
 * Middleware para generar ID de traza único para cada solicitud
 * Facilita el seguimiento de las solicitudes en los logs
 */
export const traceMiddleWare = (req, res, next) => {
    const traceId = randomUUID();
    req.traceId = traceId;
    res.setHeader('X-trace-Id', traceId);
    console.log(`\n--- Nueva Petición ---\nTrace ID: ${traceId}`);
    next();
};