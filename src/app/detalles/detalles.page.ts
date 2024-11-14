import { Component, OnInit, ViewChild } from '@angular/core';
import { MapComponent } from '../map/map.component';
import { ModalController } from '@ionic/angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ImagenComponent } from '../imagen/imagen.component'; 
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
})
export class DetallesPage implements OnInit {
  mascota: any;
  @ViewChild(MapComponent) mapComponent!: MapComponent;
  idioma: string = 'es';
  langs = [
    { label: 'Español', value: 'es' },
    { label: 'English', value: 'en' }
  ];

  constructor(
    private modalController: ModalController,
    private sanitizer: DomSanitizer,
    private router: Router,
    private translateService: TranslateService
  ) {
    const defaultLang = localStorage.getItem('lang') || 'es';
    this.translateService.setDefaultLang(defaultLang);
    this.translateService.use(defaultLang);
  }

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

  translateValue(key: string, type: string): string {
    if (type === 'especie') {
      switch (key.toLowerCase()) {
        case 'gato': return this.translateService.instant('formulario.gato');
        case 'perro': return this.translateService.instant('formulario.perro');
        default: return key;
      }
    } else if (type === 'sexo') {
      switch (key.toLowerCase()) {
        case 'macho': return this.translateService.instant('sexo.macho');
        case 'hembra': return this.translateService.instant('sexo.hembra');
        default: return key;
      }
    } else if (type == 'color') {
      switch (key.toLowerCase()) {
        case 'negro': return this.translateService.instant('colores.negro');
        case 'blanco': return this.translateService.instant('colores.blanco');
        case 'marron': return this.translateService.instant('colores.marron');
        case 'gris': return this.translateService.instant('colores.gris');
        case 'bicolor': return this.translateService.instant('colores.bicolor');
        case 'tricolor': return this.translateService.instant('colores.tricolor');
        case 'atigrado': return this.translateService.instant('colores.atigrado');
        default: return key;
      }
    }
    return key;
  }
}
