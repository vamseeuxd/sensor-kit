import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PondsPageRoutingModule } from './ponds-routing.module';

import { PondsPage } from './ponds.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PondsPageRoutingModule
  ],
  declarations: [PondsPage]
})
export class PondsPageModule {}
