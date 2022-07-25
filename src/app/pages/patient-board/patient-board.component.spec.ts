import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientBoardComponent } from './patient-board.component';

describe('PatientBoardComponent', () => {
  let component: PatientBoardComponent;
  let fixture: ComponentFixture<PatientBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
