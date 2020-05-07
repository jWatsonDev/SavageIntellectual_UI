import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddDisciplinePage } from './add-discipline.page';

const routes: Routes = [
  {
    path: '',
    component: AddDisciplinePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddDisciplinePageRoutingModule {}
