import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-cambiocontra',
  templateUrl: './cambiocontra.page.html',
  styleUrls: ['./cambiocontra.page.scss'],
})
export class CambiocontraPage {

  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  idioma: string = 'es';
  langs = [
    { label: 'Español', value: 'es' },
    { label: 'English', value: 'en' }
  ];

  constructor(private translateService: TranslateService) {
    const defaultLang = localStorage.getItem('lang') || 'es'; 
    this.idioma = defaultLang; 
    this.translateService.setDefaultLang(this.idioma);
    this.translateService.use(this.idioma);
    
  }

  changeLang(event: any) {
    const selectedLang = event.detail.value;
    this.translateService.use(selectedLang); 
    localStorage.setItem('lang', selectedLang);  
  }
  changeLanguage(language: string) {
    this.translateService.use(language);
  }

  // Verifica si el formulario es válido
  isFormValid(): boolean {
    return (
      this.currentPassword.length > 0 &&
      this.newPassword.length >= 8 &&
      this.newPassword === this.confirmPassword
    );
  }

  // Función para cambiar la contraseña
  changePassword() {
    if (this.newPassword !== this.confirmPassword) {
      this.translateService.get('cambiar_contrasena.error_contrasenas_no_coinciden').subscribe((res: string) => {
        this.errorMessage = res;  // Mostrar mensaje de error si las contraseñas no coinciden
      });
    } else if (this.newPassword.length < 8) {
      this.translateService.get('cambiar_contrasena.error_longitud_minima').subscribe((res: string) => {
        this.errorMessage = res;  // Mostrar mensaje de error si la nueva contraseña es demasiado corta
      });
    } else {
      // Si la contraseña es válida, cambiarla (lógica adicional aquí si es necesario)
      console.log('Contraseña cambiada con éxito');
      this.errorMessage = '';  // Limpiar el mensaje de error
    }
  }
  
}