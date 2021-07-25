import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TemperatureSensorsPage } from './temperature-sensors.page';

const routes: Routes = [
  {
    path: '',
    component: TemperatureSensorsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TemperatureSensorsPageRoutingModule {}
