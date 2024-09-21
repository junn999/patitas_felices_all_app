import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IniciosesionautenticadoPageRoutingModule } from './iniciosesionautenticado-routing.module';

import { IniciosesionautenticadoPage } from './iniciosesionautenticado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IniciosesionautenticadoPageRoutingModule
  ],
  declarations: [IniciosesionautenticadoPage]
})
export class IniciosesionautenticadoPageModule {}
