import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddDisciplinePageRoutingModule } from './add-discipline-routing.module';

import { AddDisciplinePage } from './add-discipline.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    AddDisciplinePageRoutingModule,
    SharedModule
  ],
  declarations: [AddDisciplinePage]
})
export class AddDisciplinePageModule {}
