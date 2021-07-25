import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TurbiditySensorsPageRoutingModule } from './turbidity-sensors-routing.module';

import { TurbiditySensorsPage } from './turbidity-sensors.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TurbiditySensorsPageRoutingModule
  ],
  declarations: [TurbiditySensorsPage]
})
export class TurbiditySensorsPageModule {}
