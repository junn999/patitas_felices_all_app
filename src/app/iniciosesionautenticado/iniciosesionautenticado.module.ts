import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IniciosesionautenticadoPageRoutingModule } from './iniciosesionautenticado-routing.module';
import { IniciosesionautenticadoPage } from './iniciosesionautenticado.page';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IniciosesionautenticadoPageRoutingModule,
    TranslateModule
  ],
  declarations: [IniciosesionautenticadoPage]
})
export class IniciosesionautenticadoPageModule {
  langs: string [] = [];
  constructor(private translateService: TranslateService){
    this.langs = this.translateService.getLangs();
  }
}