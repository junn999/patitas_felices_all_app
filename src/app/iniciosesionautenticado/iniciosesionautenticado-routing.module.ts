import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IniciosesionautenticadoPage } from './iniciosesionautenticado.page';

const routes: Routes = [
  {
    path: '',
    component: IniciosesionautenticadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IniciosesionautenticadoPageRoutingModule {}
