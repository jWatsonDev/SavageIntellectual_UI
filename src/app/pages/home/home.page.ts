import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

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

  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this.getDisciplinesByUsername();
  }

  getDisciplinesByUsername() {
    this._dataService.getDisciplinesByUsername().subscribe(res => {
      console.log(res);
    });
  }

}
