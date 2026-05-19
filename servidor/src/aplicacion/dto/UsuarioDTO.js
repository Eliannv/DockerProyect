export class UsuarioDTO {
    constructor(infor) {
        this.nombre    = infor.nombre;
        this.contrasena= infor.contrasena;
        this.cedula    = infor.cedula;
        this.apellido1 = infor.apellido1;
        this.apellido2 = infor.apellido2;
        this.direccion = infor.direccion;
    }

    getNombre()    { return this.nombre; }
    getCedula()    { return this.cedula; }
    getApellido1() { return this.apellido1; }
    getApellido2() { return this.apellido2; }
    getDireccion() { return this.direccion; }

    getNombres = async () => { return this.nombre; }
}

export class usuarioDTO extends UsuarioDTO {}
