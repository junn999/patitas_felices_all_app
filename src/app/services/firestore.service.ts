import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, 
  DocumentReference, query, where, getDocs, QuerySnapshot, updateDoc, orderBy } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { Observable, of, forkJoin } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private mascotasPerdidasCollection = collection(this.firestore, 'MascotasPerdidas');
  private MascotasEnAdopcionCollection = collection(this.firestore, 'MascotasEnAdopcion');
  private fotosMascotasPerdidasCollection = collection(this.firestore, 'FotosMascotasPerdidas');
  private fotosMascotasEnAdopcionCollection = collection(this.firestore, 'FotosMascotasEnAdopcion');
  private usuarioCollection = collection(this.firestore, 'usuarios');
 
  constructor(private firestore: Firestore, private auth: Auth) {
    console.log('Firestore inicializado:', this.firestore);
  }

  // Método para obtener al usuario autenticado
  async getCurrentUser() {
    const user = this.auth.currentUser;
    if (!user) {
      return null;
    }
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || 'Anónimo',
    };
  }

  // Actualizar publicaciones antiguas con nombre de usuario y correo
  async updateOldPostsWithUserInfo() {
    const postsRefPerdidas = this.mascotasPerdidasCollection;
    const postsRefAdopcion = this.MascotasEnAdopcionCollection;
    
    // Obtener publicaciones en MascotasPerdidas
    const querySnapshotPerdidas = await getDocs(postsRefPerdidas);
    querySnapshotPerdidas.forEach(async (doc) => {
      const data = doc.data();
      if (!data["userName"] || !data["userEmail"]) { // Si no tiene datos de usuario
        const updatedData = {
          "userName": data["userName"] || 'Anónimo', // Accedemos con corchetes
          "userEmail": data["userEmail"] || 'Correo no disponible', // Accedemos con corchetes
        };
        // Actualizar publicación
        await updateDoc(doc.ref, updatedData);
        console.log(`Post ${doc.id} actualizado con usuario:`, updatedData);
      }
    });
  
    // Obtener publicaciones en MascotasEnAdopcion
    const querySnapshotAdopcion = await getDocs(postsRefAdopcion);
    querySnapshotAdopcion.forEach(async (doc) => {
      const data = doc.data();
      if (!data["userName"] || !data["userEmail"]) { // Si no tiene datos de usuario
        const updatedData = {
          "userName": data["userName"] || 'Anónimo', // Accedemos con corchetes
          "userEmail": data["userEmail"] || 'Correo no disponible', // Accedemos con corchetes
        };
        // Actualizar publicación
        await updateDoc(doc.ref, updatedData);
        console.log(`Post ${doc.id} actualizado con usuario:`, updatedData);
      }
    });
  }
  
  // Métodos para la carga de posts
  async addPostToPerdidas(post: any): Promise<DocumentReference> {
    const user = await this.getCurrentUser();
    if (user) {
      post.userName = user.displayName || 'Anónimo';
      post.userEmail = user.email ?? 'Correo no disponible';
    } else {
      post.userName = 'Anónimo';
      post.userEmail = 'Correo no disponible';
    }
    return addDoc(this.mascotasPerdidasCollection, post);
  }

  async addPostToAdopcion(post: any): Promise<DocumentReference> {
    const user = await this.getCurrentUser();
    if (user) {
      post.userName = user.displayName || 'Anónimo';
      post.userEmail = user.email ?? 'Correo no disponible';
    } else {
      post.userName = 'Anónimo';
      post.userEmail = 'Correo no disponible';
    }
    return addDoc(this.MascotasEnAdopcionCollection, post);
  }

  addToUsuario(usuario: any): Promise<any> {
    return addDoc(this.usuarioCollection, usuario);
  }

  // Métodos para la obtención de posts de la base de datos
  getPostsFromPerdidas(): Observable<any[]> {
    const perdidasQuery = query(this.mascotasPerdidasCollection, orderBy('date', 'desc'));
    return collectionData(perdidasQuery, { idField: 'id' }).pipe(
      tap(data => {
        console.log('Datos de MascotasPerdidas:', data);
        data.forEach(item => console.log('Tipo de date en MascotasPerdidas:', typeof item['date']));
      }),
      catchError(error => {
        console.error('Error obteniendo datos de MascotasPerdidas:', error);
        return of([]);
      })
    ) as Observable<any[]>;
  }

  getPostsFromAdopcion(): Observable<any[]> {
    const adopcionQuery = query(this.MascotasEnAdopcionCollection, orderBy('date', 'desc'));
    return collectionData(adopcionQuery, { idField: 'id' }).pipe(
      tap(data => {
        console.log('Datos de MascotasEnAdopcion:', data);
        data.forEach(item => console.log('Tipo de date en MascotasEnAdopcion:', typeof item['date']));
      }),
      catchError(error => {
        console.error('Error obteniendo datos de MascotasEnAdopcion:', error);
        return of([]);
      })
    ) as Observable<any[]>;
  }

  getAllPosts(): Observable<any[]> {
    const perdidas = this.getPostsFromPerdidas().pipe(
      map(posts => posts.map(post => ({ ...post, tipo: 'perdida' })))
    );
    const adopcion = this.getPostsFromAdopcion().pipe(
      map(posts => posts.map(post => ({ ...post, tipo: 'adopcion' })))
    );
  
    return forkJoin([adopcion, perdidas]).pipe(
      map(([adopcionData, perdidasData]) => {
        const allPosts = [...adopcionData, ...perdidasData];
        // Ordena por fecha descendente
        return allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      }),
      tap(data => console.log('Datos combinados y ordenados de ambas colecciones:', data))
    );
  }

  // Métodos para la carga de imágenes en diferentes colecciones
  addPhotoToPerdidas(photo: any): Promise<DocumentReference> {
    return addDoc(this.fotosMascotasPerdidasCollection, photo);
  }

  addPhotoToAdopcion(photo: any): Promise<DocumentReference> {
    return addDoc(this.fotosMascotasEnAdopcionCollection, photo);
  }

  // Métodos para la obtención de imágenes de las diferentes colecciones
  getPhotosFromPerdidas(): Observable<any[]> {
    return collectionData(this.fotosMascotasPerdidasCollection, { idField: 'id' }).pipe(
      tap(data => console.log('Fotos de MascotasPerdidas:', data)) // Log para verificar fotos de MascotasPerdidas
    ) as Observable<any[]>;
  }

  getPhotosFromAdopcion(): Observable<any[]> {
    return collectionData(this.fotosMascotasEnAdopcionCollection, { idField: 'id' }).pipe(
      tap(data => console.log('Fotos de MascotasEnAdopcion:', data)) // Log para verificar fotos de MascotasEnAdopcion
    ) as Observable<any[]>;
  }

  async getUserByEmail(email: string) {
    const q = query(this.usuarioCollection, where('email', '==', email));
    const querySnapshot: QuerySnapshot = await getDocs(q);
    return querySnapshot.empty ? null : querySnapshot.docs[0].data();
  }

  async updateUsername(email: string, newUsername: string, currentDate: Date) {
    const q = query(this.usuarioCollection, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const userDocRef = doc(this.firestore, `usuarios/${querySnapshot.docs[0].id}`);
      await updateDoc(userDocRef, {
        username: newUsername,
        lastUsernameChange: currentDate.toISOString()
      });
    }
  }
}
