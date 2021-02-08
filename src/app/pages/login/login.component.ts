import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { AuthService } from '../../services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  constructor(private logServ: AuthService, private fb: FormBuilder) { 
   
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
      this.MostrarModal();
    }
   
  }

  private MostrarModal() {
     $(".modal").show();

    $("#liveness").liveness({
      locale: "es",
      session_id: $("#txt-login").val(),
      http: true,
      callback: function (token) {
        $(".modal").hide();
        $("#link-login").click();
      },
      failure: function (error) {
        alert( error);
        $(".modal").hide();
        alert("Usuario Incorrecto!");
      },
    });
  }

}
