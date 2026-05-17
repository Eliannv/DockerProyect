import {Router} from 'express';
import { usuarioControlador } from "../contenedor/UsuarioContenedor.js";

const router = Router();

// Endpoints Command
router.post('/crear', usuarioControlador.crear);
router.delete('/eliminar/:id', usuarioControlador.eliminar);
router.put('/editar/:id', usuarioControlador.editar);

// Endpoints Query
router.get('/listar', usuarioControlador.listar);
router.get('/listar/:id', usuarioControlador.listarById);

export default router;