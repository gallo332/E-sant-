import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedecinLayoutComponent } from './medecin-layout.component';

describe('MedecinLayoutComponent', () => {
  let component: MedecinLayoutComponent;
  let fixture: ComponentFixture<MedecinLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedecinLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedecinLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
