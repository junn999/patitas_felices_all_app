import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FormmascotaadopcionPageRoutingModule } from './formmascotaadopcion-routing.module';
import { FormmascotaadopcionPage } from './formmascotaadopcion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FormmascotaadopcionPageRoutingModule
  ],
  declarations: [FormmascotaadopcionPage]
})
export class FormmascotaadopcionPageModule {}
