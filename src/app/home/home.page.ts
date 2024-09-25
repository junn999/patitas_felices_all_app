import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service'; // Asegúrate de tener la ruta correcta

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  mascotasPerdidas: any[] = [];
  mascotasEnAdopcion: any[] = [];

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit(){
    this.loadPosts();
  }
  loadPosts() {
    // Obtener posts de Mascotas Perdidas
    this.firestoreService.getPostsFromPerdidas().subscribe((posts) => {
      this.mascotasPerdidas = posts;
    });

    // Obtener posts de Mascotas en Adopción
    this.firestoreService.getPostsFromAdopcion().subscribe((posts) => {
      this.mascotasEnAdopcion = posts;
    });
  }
}
