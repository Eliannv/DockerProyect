import {Router} from 'express';
import {usuarioControlador} from '../contenedor/UsuarioContenedor.js';

const router = Router();

router.post('/crear', usuarioControlador.crear);
router.get('/lista', usuarioControlador.lista);

export default router; 