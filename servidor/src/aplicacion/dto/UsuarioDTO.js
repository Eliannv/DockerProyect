export class usuarioDTO {
    constructor(infor) {
        this._nombre = infor.nombre;
        this._contraseña = infor.contraseña;
    }

    getNombre() {
        return this._nombre;
    }

    setNombre(nombre) {
        this._nombre = nombre;
    }

    getContraseña() {
        return this._contraseña;
    }

    setContraseña(contraseña) {
        this._contraseña = contraseña;
    }
}