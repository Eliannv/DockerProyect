import {Router} from 'express';
import { crear } from '../controladores/UsuarioControlador.js';

const router = Router();
router.post('/crear', crear);
export default router;