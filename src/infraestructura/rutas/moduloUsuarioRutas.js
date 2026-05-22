import {Router} from 'express';
import {usuarioControlador} from '../contenedor/UsuarioContenedor.js';

const router = Router();

router.get('/lista', usuarioControlador.lista);
router.post('/crear', usuarioControlador.crear);
router.put('/editar', usuarioControlador.editar);
router.delete('/eliminar', usuarioControlador.eliminar);

export default router;