import { Router } from 'express';
import { usuarioControlador } from '../contenedor/UsuarioContenedor.js';

/**
 * Rutas del módulo Usuario
 * Base path: /api/v1/usuarios
 */
const router = Router();

/**
 * GET /api/v1/usuarios
 * Listar todos los usuarios
 */
router.get('/', usuarioControlador.lista);

/**
 * POST /api/v1/usuarios
 * Crear un nuevo usuario
 * Body: { nombre: string, correo: string, estado: string }
 */
router.post('/', usuarioControlador.crear);

/**
 * GET /api/v1/usuarios/:id
 * Obtener un usuario específico por ID
 * Params: id (number)
 */
router.get('/:id', usuarioControlador.obtenerPorId);

/**
 * PATCH /api/v1/usuarios/:id
 * Actualizar un usuario parcialmente
 * Params: id (number)
 * Body: { nombre?: string, correo?: string, estado?: string }
 */
router.patch('/:id', usuarioControlador.actualizar);

/**
 * DELETE /api/v1/usuarios/:id
 * Eliminar un usuario (soft delete)
 * Params: id (number)
 */
router.delete('/:id', usuarioControlador.eliminar);

export default router;