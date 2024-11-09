import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';
import { firstValueFrom } from 'rxjs'; // Importa firstValueFrom

@Component({
  selector: 'app-editarperfil',
  templateUrl: './editarperfil.page.html',
  styleUrls: ['./editarperfil.page.scss'],
})
export class EditarperfilPage implements OnInit {
  newUsername: string = '';

  constructor(
    private alertController: AlertController,
    private authService: AuthService,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit() {}

  async saveChanges() {
    if (!this.newUsername) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, ingresa un nombre de usuario.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    try {
      // Obtener el correo electrónico del usuario activo
      const user = await firstValueFrom(this.authService.getUser());
      const email = user?.email || '';
      if (!email) {
        throw new Error('No se pudo obtener el correo electrónico del usuario.');
      }

      // Consultar el documento del usuario en Firestore
      const userData = await this.firestoreService.getUserByEmail(email);
      if (!userData) {
        throw new Error('Usuario no encontrado.');
      }

      const lastChangedDate = userData['lastUsernameChange']
        ? new Date(userData['lastUsernameChange'])
        : null;
      const currentDate = new Date();

      if (lastChangedDate) {
        const timeDiff = currentDate.getTime() - lastChangedDate.getTime();
        const daysDiff = timeDiff / (1000 * 3600 * 24);
        if (daysDiff < 3) {
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'No puedes cambiar el nombre de usuario más de una vez cada 3 días.',
            buttons: ['OK']
          });
          await alert.present();
          return;
        }
      }

      // Actualizar el nombre de usuario y la fecha de cambio
      await this.firestoreService.updateUsername(email, this.newUsername, currentDate);

      const successAlert = await this.alertController.create({
        header: 'Éxito',
        message: 'Nombre de usuario actualizado con éxito.',
        buttons: ['OK']
      });
      await successAlert.present();
    } catch (error) {
      const errorMessage = (error as any).message || 'Ocurrió un error al actualizar el nombre de usuario.';
      const errorAlert = await this.alertController.create({
        header: 'Error',
        message: errorMessage,
        buttons: ['OK']
      });
      await errorAlert.present();
    }
  }
}
