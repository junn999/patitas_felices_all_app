import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TemapPage } from './temap.page';

const routes: Routes = [
  {
    path: '',
    component: TemapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TemapPageRoutingModule {}
