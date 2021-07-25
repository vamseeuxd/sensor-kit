import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DissolvedOxygenSensorsPageRoutingModule } from './dissolved-oxygen-sensors-routing.module';

import { DissolvedOxygenSensorsPage } from './dissolved-oxygen-sensors.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DissolvedOxygenSensorsPageRoutingModule
  ],
  declarations: [DissolvedOxygenSensorsPage]
})
export class DissolvedOxygenSensorsPageModule {}
