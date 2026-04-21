import express from 'express';
import cors from 'cors';

import { traceMiddleware } from './infraestructura/middleware/TraceMiddleware.js';
import { timeMiddleware } from './infraestructura/middleware/TimeMiddleware.js';
import { loggerMiddleware } from './infraestructura/middleware/LoggerMiddleware.js';
import usuarioRutas from './infraestructura/rutas/ModuloUsuarioRutas.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use(traceMiddleware);
app.use(timeMiddleware);
app.use(loggerMiddleware);

app.use('/api/usuarios', usuarioRutas);

app.listen(3000, () => {
    console.log('Servidor corriendo desde el puerto 3000');
});