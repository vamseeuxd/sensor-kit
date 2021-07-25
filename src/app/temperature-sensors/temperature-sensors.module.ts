import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TemperatureSensorsPageRoutingModule } from './temperature-sensors-routing.module';

import { TemperatureSensorsPage } from './temperature-sensors.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TemperatureSensorsPageRoutingModule
  ],
  declarations: [TemperatureSensorsPage]
})
export class TemperatureSensorsPageModule {}
