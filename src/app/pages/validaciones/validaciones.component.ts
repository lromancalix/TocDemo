import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { TocTokenService } from '../../services/Toc/toc-token.service';
import { RostroVsTokenRequest } from '../../interfaces/clases';
import { Router } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-validaciones',
  templateUrl: './validaciones.component.html',
  styleUrls: ['./validaciones.component.css']
})
export class ValidacionesComponent implements OnInit {

  form: FormGroup;

  request: RostroVsTokenRequest;

  apiResponse: any;
  

  constructor(
    private router: Router,   
    private fb: FormBuilder,  
    private http: TocTokenService
    ) {
    this.request = new RostroVsTokenRequest();
   }


  ngAfterViewInit(){
    
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      correo: ['', [Validators.required]]
    });
  }

  get EsCorreoValido() {
    return this.form.get('correo').invalid && this.form.get('correo').touched;
  }
 

  setTokenSelfie(datos: any){
    this.request.photo = datos;
    
  }


  ValidarImagen() {
    if ( this.form.valid ) {
      this.request.correo = this.form.get('correo').value;
      this.Validar();
    }
  }

  Validar() {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      title: 'Espere un momento...',
      showConfirmButton: false
    });

    Swal.showLoading();

    this.http.IsValidFaceVsToken(this.request).then( (response: any) => {
      this.apiResponse = response;
      Swal.close();


      if(response.status == "200") {
        this.MostrarMSGExistoso(`Bienvenido ${ response.cliente.nombre }`);
      } else {
        this.MostrarMSGNOExistoso(response.descripcion);
      }

    } );

  }
 
  private MostrarMSGExistoso(texto: string) {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'success',
      title: texto,
      showConfirmButton: false,
      timer: 2500
    })
    this.router.navigate(['/cliente']);
  }
  
  private MostrarMSGNOExistoso(texto: string) {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'error',
      title: texto,
      showConfirmButton: true
    })
  }


}
