import { Component, OnInit, ViewChild } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { MapComponent } from '../map/map.component';
import { ModalController } from '@ionic/angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  mascotasPerdidas: any[] = [];
  mascotasEnAdopcion: any[] = [];
  @ViewChild(MapComponent) mapComponent!: MapComponent;

  constructor(
    private firestoreService: FirestoreService,
    private modalController: ModalController,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.firestoreService.getPostsFromPerdidas().subscribe((posts) => {
      this.mascotasPerdidas = posts;
    });

    this.firestoreService.getPostsFromAdopcion().subscribe((posts) => {
      this.mascotasEnAdopcion = posts;
    });
  }

  generateOpenStreetMapUrl(latitude: number, longitude: number): SafeResourceUrl {
    const zoom = 15;
    const url = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.01},${latitude - 0.01},${longitude + 0.01},${latitude + 0.01}&layer=mapnik&marker=${latitude},${longitude}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

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

  onMapClick(mascota: any) {
    if (mascota.latitud && mascota.longitud) {
      this.openFullMap(mascota.latitud, mascota.longitud, false);
    } else {
      console.error('La mascota no tiene coordenadas.');
    }
  }
}