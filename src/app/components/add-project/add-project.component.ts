import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BusyIndicatorService } from './../../services/busy-indicator/busy-indicator.service';
import { ProjectsService, IProject } from './../../services/projects/projects.service';
import { IonInput, ModalController } from '@ionic/angular';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import firebase from 'firebase/app';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss'],
})
export class AddProjectComponent implements OnInit, AfterViewInit {
  @ViewChild('projectName', { static: true }) projectName: IonInput;
  data: IProject;
  constructor(
    public projects: ProjectsService,
    private modalController: ModalController,
    private busyIndicator: BusyIndicatorService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.projectName.setFocus();
    }, 500);
  }

  addProject(form: NgForm) {
    const addBusyIndicatorId = this.busyIndicator.show();
    this.projects
      .addProject({
        ...form.value,
        uid: this.projects.uid,
        deleted: false,
        createdOn: firebase.firestore.Timestamp.now().seconds * 1000,
        modifiedOn: firebase.firestore.Timestamp.now().seconds * 1000,
      })
      .then(
        () => {
          this.busyIndicator.hide(addBusyIndicatorId);
          form.resetForm({});
          this.snackBar.open('New Project added Successfully', 'Project Added', {duration: 2000,});
          this.dismiss();
        },
        (error) => {
          this.snackBar.open('Error while Adding Project (' + error.message + ')','Error',{ duration: 4000 });
          this.busyIndicator.hide(addBusyIndicatorId);
        }
      );
  }

  updateProject(form: NgForm) {
    const addBusyIndicatorId = this.busyIndicator.show();
    this.projects
      .updateProject({
        ...form.value,
        id:this.data.id,
        uid: this.data.uid,
        deleted: false,
        modifiedOn: firebase.firestore.Timestamp.now().seconds * 1000,
      })
      .then(
        () => {
          this.busyIndicator.hide(addBusyIndicatorId);
          form.resetForm({});
          this.snackBar.open('Project updated Successfully', 'Project Updated', {duration: 2000,});
          this.dismiss();
        },
        (error) => {
          this.snackBar.open('Error while Updating Project (' + error.message + ')','Error',{ duration: 4000 });
          this.busyIndicator.hide(addBusyIndicatorId);
        }
      );
  }
}
