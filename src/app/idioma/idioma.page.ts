import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-idioma',
  templateUrl: './idioma.page.html',
  styleUrls: ['./idioma.page.scss'],
})
export class IdiomaPage implements OnInit {
  idioma: string = 'es';
  langs = [
    { label: 'Español', value: 'es' },
    { label: 'English', value: 'en' }
  ];

  constructor(private translate: TranslateService) {
    const defaultLang = localStorage.getItem('lang') || 'es';
    this.idioma = defaultLang;
    this.translate.setDefaultLang(this.idioma);
    this.translate.use(this.idioma);
  }
  ngOnInit() {
  }

  changeLang(event: any) {
    const selectedLang = event.detail.value;
    this.translate.use(selectedLang);
    localStorage.setItem('lang', selectedLang);
  }

}