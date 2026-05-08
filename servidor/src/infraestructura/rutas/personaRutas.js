import { Router } from 'express';
import PersonaCommandControlador from '../adaptador-entrada/PersonaCommandControlador.js';
import PersonaQueryControlador   from '../adaptador-entrada/PersonaQueryControlador.js';

const router = Router();

// Instancia única por router (Singleton por módulo)
const commandControlador = new PersonaCommandControlador();
const queryControlador   = new PersonaQueryControlador();

// Command — escritura
router.post('/crear',    commandControlador.crear);
router.put('/editar',    commandControlador.editar);
router.delete('/eliminar', commandControlador.eliminar);

// Query — lectura
router.get('/listar', queryControlador.listar);

export default router;
