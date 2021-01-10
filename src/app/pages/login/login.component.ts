import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private logServ: AuthService) { 
   
  }

  ngOnInit(): void {
    this.logServ.LogOut();
  }

  LogIn() {
    console.log("Entrando..");
    
    this.logServ.LogIn("","");


  }

}
