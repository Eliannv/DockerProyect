import {Router} from 'express';
import { crear } from '../adaptador-entrada/UsuarioControlador.js';

const router = Router();
router.post('/crear', crear);
export default router;