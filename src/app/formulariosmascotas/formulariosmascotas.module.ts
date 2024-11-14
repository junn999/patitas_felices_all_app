import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FormulariosmascotasPageRoutingModule } from './formulariosmascotas-routing.module';
import { FormulariosmascotasPage } from './formulariosmascotas.page';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormulariosmascotasPageRoutingModule,
    TranslateModule
  ],
  declarations: [FormulariosmascotasPage]
})
export class FormulariosmascotasPageModule {
  langs: string [] = [];
  constructor(private translateService: TranslateService){
    this.langs = this.translateService.getLangs();
  }
}