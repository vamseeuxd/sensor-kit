import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AddProjectComponent } from './add-project/add-project.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'ngx-avatar';
import { NgPipesModule } from 'ngx-pipes';

@NgModule({
  declarations: [AddProjectComponent],
  imports: [CommonModule, FormsModule, IonicModule, AvatarModule, NgPipesModule],
  exports: [AddProjectComponent, AvatarModule, NgPipesModule],
  entryComponents: [AddProjectComponent],
})
export class ComponentsModule {}
