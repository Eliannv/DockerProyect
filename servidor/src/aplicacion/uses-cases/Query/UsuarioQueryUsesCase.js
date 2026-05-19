export default class UsuarioQueryUsesCase {
    constructor(adaptador) {
        this.adaptador = adaptador;
    }

    async lista() {
        console.log('Ingreso al caso de uso lista (MongoDB)');
        return await this.adaptador.lista();
    }
}
