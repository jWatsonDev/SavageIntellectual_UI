import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditDisciplinesPage } from './edit-disciplines.page';

const routes: Routes = [
  {
    path: '',
    component: EditDisciplinesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditDisciplinesPageRoutingModule {}
