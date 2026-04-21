import {Router} from 'express';
import { UsuarioControlador } from '../adaptador-entrada/UsuarioControlador.js';

const router = Router();
const usuarioControlador = new UsuarioControlador();
router.post('/crear', usuarioControlador.crear);
export default router;