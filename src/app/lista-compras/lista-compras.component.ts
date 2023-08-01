import { Component , OnInit} from '@angular/core';
import { ComprasModel } from '../shared/compras.model';
import { ClienteModel } from '../shared/cliente.model';
import { Observable, of } from 'rxjs';
import { ProductoModel } from '../shared/producto.model';
import { ProductoService } from '../shared/services/producto.service';
import { ComprasService } from '../shared/services/compras.service';
import { ClienteService } from '../shared/services/cliente.service';
import { Router } from '@angular/router';
import { AutenticacionService } from '../shared/services/autenticacion.service';



@Component({
  selector: 'app-lista-compras',
  templateUrl: './lista-compras.component.html',
  styleUrls: ['./lista-compras.component.css']
})
export class ListaComprasComponent implements OnInit {

  compras: Observable<ComprasModel[]> | undefined;
  productos: Observable<ProductoModel[]> | undefined;
  clientes: Observable<ClienteModel[]> | undefined;
  cliente = new ClienteModel("", "", "", "", "");



  tmpCompras: Observable<ComprasModel[]> | undefined;

  constructor(
    private comprasService: ComprasService,
    private router: Router,
    private productoService: ProductoService,
    private clienteService: ClienteService,
    public auth: AutenticacionService
  ) { }

  ngOnInit(): void {

    if (this.auth.isLogged()){
      let user = this.auth.decodeToken();
      this.cliente = new ClienteModel(user.idCliente, user.nombres, user.correo, '', user.rol);

    } else {
      this.router.navigate(['productos'])
    }

    this.clientes = this.clienteService.obtenerClientes();
    this.compras = this.comprasService.obtenerCompras();
    this.productos = this.productoService.obtenerProductos();


    this.filtrarCompras();


  }

  filtrarCompras() {
    this.compras?.pipe().subscribe((compras) => {
      let array = compras;

      array.forEach((compra) => {
        this.productos?.pipe().subscribe((productos) => {
          productos.forEach((producto) => {
            if (compra.idProducto == producto.idProducto) {
              compra.nombreProducto = producto.nombre;
            }
          });
        });
        this.clientes?.pipe().subscribe((clientes) => {
          clientes.forEach((cliente) => {
            if (compra.idCliente == cliente.idCliente) {
              compra.nombreCliente = cliente.nombres;
            }
          });
        });
      });
      
      this.tmpCompras = of(array);

      if (this.cliente.rol != "admin") {
        
        this.tmpCompras?.pipe().subscribe((compras) => {
          let cmp = compras.filter((compra) => {
            
            return compra.idCliente == this.cliente.idCliente;
          });
  
          
          this.tmpCompras = of(cmp);
        });
  
      }
      
    });

  }

  aprobar(compra: ComprasModel) {
    compra.estado = "1";

    this.comprasService.actualizarCompra(compra).subscribe((res) => {
      console.log("res", res);
      window.location.reload();
    });

  }

  rechazar(compra: ComprasModel) {
    compra.estado = "-1";

    this.comprasService.actualizarCompra(compra).subscribe((res) => {
      console.log("res", res);
      window.location.reload();
    });

  }


}
