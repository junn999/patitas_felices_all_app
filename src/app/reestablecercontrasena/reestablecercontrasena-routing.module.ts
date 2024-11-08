import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReestablecercontrasenaPage } from './reestablecercontrasena.page';

const routes: Routes = [
  {
    path: '',
    component: ReestablecercontrasenaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReestablecercontrasenaPageRoutingModule {}
