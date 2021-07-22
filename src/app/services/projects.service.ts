import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

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

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private projectsAction: BehaviorSubject<IProject[]> = new BehaviorSubject([]);
  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
  ) {}
  public getProjects(): Observable<IProject[]> {
    return this.projectsAction.asObservable();
  }
  public addProject(value: IProject) {
    this.projectsAction.next([...this.projectsAction.value, value]);
  }
}
