import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DhanaApprovalComponent } from './dhana-approval.component';

describe('DhanaApprovalComponent', () => {
  let component: DhanaApprovalComponent;
  let fixture: ComponentFixture<DhanaApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DhanaApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DhanaApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
