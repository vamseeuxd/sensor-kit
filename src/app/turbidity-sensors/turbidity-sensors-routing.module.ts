import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TurbiditySensorsPage } from './turbidity-sensors.page';

const routes: Routes = [
  {
    path: '',
    component: TurbiditySensorsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TurbiditySensorsPageRoutingModule {}
