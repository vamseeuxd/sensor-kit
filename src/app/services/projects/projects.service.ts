import { BusyIndicatorService } from './../busy-indicator/busy-indicator.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import firebase from 'firebase/app';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface IProject {
  id?: string;
  name: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  uid?: string;
  createdOn?: number;
  modifiedOn?: number;
  deleted?: boolean;
}

export const PROJECTS_COLLECTION = 'projects';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  public uid = '';
  public user: firebase.User | null;
  private projectsAction: BehaviorSubject<IProject[]> = new BehaviorSubject([]);
  private userSubscription: Subscription | undefined;
  private getProductsSubscription: Subscription | undefined;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
    private busyIndicator: BusyIndicatorService,
    public snackBar: MatSnackBar
  ) {
    this.getUserDetails();
  }

  public getUserDetails(): void {
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
      }
    });
  }

  getProjectsList(): void {
    if (this.getProductsSubscription && !this.getProductsSubscription.closed) {
      this.getProductsSubscription.unsubscribe();
    }
    const getProjectsBusyIndicatorId =
      this.busyIndicator.show('getProjectsList()');
    this.getProductsSubscription = this.angularFirestore
      .collection<IProject>('projects', (ref) =>
        ref
          .where('deleted', '==', false)
          .where('uid', '==', this.uid)
          .orderBy('createdOn', 'desc')
      )
      .valueChanges({ idField: 'id' })
      .subscribe(
        (projects) => {
          this.projectsAction.next(projects);
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

  public getProjects(): Observable<IProject[]> {
    return this.projectsAction.asObservable();
  }
  public deleteProject(project: IProject): Promise<any> {
    return this.angularFirestore
      .collection(PROJECTS_COLLECTION)
      .doc(project.id)
      .update({ deleted: true });
  }
  public addProject(project: IProject): Promise<any> {
    return this.angularFirestore.collection(PROJECTS_COLLECTION).add(project);
    /* const addBusyIndicatorId = this.busyIndicator.show();
    this.angularFirestore
      .collection('projects')
      .add(project)
      .then(() => {
        this.busyIndicator.hide(addBusyIndicatorId);
        this.snackBar.open('New Project added Successfully', 'Project Added', {
          duration: 2000,
        });
      }); */
  }
}
