

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { EditarProductosComponent } from './editar-productos/editar-productos.component';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';
import { ListaComprasComponent } from './lista-compras/lista-compras.component';
import { LoginComponent } from './login/login.component';


//Definen las rutas y se las anexa a un componente 
const routes: Routes = [
  {path:'productos',component: ListaProductosComponent}, 
  { path: 'productos/editar/:idProducto', component: EditarProductosComponent },
  { path: 'productos/agregar', component: EditarProductosComponent },
  { path: 'productos/detalle/:idProducto', component:DetalleProductoComponent},
  {path: 'compras', component:ListaComprasComponent},
  {path: 'login',component: LoginComponent},
  
  {path:'**',redirectTo:'/productos',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
