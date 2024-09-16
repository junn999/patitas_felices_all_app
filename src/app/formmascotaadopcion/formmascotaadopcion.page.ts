import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhotoService } from '../services/photo.service';
import { FirestoreService } from '../services/firestore.service'; 

@Component({
  selector: 'app-formmascotaadopcion',
  templateUrl: './formmascotaadopcion.page.html',
  styleUrls: ['./formmascotaadopcion.page.scss'],
})
export class FormmascotaadopcionPage implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public photoService: PhotoService,
    private firestoreService: FirestoreService
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      especie: ['', Validators.required],
      color: ['', Validators.required],
      raza: ['', Validators.required],
      sexo: ['', Validators.required]
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
        // Opcional: Resetear el formulario después de enviar
        this.form.reset();
        this.photoService.photos = [];
      } catch (error) {
        console.error('Error adding post: ', error);
      }
    } else {
      console.log('Formulario inválido');
    }
  }
}