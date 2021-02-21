import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { TipoIdentificacion } from 'src/app/interfaces/clases';
import { eVistaOnboarding } from '../../interfaces/enums';
import { DatosOnboarding, CapturaTOC, SaveOnboarding } from '../../interfaces/clases';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { TocTokenService } from '../../services/Toc/toc-token.service';

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
  datosSaved: SaveOnboarding;


  public identificiones: Array<TipoIdentificacion> = [
    { id: 'MEX1', name: 'Documento electoral mexicano emitido por el IFE' },
    { id: 'MEX2', name: 'Documento electoral mexicano emitido por el INE' },
    { id: 'PASS', name: 'Pasaporte' }
  ];
 

  constructor(
      private fb: FormBuilder, 
      private router: Router, 
      private http: TocTokenService
      ) {
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
      correo: ['', [Validators.required]],
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
  get EsCorreoValido() {
    return this.form.get('correo').invalid && this.form.get('apm').touched;
  }

  ValidaForm() {

    if ( this.form.valid ) {
      this.datosOnboarding.nombre = this.form.get('nombre').value;
      this.datosOnboarding.app = this.form.get('app').value;
      this.datosOnboarding.apm = this.form.get('apm').value;
      this.datosOnboarding.correo = this.form.get('correo').value;
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
      console.log("validación exitosa");
      
      this.botonActivo = false;

      if( this.datosOnboarding.identificacionFrontal.capturaExitosa ) {
        
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

  setTokenFrontal(captura: CapturaTOC) {
    console.clear();
    console.log("set token frontal", captura);
    this.tokenIdentificacionOK = true;
    this.datosOnboarding.identificacionFrontal.token = captura.token;
    this.datosOnboarding.identificacionFrontal.capturaExitosa = captura.capturaExitosa;
    this.datosOnboarding.identificacionFrontal.imagen = captura.imagen
    this.mostrarBoton();
  }


  setTokenReverso(captura: CapturaTOC) {
    console.log(captura);
    
    this.tokenIdentificacionOK = true;
    this.datosOnboarding.identificacionReverso.token = captura.token;
    this.datosOnboarding.identificacionReverso.capturaExitosa = captura.capturaExitosa;
    this.datosOnboarding.identificacionReverso.imagen = captura.imagen
    //this.mostrarBoton();
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

  guardarOnboarding(){
   
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      title: 'Espere un momento...',
      showConfirmButton: false
    });

    Swal.showLoading();
    
    let datos = this.MappingOnboarding(this.datosOnboarding);

    this.http.SaveOnboardingPromise(datos).then( (response: any) => {
      console.log(response);
      Swal.close();
      this.MostrarMSG(response.Descripcion);
    } );

  }

  private MostrarMSG(texto: string) {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'success',
      title: texto,
      showConfirmButton: false,
      timer: 2500
    })
    this.router.navigate(['/home']);
  }

  
  private MappingOnboarding(datos: DatosOnboarding): SaveOnboarding {
    let onboarding = new SaveOnboarding();
    onboarding.nombre = datos.nombre;
    onboarding.app = datos.app;
    onboarding.apm = datos.apm;
    onboarding.correo = datos.correo;
    onboarding.claveIdentificacion = datos.identificacionFrontal.tipoIdentificacion.id;

    onboarding.idTipoIdentificacion = datos.tipoIdentificacion.id;
    onboarding.tokenFrontal = datos.identificacionFrontal.token;
    onboarding.imagenFrontal = datos.identificacionFrontal.imagen;

    onboarding.tokenReverso = datos.identificacionReverso.token;
    onboarding.imagenReverso = datos.identificacionReverso.imagen;
    onboarding.claveIdentificacion = datos.identificacionFrontal.tipoIdentificacion.id;
    

    onboarding.id = "0";
    onboarding.imagenSeilfie = datos.selfie.imagen;
    onboarding.tokenSelfie = datos.selfie.token;

    onboarding.tokenIDEVsSelfie = "token selfie vs ife desde app";
    this.datosSaved = onboarding;
    return onboarding; 
  }




}
