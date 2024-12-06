import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cambiocontra',
  templateUrl: './cambiocontra.page.html',
  styleUrls: ['./cambiocontra.page.scss'],
})
export class CambiocontraPage {
  correoUsuario: string | null = null;
  currentPassword: string = ''; // Contraseña actual
  newPassword: string = ''; // Contraseña nueva
  confirmPassword: string = '';
  errorMessage: string = '';
  idioma: string = 'es';
  langs = [
    { label: 'Español', value: 'es' },
    { label: 'English', value: 'en' }
  ];

  constructor(
    private authService: AuthService,
    private translateService: TranslateService,
    private alertController: AlertController,
    private router: Router) {
    const defaultLang = localStorage.getItem('lang') || 'es'; 
    this.idioma = defaultLang; 
    this.translateService.setDefaultLang(this.idioma);
    this.translateService.use(this.idioma);
    this.sdi()
  }

  async sdi(){
    this.authService.ejecutarSegunProveedor(
      // Bloque de código si el proveedor es 'password'
      () => {
        console.log('El usuario se registró con correo y contraseña.');
        // Aquí puedes realizar el trozo de código para 'password'
      },
      // Bloque de código si el proveedor NO es 'password'
      () => {
        console.log('El usuario no se registró con correo y contraseña.');
        this.router.navigate(['/home']);
      }
    );
  }

  changeLang(event: any) {
    const selectedLang = event.detail.value;
    this.translateService.use(selectedLang); 
    localStorage.setItem('lang', selectedLang);  
  }
  changeLanguage(language: string) {
    this.translateService.use(language);
  }


  // Función para cambiar la contraseña
  async changePassword() {
    this.correoUsuario = this.authService.getCorreoUsuarioAutenticado();
  
    if (!this.correoUsuario) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'No se pudo obtener el correo del usuario autenticado',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }
  
    if (this.newPassword !== this.confirmPassword) {
      this.translateService.get('cambiar.error_contrasenas_no_coinciden').subscribe((res: string) => {
        this.errorMessage = res;
      });
    } else if (this.newPassword.length < 8) {
      this.translateService.get('cambiar.error_longitud_minima').subscribe((res: string) => {
        this.errorMessage = res;
      });
    } else {
      try {
        await this.authService.reautenticarUsuario(this.correoUsuario, this.currentPassword);
        await this.authService.cambiarContrasena(this.newPassword);
        const alert = await this.alertController.create({
          header: 'Éxito',
          message: 'Tu contraseña ha sido cambiada con éxito',
          buttons: ['OK']
        });
        await alert.present();
        this.router.navigate(['/home']);
      } catch (error: any) {
        console.error('Error:', error);
        if (error.code === 'auth/wrong-password') {
          alert('La contraseña actual es incorrecta.'); //Agregar traducción, para que se muestre en el HTML
        } else {
          alert('Hubo un problema al cambiar tu contraseña.');  //Agregar traducción, para que se muestre en el HTML
        }
      }
      this.errorMessage = '';
    }
  }
}