import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Discipline } from 'src/app/models/discipline';
import { AlertController } from '@ionic/angular';
import { Status } from 'src/app/models/status';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.page.html',
  styleUrls: ['./progress.page.scss'],
})
export class ProgressPage implements OnInit {

  progresses: any;
  disciplines: Array<Discipline>;

  constructor(
    private _dataService: DataService,
    private _alertController: AlertController
  ) { }

  ngOnInit() {
    this.getData();

  }

  async getData() {
    this.disciplines = await this._dataService.getDisciplinesByUsername().toPromise();
    this._dataService.getProgresses(this.disciplines).subscribe(res => {
      // console.log('progresses', res);
      this.progresses = res;
    }, error => {
      console.error(error);
    });
  }

  selectDiscipline($event) {
    console.log('parent', $event, this.convertToStatus($event));

    this.updateStatus(this.convertToStatus($event));
  }

  convertToStatus($event: any): Status {
    return {
      id: $event.statusId,
      disciplineId: $event.disciplineId,
      username: $event.username,
      date: $event.statusDate,
      complete: $event.status,
      name: $event.disciplineName
    };

  }


  async updateStatus(status: Status): Promise<any> {
    const alert = await this._alertController.create({
      header: 'Update Status',
      message: (status.complete) ?
        'So, you didn\'t complete this discipline?' :
        'Are you sure you completed this discipline? ',
      buttons: [
        {
          text: 'That\'s right!',
          handler: () => {
            // update complete to the opposite of current value
            status.complete = !status.complete;
            this._dataService.saveStatus(status).subscribe(d => {
              // TODO: Calling service for now
              // update to splice out data
              this._dataService.getProgresses(this.disciplines).subscribe(res => {
                this.progresses = res;
              });
            });
          }
        },
        {
          text: 'Not so much.',
          role: 'cancel',
          // cssClass: 'custom-alert',
          handler: () => {
            // console.log('Cancelled.');
          }
        }
      ]
    });

    await alert.present();
  }


}
