import {randomUUID} from 'crypto';
import {log} from '../utils/Logger.js';

export const traceMiddleware = (req, res, next) => {
    const traceId = randomUUID().substring(0, 8).toUpperCase();
    req.traceId = traceId;
    res.setHeader('X-Trace-Id', traceId);
    log('START', traceId, `TraceMiddleware: Iniciando ${req.method} ${req.originalUrl}`);
    next();
};