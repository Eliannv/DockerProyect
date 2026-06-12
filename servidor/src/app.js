import express from 'express'
import cors from 'cors'

import { traceMiddleWare } from './infraestructura/middleware/TraceMiddleware.js';
import { timeMiddleware } from './infraestructura/middleware/TimeMiddleware.js';
import { loggerMiddleware } from './infraestructura/middleware/LoggerMiddleware.js';
import {sequelize} from './infraestructura/modelos/ModeloUsuario.js';
import  usuarioRutas from './infraestructura/rutas/moduloUsuarioRutas.js'

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

const iniciarServidor = async () => {
  try {
    await sequelize.sync();
    app.listen(3000, () => {
      console.log('Servidor corriendo en puerto 3000')
    })
  } catch (error) {
    console.error('No se pudo inicializar la base de datos:', error);
  }
};

iniciarServidor();
 