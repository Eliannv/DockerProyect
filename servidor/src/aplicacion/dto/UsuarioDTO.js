export class UsuarioDTO {
    constructor(infor) { //lo unico que se puede hacer aqui es validacion de atributos, nada mas, no se pueden hacer procesos de negocio
        this.nombre = infor.nombre;
        this.contrasena = infor.contrasena;
    }
    getNombres = async () => {
        return this.nombre;
    }
}