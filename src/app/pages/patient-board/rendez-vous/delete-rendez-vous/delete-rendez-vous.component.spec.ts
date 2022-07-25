import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRendezVousComponent } from './delete-rendez-vous.component';

describe('DeleteRendezVousComponent', () => {
  let component: DeleteRendezVousComponent;
  let fixture: ComponentFixture<DeleteRendezVousComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteRendezVousComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteRendezVousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
