import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logServ: AuthService;

  constructor(logServ_: AuthService) { 
    this.logServ = logServ_;
  }

  ngOnInit(): void {
  }

  LogIn() {
    
    this.logServ.LogIn();
  }

}
