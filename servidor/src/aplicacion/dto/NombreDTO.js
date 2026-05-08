export class NombreDTO {
    constructor(indice, nombre) {
        this._indice = indice;
        this._nombre = nombre;
    }

    getIndice() {
        return this._indice;
    }

    setIndice(indice) {
        this._indice = indice;
    }

    getNombre() {
        return this._nombre;
    }

    setNombre(nombre) {
        this._nombre = nombre;
    }
}