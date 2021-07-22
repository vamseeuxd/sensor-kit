import { AddProjectComponent } from './../components/add-project/add-project.component';
import { ProjectsService } from './../services/projects.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.scss'],
})
export class ProjectsPage implements OnInit {
  constructor(
    public projects: ProjectsService,
    private modalController: ModalController
  ) {}

  ngOnInit() {}

  async presentAddProjectModal() {
    const modal = await this.modalController.create({
      component: AddProjectComponent,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      presentingElement: await this.modalController.getTop(), // Get the top-most ion-modal
    });
    return await modal.present();
  }
}
