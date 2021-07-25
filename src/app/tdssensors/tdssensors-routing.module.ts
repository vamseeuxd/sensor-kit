import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TDSSensorsPage } from './tdssensors.page';

const routes: Routes = [
  {
    path: '',
    component: TDSSensorsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TDSSensorsPageRoutingModule {}
