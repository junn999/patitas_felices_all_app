import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FormmascotaperdidaPageRoutingModule } from './formmascotaperdida-routing.module';
import { FormmascotaperdidaPage } from './formmascotaperdida.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FormmascotaperdidaPageRoutingModule
  ],
  declarations: [FormmascotaperdidaPage]
})
export class FormmascotaperdidaPageModule {}
