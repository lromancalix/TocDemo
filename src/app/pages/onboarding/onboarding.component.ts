import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { eVistaOnboarding } from '../../interfaces/enums';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css']
})
export class OnboardingComponent implements OnInit {

  form: FormGroup
  eVista = eVistaOnboarding;

  vistaActiva: any;
 

  constructor(private fb: FormBuilder) {
    this.vistaActiva = this.eVista.CapturaID;
   }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      app: ['', [Validators.required]],
      apm: ['', [Validators.required]]
    });
  }

  get EsNombreValido() {
    return this.form.get('nombre').invalid && this.form.get('nombre').touched;
  }
  get EsAppValido() {
    return this.form.get('app').invalid && this.form.get('app').touched;
  }
  get EsApmValido() {
    return this.form.get('apm').invalid && this.form.get('apm').touched;
  }

  Guardar() {
    if ( this.form.valid ) {
      this.siguienteVista();
      return;
    }

    
  }

  siguienteVista() {
    //if( this.vistaActiva === this.eVista.DatosOnboarding ) {}
    this.vistaActiva ++;
  }

  vistaAnterior() {
    this.vistaActiva = this.vistaActiva - 1;
  }

}
