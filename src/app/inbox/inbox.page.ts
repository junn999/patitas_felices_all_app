import { Component } from '@angular/core';

interface Message {
  userName: string;
  text: string;
  date: string;
}

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
})
export class InboxPage {
  messages: Message[] = [];  

  constructor() {}

  receiveMessage(newMessage: Message) {
    this.messages.push(newMessage);  
  }

}