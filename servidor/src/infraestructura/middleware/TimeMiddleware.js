/**
 * Middleware para medir el tiempo de respuesta de cada solicitud
 */
export const timeMiddleware = (req, res, next) => {
    const inicio = Date.now();
    res.on('finish', () => {
        const duracion = Date.now() - inicio;
        console.log(`Trace ${req.traceId} respondió en ${duracion}ms`);
    });
    next();
};