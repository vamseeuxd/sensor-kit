import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TDSSensorsPageRoutingModule } from './tdssensors-routing.module';

import { TDSSensorsPage } from './tdssensors.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TDSSensorsPageRoutingModule
  ],
  declarations: [TDSSensorsPage]
})
export class TDSSensorsPageModule {}
