import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulariosmascotas',
  templateUrl: './formulariosmascotas.page.html',
  styleUrls: ['./formulariosmascotas.page.scss'],
})
export class FormulariosmascotasPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  // Método para navegar a la página de reportar mascota perdida
  formmascotaperdida() {
    this.router.navigate(['/formmascotaperdida']);
  }

  // Método para navegar a la página de dar mascota en adopción
  formmascotaadopcion() {
    this.router.navigate(['/formmascotaadopcion']);
  }

}
