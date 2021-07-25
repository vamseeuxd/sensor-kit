import { MatSnackBar } from '@angular/material/snack-bar';
import { BusyIndicatorService } from './../services/busy-indicator/busy-indicator.service';
import { ModalController } from '@ionic/angular';
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
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.activatedroute.paramMap.subscribe((params) => {
      this.projectId = params.get('projectId');
      this.projects.setSelectedProject(this.projectId);
    });
  }

  addPond(projectId) {
    const addBusyIndicatorId = this.busyIndicator.show();
    this.projects
      .addPond({
        name: 'Test 002',
        uid: this.projects.uid,
        projectId,
        deleted: false,
        createdOn: firebase.firestore.Timestamp.now().seconds * 1000,
        modifiedOn: firebase.firestore.Timestamp.now().seconds * 1000,
      })
      .then(
        () => {
          this.busyIndicator.hide(addBusyIndicatorId);
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
