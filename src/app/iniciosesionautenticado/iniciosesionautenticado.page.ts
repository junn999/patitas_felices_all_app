import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { EMPTY, Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-iniciosesionautenticado',
  templateUrl: './iniciosesionautenticado.page.html',
  styleUrls: ['./iniciosesionautenticado.page.scss'],
})
export class IniciosesionautenticadoPage implements OnInit {
  user$: Observable<any> = EMPTY;
  isLoading = false;
  email: string = '';
  password: string = '';
  idioma: string = 'es';  
  langs = [
    { label: 'Español', value: 'es' },
    { label: 'English', value: 'en' }
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private firestore: Firestore,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.user$ = this.authService.getUser();

    const defaultLang = localStorage.getItem('lang') || 'es';
    this.idioma = defaultLang;
    this.translateService.setDefaultLang(this.idioma);
    this.translateService.use(this.idioma);
  }

  loginWithEmail() {
    this.authService.loginWithEmail(this.email, this.password)
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch(async (error) => {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Correo o contraseña incorrectos.',
          buttons: ['OK']
        });
        await alert.present();
      });
  }

  async login() {
    try {
      const userCredential = await this.authService.loginWithGoogle();
      const userId = userCredential.user.uid;

      // Verificar si el usuario está registrado en Firestore
      const userDocRef = doc(this.firestore, 'usuarios', userId); // Crear referencia al documento
      const userDoc = await getDoc(userDocRef); // Obtener el documento usando getDoc()

      if (!userDoc.exists()) {
        const alert = await this.alertController.create({
          header: 'Cuenta no registrada',
          message: 'Esta cuenta de Google no está registrada. Por favor, regístrate primero.',
          buttons: ['OK']
        });
        await alert.present();
        return; // Detener el proceso
      }

      const alert = await this.alertController.create({
        header: 'Inicio de sesión',
        message: 'Has iniciado sesión con éxito.',
        buttons: ['OK']
      });
      await alert.present();

      this.email = '';
      this.password = '';
      this.router.navigate(['/home']);
    } catch (error: unknown) {
      let errorMessage = 'No se pudo iniciar sesión.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      const alert = await this.alertController.create({
        header: 'Error',
        message: errorMessage,
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  changeLang(event: any) {
    const selectedLang = event.detail.value;
    this.translateService.use(selectedLang);
    localStorage.setItem('lang', selectedLang);
  }
}
