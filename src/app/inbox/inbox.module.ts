import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InboxPageRoutingModule } from './inbox-routing.module';

import { InboxPage } from './inbox.page';
import { TranslateService,TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InboxPageRoutingModule,
    TranslateModule
  ],
  declarations: [InboxPage]
})
export class InboxPageModule {
  langs: string [] = [];
  constructor(private translateService: TranslateService){
    this.langs = this.translateService.getLangs();
  }
}
