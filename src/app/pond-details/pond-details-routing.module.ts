import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PondDetailsPage } from './pond-details.page';

const routes: Routes = [
  {
    path: '',
    component: PondDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PondDetailsPageRoutingModule {}
