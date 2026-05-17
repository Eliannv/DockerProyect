export class UsuarioDTO{
    constructor(infor){
        this.nombre = infor.nombre;
        this.cedula = infor.cedula;
    }   
    getNombre(){
        return this.nombre;
    }
    getCedula(){
        return this.cedula;
    }
}