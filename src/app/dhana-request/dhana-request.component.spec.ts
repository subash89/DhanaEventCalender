import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DhanaRequestComponent } from './dhana-request.component';

describe('DhanaRequestComponent', () => {
  let component: DhanaRequestComponent;
  let fixture: ComponentFixture<DhanaRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DhanaRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DhanaRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
