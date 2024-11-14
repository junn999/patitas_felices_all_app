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
import { LocationService } from './services/ubicacion.service';
import { MapComponent } from './map/map.component';
import { ImagenComponent } from './imagen/imagen.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
export function HttpLoaderFactory(HttpClient: HttpClient){
  return new TranslateHttpLoader(HttpClient, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [AppComponent,
    MapComponent, ImagenComponent,
  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })],
  providers: [{ 
    provide: RouteReuseStrategy, 
    useClass: IonicRouteStrategy,
  }, 
  LocationService,
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
export class AppModule {
}
