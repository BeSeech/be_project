import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingIndicatorComponent } from './waiting-indicator.component';

describe('WaitingIndicatorComponent', () => {
  let component: WaitingIndicatorComponent;
  let fixture: ComponentFixture<WaitingIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitingIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
