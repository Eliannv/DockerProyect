export default class Factura{
    constructor(id, cliente, items, total){
        this.id = id;
        this.cliente = cliente;
        this.items = items;
        this.total = total;
    }
}