import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-validaciones',
  templateUrl: './validaciones.component.html',
  styleUrls: ['./validaciones.component.css']
})
export class ValidacionesComponent implements OnInit {

  form: FormGroup

  constructor(private fb: FormBuilder) { }

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
    if ( ! this.form.valid ) {
      console.log('Formulario invalido');
      return;
    }

    console.log("Guardado");
  }

}
