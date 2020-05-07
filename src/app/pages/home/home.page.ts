import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public form = [
    { val: 'Devotional', isChecked: true },
    { val: 'Workout', isChecked: false },
    { val: 'Read 10 pages', isChecked: false }
  ];

  constructor() { }

  ngOnInit() {
  }

}
