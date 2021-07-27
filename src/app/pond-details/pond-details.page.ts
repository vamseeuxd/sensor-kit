import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pond-details',
  templateUrl: './pond-details.page.html',
  styleUrls: ['./pond-details.page.scss'],
})
export class PondDetailsPage implements OnInit {
  selectedDate = new Date();
  constructor() {}

  ngOnInit() {}
}
