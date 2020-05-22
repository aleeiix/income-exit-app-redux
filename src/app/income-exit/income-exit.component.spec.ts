import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeExitComponent } from './income-exit.component';

describe('IncomeExitComponent', () => {
  let component: IncomeExitComponent;
  let fixture: ComponentFixture<IncomeExitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomeExitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeExitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
