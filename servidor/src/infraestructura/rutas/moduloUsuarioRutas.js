import {Router} from 'express';
import {usuarioControlador} from '../contenedor/UsuarioContenedor.js';

const router = Router();

router.get('/usuarios', usuarioControlador.lista);
router.post('/usuarios', usuarioControlador.crear);
router.put('/usuarios', usuarioControlador.editar);
router.delete('/usuarios', usuarioControlador.eliminar);

export default router;