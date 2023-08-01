import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductoModel } from '../producto.model';

@Injectable({
  providedIn: 'root'
})
//Permite la conexion con el Backend
//Se crea una variable a la cual que se le asigna la Url que proporciona el Backend 
export class ProductoService {
  BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }
  
  //FUNCIONES: 

  //Se utiliza el modelo de productos
  //Permite obtener los productos
  obtenerProductos() { 
    return this.http.get<ProductoModel[]>(`${this.BASE_URL}/productos`);
  }
  // Permite obtener un producto por su ID
  obtenerProducto(idProducto: string) { 
    return this.http.get<ProductoModel>(`${this.BASE_URL}/productos/${idProducto}`);
  }
  //Permite agregar producto
  agregarProducto(producto: ProductoModel) {
    return this.http.post<string>(`${this.BASE_URL}/productos`,producto);
  }

  //Permite actualizar un producto
  actualizarProducto(producto: ProductoModel) { 
    return this.http.put<string>(`${this.BASE_URL}/productos/${producto.idProducto}`,producto);
  }

  //Permite borrar un producto por su ID
  borrarProducto(idProducto: string) { 
    return this.http.delete<string>(`${this.BASE_URL}/productos/${idProducto}`);
  }
}
