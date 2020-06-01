import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Discipline } from 'src/app/models/discipline';
import { CATEGORY_LIST } from 'src/app/helpers/config/category';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-discipline-form',
  templateUrl: './discipline-form.component.html',
  styleUrls: ['./discipline-form.component.scss'],
})
export class DisciplineFormComponent implements OnInit {

  @Input() discipline: Discipline;
  categories = CATEGORY_LIST;

  disciplineForm = new FormGroup({
    name: new FormControl([], Validators.required),
    description: new FormControl(''),
    category: new FormControl([], [Validators.required])
  });

  constructor(
    private _dataService: DataService,
    private _modalController: ModalController
  ) { }

  ngOnInit() {
    if (this.discipline) {
      console.log('discipline form', this.discipline);
      this.disciplineForm.patchValue(this.discipline);
    }
  }

  onSubmit() {
    if (this.discipline) {
      // Update 
      Object.keys(this.disciplineForm.controls).forEach(key => {
        this.discipline[key] = this.disciplineForm.get(key).value;
      });
    } else {
      // Create
      this.discipline = this.disciplineForm.value;
    }
    console.log(this.discipline)
    this._dataService.createDiscipline(this.discipline).subscribe(res => {
      console.log(res);
    });
  }

  cancel() {
    this._modalController.dismiss();
  }
}
