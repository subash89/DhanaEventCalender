import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDhanaComponent } from './add-dhana.component';

describe('AddDhanaComponent', () => {
  let component: AddDhanaComponent;
  let fixture: ComponentFixture<AddDhanaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDhanaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDhanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
