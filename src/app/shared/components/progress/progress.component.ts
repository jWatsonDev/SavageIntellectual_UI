import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-progress-scroll',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
})
export class ProgressComponent implements OnInit {

  @Input() data;
  @Output() selectDiscipline: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private _dataService: DataService
  ) { }

  ngOnInit() {}

  viewDetails(p) {
    this.selectDiscipline.emit(p);
  }

}
