import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Discipline } from 'src/app/models/discipline';
import { ModalController, AlertController } from '@ionic/angular';
import { DisciplineFormComponent } from './discipline-form/discipline-form.component';

@Component({
  selector: 'app-edit-disciplines',
  templateUrl: './edit-disciplines.page.html',
  styleUrls: ['./edit-disciplines.page.scss'],
})
export class EditDisciplinesPage implements OnInit {

  disciplines: Array<Discipline>;

  constructor(
    private _dataService: DataService,
    private _modalController: ModalController,
    private _alertController: AlertController) { }

  ngOnInit() {

    this._dataService.getDisciplinesByUsername().subscribe(d => this.disciplines = d);
  }

  async edit(discipline) {
    // Show modal
    const modal = await this._modalController.create({
      component: DisciplineFormComponent,
      componentProps: {
        'discipline': discipline,
      }
    });
    modal.present();

    // Get returned data
    const { data } = await modal.onWillDismiss();
    // console.log('a parent knows his child', data)
    // only set userRating if data emission from child is valid
    //if (data) this.var = data;
  }

  async create() {
    // Show modal
    const modal = await this._modalController.create({
      component: DisciplineFormComponent,
      componentProps: {
        'discipline': null,
      }
    });
    modal.present();

    // Get returned data
    const { data } = await modal.onWillDismiss();
    // console.log('a parent knows his child', data)
    // only set userRating if data emission from child is valid
    //if (data) this.var = data;
  }


  async delete(discipline: Discipline): Promise<any> {
    const alert = await this._alertController.create({
      header: 'Delete Discipline',
      message:
        'Are you sure you want to delete this Discipline? ',
      buttons: [
        {
          text: 'Delete',
          handler: () => {
            console.log('delete', discipline);

          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          // cssClass: 'secondary',
          handler: () => {
            // console.log('Cancelled delete.');
          }
        }
      ]
    });
    await alert.present();
  }

}
