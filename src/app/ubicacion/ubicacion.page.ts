import { AfterViewInit, Component, OnInit } from '@angular/core';
import { iniciarMapa, getCurrentPosition, watchPosition } from './ubicacion_seguimiento';
import { TranslateService } from '@ngx-translate/core';

import * as L from 'leaflet';
import 'leaflet/dist/leaflet.js';

@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.page.html',
  styleUrls: ['./ubicacion.page.scss'],
})
export class UbicacionPage implements OnInit {
  idioma: string = 'es';
  langs = [
    { label: 'Español', value: 'es' },
    { label: 'English', value: 'en' }
  ];
  private map!: L.Map;
  private markerRef: { marker: L.Marker | null } = { marker: null };

  constructor(private translate:TranslateService) {}

  ngOnInit() {
    this.map = L.map('map');
    iniciarMapa(this.map);
    this.getCurrentPosition();
    this.watchPosition();
  }

  async getCurrentPosition() {
    this.markerRef.marker = await getCurrentPosition(this.map, this.markerRef);
  }

  watchPosition() {
    watchPosition(this.map, this.markerRef);
  }

  changeLang(event: any) {
    const selectedLang = event.detail.value;
    this.translate.use(selectedLang);
    localStorage.setItem('lang', selectedLang);
  }
}
