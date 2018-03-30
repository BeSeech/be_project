import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatesEditFormComponent } from './states-edit-form.component';

describe('StatesEditFormComponent', () => {
  let component: StatesEditFormComponent;
  let fixture: ComponentFixture<StatesEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatesEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatesEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
