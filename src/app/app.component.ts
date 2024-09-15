// app.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { EMPTY, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  user$: Observable<any> = EMPTY; // Inicializar con un observable vacío

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user$ = this.authService.getUser();
    // Aplica el tema guardado en el almacenamiento local al iniciar la aplicación
    const prefersDark = localStorage.getItem('theme') === 'dark';
    document.body.classList.toggle('dark', prefersDark);
  }

  login() {
    this.authService.loginWithGoogle().catch(error => console.error('Login failed', error));
  }

  logout() {
    this.authService.logout().catch(error => console.error('Logout failed', error));
  }
}
