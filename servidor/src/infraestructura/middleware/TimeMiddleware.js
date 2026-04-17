import {log} from '../utils/Logger.js';

export const timeMiddleware = (req, res, next) => {
    const traceId = req.traceId;
    const inicio = Date.now();
    res.on('finish', () => {
        const duracion = Date.now() - inicio;
        log('TIMING', traceId, `TimeMiddleware: Solicitud completada en ${duracion}ms`);
    });
    next();
};