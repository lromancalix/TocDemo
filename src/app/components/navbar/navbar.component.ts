import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  logServ: LoginService;
  

  constructor(logServ_: LoginService) { 
    this.logServ = logServ_;
  }

  ngOnInit(): void {

  }

  LogOutNav() {
    console.log('Saliendo...');
    
    this.logServ.LogOut();
  }
}
