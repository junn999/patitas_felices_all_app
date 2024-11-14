import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
})
export class NotificacionesPage implements OnInit {
  idioma: string = 'es'; 
  langs = [
    { label: 'Español', value: 'es' },
    { label: 'English', value: 'en' }
  ]; 

  notificationsEnabled: boolean = true;
  notifyLostPetsNearMe: boolean = true;
  notifyAdoptablePets: boolean = true;
  notificationFrequency: string = 'instant';
  notifyNews: boolean = true;

  constructor(private translateService: TranslateService) {
    const defaultLang = localStorage.getItem('lang') || 'es';
    this.idioma = defaultLang;
    this.translateService.setDefaultLang(this.idioma);
    this.translateService.use(this.idioma);
  }

  ngOnInit() {}
 
  changeLang(event: any) {
    const selectedLang = event.detail.value;
    this.translateService.use(selectedLang);  
    localStorage.setItem('lang', selectedLang);  
  }

  savePreferences() {
    console.log('Preferencias guardadas:', {
      notificationsEnabled: this.notificationsEnabled,
      notifyLostPetsNearMe: this.notifyLostPetsNearMe,
      notifyAdoptablePets: this.notifyAdoptablePets,
      notificationFrequency: this.notificationFrequency,
      notifyNews: this.notifyNews
    });
  }
}