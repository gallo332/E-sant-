import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierMenuComponent } from './dossier-menu.component';

describe('DossierMenuComponent', () => {
  let component: DossierMenuComponent;
  let fixture: ComponentFixture<DossierMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DossierMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DossierMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
