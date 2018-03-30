import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SseViewComponent } from './sse-view.component';

describe('SseViewComponent', () => {
  let component: SseViewComponent;
  let fixture: ComponentFixture<SseViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SseViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
