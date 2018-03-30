import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateListItemComponent } from './state-list-item.component';

describe('StateListItemComponent', () => {
  let component: StateListItemComponent;
  let fixture: ComponentFixture<StateListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
