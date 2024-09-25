import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private mascotasPerdidasCollection = collection(this.firestore, 'MascotasPerdidas');
  private MascotasEnAdopcionCollection = collection(this.firestore, 'MascotasEnAdopcion');
  private fotosMascotasPerdidasCollection = collection(this.firestore, 'FotosMascotasPerdidas');
  private fotosMascotasEnAdopcionCollection = collection(this.firestore, 'FotosMascotasEnAdopcion');

  constructor(private firestore: Firestore) {}

  addPostToPerdidas(post: any): Promise<DocumentReference> {
    return addDoc(this.mascotasPerdidasCollection, post);
  }

  addPostToAdopcion(post: any): Promise<DocumentReference> {
    return addDoc(this.MascotasEnAdopcionCollection, post);
  }

  getPostsFromPerdidas(): Observable<any[]> {
    return collectionData(this.mascotasPerdidasCollection, { idField: 'id' }) as Observable<any[]>;
  }

  getPostsFromAdopcion(): Observable<any[]> {
    return collectionData(this.MascotasEnAdopcionCollection, { idField: 'id' }) as Observable<any[]>;
  }

  // Métodos para las imágenes
  addPhotoToPerdidas(photo: any): Promise<DocumentReference> {
    return addDoc(this.fotosMascotasPerdidasCollection, photo);
  }

  addPhotoToAdopcion(photo: any): Promise<DocumentReference> {
    return addDoc(this.fotosMascotasEnAdopcionCollection, photo);
  }

  getPhotosFromPerdidas(): Observable<any[]> {
    return collectionData(this.fotosMascotasPerdidasCollection, { idField: 'id' }) as Observable<any[]>;
  }

  getPhotosFromAdopcion(): Observable<any[]> {
    return collectionData(this.fotosMascotasEnAdopcionCollection, { idField: 'id' }) as Observable<any[]>;
  }
}