import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturaIdentiComponent } from './captura-identi.component';

describe('CapturaIdentiComponent', () => {
  let component: CapturaIdentiComponent;
  let fixture: ComponentFixture<CapturaIdentiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapturaIdentiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturaIdentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
