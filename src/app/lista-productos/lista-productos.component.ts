// Importación de módulos y modelos necesarios
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductoModel } from '../shared/producto.model';
import { ProductoService } from '../shared/services/producto.service';
import { ClienteModel } from '../shared/cliente.model';
import { ComprasModel } from '../shared/compras.model';
import { ComprasService } from '../shared/services/compras.service';
import { AutenticacionService } from '../shared/services/autenticacion.service';


@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit{
  productos: Observable<ProductoModel[]> | undefined;
  
  cliente: ClienteModel = new ClienteModel("","","","","");
  compra: ComprasModel = new ComprasModel("","","","", new Date(), "", "", "");


  constructor(
    private productoService: ProductoService, 
    private comprasService: ComprasService,
    public auth: AutenticacionService
    ) { }

// Método que se ejecuta cuando el componente se inicializa
  ngOnInit(){
    
    // obtener los productos
    if (this.auth.isLogged()){
      let user = this.auth.decodeToken();
      
      this.cliente = new ClienteModel(user.idCliente, user.nombres, user.correo, '', user.rol);
    } else {
      this.cliente.rol = 'invitado';
    }
    this.productos = this.productoService.obtenerProductos();
  }

  // Función para borrar un producto
  borrarProducto(idProducto: string) { 
    this.productoService.borrarProducto(idProducto).subscribe(data => { 
      console.log("Registro Eliminado");
      this.ngOnInit();
    });
  }

  // Funcion para realizar una compra
  onSubmit(idxForm: number) {
    let cantidad = (<HTMLInputElement>document.getElementById("cantidad"+idxForm)).value;
    let idProducto = (<HTMLInputElement>document.getElementById("idProducto"+idxForm)).value;
    let idCliente = this.cliente.idCliente;
    let fechaSolicitud = new Date();
          
    this.compra = new ComprasModel("", idCliente, idProducto, cantidad, fechaSolicitud, "0", "", "");

    this.comprasService.crearCompra(this.compra).subscribe(data => {
      console.log("Registro Creado");
      this.ngOnInit();
    });
  }
}
