import { MatSnackBar } from '@angular/material/snack-bar';
import { BusyIndicatorService } from './../services/busy-indicator/busy-indicator.service';
import {
  ProjectsService,
  IProject,
} from './../services/projects/projects.service';
import { AddProjectComponent } from './../components/add-project/add-project.component';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.scss'],
})
export class ProjectsPage implements OnInit {
  constructor(
    public projects: ProjectsService,
    private modalController: ModalController,
    private busyIndicator: BusyIndicatorService,
    public snackBar: MatSnackBar,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    // this.presentAddProjectModal();
  }

  async presentAddProjectModal(data: IProject) {
    const modal = await this.modalController.create({
      component: AddProjectComponent,
      cssClass: 'app-projects',
      swipeToClose: true,
      componentProps: {
        data,
      },
      presentingElement: await this.modalController.getTop(), // Get the top-most ion-modal
    });
    return await modal.present();
  }

  async deleteProject(project: IProject) {
    const alert = await this.alertController.create({
      header: 'Delete Confirmation!',
      message: 'Are you sure! Do you want to Delete Project?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Yes',
          handler: async () => {
            console.log('Confirm Okay');
            const userBusyIndicatorId = this.busyIndicator.show();
            try {
              await this.projects.deleteProject(project);
              this.snackBar.open(
                'Project deleted Successfully',
                'Project Deleted',
                {
                  duration: 2000,
                }
              );
              this.busyIndicator.hide(userBusyIndicatorId);
            } catch (e) {
              this.snackBar.open(
                'Error while getting Projects List (' + e.message + ')',
                'Error',
                { duration: 4000 }
              );
              this.busyIndicator.hide(userBusyIndicatorId);
            }
            /* const userBusyIndicatorId = this.busyIndicator.show();
            this.busyIndicator.hide(userBusyIndicatorId); */
          },
        },
      ],
    });

    await alert.present();
  }
}
