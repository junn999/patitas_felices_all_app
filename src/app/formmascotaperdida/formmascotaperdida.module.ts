import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FormmascotaperdidaPageRoutingModule } from './formmascotaperdida-routing.module';
import { FormmascotaperdidaPage } from './formmascotaperdida.page';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FormmascotaperdidaPageRoutingModule,
    TranslateModule
  ],
  declarations: [FormmascotaperdidaPage]
})
export class FormmascotaperdidaPageModule {
  langs: string [] = [];
  constructor(private translateService: TranslateService){
    this.langs = this.translateService.getLangs();
  }
}