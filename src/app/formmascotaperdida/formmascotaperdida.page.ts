import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhotoService } from '../services/photo.service';
import { FirestoreService } from '../services/firestore.service'; 
import { ModalController } from '@ionic/angular';
import { MapComponent } from '../map/map.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-formmascotaperdida',
  templateUrl: './formmascotaperdida.page.html',
  styleUrls: ['./formmascotaperdida.page.scss'],
})
export class FormmascotaperdidaPage implements OnInit {
  form: FormGroup;
  selectedLocation: any = null;
  mapPreviewUrl: SafeResourceUrl = '';
  razas: string[] = [];
  speciesBreeds: { [key: string]: string[] } = {
    perro: ['Labrador', 'Bulldog', 'Pastor Alemán', 'Poodle', 'Chihuahua', 'Rottweiler', 'Husky siberiano', 'Yorkshire'],
    gato: ['Siames', 'Persa', 'Bengalí', 'Angora', 'Korat']
  };

  @ViewChild(MapComponent) mapComponent!: MapComponent;
  
  constructor(
    private fb: FormBuilder,
    public photoService: PhotoService,
    private firestoreService: FirestoreService,
    private modalController: ModalController,
    private sanitizer: DomSanitizer,
    private translateService: TranslateService
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      especie: ['', Validators.required],
      color: ['', Validators.required],
      raza: ['', Validators.required],
      sexo: ['', Validators.required],
      latitud: ['', Validators.required],
      longitud: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Usar el idioma predeterminado del localStorage o 'es' como fallback
    const defaultLang = localStorage.getItem('lang') || 'es';
    this.translateService.use(defaultLang);  // Cambiar idioma al inicializar
    this.firestoreService.updateOldPostsWithUserInfo().then(() => {
      console.log('Publicaciones antiguas actualizadas');
    }).catch((error) => {
      console.error('Error al actualizar publicaciones:', error);
    });
  }

  async addPhotoFromGallery() {
    // Tomar y subir la foto usando PhotoService
    await this.photoService.addPhotoFromGallery();
  }

  async onSubmit() {
    if (this.form.valid) {
      const latestPhoto = this.photoService.photos[0];
      let photoURL = '';
  
      if (latestPhoto && latestPhoto.url) {
        photoURL = latestPhoto.url;
      }
  
      // Obtener datos del usuario autenticado
      try {
        const user = await this.firestoreService.getCurrentUser();
        if (user) {
          const post = {
            ...this.form.value,
            date: new Date(),
            photoURL: photoURL,
            userName: user.displayName || 'Usuario', // Nombre del usuario
            userEmail: user.email                    // Correo del usuario
          };
  
          try {
            await this.firestoreService.addPostToPerdidas(post);
            console.log('Post added successfully');
            this.form.reset();
            this.mapPreviewUrl = '';
            this.photoService.photos = [];
          } catch (error) {
            console.error('Error adding post: ', error);
          }
        } else {
          console.error('No se encontró usuario autenticado.');
        }
      } catch (error) {
        console.error('Error al obtener el usuario autenticado:', error);
      }
    } else {
      console.log('Formulario inválido');
    }
  }
  
  async openMapModal() {
    const modal = await this.modalController.create({
      component: MapComponent,
      componentProps: {
        latitude: this.selectedLocation ? this.selectedLocation.latitude : 13.6929, 
        longitude: this.selectedLocation ? this.selectedLocation.longitude : -89.2182,
        isDraggable: true, 
      },
    });
  
    modal.onDidDismiss().then((data) => {
      if (data.data) {
        this.selectedLocation = data.data; 
        this.form.patchValue({
          latitud: this.selectedLocation.latitude,
          longitud: this.selectedLocation.longitude,
        });
        this.updateMapPreview();
      }
    });
    await modal.present();
  }

  updateMapPreview() {
    if (this.selectedLocation) {
      const { latitude, longitude } = this.selectedLocation;
      const url = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.005},${latitude - 0.005},${longitude + 0.005},${latitude + 0.005}&layer=mapnik&marker=${latitude},${longitude}`;
      this.mapPreviewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
  }

  onEspecieChange(event: any) {
    const selectedEspecie = event.detail.value;
    console.log('Selected Especie:', selectedEspecie);
    this.razas = this.speciesBreeds[selectedEspecie] || [];
    console.log('Available Razas:', this.razas);
    this.form.get('raza')?.setValue('');
  }

  onColorChange(event: any) {
    const selectedColor = event.detail.value;
    console.log('Selected Color:', selectedColor);
    this.form.get('color')?.setValue(selectedColor);
  }

  changeLanguage(language: string) {
    this.translateService.use(language);  
    localStorage.setItem('lang', language);  
  }
}
