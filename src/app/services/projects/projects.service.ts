import { Router } from '@angular/router';
import { BusyIndicatorService } from './../busy-indicator/busy-indicator.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import firebase from 'firebase/app';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface IPond {
  id?: string;
  name: string;
  projectId: string;
  uid?: string;
  createdOn?: number;
  modifiedOn?: number;
  deleted?: boolean;
}
export interface IProject {
  id?: string;
  name: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
  uid?: string;
  createdOn?: number;
  modifiedOn?: number;
  deleted?: boolean;
  ponds?: IPond[];
}

export const PROJECTS_COLLECTION = 'projects';
export const PONDS_COLLECTION = 'ponds';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  public uid = '';
  public user: firebase.User | null;
  private projectsAction: BehaviorSubject<IProject[]> = new BehaviorSubject([]);
  private selectedProjectId: BehaviorSubject<string> = new BehaviorSubject('');
  private selectedProject: BehaviorSubject<IProject | null> =
    new BehaviorSubject(null);
  private userSubscription: Subscription | undefined;
  private getProductsSubscription: Subscription | undefined;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
    private busyIndicator: BusyIndicatorService,
    private router: Router,
    public snackBar: MatSnackBar
  ) {
    this.getUserDetails();
  }

  public setSelectedProject(projectId: string): void {
    this.selectedProjectId.next(projectId);
    this.selectedProject.next(
      this.projectsAction.value.find((project) => project.id === projectId)
    );
  }

  public getSelectedProject(): Observable<IProject> {
    return this.selectedProject.asObservable();
  }

  public getProjectById(projectId: string): IProject {
    return this.projectsAction.value.find(
      (project) => project.id === projectId
    );
  }

  public getProjects(): Observable<IProject[]> {
    return this.projectsAction.asObservable();
  }

  public deleteProject(project: IProject): Promise<any> {
    return this.angularFirestore
      .collection(PROJECTS_COLLECTION)
      .doc(project.id)
      .update({ deleted: true });
  }

  public deletePond(pond: IPond): Promise<any> {
    return this.angularFirestore
      .collection(PONDS_COLLECTION)
      .doc(pond.id)
      .update({ deleted: true });
  }

  public addProject(project: IProject): Promise<any> {
    return this.angularFirestore.collection(PROJECTS_COLLECTION).add(project);
  }

  public addPond(pond: IPond): Promise<any> {
    return this.angularFirestore.collection(PONDS_COLLECTION).add(pond);
  }

  public updatePond(pond: IPond): Promise<any> {
    return this.angularFirestore
      .collection(PONDS_COLLECTION)
      .doc(pond.id)
      .update(pond);
  }

  public updateProject(project: IProject): Promise<any> {
    return this.angularFirestore
      .collection(PROJECTS_COLLECTION)
      .doc(project.id)
      .update(project);
  }

  private getUserDetails(): void {
    if (this.userSubscription && !this.userSubscription.closed) {
      this.userSubscription.unsubscribe();
    }
    const userBusyIndicatorId = this.busyIndicator.show('getUserDetails()');
    this.userSubscription = this.angularFireAuth.user.subscribe((user) => {
      if (user) {
        this.user = user;
        this.uid = user.uid;
        setTimeout(() => {
          this.busyIndicator.hide(userBusyIndicatorId);
          this.getProjectsList();
        }, 200);
      } else {
        this.router.navigate(['login']);
      }
    });
  }

  private getProjectsList(): void {
    if (this.getProductsSubscription && !this.getProductsSubscription.closed) {
      this.getProductsSubscription.unsubscribe();
    }
    const getProjectsBusyIndicatorId =
      this.busyIndicator.show('getProjectsList()');
    const query = (ref) =>
      ref
        .where('deleted', '==', false)
        .where('uid', '==', this.uid)
        .orderBy('createdOn', 'desc');

    const projectCollection = this.angularFirestore
      .collection<IProject>(PROJECTS_COLLECTION, query)
      .valueChanges({ idField: 'id' });

    const pondsCollection = this.angularFirestore
      .collection<IPond>(PONDS_COLLECTION, query)
      .valueChanges({ idField: 'id' });

    combineLatest([projectCollection, pondsCollection]).subscribe(
      ([projects, ponds]) => {
        projects.forEach((project) => {
          project.ponds = ponds.filter((pond) => pond.projectId === project.id);
        });
        this.projectsAction.next(projects);
        this.setSelectedProject(this.selectedProjectId.value);
        setTimeout(() => {
          this.busyIndicator.hide(getProjectsBusyIndicatorId);
        }, 200);
      },
      (error) => {
        this.snackBar.open(
          'Error while getting Projects List (' + error.message + ')',
          'Error',
          { duration: 4000 }
        );
        this.busyIndicator.hide(getProjectsBusyIndicatorId);
      }
    );
  }
}
