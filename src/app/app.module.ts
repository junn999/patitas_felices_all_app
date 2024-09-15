import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore'; 
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getStorage, provideStorage } from '@angular/fire/storage';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,  
    ],

  providers: [{ 
    provide: RouteReuseStrategy, 
    useClass: IonicRouteStrategy }, 

  provideFirebaseApp(() => initializeApp({
  "projectId":"apping-1c373",
  "appId":"1:242067860949:web:a7a96d8dfc8fa3c2cae15c",
  "storageBucket":"apping-1c373.appspot.com",
  "apiKey":"AIzaSyCjAROuAcp2wimWfSsYIEglxcceZArxxjE",
  "authDomain":"apping-1c373.firebaseapp.com",
  "messagingSenderId":"242067860949"
  })),

  provideFirestore(() => getFirestore()),
  provideAuth(() => getAuth()),
  provideStorage(() => getStorage())],
  
  bootstrap: [AppComponent],
})
export class AppModule {}
