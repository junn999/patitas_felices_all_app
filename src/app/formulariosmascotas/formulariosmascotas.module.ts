import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormulariosmascotasPageRoutingModule } from './formulariosmascotas-routing.module';

import { FormulariosmascotasPage } from './formulariosmascotas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormulariosmascotasPageRoutingModule
  ],
  declarations: [FormulariosmascotasPage]
})
export class FormulariosmascotasPageModule {}
