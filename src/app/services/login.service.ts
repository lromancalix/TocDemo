import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isAuthenticated: boolean;

  constructor() { }

  LogOut() {
    this.isAuthenticated = false;
  }

  LogIn() {
    this.isAuthenticated = true;
  }

}
