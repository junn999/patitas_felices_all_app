import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { getStorage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public photos: UserPhoto[] = [];
  private storage = getStorage();

  constructor() { }
  // este se usa para poder tomar la foto desde formmadopcion
  public async addNewToGallery() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    // Guardar la foto en el sistema de archivos
    const savedImageFile = await this.savePicture(capturedPhoto);
    const photoURL = await this.uploadToFirebase(savedImageFile, capturedPhoto)

    this.photos.unshift({
      ...savedImageFile,
      url:photoURL
    });
  }
//--------------------------------------------------------------------
//este se usa solo para seleccionar la imagen desde formmperdidas
  public async addPhotoFromGallery() { 
    const selectedPhoto = await Camera.getPhoto({ 
    resultType: CameraResultType.Uri,
    source: CameraSource.Photos, 
    quality: 100 
  }); 

    const savedImageFile = await this.savePicture(selectedPhoto); 
    const photoURL = await this.uploadToFirebase(savedImageFile, selectedPhoto); 
    this.photos.unshift({ 
      ...savedImageFile, 
      url: photoURL 
    }); 
  }

  private async savePicture(photo: Photo){
    // Convertir la foto a base64
    const base64Data = await this.readAsBase64(photo);

    // Guardar la foto en el sistema de archivos
    const fileName = Date.now() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    });

    // Retornar la información de la foto guardada
    return {
      filepath: fileName,
      webviewPath: photo.webPath
    };
  }

  private async readAsBase64(photo: Photo){
    // Obtener la foto como un blob
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();

    return await this.convertBlobToBase64(blob) as string;
  }

  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

    //Método que sube la imágen a Firebase Storage
  private async uploadToFirebase(savedImageFile: UserPhoto, photo: Photo): Promise<string> {
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();

    const storageRef = ref(this.storage, `images/${savedImageFile.filepath}`);
    await uploadBytes(storageRef, blob);

    return await getDownloadURL(storageRef);
  }
}
  export interface UserPhoto {
    filepath: string;
    webviewPath?: string;
    url?: string;
  }