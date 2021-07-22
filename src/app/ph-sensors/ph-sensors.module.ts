import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhSensorsPageRoutingModule } from './ph-sensors-routing.module';

import { PhSensorsPage } from './ph-sensors.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhSensorsPageRoutingModule
  ],
  declarations: [PhSensorsPage]
})
export class PhSensorsPageModule {}
