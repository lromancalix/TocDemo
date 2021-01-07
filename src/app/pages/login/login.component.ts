import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logServ: LoginService;

  constructor(logServ_: LoginService) { 
    this.logServ = logServ_;
  }

  ngOnInit(): void {
  }

  LogIn() {
    console.log('Login CLX');
    
    this.logServ.LogIn();
  }

}
