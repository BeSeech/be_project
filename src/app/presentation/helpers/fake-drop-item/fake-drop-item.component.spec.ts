import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FakeDropItemComponent } from './fake-drop-item.component';

describe('FakeDropItemComponent', () => {
  let component: FakeDropItemComponent;
  let fixture: ComponentFixture<FakeDropItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FakeDropItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FakeDropItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
