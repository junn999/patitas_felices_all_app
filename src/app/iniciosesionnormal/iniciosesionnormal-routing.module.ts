import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioSesionNormalPage } from './iniciosesionnormal.page';

const routes: Routes = [
  {
    path: '',
    component: InicioSesionNormalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioSesionNormalPageRoutingModule {}
