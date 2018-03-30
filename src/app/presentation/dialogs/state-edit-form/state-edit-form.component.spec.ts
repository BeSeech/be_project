import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateEditFormComponent } from './state-edit-form.component';

describe('StateEditFormComponent', () => {
  let component: StateEditFormComponent;
  let fixture: ComponentFixture<StateEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
