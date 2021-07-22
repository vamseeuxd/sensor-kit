import { IonInput, ModalController } from '@ionic/angular';
import { ProjectsService } from './../../services/projects.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss'],
})
export class AddProjectComponent implements OnInit, AfterViewInit {
  @ViewChild('projectName', { static: true }) projectName: IonInput;

  constructor(
    public projects: ProjectsService,
    private modalController: ModalController
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
}
