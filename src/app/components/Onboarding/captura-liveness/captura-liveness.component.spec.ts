import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturaLivenessComponent } from './captura-liveness.component';

describe('CapturaLivenessComponent', () => {
  let component: CapturaLivenessComponent;
  let fixture: ComponentFixture<CapturaLivenessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapturaLivenessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturaLivenessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
