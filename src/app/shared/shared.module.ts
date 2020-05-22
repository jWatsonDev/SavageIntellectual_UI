import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { DisciplineFormComponent } from '../pages/edit-disciplines/discipline-form/discipline-form.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ReactiveFormsModule
    ],
    declarations: [
        DisciplineFormComponent
    ],
    exports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
        DisciplineFormComponent
    ],
    entryComponents: [
        DisciplineFormComponent
    ]
})
export class SharedModule { }
