import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhotoService } from '../services/photo.service';
import { FirestoreService } from '../services/firestore.service'; 
import { ModalController } from '@ionic/angular';
import { MapComponent } from '../map/map.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-formmascotaadopcion',
  templateUrl: './formmascotaadopcion.page.html',
  styleUrls: ['./formmascotaadopcion.page.scss'],
})
export class FormmascotaadopcionPage implements OnInit {
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
    private translateService: TranslateService,
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

  ngOnInit() {}

  async addPhotoToGallery() {
    await this.photoService.addNewToGallery();
  }

  async onSubmit() {
    if (this.form.valid) {
      const latestPhoto = this.photoService.photos[0];
      let photoURL = '';

      if(latestPhoto && latestPhoto.url){
        photoURL = latestPhoto.url
      }
      
      const post = {
        ...this.form.value,
        date: new Date(),
        photoURL: photoURL
      };

      try {
        await this.firestoreService.addPostToAdopcion(post);
        console.log('Post added successfully');
        // Resetear el formulario después de enviar
        this.form.reset();
        this.mapPreviewUrl = '';
        this.photoService.photos = [];
      } catch (error) {
        console.error('Error adding post: ', error);
      }
    } else {
      console.log('Formulario inválido');
    }
  }

  
  async openMapModal() {
    const modal = await this.modalController.create({
      component: MapComponent,
      componentProps: {
        latitude: this.selectedLocation ? this.selectedLocation.latitude : 13.6929, // Ubicación predeterminada o la seleccionada
        longitude: this.selectedLocation ? this.selectedLocation.longitude : -89.2182,
        isDraggable: true, // Hacer el marcador arrastrable
      },
    });

    modal.onDidDismiss().then((data) => {
      if (data.data) {
        this.selectedLocation = data.data; // Guardar la nueva ubicación seleccionada
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
}