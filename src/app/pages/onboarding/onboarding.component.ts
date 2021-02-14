import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { TipoIdentificacion } from 'src/app/interfaces/clases';
import { eVistaOnboarding } from '../../interfaces/enums';
import { DatosOnboarding } from '../../interfaces/clases';

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

  ladoFrontal = 1;
  ladoReverso = 2;

  datosOnboarding:  DatosOnboarding;


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
    this.datosOnboarding = new DatosOnboarding();
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

    console.clear();
    console.log('cambiando pantalla');
    

    if ( this.form.valid ) {
      this.datosOnboarding.nombre = this.form.get('nombre').value;
      this.datosOnboarding.app = this.form.get('app').value;
      this.datosOnboarding.apm = this.form.get('apm').value;
      this.buscarIdentificacionSeleccionada();
      this.siguienteVista();
      this.mostrarBoton();
      return;
    }

    
  }

  siguienteVista() {
    //if( this.vistaActiva === this.eVista.DatosOnboarding ) {}
    console.log("siguiente vista");
    
    this.vistaActiva ++;
   
  }

  mostrarBoton() {

    if( this.vistaActiva === this.eVista.CapturaID  ) {
      console.log("validación exitosa");
      
      this.botonActivo = false;

      if( this.datosOnboarding.identificacionFrontal.capturaExitosa ) {
        console.log("activando boton");
        
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
     this.datosOnboarding.identificacionFrontal.tipoIdentificacion = this.identificacionSeleccionada;
  }

  setTokenFrontal(token) {
    this.tokenIdentificacionOK = true;
    this.datosOnboarding.identificacionFrontal.token = token;
    this.datosOnboarding.identificacionFrontal.capturaExitosa = true;
    this.mostrarBoton();
  }

  setTokenSelfie(token) {
    
    this.tokenSelfie = token;
    this.tokenSelfieOK = true;
    this.botonActivo = true;
    this.datosOnboarding.selfie.token = token;
    this.datosOnboarding.selfie.capturaExitosa = true;
    //this.mostrarBoton();
  }

  setSelfie(imagen) {
    this.datosOnboarding.selfie.imagen = imagen;
  }



}
