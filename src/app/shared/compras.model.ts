
//Definir los tipos de datos
// creamos la clase del Comprasmodel

export class ComprasModel {
    constructor(
        public idCompra: string,
        public idCliente: string,
        public idProducto: string,
        public cantidad: string,
        public fechaSolicitud: Date,
        public estado: string,
        public nombreProducto: string,
        public nombreCliente: string

    ){}
}