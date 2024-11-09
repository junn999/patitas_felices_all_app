import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';
import { Router } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { DocumentData } from 'firebase/firestore'; // Importa el tipo correcto

interface UserData {
  username: string;
  email: string;
  // Agrega otros campos que puedas necesitar
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  username: string = ''; // Variable para almacenar el username
  user$: Observable<any> = EMPTY; // Para la autenticación

  constructor(
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener el usuario autenticado
    this.authService.getUser().subscribe(user => {
      if (user) {
        // Obtener el correo del usuario activo
        const email = user.email;
        // Buscar el username en la colección 'usuarios' de Firestore
        this.firestoreService.getUserByEmail(email).then((userData: DocumentData | null) => {
          if (userData) {
            // Verificar si userData tiene la propiedad username
            const user = userData as UserData;
            this.username = user.username;  // Asignar el username a la variable
          } else {
            console.error('No se encontró el usuario en Firestore');
          }
        }).catch(error => {
          console.error('Error al obtener el usuario:', error);
        });
      }
    });
  }

  logout() {
    this.authService.logout()
      .then(() => this.router.navigate(['/iniciosesionautenticado']))
      .catch(error => console.error('Logout failed', error));
  }
}
