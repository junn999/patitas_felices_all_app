import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Asegúrate de que la ruta sea correcta

import { Router } from '@angular/router';  // Importa el Router
import { EMPTY, Observable } from 'rxjs';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  user$: Observable<any> = EMPTY;  // Inicializar con un observable vacío
  themeToggleChecked: boolean = false ;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.user$ = this.authService.getUser();
    //preferencia del color de tema de la aplicacion para que se active en cada inicio
    //en base al que se guardo la ultima vez en la preferencia
    const prefersDark = localStorage.getItem('theme') === 'dark';
    this.themeToggleChecked = prefersDark;
    document.body.classList.toggle('dark', prefersDark);
  }

  logout() {
    this.authService.logout()
      .then(() => {
        this.router.navigate(['/iniciosesionautenticado']);  // Redireccionar a 'iniciosesionautenticado' después del cierre de sesión
      })
      .catch(error => console.error('Logout failed', error));
  }
}