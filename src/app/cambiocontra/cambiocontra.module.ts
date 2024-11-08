import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CambiocontraPageRoutingModule } from './cambiocontra-routing.module';

import { CambiocontraPage } from './cambiocontra.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CambiocontraPageRoutingModule
  ],
  declarations: [CambiocontraPage]
})
export class CambiocontraPageModule {}
