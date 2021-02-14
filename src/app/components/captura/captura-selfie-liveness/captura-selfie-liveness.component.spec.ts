import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturaSelfieLivenessComponent } from './captura-selfie-liveness.component';

describe('CapturaSelfieLivenessComponent', () => {
  let component: CapturaSelfieLivenessComponent;
  let fixture: ComponentFixture<CapturaSelfieLivenessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapturaSelfieLivenessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturaSelfieLivenessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
