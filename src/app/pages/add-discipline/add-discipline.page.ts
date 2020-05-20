import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-discipline',
  templateUrl: './add-discipline.page.html',
  styleUrls: ['./add-discipline.page.scss'],
})
export class AddDisciplinePage implements OnInit {

  disciplineForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
  });

  constructor(
    private _dataService: DataService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.disciplineForm.value);
    this._dataService.createDiscipline(this.disciplineForm.value).subscribe(res => {
      console.log(res);
    });
  }

}
