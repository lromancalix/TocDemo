import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tocAPP';

  isAuthenticated = false;

  constructor(public logServ: AuthService) {
    
  }

  ngOnInit(): void {
    
    this.logServ.isAutenticated$().subscribe( response => {
      console.log('component: ', response);
      this.isAuthenticated = response;
    } );
    
  }



  

}
