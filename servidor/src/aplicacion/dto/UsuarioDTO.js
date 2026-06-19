/**
 * DTO (Data Transfer Object) para Usuario
 * Encapsula los datos del usuario y proporciona validaciones
 * Acepta ambos formatos: con prefijo (usu_) y sin prefijo
 */
export class UsuarioDTO {
    constructor(datos) {
        // Soporta formato con prefijo (usu_nombre) y sin prefijo (nombre)
        this.id = datos ?.usu_id || datos ?.id || null;
        this.nombre = datos ?.usu_nombre || datos ?.nombre || '';
        this.correo = datos ?.usu_correo || datos ?.correo || '';
        this.estado = datos ?.usu_estado || datos ?.estado || '';
    }

    // Getters
    getId() {
        return this.id;
    }

    getNombre() {
        return this.nombre;
    }

    getCorreo() {
        return this.correo;
    }

    getEstado() {
        return this.estado;
    }

    // Setters con validación básica
    setId(id) {
        if (id && typeof id !== 'number' && isNaN(parseInt(id))) {
            throw new Error('El ID debe ser un número válido');
        }
        this.id = id;
    }

    setNombre(nombre) {
        if (!nombre || nombre.trim() === '') {
            throw new Error('El nombre no puede estar vacío');
        }
        this.nombre = nombre.trim();
    }

    setCorreo(correo) {
        if (!correo || correo.trim() === '') {
            throw new Error('El correo no puede estar vacío');
        }
        if (!correo.includes('@')) {
            throw new Error('El correo debe contener el símbolo @');
        }
        this.correo = correo.trim();
    }

    setEstado(estado) {
        if (!estado || estado.trim() === '') {
            throw new Error('El estado no puede estar vacío');
        }
        const estadoUpper = estado.trim().toUpperCase();
        if (estadoUpper !== 'ACTIVO' && estadoUpper !== 'INACTIVO') {
            throw new Error('El estado solo puede ser ACTIVO o INACTIVO');
        }
        this.estado = estadoUpper;
    }

    // Validar creación de usuario (POST)
    validarCreacion() {
        const errores = [];

        if (!this.nombre || this.nombre.trim() === '') {
            errores.push('El campo usu_nombre es obligatorio');
        }

        if (!this.correo || this.correo.trim() === '') {
            errores.push('El campo usu_correo es obligatorio');
        } else if (!this.correo.includes('@')) {
            errores.push('El campo usu_correo debe contener el símbolo @');
        }

        if (!this.estado || this.estado.trim() === '') {
            errores.push('El campo usu_estado es obligatorio');
        } else {
            const estadoUpper = this.estado.trim().toUpperCase();
            if (estadoUpper !== 'ACTIVO' && estadoUpper !== 'INACTIVO') {
                errores.push('El campo usu_estado solo puede ser ACTIVO o INACTIVO');
            }
        }

        return errores;
    }

    // Validar actualización de usuario (PATCH)
    validarActualizacion() {
        const errores = [];

        if (this.nombre !== undefined && this.nombre !== null && this.nombre.trim() === '') {
            errores.push('Si se envía usu_nombre, no puede estar vacío');
        }

        if (this.correo !== undefined && this.correo !== null && this.correo.trim() !== '') {
            if (!this.correo.includes('@')) {
                errores.push('Si se envía usu_correo, debe contener @');
            }
        }

        if (this.estado !== undefined && this.estado !== null && this.estado.trim() !== '') {
            const estadoUpper = this.estado.trim().toUpperCase();
            if (estadoUpper !== 'ACTIVO' && estadoUpper !== 'INACTIVO') {
                errores.push('Si se envía usu_estado, solo puede ser ACTIVO o INACTIVO');
            }
        }

        return errores;
    }
}
