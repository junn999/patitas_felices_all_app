import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';  // Importa el Router
import { AuthService } from '../services/auth.service'; // Asegúrate de que la ruta sea correcta
import { EMPTY, Observable } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user$: Observable<any> = EMPTY;  // Inicializar con un observable vacío
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.user$ = this.authService.getUser();
  }

  login() {
    this.authService.loginWithGoogle()
      .then(() => {
        this.isLoading = true; // Mostrar la imagen de carga
        setTimeout(() => {
          this.router.navigate(['/home']);  // Navegar a la página Home después del inicio de sesión exitoso
      }, 500); // 500 ms = 1/2 segundos
    })
      .catch(error => console.error('Login failed', error));
  }
}
