import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SolicitudPageRoutingModule } from './solicitud-routing.module';
import { SolicitudPage } from './solicitud.page';
import { TranslateService,TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SolicitudPageRoutingModule,
    TranslateModule
  ],
  declarations: [SolicitudPage]
})
export class SolicitudPageModule {
  langs: string [] = [];
  constructor(private translateService: TranslateService){
    this.langs = this.translateService.getLangs();
  }
}
