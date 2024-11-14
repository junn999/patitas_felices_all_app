import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FormmascotaadopcionPageRoutingModule } from './formmascotaadopcion-routing.module';
import { FormmascotaadopcionPage } from './formmascotaadopcion.page';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FormmascotaadopcionPageRoutingModule,
    TranslateModule
  ],
  declarations: [FormmascotaadopcionPage]
})
export class FormmascotaadopcionPageModule {
  langs: string [] = [];
  constructor(private translateService: TranslateService){
    this.langs = this.translateService.getLangs();
  }
}