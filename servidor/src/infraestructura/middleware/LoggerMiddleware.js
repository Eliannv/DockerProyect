import {log} from '../utils/Logger.js';

export const loggerMiddleware = (req, res, next) => {
    const traceId = req.traceId;
    log('INFO', traceId, `LoggerMiddleware: Solicitud ${req.method} ${req.originalUrl}`);
    next();
};