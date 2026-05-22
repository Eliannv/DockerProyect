export class UsuarioDTO {
    constructor(infor){
        this.nombre = infor.nombre;
        this.contrasena = infor.contrasena;
        this.cedula = infor.cedula;
    }

    getNombre(){
        return this.nombre
    }

    getCedula(){
        return this.cedula
    }

    getNombres = async() =>{
        return this.nombre
    }

}

export class usuarioDTO extends UsuarioDTO {}