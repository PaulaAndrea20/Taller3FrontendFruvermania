import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../shared/services/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoModel } from '../shared/producto.model';
import { ClienteModel } from '../shared/cliente.model';
import { Observable } from 'rxjs';
import { AutenticacionService } from '../shared/services/autenticacion.service';


@Component({
  selector: 'app-editar-productos',
  templateUrl: './editar-productos.component.html',
  styleUrls: ['./editar-productos.component.css']
})
export class EditarProductosComponent implements OnInit{  


  producto = new ProductoModel("", "", "", 0);
  productos: Observable<ProductoModel[]> | undefined;
  titulo = 'Crear Producto';

  cliente = new ClienteModel("", "", "", "", "");

  editarProducto = false;

  constructor(
    private productoService: ProductoService, 
    private route: ActivatedRoute, 
    private router: Router,
    public auth: AutenticacionService
    ) { }


  ngOnInit() {
    // obtener los productos
    this.productos = this.productoService.obtenerProductos();
    if (this.auth.isLogged()){
      let user = this.auth.decodeToken();
      this.cliente = new ClienteModel(user.idCliente, user.nombres, user.correo, '', user.rol);

      if (this.cliente.rol != 'admin'){
        this.router.navigate(['productos'])
      }

    } else {
      this.router.navigate(['productos'])
    }

  }

  // funcion para crear o editar un producto 
  onSubmit() {
    if (this.producto.idProducto) {
      //Viene de Editar
      this.productoService.actualizarProducto(this.producto).subscribe(
        data => {
          window.location.reload();
        }
      );
    }
    else {
      //Viene de crear Nuevo Producto
      console.log('Nuevo Producto');
      this.productoService.agregarProducto(this.producto).subscribe(data => {
        window.location.reload();
      });
    }

  }
  onAgregarProducto() {
    this.editarProducto = false;
    this.producto = new ProductoModel("", "", "", 0);
  }

  onEliminarProducto(producto: ProductoModel) {
    this.productoService.borrarProducto(producto.idProducto).subscribe(data => {
      window.location.reload();
    });
  }

  onEditarProducto(producto: ProductoModel) {
    this.editarProducto = true;
    this.producto = producto;
  }

}
