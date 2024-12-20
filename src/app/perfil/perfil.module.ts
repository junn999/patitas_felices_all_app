import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProfilePageRoutingModule } from './perfil-routing.module';
import { PerfilPage } from './perfil.page';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    TranslateModule
  ],
  declarations: [PerfilPage]
})
export class PerfilPageModule {
  langs: string [] = [];
  constructor(private translateService: TranslateService){
    this.langs = this.translateService.getLangs();
  }
}