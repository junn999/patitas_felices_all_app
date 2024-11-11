import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, 
DocumentReference, query, where, getDocs, QuerySnapshot, updateDoc, orderBy } from '@angular/fire/firestore';
import { Observable, of,forkJoin } from 'rxjs';
import { tap, catchError,map, } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private mascotasPerdidasCollection = collection(this.firestore, 'MascotasPerdidas');
  private MascotasEnAdopcionCollection = collection(this.firestore, 'MascotasEnAdopcion');
  private fotosMascotasPerdidasCollection = collection(this.firestore, 'FotosMascotasPerdidas');
  private fotosMascotasEnAdopcionCollection = collection(this.firestore, 'FotosMascotasEnAdopcion');
  private usuarioCollection = collection(this.firestore, 'usuarios');

  constructor(private firestore: Firestore) {
    console.log('Firestore inicializado:', this.firestore);
  }

  // Métodos para la carga de posts
  addPostToPerdidas(post: any): Promise<DocumentReference> {
    return addDoc(this.mascotasPerdidasCollection, post);
  }

  addPostToAdopcion(post: any): Promise<DocumentReference> {
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