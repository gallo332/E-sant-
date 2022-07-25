import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartageDocComponent } from './partage-doc.component';

describe('PartageDocComponent', () => {
  let component: PartageDocComponent;
  let fixture: ComponentFixture<PartageDocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartageDocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartageDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
