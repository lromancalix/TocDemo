import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { AuthService } from '../../services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TocTokenService } from '../../services/Toc/toc-token.service';
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

  constructor(
    private logServ: AuthService, 
    private fb: FormBuilder,
    private serviceToc: TocTokenService) { 
   
  }

  ngOnInit(): void {
    this.logServ.LogOut();
    this.buildForm();
  }

  LogIn() {
    this.logServ.LogIn("","");
  }

  get EsUsuarioValido() {
    return this.formLogin.get('usuario').invalid && this.formLogin.get('usuario').touched;
  }

  buildForm() {
    this.formLogin = this.fb.group({
      usuario: ['', [Validators.required]]
    });
  }


  Capturar() {
    
    if ( this.formLogin.valid ) {
      this.cargando = true;
      this.serviceToc.getTocTokenPromise().then(() => {
        this.cargando = false;
        this.sesionToken = this.serviceToc.tokenGenerado;
        this.MostrarModal( this.sesionToken );
      });
      
    }
   
  }

  private MostrarModal( sesion: string ) {
     $(".modal").show();

    $("#liveness").liveness({
      locale: "es",
      session_id: sesion,
      http: true,
      //alt_server: "https://prod-capture.tocws.com/",
      //url_lbac: "https://prod-api.7oc.cl/auto-capture/data/v2",
      callback: function (token) {
        $(".modal").hide();
        $("#link-login").click();
      },
      failure: function (error) {
        alert( error);
        $(".modal").hide();
        //alert("Usuario Incorrecto!");
      },
    });
  }

}
