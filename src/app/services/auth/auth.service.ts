import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import {
  Observable,
  BehaviorSubject,
  throwError as observableThrowError,
  Subject,
} from "rxjs";
import { environment } from "src/environments/environment";
import { map, catchError } from "rxjs/operators";
import { TransformError } from "../../interfaces/transform-error";

import { CacheService } from './cache.service';
import { IAuthStatus, IServerAuthResponse } from '../../interfaces/IAuth';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends CacheService {

  
  private isLogged$ = new BehaviorSubject<boolean>(this.isUserActive());

  authStatus = new BehaviorSubject<IAuthStatus>(this.getItem('authStatus'));


  constructor(private http: HttpClient) {
    super();
  }

  LogOut() {
    this.clearStorage();
    this.isLogged$.next(false);
    console.log("limpiando storage");
    
  }

  LogIn(user: string, tocToken: string) { //: Observable<IAuthStatus>  {
    console.log("Mi Servicio");
    
    this.LogOut();

    this.setToken("0123456789");
   
     this.isLogged$.next(true);

  }

  private userAuthProvider(  user: string,   password: string  ) : Observable<any> {
    // return this.http.post<IServerAuthResponse>(
    //   `${environment.urlService}/Token/login`,
    //   { user, password }
    //);
  
    
    return null;
    

  }

  private setToken(token: string) {  this.setItem('jwt', token); }

  private getToken() {  return this.getItem('jwt');  }

   // Revisa si existe el token.
   public isUserActive() {

    if (this.getToken() == null || this.getToken() === '') {  return false;  }

    return true;
  }

  isAutenticated$(): Observable<boolean> {  
    return this.isLogged$.asObservable();
  }

}

const tokenResponse: IServerAuthResponse = {  access_token: "MyTestToken" }
