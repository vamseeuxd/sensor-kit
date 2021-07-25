import { MatSnackBar } from '@angular/material/snack-bar';
import { BusyIndicatorService } from './../services/busy-indicator/busy-indicator.service';
import { ModalController, AlertController } from '@ionic/angular';
import {
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
  selectedProject: IProject;
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

  async addPond(projectId) {
    const alert = await this.alertController.create({
      header: 'Add Pond in Project',
      message:'Pond Name required minmimum 3 Charectors',
      inputs: [
        {
          name: 'pondName',
          type: 'text',
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
              this.addPond1(projectId, pondName, alert);
            }
            return false;
          },
        },
      ],
    });
    await alert.present();
  }

  addPond1(projectId, pondName, alert) {
    const addBusyIndicatorId = this.busyIndicator.show();
    this.projects
      .addPond({
        name: pondName,
        uid: this.projects.uid,
        projectId,
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
}
