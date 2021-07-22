import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PondsPage } from './ponds.page';

const routes: Routes = [
  {
    path: '',
    component: PondsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PondsPageRoutingModule {}
