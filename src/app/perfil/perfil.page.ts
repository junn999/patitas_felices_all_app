import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';
import { Router } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { DocumentData } from 'firebase/firestore'; // Importa el tipo correcto
import { TranslateService } from '@ngx-translate/core';

interface UserData {
  username: string;
  email: string;
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  username: string = ''; // Variable para almacenar el username
  user$: Observable<any> = EMPTY; // Para la autenticación
  userPosts: any; // Para las publicaciones del usuario
  idioma: string = 'es';
  langs = [
    { label: 'Español', value: 'es' },
    { label: 'English', value: 'en' }
  ];

  constructor(
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private router: Router,
    private translateService: TranslateService
  ) {
    const defaultLang = localStorage.getItem('lang') || 'es';
    this.translateService.setDefaultLang(defaultLang);
    this.translateService.use(defaultLang);
  }

  ngOnInit(): void {
    // Obtener el usuario autenticado
    this.authService.getUser().subscribe(user => {
      if (user) {
        // Obtener el correo del usuario activo
        const email = user.email;
        console.log('Usuario autenticado:', user); // Añadir log para verificar el usuario

        // Buscar el username en la colección 'usuarios' de Firestore
        this.firestoreService.getUserByEmail(email).then((userData: DocumentData | null) => {
          if (userData) {
            // Verificar si userData tiene la propiedad username
            const user = userData as UserData;
            this.username = user.username;  // Asignar el username a la variable
            console.log('Username obtenido:', this.username); // Añadir log para verificar el username
          } else {
            console.error('No se encontró el usuario en Firestore');
          }
        }).catch(error => {
          console.error('Error al obtener el usuario:', error);
        });
        
        // Obtener las publicaciones del usuario (solo funciona para la coleccion MascotasPerdidas))
        this.userPosts = this.firestoreService.getPostsByUser(user.uid);
        // Añadir log para verificar
        this.userPosts.subscribe((posts: any[]) => console.log('Publicaciones obtenidas en el perfil:', posts));
      } else {
        console.error('Usuario no autenticado');
      }
    }, error => {
      console.error('Error al obtener el usuario autenticado:', error);
    });
  }

  logout() {
    this.authService.logout()
      .then(() => this.router.navigate(['/iniciosesionautenticado']))
      .catch(error => console.error('Logout failed', error));
  }

  verDetalles(post: any): void {
    this.router.navigate(['/detalles'], { queryParams: { id: post.id } });
  }
  
}
