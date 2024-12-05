import { Component, OnInit, ViewChild } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { ModalController } from '@ionic/angular';
import { ImagenComponent } from '../imagen/imagen.component';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

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
    private router: Router,
    private translateService: TranslateService,
  ) {
    const defaultLang = localStorage.getItem('lang') || 'es';
    this.translateService.setDefaultLang(defaultLang);
    this.translateService.use(defaultLang);
  }

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.firestoreService.getPostsFromPerdidas().subscribe(
      (posts) => {
        console.log("Mascotas Perdidas:", posts);
        this.mascotasPerdidas = posts.map(post => ({ 
          ...post, 
          coleccion: 'Extraviada', 
          userName: post.userName || 'Desconocido', 
          userEmail: post.userEmail || 'No disponible' 
        }));
        this.combinarYOrdenarPublicaciones();
      },
      (error) => console.error("Error al obtener Mascotas Perdidas:", error)
    );

    this.firestoreService.getPostsFromAdopcion().subscribe(
      (posts) => {
        console.log("Mascotas en Adopcion:", posts);
        this.mascotasEnAdopcion = posts.map(post => ({ 
          ...post, 
          coleccion: 'En adopción', 
          userName: post.userName || 'Desconocido', 
          userEmail: post.userEmail || 'No disponible' 
        }));
        this.combinarYOrdenarPublicaciones();
      },
      (error) => console.error("Error al obtener Mascotas en Adopcion:", error)
    );
  }

  combinarYOrdenarPublicaciones() {
    const uniquePosts = new Map();
    [...this.mascotasPerdidas, ...this.mascotasEnAdopcion].forEach(post => {
      uniquePosts.set(post.id, post);
    });

    this.todasLasMascotas = Array.from(uniquePosts.values());

    this.todasLasMascotas.forEach(mascota => {
      if (mascota.date instanceof Object && mascota.date.seconds) {
        mascota.date = new Date(mascota.date.seconds * 1000); 
      }
    });

    this.todasLasMascotas.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

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
      console.log("Campo vacío");
      return;
    }

    const modal = await this.modalController.create({
      component: ImagenComponent,
      componentProps: { photoURL }
    });
    await modal.present();
  }

  verDetalles(mascota: any) {
    this.router.navigate(['/detalles'], { state: { mascota } });
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
    }
    return key;
  }
}
