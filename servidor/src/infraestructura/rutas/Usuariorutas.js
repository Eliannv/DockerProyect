import { Router } from 'express';
import { crear } from '../adaptador-entrada/UsuarioControlador.js';
import { obtenerNombre, listarNombres } from '../adaptador-entrada/UsuarioQueryControlador.js';

const router = Router();

// Command - Escritura
router.post('/crear', crear);

// Query - Lectura (ruta específica primero, luego la dinámica)
router.get('/listar', listarNombres);
router.get('/nombre/:indice', obtenerNombre);

export default router;