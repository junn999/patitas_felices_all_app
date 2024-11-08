import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CambiocontraPage } from './cambiocontra.page';

const routes: Routes = [
  {
    path: '',
    component: CambiocontraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CambiocontraPageRoutingModule {}
