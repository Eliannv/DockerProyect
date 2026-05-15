export class UsuarioDTO{
    constructor(infor){
        this.nombre = infor.nombre;
        this.contrasena = infor.contrasena; 
    }
    getNombre = ()=>{
        return this.nombre;
    }
}