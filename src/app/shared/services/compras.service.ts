import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ComprasModel } from '../compras.model';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  BASE_URL = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  obtenerCompras() {
    return this.http.get<ComprasModel[]>(`${this.BASE_URL}/compras`);
  }

  obtenerCompra(idCompra: string) {
    return this.http.get(`${this.BASE_URL}/compras/${idCompra}`);
  }

  crearCompra(compra: ComprasModel) {
    return this.http.post<ComprasModel>(`${this.BASE_URL}/compras`, compra);
  }

  actualizarCompra(compra: ComprasModel) {
    return this.http.put<ComprasModel>(
      `${this.BASE_URL}/compras/${compra.idCompra}`,
      compra
    );
  }

  borrarCompra(idCompra: string) {
    return this.http.delete(`${this.BASE_URL}/compras/${idCompra}`);
  }
}
