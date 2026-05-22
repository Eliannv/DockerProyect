// aplicacion/dto/UsuarioDTO.js
export class UsuarioDTO {
    constructor(datos) {
        this.id = datos.id || null;
        this.nombre = datos.nombre || '';
    }
    
    getId() {
        return this.id;
    }
    
    getNombre() {
        return this.nombre;
    }
    
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
    
    validarId() {
        if (!this.id) {
            throw new Error('El ID es requerido');
        }
        return true;
    }
}