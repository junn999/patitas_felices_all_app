import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-formulariosmascotas',
  templateUrl: './formulariosmascotas.page.html',
  styleUrls: ['./formulariosmascotas.page.scss'],
})
export class FormulariosmascotasPage implements OnInit {
  formMascotaPerdidaText: string = '';
  formMascotaAdopcionText: string = '';

  constructor(private router: Router, private translateService: TranslateService) { 
    const defaultLang = localStorage.getItem('lang') || 'es';
    this.translateService.setDefaultLang(defaultLang);
    this.translateService.use(defaultLang);
  }

  ngOnInit() {
    
    this.translateService.get('form.mascotaPerdida').subscribe((res: string) => {
      this.formMascotaPerdidaText = res;
    });

    this.translateService.get('form.mascotaAdopcion').subscribe((res: string) => {
      this.formMascotaAdopcionText = res;
    });
  }

  formmascotaperdida() {
    this.router.navigate(['/formmascotaperdida']);
  }

  formmascotaadopcion() {
    this.router.navigate(['/formmascotaadopcion']);
  }

}