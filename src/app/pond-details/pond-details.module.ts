import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PondDetailsPageRoutingModule } from './pond-details-routing.module';

import { PondDetailsPage } from './pond-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PondDetailsPageRoutingModule
  ],
  declarations: [PondDetailsPage]
})
export class PondDetailsPageModule {}
