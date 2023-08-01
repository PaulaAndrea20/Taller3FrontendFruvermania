import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Permite tener la funcionalidad de realizar solicitudes HTTP
import { HttpClientModule } from '@angular/common/http';

//Permite crear Formularios
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { EditarProductosComponent } from './editar-productos/editar-productos.component';
import { ProductoService } from './shared/services/producto.service';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';
import { ListaComprasComponent } from './lista-compras/lista-compras.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './shared/navbar/navbar.component';

// Declaraciones que permie especificar los componentes
@NgModule({
  declarations: [
    AppComponent,
    ListaProductosComponent,
    EditarProductosComponent,
    DetalleProductoComponent,
    ListaComprasComponent,
    LoginComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],

  //Especificar los servicios (conectar una funcionalidad hacia el exterior)
  providers: [
    ProductoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
