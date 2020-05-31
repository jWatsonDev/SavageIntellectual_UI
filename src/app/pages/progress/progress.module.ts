import { NgModule } from '@angular/core';
import { ProgressPageRoutingModule } from './progress-routing.module';

import { ProgressPage } from './progress.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    ProgressPageRoutingModule
  ],
  declarations: [ProgressPage]
})
export class ProgressPageModule {}
