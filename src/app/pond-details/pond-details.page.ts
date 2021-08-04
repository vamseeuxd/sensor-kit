import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ProjectsService } from './../services/projects/projects.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pond-details',
  templateUrl: './pond-details.page.html',
  styleUrls: ['./pond-details.page.scss'],
})
export class PondDetailsPage implements OnInit {
  pondId$ = new BehaviorSubject<string>('');
  selectedDate = new Date();
  pondDetails$ = this.pondId$.pipe(switchMap((pondId) => this.afs.doc('ponds/' + pondId).valueChanges()));
  constructor(
    private activatedroute: ActivatedRoute,
    public projects: ProjectsService,
    public afs: AngularFirestore
  ) {}

  ngOnInit() {
    this.activatedroute.paramMap.subscribe((params) => {
      this.pondId$.next(params.get('id'));
    });
  }
}
