import Usuario from "../../../dominio/entidades/Usuario.js"

export default class UsuarioQueryUsesCase {

    constructor(adaptadorBDQuery) {
        this.adaptadorBDQuery = adaptadorBDQuery;
    }

    async listar() {
        console.log('Ingreso al caso de uso de listar todos');
        const result = await this.adaptadorBDQuery.listar();
        return result;
    }

    async listarById(id) {
        console.log(`Ingreso al caso de uso de listar por id: ${id}`);
        const result = await this.adaptadorBDQuery.listarById(id);
        return result;
    }
}