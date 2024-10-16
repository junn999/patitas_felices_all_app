import { Component, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ModalController, IonModal } from '@ionic/angular';
import * as L from 'leaflet';
import { LocationService } from '../services/ubicacion.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;
  @ViewChild(IonModal) modal!: IonModal;
  map: any;
  marker: any;
  selectedLocation: any;
  defaultLocation = { latitude: 13.6929, longitude: -89.2182 }; // Ubicación predeterminada
  zoomLevel = 13;

  latitude: number = this.defaultLocation.latitude;
  longitude: number = this.defaultLocation.longitude;
  showSelectButton: boolean = true; // Control de visibilidad del botón "Seleccionar"
  isDraggable: boolean = false; // Control de arrastre del marcador

  constructor(
    private modalController: ModalController,
    private locationService: LocationService,
    private cdr: ChangeDetectorRef
  ) {}

  async ionViewDidEnter() {
    await this.loadMap();
    this.setLocation(this.latitude, this.longitude, this.showSelectButton);
    window.dispatchEvent(new Event('resize')); // Actualizar el tamaño del mapa
  }

  async loadMap() {
    if (!this.map) {
      console.log('Inicializando el mapa...');
      this.map = L.map(this.mapContainer.nativeElement, {
        center: [this.latitude, this.longitude],
        zoom: this.zoomLevel,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
      }).addTo(this.map);

      this.setupDefaultMarker();
      this.setDraggable(this.isDraggable);

      if (this.latitude && this.longitude) {
        this.updateMarkerAndLocation(this.latitude, this.longitude);
      } else {
        try {
          const location = await this.locationService.getCurrentLocation();
          this.updateMarkerAndLocation(location.latitude, location.longitude);
        } catch (error) {
          console.error('Error al obtener la ubicación:', error);
        }
      }

      this.map.on('click', (event: any) => {
        if (this.isDraggable) {
          this.moveMarker(event.latlng.lat, event.latlng.lng);
        }
      });

      setTimeout(() => this.map.invalidateSize(), 300);
    }
  }

  setupDefaultMarker() {
    const iconDefault = L.icon({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });
    L.Marker.prototype.options.icon = iconDefault;
  }

  updateMarkerAndLocation(lat: number, lng: number) {
    if (!this.marker) {
      this.marker = L.marker([lat, lng], { draggable: this.isDraggable }).addTo(this.map);
  
      // Escuchar el evento 'dragend' para capturar la nueva ubicación
      this.marker.on('dragend', (event: any) => {
        const { lat, lng } = event.target.getLatLng();
        this.selectedLocation = { latitude: lat, longitude: lng };
        console.log('Nueva ubicación:', this.selectedLocation);
      });
    } else {
      this.marker.setLatLng([lat, lng]);
    }
  
    this.selectedLocation = { latitude: lat, longitude: lng };
    this.map.setView([lat, lng], this.zoomLevel);
    this.map.invalidateSize();
  }

  moveMarker(lat: number, lng: number) {
    this.updateMarkerAndLocation(lat, lng);
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  confirmLocation() {
    if (this.selectedLocation) {
      this.modalController.dismiss(this.selectedLocation);
    } else {
      console.log('No se seleccionó ninguna ubicación.');
      this.modalController.dismiss();
    }
  }

  setLocation(latitude: number, longitude: number, showButton: boolean) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.showSelectButton = showButton;
  }

  setDraggable(draggable: boolean) {
    this.isDraggable = draggable;
    if (this.marker) {
      this.marker.options.draggable = draggable;
      if (draggable) {
        this.marker.dragging.enable();
      } else {
        this.marker.dragging.disable();
      }
    }
  }
}
