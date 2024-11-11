import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-imagen',
  templateUrl: 'imagen.component.html',
  styleUrls: ['imagen.component.scss'],
})
export class ImagenComponent {

  @Input() photoURL!: string;

  constructor(
    private modalController: ModalController
  ) { }

  dismissModal() {
    this.modalController.dismiss();
  }
  async expandImage(photoURL: string) {
    if (!photoURL) {
      console.log("Campo vacio");
      return;
    }
  
    const modal = await this.modalController.create({
      component: ImagenComponent,
      componentProps: { photoURL }
    });
    await modal.present();
  }
}
