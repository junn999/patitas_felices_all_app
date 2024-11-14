import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TemapPageRoutingModule } from './temap-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { TemapPage } from './temap.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TemapPageRoutingModule,
    TranslateModule,
  ],
  declarations: [TemapPage]
})
export class TemapPageModule {}