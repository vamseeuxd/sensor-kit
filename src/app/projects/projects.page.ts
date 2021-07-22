import { ProjectsService } from './../services/projects/projects.service';
import { AddProjectComponent } from './../components/add-project/add-project.component';
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

  ngOnInit() {
    // this.presentAddProjectModal();
  }

  async presentAddProjectModal() {
    const modal = await this.modalController.create({
      component: AddProjectComponent,
      cssClass: 'app-projects',
      swipeToClose: true,
      presentingElement: await this.modalController.getTop(), // Get the top-most ion-modal
    });
    return await modal.present();
  }
}
