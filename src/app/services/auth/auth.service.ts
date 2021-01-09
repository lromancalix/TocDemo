import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends CacheService {

  
  private isLogged$ = new BehaviorSubject<boolean>(this.isUserActive());

  constructor(private http: HttpClient) {
    super();
  }

  LogOut() {
    this.clearStorage();
  }

  LogIn() {
   this.setToken("1234567");
  }

  private setToken(token: string) {
    this.setItem('jwt', token);
  }

  private getToken() {
    return this.getItem('jwt');
  }

   // Revisa si existe el token.
   public isUserActive() {
    if (this.getToken() == null || this.getToken() === '') {
      return false;
    }
    return true;
  }

  isAutenticated$(): Observable<boolean> {
    return this.isLogged$.asObservable();
  }

}
