import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedecineBoardComponent } from './medecine-board.component';

describe('MedecineBoardComponent', () => {
  let component: MedecineBoardComponent;
  let fixture: ComponentFixture<MedecineBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedecineBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedecineBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
