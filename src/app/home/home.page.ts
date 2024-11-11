import { Component, OnInit, ViewChild } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { ModalController } from '@ionic/angular';
import { ImagenComponent } from '../imagen/imagen.component'; 
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  mascotasPerdidas: any[] = [];
  mascotasEnAdopcion: any[] = [];
  todasLasMascotas: any[] = [];
  publicacionesFiltradas: any[] = [];
  

  constructor(
    private firestoreService: FirestoreService,
    private modalController: ModalController,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.firestoreService.getPostsFromPerdidas().subscribe(
      (posts) => {
        console.log("Mascotas Perdidas:", posts);
        this.mascotasPerdidas = posts;
        this.combinarYOrdenarPublicaciones();
      },
      (error) => console.error("Error al obtener Mascotas Perdidas:", error)
    );

    this.firestoreService.getPostsFromAdopcion().subscribe(
      (posts) => {
        console.log("Mascotas en Adopcion:", posts);
        this.mascotasEnAdopcion = posts;
        this.combinarYOrdenarPublicaciones();
      },
      (error) => console.error("Error al obtener Mascotas en Adopcion:", error)
    );
  }

  combinarYOrdenarPublicaciones() {
    // Combina las publicaciones de ambas colecciones en un solo arreglo
    this.todasLasMascotas = [...this.mascotasPerdidas, ...this.mascotasEnAdopcion];
  
    // Convierte los objetos Timestamp a Date
    this.todasLasMascotas.forEach(mascota => {
      if (mascota.date instanceof Object && mascota.date.seconds) {
        mascota.date = new Date(mascota.date.seconds * 1000);  // Convierte el Timestamp en un objeto Date
      }
    });
  
    // Ordena las publicaciones de ambas colecciones por fecha, de la más reciente a la más antigua
    this.todasLasMascotas.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  
    // Actualiza publicacionesFiltradas con todas las publicaciones ordenadas
    this.publicacionesFiltradas = [...this.todasLasMascotas];
    console.log("Publicaciones combinadas y ordenadas:", this.publicacionesFiltradas);
  } 

  mostrarTodas() {
    this.publicacionesFiltradas = [...this.todasLasMascotas];
    console.log("Mostrando todas las mascotas:", this.publicacionesFiltradas);
  }

  mostrarEnAdopcion() {
    this.publicacionesFiltradas = this.mascotasEnAdopcion;
    console.log("Mostrando mascotas en adopción:", this.publicacionesFiltradas);
  }

  mostrarPerdidas() {
    this.publicacionesFiltradas = this.mascotasPerdidas;
    console.log("Mostrando mascotas perdidas:", this.publicacionesFiltradas);
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
  verDetalles(mascota: any) {
    this.router.navigate(['/detalles']); 
  }
}