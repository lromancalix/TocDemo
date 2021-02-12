import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoIdentificacion } from 'src/app/interfaces/clases';
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

  TipoID: string;

  identificacionSeleccionada: TipoIdentificacion;

  tokenIdentificacion: string;
  tokenSelfie: string;

  botonActivo: boolean;
  botonSelfieActivo: boolean;

  tokenIdentificacionOK: boolean;
  tokenSelfieOK: boolean;

  public identificiones: Array<TipoIdentificacion> = [
    { id: 'MEX1', name: 'Documento electoral mexicano emitido por el IFE' },
    { id: 'MEX2', name: 'Documento electoral mexicano emitido por el INE' },
    { id: 'PASS', name: 'Pasaporte' }
  ];
 

  constructor(private fb: FormBuilder) {
    this.vistaActiva = this.eVista.DatosOnboarding;
    this.tokenIdentificacionOK = false;
    this.tokenSelfieOK = false;
    this.botonSelfieActivo = false;
   }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      app: ['', [Validators.required]],
      apm: ['', [Validators.required]],
      identi: ['',[Validators.required]]
    });
  }

  get EsIdentificacionValida() {
    return this.form.get('identi').invalid && this.form.get('identi').touched;
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
      this.buscarIdentificacionSeleccionada();
      this.siguienteVista();
      this.mostrarBoton();
      return;
    }

    
  }

  siguienteVista() {
    //if( this.vistaActiva === this.eVista.DatosOnboarding ) {}

    this.vistaActiva ++;
   
  }

  mostrarBoton() {

    if( this.vistaActiva === this.eVista.CapturaID  ) {
      console.log('Mostrar boton');
      
      this.botonActivo = false;

      if( this.tokenIdentificacionOK ) {
        this.botonActivo = true;
      }

    }

  }

  vistaAnterior() {
    this.vistaActiva = this.vistaActiva - 1;
  }

  changeID(id: string) {
    this.TipoID = id;    
  }

  buscarIdentificacionSeleccionada() {
     this.identificacionSeleccionada =this.form.value.identi;
  }

  setTokenFrontal(token) {
    this.tokenIdentificacion = token;
    this.tokenIdentificacionOK = true;
    this.mostrarBoton();
  }

  setTokenSelfie(token) {
    this.tokenSelfie = token;
    this.tokenSelfieOK = true;
    this.botonActivo = true;
  }

}
