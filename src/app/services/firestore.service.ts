import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, DocumentReference, query, where, getDocs, QuerySnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private mascotasPerdidasCollection = collection(this.firestore, 'MascotasPerdidas');
  private MascotasEnAdopcionCollection = collection(this.firestore, 'MascotasEnAdopcion');
  private fotosMascotasPerdidasCollection = collection(this.firestore, 'FotosMascotasPerdidas');
  private fotosMascotasEnAdopcionCollection = collection(this.firestore, 'FotosMascotasEnAdopcion');
  private usuarioCollection = collection(this.firestore, 'Usuario');

  constructor(private firestore: Firestore) {}

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
    return collectionData(this.mascotasPerdidasCollection, { idField: 'id' }) as Observable<any[]>;
  }

  getPostsFromAdopcion(): Observable<any[]> {
    return collectionData(this.MascotasEnAdopcionCollection, { idField: 'id' }) as Observable<any[]>;
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
    return collectionData(this.fotosMascotasPerdidasCollection, { idField: 'id' }) as Observable<any[]>;
  }

  getPhotosFromAdopcion(): Observable<any[]> {
    return collectionData(this.fotosMascotasEnAdopcionCollection, { idField: 'id' }) as Observable<any[]>;
  }

  // Verificación de existencia de correo electrónico
  async checkEmailExists(email: string): Promise<boolean> {
    const q = query(this.usuarioCollection, where('correoElectronico', '==', email));
    const querySnapshot: QuerySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  }

  // Obtener usuario por correo electrónico
  async getUserByEmail(email: string) {
    const q = query(this.usuarioCollection, where('correoElectronico', '==', email));
    const querySnapshot: QuerySnapshot = await getDocs(q);
    return querySnapshot.empty ? null : querySnapshot.docs[0].data();
  }
}