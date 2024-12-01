import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.page.html',
  styleUrls: ['./solicitud.page.scss'],
})
export class SolicitudPage implements OnInit {
  adoptionForm!: FormGroup;
  showGif: boolean = false;
  mascotaData: any = null; 

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private translate: TranslateService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    const navigationState = history.state;
    if (navigationState && navigationState.mascota) {
      this.mascotaData = navigationState.mascota; 
      console.log('Datos de la mascota:', this.mascotaData);

      this.adoptionForm = this.fb.group({
        fullName: ['', [Validators.required, Validators.minLength(3)]],
        phone: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
        email: ['', [Validators.required, Validators.email]],
        address: ['', Validators.required],
        especie: [this.mascotaData?.especie || '', Validators.required], 
        breed: [this.mascotaData?.raza || '', Validators.required],    
        additionalInfo: [''],
        allergicToDogs: ['', Validators.required],
        fearOfDogs: ['', Validators.required],
        smokes: ['', Validators.required],
      });
    } else {
      console.error('No se recibieron datos de la mascota.');
    }

    console.log('Formulario inicializado:', this.adoptionForm);
  }

  async submitForm() {
    console.log('Formulario válido:', this.adoptionForm.valid);
    console.log('Valores del formulario:', this.adoptionForm.value);

    if (this.adoptionForm.valid) {
      this.showGif = true;

      setTimeout(() => {
        this.showGif = false;
        this.navCtrl.navigateRoot('/home'); 
      }, 2000);
    } else {
      const errorToast = await this.toastController.create({
        message: this.translate.instant('adoption.errors.invalid_form'),
        duration: 2000,
        color: 'danger',
        position: 'top',
      });
      await errorToast.present();
    }
  }

  changeLanguage(event: any) {
    const lang = event.detail.value;
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }
}