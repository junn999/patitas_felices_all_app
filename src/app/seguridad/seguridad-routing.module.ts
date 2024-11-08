import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeguridadPage } from './seguridad.page';

const routes: Routes = [
  {
    path: '',
    component: SeguridadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeguridadPageRoutingModule {}
