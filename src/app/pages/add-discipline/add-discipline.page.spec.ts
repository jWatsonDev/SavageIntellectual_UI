import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddDisciplinePage } from './add-discipline.page';

describe('AddDisciplinePage', () => {
  let component: AddDisciplinePage;
  let fixture: ComponentFixture<AddDisciplinePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDisciplinePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddDisciplinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
