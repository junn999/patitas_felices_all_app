import { Component, OnInit, ViewChild } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { MapComponent } from '../map/map.component';
import { ModalController } from '@ionic/angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ImagenComponent } from '../imagen/imagen.component'; 

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
})
export class DetallesPage implements OnInit {
  mascota: any;
  @ViewChild(MapComponent) mapComponent!: MapComponent;

  constructor(
    private firestoreService: FirestoreService,
    private modalController: ModalController,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  ngOnInit() {
    // Obtener los datos de la mascota seleccionada desde la navegación
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.mascota = navigation.extras.state['mascota'];

      // Convierte la fecha si es un Timestamp
      if (this.mascota?.date instanceof Object && this.mascota?.date.seconds) {
        this.mascota.date = new Date(this.mascota.date.seconds * 1000);  
      }
    } else {
      console.error('No se recibió información de la mascota.');
    }
  }

  // Genera la URL de OpenStreetMap embebida
  generateOpenStreetMapUrl(latitude: number, longitude: number): SafeResourceUrl {
    const zoom = 15;
    const url = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.01},${latitude - 0.01},${longitude + 0.01},${latitude + 0.01}&layer=mapnik&marker=${latitude},${longitude}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  // Abre el mapa completo en un modal
  async openFullMap(latitude: number, longitude: number, isDraggable: boolean) {
    const modal = await this.modalController.create({
      component: MapComponent,
      componentProps: {
        latitude,
        longitude,
        showSelectButton: isDraggable,
        isDraggable,
      },
    });

    modal.onDidDismiss().then((data) => {
      if (data.data) {
        console.log('Ubicación seleccionada:', data.data);
      }
    });

    await modal.present();
  }

  // Muestra la ubicación en el mapa si la mascota tiene coordenadas
  onMapClick() {
    if (this.mascota?.latitud && this.mascota?.longitud) {
      this.openFullMap(this.mascota.latitud, this.mascota.longitud, false);
    } else {
      console.error('La mascota no tiene coordenadas.');
    }
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
  BotonAdoptar(mascota: any) {
    console.log("Botón 'Adoptar' presionado para:", mascota);
  }
  BotonMensaje(mascota: any) {
    console.log("Botón 'Mensaje' presionado en:", mascota);
  }
}
