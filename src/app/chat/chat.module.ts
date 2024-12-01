import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatPageRoutingModule } from './chat-routing.module';

import { ChatPage } from './chat.page';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatPageRoutingModule,
    TranslateModule
  ],
  declarations: [ChatPage]
})
export class ChatPageModule {
  langs: string [] = [];
  constructor(private translateService: TranslateService){
    this.langs = this.translateService.getLangs();
  }
}
