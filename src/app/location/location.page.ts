import { AfterViewInit, Component, OnInit } from '@angular/core';
import { iniciarMapa, getCurrentPosition, watchPosition } from './location_seguimiento'; 

import * as L from 'leaflet';
import 'leaflet/dist/leaflet.js';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {

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
