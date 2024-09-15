import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormmascotaadopcionPage } from './formmascotaadopcion.page';

const routes: Routes = [
  {
    path: '',
    component: FormmascotaadopcionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormmascotaadopcionPageRoutingModule {}
