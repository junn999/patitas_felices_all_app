import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {
  user$: Observable<any> = EMPTY;  // Inicializar con un observable vacío
  themeToggleChecked: boolean = false;
  idioma: string = 'es';
  langs = [
    { label: 'Español', value: 'es' },
    { label: 'English', value: 'en' }
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private translateService: TranslateService  
  ) {
    const defaultLang = localStorage.getItem('lang') || 'es'; 
    this.idioma = defaultLang; 
    this.translateService.setDefaultLang(this.idioma);
    this.translateService.use(this.idioma);
  }

  changeLang(event: any) {
    const selectedLang = event.detail.value;
    this.translateService.use(selectedLang); 
    localStorage.setItem('lang', selectedLang);  
  }

  toggleTheme(event: any) {
    const prefersDark = event.detail.checked;
    this.themeToggleChecked = prefersDark;
    document.body.classList.toggle('dark', prefersDark);
    localStorage.setItem('theme', prefersDark ? 'dark' : 'light');  
  }

  ngOnInit(): void {
    this.user$ = this.authService.getUser();
    const prefersDark = localStorage.getItem('theme') === 'dark';
    this.themeToggleChecked = prefersDark;
    document.body.classList.toggle('dark', prefersDark);
  }
}