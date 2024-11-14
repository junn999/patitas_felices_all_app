import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CambiocontraPageRoutingModule } from './cambiocontra-routing.module';
import { CambiocontraPage } from './cambiocontra.page';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CambiocontraPageRoutingModule,
    TranslateModule
  ],
  declarations: [CambiocontraPage]
})
export class CambiocontraPageModule {
  langs: string [] = [];
  constructor(private translateService: TranslateService){
    this.langs = this.translateService.getLangs();
  }
}
