import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReestablecercontrasenaPageRoutingModule } from './reestablecercontrasena-routing.module';
import { ReestablecercontrasenaPage } from './reestablecercontrasena.page';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReestablecercontrasenaPageRoutingModule,
    TranslateModule
  ],
  declarations: [ReestablecercontrasenaPage]
})
export class ReestablecercontrasenaPageModule {
  langs: string [] = [];
  constructor(private translateService: TranslateService){
    this.langs = this.translateService.getLangs();
  }
}
