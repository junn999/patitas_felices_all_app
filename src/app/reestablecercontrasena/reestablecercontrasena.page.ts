import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-reestablecercontrasena',
  templateUrl: './reestablecercontrasena.page.html',
  styleUrls: ['./reestablecercontrasena.page.scss'],
})
export class ReestablecercontrasenaPage implements OnInit {
  email: string = '';
  idioma: string = 'es';
  langs = [
    { label: 'Español', value: 'es' },
    { label: 'English', value: 'en' }
  ];

  constructor(private authService: AuthService,
    private toastController: ToastController,
    private translate: TranslateService
  ) {
    const defaultLang = localStorage.getItem('lang') || 'es';
    this.idioma = defaultLang;
    this.translate.setDefaultLang(this.idioma);
    this.translate.use(this.idioma);
  }

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

  changeLang(event: any) {
    const selectedLang = event.detail.value;
    this.translate.use(selectedLang);
    localStorage.setItem('lang', selectedLang);
  }
}
