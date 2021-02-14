import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmaDatosComponent } from './confirma-datos.component';

describe('ConfirmaDatosComponent', () => {
  let component: ConfirmaDatosComponent;
  let fixture: ComponentFixture<ConfirmaDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmaDatosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmaDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
