import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormulariosmascotasPage } from './formulariosmascotas.page';

const routes: Routes = [
  {
    path: '',
    component: FormulariosmascotasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormulariosmascotasPageRoutingModule {}
