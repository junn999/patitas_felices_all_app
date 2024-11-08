import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cambiocontra',
  templateUrl: './cambiocontra.page.html',
  styleUrls: ['./cambiocontra.page.scss'],
})
export class CambiocontraPage  {

  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor() {}

  isFormValid(): boolean {
    return (
      this.currentPassword.length > 0 &&
      this.newPassword.length >= 8 &&
      this.newPassword === this.confirmPassword
    );
  }

  changePassword() {
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
    } else if (this.newPassword.length < 8) {
      this.errorMessage = 'La nueva contraseña debe tener al menos 8 caracteres.';
    } else {
      // Lógica para actualizar la contraseña
      console.log('Contraseña cambiada con éxito');
      this.errorMessage = '';
    }
  }
}