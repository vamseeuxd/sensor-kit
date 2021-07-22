import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhSensorsPage } from './ph-sensors.page';

const routes: Routes = [
  {
    path: '',
    component: PhSensorsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhSensorsPageRoutingModule {}
