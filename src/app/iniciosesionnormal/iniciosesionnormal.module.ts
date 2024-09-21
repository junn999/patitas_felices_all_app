import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InicioSesionNormalPageRoutingModule } from './iniciosesionnormal-routing.module';
import { InicioSesionNormalPage } from './iniciosesionnormal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioSesionNormalPageRoutingModule
  ],
  declarations: [InicioSesionNormalPage]
})
export class InicioSesionNormalPageModule {}
