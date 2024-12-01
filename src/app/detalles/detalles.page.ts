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
    { label: 'English', value: 'en' },
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
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.mascota = navigation.extras.state['mascota'];
      if (this.mascota?.date instanceof Object && this.mascota?.date.seconds) {
        this.mascota.date = new Date(this.mascota.date.seconds * 1000);
      }
    } else {
      console.error('No se recibió información de la mascota.');
    }
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

  onMapClick() {
    if (this.mascota?.latitud && this.mascota?.longitud) {
      this.openFullMap(this.mascota.latitud, this.mascota.longitud, false);
    } else {
      console.error('La mascota no tiene coordenadas.');
    }
  }

  async expandImage(photoURL: string) {
    if (!photoURL) {
      console.log("Campo vacío");
      return;
    }

    const modal = await this.modalController.create({
      component: ImagenComponent,
      componentProps: { photoURL },
    });
    await modal.present();
  }

  BotonAdoptar(mascota: any) {
    if (!mascota) {
      console.error("No hay información de la mascota.");
      return;
    }

    this.router.navigate(['/solicitud'], { state: { mascota } });
  }

  BotonMensaje(mascota: any) {
    console.log("Botón 'Mensaje' presionado en:", mascota);
  }

  translateValue(key: string, type: string): string {
    const translations: { [type: string]: { [key: string]: string } } = {
      especie: { gato: 'formulario.gato', perro: 'formulario.perro' },
      sexo: { macho: 'sexo.macho', hembra: 'sexo.hembra' },
      color: {
        negro: 'colores.negro',
        blanco: 'colores.blanco',
        marron: 'colores.marron',
        gris: 'colores.gris',
        bicolor: 'colores.bicolor',
        tricolor: 'colores.tricolor',
        atigrado: 'colores.atigrado',
      },
    };

    if (translations[type] && translations[type][key.toLowerCase()]) {
      const translationKey = translations[type][key.toLowerCase()];
      return this.translateService.instant(translationKey);
    }

    return key;
  }
}