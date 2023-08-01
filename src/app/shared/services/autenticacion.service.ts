import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

// Método para realizar la autenticación del cliente. 
export class AutenticacionService {
  BASE_URL = 'http://localhost:3000';
  constructor(
    private http: HttpClient,
    private router: Router
  ) { } 
  
// Este método  se utiliza para realizar la autenticación del cliente enviando sus credenciales al Backend. 
  auth(cliente:any){
    this.http.post(`${this.BASE_URL}/login`, cliente).subscribe(
      (datos: any) => {
        console.log("------",datos);
        if (datos.token) {
          localStorage.setItem('token', datos.token);
          this.router.navigate(['productos'])
        }
        
      }, (error) => {
        console.log(error);
        
      }
    )
  }
  //Este método se utiliza para decodificar el token almacenado en el almacenamiento local.
  decodeToken() {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = token.split('.')[1];
      const payloadDecoded = atob(payload);
      
      return JSON.parse(payloadDecoded);

    }
    return {
      rol: "invitado"
    };
  }
  // Método para cerrar la sesión del usuario
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['productos'])
  }

  //Este método verifica si el usuario ha iniciado sesión

  isLogged() {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

}

