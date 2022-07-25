import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDoctorsComponent } from './card-doctors.component';

describe('CardDoctorsComponent', () => {
  let component: CardDoctorsComponent;
  let fixture: ComponentFixture<CardDoctorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardDoctorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
