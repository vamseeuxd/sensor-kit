import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AddProjectComponent } from './add-project/add-project.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AddProjectComponent],
  imports: [CommonModule, FormsModule, IonicModule],
  exports: [AddProjectComponent],
  entryComponents: [AddProjectComponent],
})
export class ComponentsModule {}
