import { Component, OnInit } from '@angular/core';
import { ClienteModel } from '../cliente.model';
import { Observable } from 'rxjs';
import { ClienteService } from '../services/cliente.service';
import { AutenticacionService } from '../services/autenticacion.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    // Propiedad para almacenar una lista de clientes como un objeto Observable
  clientes: Observable<ClienteModel[]> | undefined;
  cliente = new ClienteModel("", "", "", "", "");

  constructor(
    private clienteService: ClienteService,
    public auth: AutenticacionService
  ) { }

  ngOnInit(): void {

    // Verifica si el usuario está autenticado (logueado)
    if (this.auth.isLogged()){
    
      // Si el usuario está logueado, se obtiene su información del token decodificado
      let user = this.auth.decodeToken();
      
      // Se crea un objeto ClienteModel con la información del usuario logueado
      this.cliente = new ClienteModel(user.idCliente, user.nombres, user.correo, '', user.rol);
    } else {
      // Si el usuario no está logueado, se asigna el rol "invitado" al cliente actual
      this.cliente.rol = 'invitado';
    }

    
  }


}