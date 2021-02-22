import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { AuthService } from '../../services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TocTokenService } from '../../services/Toc/toc-token.service';
import { RostroVsTokenRequest } from 'src/app/interfaces/clases';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
 
  public sesionToken: string;
  cargando: boolean;

  request: RostroVsTokenRequest;
  apiResponse: any;

  constructor(
    private logServ: AuthService, 
    private fb: FormBuilder,
    private router: Router,   
    private http: TocTokenService) { 
      this.request = new RostroVsTokenRequest();
  }

  ngOnInit(): void {
    this.logServ.LogOut();
    this.buildForm();
  }

  LogIn() {
    this.logServ.LogIn(this.request.correo,"");
  }

  get EsUsuarioValido() {
    return this.formLogin.get('usuario').invalid && this.formLogin.get('usuario').touched;
  }

  buildForm() {
    this.formLogin = this.fb.group({
      usuario: ['', [Validators.required]]
    });
  }


  Ingresar() {
    

    if ( this.formLogin.valid ) {
      this.request.correo = this.formLogin.get('usuario').value;

      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        title: 'Espere un momento...',
        showConfirmButton: false
      });
  
      Swal.showLoading();

      this.cargando = true;
      // this.serviceToc.getTocTokenPromise().then(() => {
      //   this.cargando = false;
      //   this.sesionToken = this.serviceToc.tokenGenerado;
      //   $("#link-login").click();
        
      // });

      this.http.IsValidFaceVsToken(this.request).then( (response: any) => {
        this.apiResponse = response;
        Swal.close();
  
  
        if(response.status == "200") {
          this.LogIn();
          this.MostrarMSGExistoso(`Bienvenido ${ response.cliente.nombre } ${ response.cliente.app } ${ response.cliente.apm }`);
        } else {
          this.MostrarMSGNOExistoso(response.descripcion);
        }
  
      } );
  
      
    }
   
  }

  private MostrarMSGExistoso(texto: string) {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'success',
      title: texto,
      showConfirmButton: false,
      timer: 2500
    })
    this.router.navigate(['/home']);
  }
  
  private MostrarMSGNOExistoso(texto: string) {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'error',
      title: texto,
      showConfirmButton: true
    })
  }

  


  setTokenSelfie(datos: any){
    this.request.photo = datos;
    
  }


}
