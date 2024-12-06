import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { EMPTY, Observable } from 'rxjs';
import { Network } from '@capacitor/network';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  user$: Observable<any> = EMPTY; // Inicializar con un observable vacío
  isOffline: boolean = false; // Bandera para estado de conexión

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.user$ = this.authService.getUser();

    // Aplica el tema guardado en el almacenamiento local al iniciar la aplicación
    const prefersDark = localStorage.getItem('theme') === 'dark';
    document.body.classList.toggle('dark', prefersDark);
    this.preloadImage();
    this.initializeNetworkListener();
  }

  async initializeNetworkListener(): Promise<void> {
    const status = await Network.getStatus();
    this.isOffline = !status.connected;

    if (this.isOffline) {
      this.router.navigate(['/e404']); // Redirige a la página 404 si no hay conexión
    }

    // Escucha cambios en el estado de red
    Network.addListener('networkStatusChange', (status) => {
      this.isOffline = !status.connected;
      if (this.isOffline) {
        this.router.navigate(['/e404']);
      }
    });
  }

  login() {
    this.authService.loginWithGoogle().catch((error) => console.error('Login failed', error));
  }

  logout() {
    this.authService.logout().catch((error) => console.error('Logout failed', error));
  }

  preloadImage(): void {
    const img = new Image();
    img.src = 'https://i.pinimg.com/736x/a3/e1/7a/a3e17a9b0f58e4f11da773773836ae84.jpg'; // Ruta local de la imagen
    img.onload = () => {
      console.log('Imagen precargada correctamente:', img.src);
    };
    img.onerror = (err) => {
      console.error('Error al precargar la imagen:', err);
    };
  }
}