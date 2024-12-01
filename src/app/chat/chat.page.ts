import { Component } from '@angular/core';
import { MessagingService } from '../services/messaging.service'; 
import { NavController } from '@ionic/angular';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage {
  message: string = '';
  selectedImage: string | null = null;
  userName: string = 'Usuario';  
  conversationId: number = 1; 
  messages: any[] = [];  

  constructor(
    public messagingService: MessagingService, 
    private navCtrl: NavController,
    private imageService: ImageService
  ) {}

  sendMessage() {
    if (this.message.trim() || this.selectedImage) {
      const newMessage = {
        content: this.message.trim(),
        image: this.selectedImage,
        timestamp: new Date().toLocaleString(),
        isMine: true,  
      };
      
      this.messagingService.sendMessage(
        this.conversationId, 
        newMessage.content, 
        this.selectedImage
      );
      
      this.messages.push(newMessage);
      this.message = '';  
      this.selectedImage = null;
    }
  }

  async attachImage() {
    this.selectedImage = await this.imageService.selectImageFromGallery();
    console.log('Imagen seleccionada:', this.selectedImage);
  }

  async captureImage() {
    this.selectedImage = await this.imageService.captureImage();
    console.log('Imagen capturada:', this.selectedImage);
  }
}