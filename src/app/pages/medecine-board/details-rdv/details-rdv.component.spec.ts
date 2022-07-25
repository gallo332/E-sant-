import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsRdvComponent } from './details-rdv.component';

describe('DetailsRdvComponent', () => {
  let component: DetailsRdvComponent;
  let fixture: ComponentFixture<DetailsRdvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsRdvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsRdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
