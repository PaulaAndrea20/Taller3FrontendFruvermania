import { Component } from '@angular/core';
import { AutenticacionService } from '../shared/services/autenticacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
// Objeto que almacena las credenciales del usuario (correo y contraseña)
export class LoginComponent {
  credenciales = {
    correo: "",
    contrasena: ""
  }

  constructor(
    private auth: AutenticacionService
  ){}

// Método para realizar el inicio de sesión
  login(){
    console.log(this.credenciales);
    this.auth.auth(this.credenciales)
  }

}
