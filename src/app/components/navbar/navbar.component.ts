import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  

  constructor(private logServ: AuthService) { 
  }

  ngOnInit(): void {

  }

  LogOutNav() {
    this.logServ.LogOut();
  }
}
