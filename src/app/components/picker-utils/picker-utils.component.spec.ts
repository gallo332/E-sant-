import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickerUtilsComponent } from './picker-utils.component';

describe('PickerUtilsComponent', () => {
  let component: PickerUtilsComponent;
  let fixture: ComponentFixture<PickerUtilsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickerUtilsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickerUtilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
