import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhotoService } from '../services/photo.service';
import { FirestoreService } from '../services/firestore.service'; 

@Component({
  selector: 'app-formmascotaperdida',
  templateUrl: './formmascotaperdida.page.html',
  styleUrls: ['./formmascotaperdida.page.scss'],
})
export class FormmascotaperdidaPage implements OnInit {
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
    // Tomar y subir la foto usando PhotoService
    await this.photoService.addNewToGallery();
  }

  async onSubmit() {
    if (this.form.valid) {
      const post = {
        ...this.form.value,
        date: new Date(),
      };

      try {
        await this.firestoreService.addPostToPerdidas(post);
        console.log('Post added successfully');
        this.form.reset();
       } catch (error) {
        console.error('Error adding post: ', error);
      }
    } else {
      console.log('Formulario inválido');
    }
  }
}