import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DissolvedOxygenSensorsPage } from './dissolved-oxygen-sensors.page';

const routes: Routes = [
  {
    path: '',
    component: DissolvedOxygenSensorsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DissolvedOxygenSensorsPageRoutingModule {}
