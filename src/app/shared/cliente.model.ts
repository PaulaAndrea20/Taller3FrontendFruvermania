
//Definir los tipos de datos
// creamos la clase del Clientemodel

export class ClienteModel{
    constructor(
        public idCliente: string,
        public nombres: string,
        public correo: string,
        public contrasena: string,
        public rol: string
    ){}
}