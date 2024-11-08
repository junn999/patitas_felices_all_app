import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-autenticacion',
  templateUrl: './autenticacion.page.html',
  styleUrls: ['./autenticacion.page.scss'],
})
export class AutenticacionPage  {
  verificationCode: string = '';

  constructor() { }

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