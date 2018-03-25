import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SateListComponent } from './sate-list.component';

describe('SateListComponent', () => {
  let component: SateListComponent;
  let fixture: ComponentFixture<SateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
