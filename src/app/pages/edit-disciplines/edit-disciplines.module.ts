import { NgModule } from '@angular/core';
import { EditDisciplinesPageRoutingModule } from './edit-disciplines-routing.module';

import { EditDisciplinesPage } from './edit-disciplines.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    EditDisciplinesPageRoutingModule
  ],
  declarations: [EditDisciplinesPage]
})
export class EditDisciplinesPageModule {}
