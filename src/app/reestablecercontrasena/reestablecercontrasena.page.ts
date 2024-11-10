import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-reestablecercontrasena',
  templateUrl: './reestablecercontrasena.page.html',
  styleUrls: ['./reestablecercontrasena.page.scss'],
})
export class ReestablecercontrasenaPage implements OnInit {
  email: string = '';

  constructor(private authService: AuthService, private toastController: ToastController) { }

  ngOnInit() { }

  async resetPassword() {
    try {
      await this.authService.resetPassword(this.email);
      this.showToast('Correo de restablecimiento enviado. Revisa tu bandeja de entrada.');
    } catch (error) {
      this.showToast('Ocurrió un error. Inténtalo de nuevo.');
    }
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
    });
    toast.present();
  }
}
