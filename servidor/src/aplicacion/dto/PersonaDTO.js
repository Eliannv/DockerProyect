export class PersonaDTO {
    constructor(datos) {
        this.cedula    = datos.cedula;
        this.nombre    = datos.nombre;
        this.apellido1 = datos.apellido1;
        this.apellido2 = datos.apellido2;
        this.direccion = datos.direccion;
    }

    esValido() {
        return !!(this.cedula && this.nombre && this.apellido1 && this.apellido2 && this.direccion);
    }
}
