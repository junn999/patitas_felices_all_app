import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-autenticacion',
  templateUrl: './autenticacion.page.html',
  styleUrls: ['./autenticacion.page.scss'],
})
export class AutenticacionPage  {
  verificationCode: string = '';
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

  verifyCode() {
    // Lógica de verificación del código OTP
    console.log('Código de verificación:', this.verificationCode);
  }

  resendCode() {
    // Lógica para reenviar el código OTP
    console.log('Reenviando código...');
  }

  changeAuthMethod() {
    // Lógica para cambiar el método de autenticación
    console.log('Cambiando método de autenticación...');
  }
}