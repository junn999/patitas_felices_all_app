import { Capacitor } from "@capacitor/core";
import  { Geolocation } from '@capacitor/geolocation';
import {Component,AfterContentInit} from '@angular/core'
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.js';
//---------------------------------------------------------------------------------------------
export function iniciarMapa(map: L.Map){
    const mapContainer = document.getElementById('map');
    if(!mapContainer){
        console.error('contenedor no disponible')
    };
    map.setView([13.6929,-89.2182], 7);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    setTimeout(()=>{
        map.invalidateSize();
    },100);
};
//------------------------------------------------------------------------------------
export async function getCurrentPosition(map: L.Map, markerRef: { marker: L.Marker | null }) {
    try {
      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true
      });
      const { latitude, longitude } = position.coords;
  
      // Eliminar el marcador anterior si existe
      if (markerRef.marker) {
        map.removeLayer(markerRef.marker);
      }
  
      // Crear un nuevo marcador y añadirlo al mapa
      markerRef.marker = L.marker([latitude, longitude]).addTo(map);
      map.setView([latitude, longitude], 13);
  
      return markerRef.marker; // Devolver el nuevo marcador
    } catch (error) {
      console.error("No se pudo obtener la ubicación", error);
      return markerRef.marker;
    }
  }
 //--------------------------------------------------------------------------------------------  
 
 export function watchPosition(map: L.Map, markerRef: { marker: L.Marker | null }) {
    Geolocation.watchPosition(
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10000
      },
      (position, error) => {
        if (position) {
          const { latitude, longitude } = position.coords;
          console.log('Ubicación actualizada:', latitude, longitude);
  
          // Actualizar la posición del marcador existente sin eliminarlo
        if (markerRef.marker) {
          markerRef.marker.setLatLng([latitude, longitude]);
        } else {
          // Crear un nuevo marcador si no existe
          markerRef.marker = L.marker([latitude, longitude]).addTo(map);
        }

        // Centrar el mapa en la nueva posición
        map.setView([latitude, longitude], 13);
        } else if (error) {
          // Mejor manejo de errores
          switch (error.code) {
            case error.PERMISSION_DENIED:
              console.error('El usuario negó la solicitud de Geolocalización.');
              break;
            case error.POSITION_UNAVAILABLE:
              console.error('La información de la ubicación no está disponible.');
              break;
            case error.TIMEOUT:
              console.error('La solicitud para obtener la ubicación ha expirado.');
              break;
            default:
              console.error('Error desconocido al obtener la ubicación.', error);
              break;
            }
        }
      }
    );  
  }