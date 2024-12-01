import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessagingService {
  private messages: { 
    [key: number]: { 
      content: string; 
      isMine: boolean; 
      timestamp: string; 
      image: string | null; 
    }[] 
  } = {
    1: [
      { content: 'Hola', isMine: false, timestamp: '10:00 AM', image: null },
      { content: 'Hola, ¿cómo estás?', isMine: true, timestamp: '10:01 AM', image: null },
    ],
    2: [
      { content: '¿Podemos hablar mañana?', isMine: false, timestamp: '9:30 AM', image: null },
    ],
  };

  constructor() { }


  getMessages(conversationId: number) {
    return this.messages[conversationId] || [];
  }

  sendMessage(conversationId: number, message: string, image: string | null) {
    const timestamp = new Date().toLocaleTimeString();  
    if (!this.messages[conversationId]) {
      this.messages[conversationId] = [];  
    }

    this.messages[conversationId].push({
      content: message,
      isMine: true,  
      timestamp,
      image,  
    });
  }

  getConversations(): { id: number; title: string; lastMessage: string }[] {
    return Object.keys(this.messages).map(id => ({
      id: parseInt(id),  
      title: `Conversación ${id}`, 
      lastMessage: this.messages[parseInt(id)].slice(-1)[0].content,  
    }));
  }
}