import { MatSnackBar } from '@angular/material/snack-bar';
import { BusyIndicatorService } from './../services/busy-indicator/busy-indicator.service';
import { ModalController, AlertController } from '@ionic/angular';
import {
  IPond,
  IProject,
  ProjectsService,
} from './../services/projects/projects.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';

@Component({
  selector: 'app-ponds',
  templateUrl: './ponds.page.html',
  styleUrls: ['./ponds.page.scss'],
})
export class PondsPage implements OnInit {
  projectId = '';
  constructor(
    private activatedroute: ActivatedRoute,
    public projects: ProjectsService,
    private modalController: ModalController,
    private busyIndicator: BusyIndicatorService,
    public alertController: AlertController,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.activatedroute.paramMap.subscribe((params) => {
      this.projectId = params.get('projectId');
      this.projects.setSelectedProject(this.projectId);
    });
  }

  async addOrUpdatePondAlert(selectedProject: IProject, pond: IPond = null) {
    const alert = await this.alertController.create({
      /* header: `Add New Pond in '${selectedProject.name}'`, */
      header: pond ? `Update Pond Name` : `Add New Pond`,
      message: 'Pond Name required minmimum 3 Charectors',
      inputs: [
        {
          name: 'pondName',
          type: 'text',
          value: pond ? pond.name : '',
          placeholder: 'Pond Name',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            // console.log('Confirm Cancel');
          },
        },
        {
          text: 'Ok',
          handler: ({ pondName }) => {
            if (pondName && pondName.trim().length > 0) {
              if (pond) {
                this.updatePond(selectedProject, pondName, pond, alert);
              } else {
                this.addNewPond(selectedProject, pondName, alert);
              }
            }
            return false;
          },
        },
      ],
    });
    await alert.present();
  }

  addNewPond(selectedProject: IProject, pondName, alert) {
    const addBusyIndicatorId = this.busyIndicator.show();
    this.projects
      .addPond({
        name: pondName,
        uid: this.projects.uid,
        projectId: selectedProject.id,
        deleted: false,
        createdOn: firebase.firestore.Timestamp.now().seconds * 1000,
        modifiedOn: firebase.firestore.Timestamp.now().seconds * 1000,
      })
      .then(
        async () => {
          this.busyIndicator.hide(addBusyIndicatorId);
          await alert.dismiss();
          this.snackBar.open('New Pond added Successfully', 'Pond Added', {
            duration: 2000,
          });
        },
        (error) => {
          this.snackBar.open(
            'Error while Adding Pond (' + error.message + ')',
            'Error',
            { duration: 4000 }
          );
          this.busyIndicator.hide(addBusyIndicatorId);
        }
      );
  }

  updatePond(selectedProject: IProject, pondName, pond: IPond, alert) {
    const addBusyIndicatorId = this.busyIndicator.show();
    this.projects
      .updatePond({
        name: pondName,
        uid: this.projects.uid,
        projectId: selectedProject.id,
        id: pond.id,
        deleted: false,
        modifiedOn: firebase.firestore.Timestamp.now().seconds * 1000,
      })
      .then(
        async () => {
          this.busyIndicator.hide(addBusyIndicatorId);
          await alert.dismiss();
          this.snackBar.open('Pond name updated Successfully', 'Pond Updated', {
            duration: 2000,
          });
        },
        (error) => {
          this.snackBar.open(
            'Error while Updating Pond (' + error.message + ')',
            'Error',
            { duration: 4000 }
          );
          this.busyIndicator.hide(addBusyIndicatorId);
        }
      );
  }

  async deletePond(pond: IPond) {
    const alert = await this.alertController.create({
      header: 'Delete Confirmation!',
      message: 'Are you sure! Do you want to Delete Pond?',
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
              await this.projects.deletePond(pond);
              this.snackBar.open(
                'Pond deleted Successfully',
                'Pond Deleted',
                {
                  duration: 2000,
                }
              );
              this.busyIndicator.hide(userBusyIndicatorId);
            } catch (e) {
              this.snackBar.open(
                'Error while deleteing Pond from Project (' + e.message + ')',
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
