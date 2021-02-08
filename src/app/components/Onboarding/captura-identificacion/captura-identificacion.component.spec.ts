import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturaIdentificacionComponent } from './captura-identificacion.component';

describe('CapturaIdentificacionComponent', () => {
  let component: CapturaIdentificacionComponent;
  let fixture: ComponentFixture<CapturaIdentificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapturaIdentificacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturaIdentificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
