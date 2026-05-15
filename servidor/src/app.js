import express from 'express'
import cors from 'cors'

import { traceMiddleWare } from './infraestructura/middleware/TraceMiddleware.js';
import { timeMiddleware } from './infraestructura/middleware/TimeMiddleware.js';
import { loggerMiddleware } from './infraestructura/middleware/LoggerMiddleware.js';
import  usuarioRutas from './infraestructura/rutas/moduloUsuarioRutas.js'
import personaRutas from './infraestructura/rutas/personaRutas.js'

//Librerias Core
const app = express();
app.use(cors());
app.use(express.json())

// MiddleWare
app.use(traceMiddleWare);
app.use(timeMiddleware);
app.use(loggerMiddleware)

// rutas 
app.use('/api/usuario', usuarioRutas);
app.use('/api/persona', personaRutas);

//servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en puerto 3000')
}) 
 