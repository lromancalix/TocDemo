import { Component } from '@angular/core';
import { LoginService } from './services/login.service';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tocAPP';

  isAuthenticated: boolean;

  constructor(public logServ: AuthService) {
    this.IsUserAuthenticated();
  }

  IsUserAuthenticated() {
    this.isAuthenticated = this.logServ.isUserActive();
  }

}
