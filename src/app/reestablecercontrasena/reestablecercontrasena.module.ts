import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReestablecercontrasenaPageRoutingModule } from './reestablecercontrasena-routing.module';

import { ReestablecercontrasenaPage } from './reestablecercontrasena.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReestablecercontrasenaPageRoutingModule
  ],
  declarations: [ReestablecercontrasenaPage]
})
export class ReestablecercontrasenaPageModule {}
