import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormmascotaperdidaPage } from './formmascotaperdida.page';

const routes: Routes = [
  {
    path: '',
    component: FormmascotaperdidaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormmascotaperdidaPageRoutingModule {}
