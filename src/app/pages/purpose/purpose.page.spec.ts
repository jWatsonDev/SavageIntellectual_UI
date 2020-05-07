import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PurposePage } from './purpose.page';

describe('PurposePage', () => {
  let component: PurposePage;
  let fixture: ComponentFixture<PurposePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurposePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PurposePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
