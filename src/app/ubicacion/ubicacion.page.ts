import { AfterViewInit, Component, OnInit } from '@angular/core';
import { iniciarMapa, getCurrentPosition, watchPosition } from './ubicacion_seguimiento'; 

import * as L from 'leaflet';
import 'leaflet/dist/leaflet.js';

@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.page.html',
  styleUrls: ['./ubicacion.page.scss'],
})
export class UbicacionPage implements OnInit {

  private map!: L.Map;
  private markerRef: { marker: L.Marker | null } = { marker: null };

  constructor() {}

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

}
