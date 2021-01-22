import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivenesscamComponent } from './livenesscam.component';

describe('LivenesscamComponent', () => {
  let component: LivenesscamComponent;
  let fixture: ComponentFixture<LivenesscamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivenesscamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LivenesscamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
