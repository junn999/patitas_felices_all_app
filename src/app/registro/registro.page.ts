// registro.page.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  email: string = ''; //Campos para el correo, contraseña y nombre de usuario
  password: string = ''; 
  username: string = ''; 

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private firestore: Firestore // Inyectar Firestore
  ) {}

  ngOnInit() {}

  async register() {
    try {
      const userCredential = await this.authService.registerWithEmail(this.email, this.password);
      const userId = userCredential.user.uid;

      // Guardar el nombre de usuario en Firestore
      await setDoc(doc(this.firestore, 'usuarios', userId), {
        email: this.email,
        username: this.username
      });

      const alert = await this.alertController.create({
        header: 'Registro completado',
        message: 'Tu cuenta ha sido creada exitosamente.',
        buttons: ['OK']
      });
      await alert.present();
      this.router.navigate(['/iniciosesionautenticado']);
    } catch (error: unknown) {
      let errorMessage = 'Se ha producido un error inesperado.';
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

  async registerWithGoogle() {
    try {
      const userCredential = await this.authService.loginWithGoogle();
      const userId = userCredential.user.uid;

      // Verificar si el usuario ya está registrado en Firestore
      const userDocRef = doc(this.firestore, 'usuarios', userId);
      const userDoc = await getDoc(userDocRef); // Cambiar a getDoc()

      if (userDoc.exists()) {
        const alert = await this.alertController.create({
          header: 'Cuenta ya registrada',
          message: 'Esta cuenta de Google ya está registrada. Inicia sesión en lugar de registrarte.',
          buttons: ['OK']
        });
        await alert.present();
        return; // Detener el proceso
      }

      // Si no está registrado, proceder a guardar el usuario
      await setDoc(userDocRef, {
        email: userCredential.user.email,
        username: this.username || userCredential.user.displayName || 'Usuario'
      });

      const alert = await this.alertController.create({
        header: 'Registro completado',
        message: 'Te has registrado con éxito usando tu cuenta de Google.',
        buttons: ['OK']
      });
      await alert.present();

      this.email = '';
      this.password = '';
      this.username = '';
      this.router.navigate(['/iniciosesionautenticado']);
    } catch (error: unknown) {
      let errorMessage = 'Se ha producido un error inesperado.';
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
}
