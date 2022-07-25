import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedecinLoginComponent } from './medecin.component';

describe('MedecinComponentComponent', () => {
  let component: MedecinLoginComponent;
  let fixture: ComponentFixture<MedecinLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedecinLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedecinLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
