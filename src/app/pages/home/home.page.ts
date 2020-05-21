import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Status } from 'src/app/models/status';
import { forkJoin } from 'rxjs';
import { Discipline } from 'src/app/models/discipline';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  disciplines: Array<Discipline>;
  statuses: Array<Status>;
  statusDisciplines: Array<Status>;

  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this.getDisciplinesAndStatuses();
  }

  getDisciplinesAndStatuses() {
    const today = new Date().toISOString().slice(0, 10);
    forkJoin(
      this._dataService.getDisciplinesByUsername(),
      this._dataService.getStatusesByUsernameAndDate(today)
    ).subscribe(res => {
      this.disciplines = res[0];
      this.statuses = res[1];
      console.log(res);
      this.buildStatusDisciplines();
    });
  }

  buildStatusDisciplines() {
    this.statusDisciplines = [];
    this.disciplines.forEach(discipline => {
      let status: Status;
      status = this.statuses.find(s => s.disciplineId === discipline.id);
      // console.log('status', status, discipline.id)
      if (status) {
        status.name = discipline.name;
      } else {
        status = {
          name: discipline.name,
          disciplineId: discipline.id,
          complete: false,
          date: new Date(),
          username: discipline.username
        };
      }
      this.statusDisciplines.push(status);
    });
  }

  valueChanged(discipline) {
    console.log(discipline);
    this._dataService.saveStatus(discipline).subscribe(res => {
      console.log(res);
    });
  }

}
