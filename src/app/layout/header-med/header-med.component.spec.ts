import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMedComponent } from './header-med.component';

describe('HeaderMedComponent', () => {
  let component: HeaderMedComponent;
  let fixture: ComponentFixture<HeaderMedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderMedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderMedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
