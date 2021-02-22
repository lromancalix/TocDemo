import { HttpClient } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { rejects } from 'assert';
import { on } from 'process';
import { promise } from 'protractor';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IdVsSelfie, DatosOnboarding, SaveOnboarding, RostroVsTokenRequest } from '../../interfaces/clases';

@Injectable({
  providedIn: 'root'
})
export class TocTokenService {

  private datos: DatosTocToken ;
  urlToc= "/session-manager/v1/session-id";
  urlIdVsSelfie = "/v2/face-and-document";
  public tokenGenerado: string;


  urlGetToken = "/get_token";
  urlSaveOnboarding = "/save_onboarding";
  urlRostroVsToken = "/rostro_vs_token_web";


  public cliente: any;

  // Object Data  
  myData = {     
    apiKey: "70488227ef50439d99a324219ea90a81",
    liveness: "true",
    autocapture: "true"
  };  

  constructor(private http: HttpClient) {  }

  //Invocación de promesas
  getTocTokenPromise() {
    
    return new Promise( ( resolve, reject ) => {
     
      this.getToken()
      .subscribe( (response: any) => {
       
        
        this.tokenGenerado = response;
        resolve(response);
      } );
    });
    
    
  }

  IdentificacionVsSelfiePromise() {

  }

  SaveOnboardingPromise(datos: SaveOnboarding) {

    return new Promise( (resolve, reject ) => {

      this.saveOnboarding( datos )
      .subscribe( (response: any) => {

        //return response;
        resolve(response);
        
      } );

    } );

  }

  IsValidFaceVsToken(datos: RostroVsTokenRequest) {
    return new Promise( ( resolve, reject ) => {
      this.ValidFaceVsToken( datos )
      .subscribe( (response: any) => {
        resolve(response);
      } );
    } );
  }

  //Consumo de servicios
  private getToken(): Observable<string> {
    
    //let url =`${this.urlGetToken}`;
    let url =`${environment.urlTocService}`;
console.log("token url", url);
    // Convert to JSON  
    var stringifiedData = JSON.stringify(this.myData);  
    
    return this.http.get( url )
    .pipe(
      map( (response: any) => {
       

        if( response.status == "200" ) {          
          console.log("token generado correctamente.");
          
          return response.session_id;
        }
        return `Intente de nuevo: ${response.status}`;
      } ) 
    );
  }

  private getIndetificacionVsSelfie(datos: IdVsSelfie): Observable<any> {
   //let url =`${this.urlIdVsSelfie}`;
    let url =`${ environment.urlTocService }`;

    // Convert to JSON  
    var stringifiedData = JSON.stringify(datos);  
    
    return this.http.get(url)
    .pipe(
      map( (response: any) => {
          return response;
      } ) 
    );
  }

  private saveOnboarding(datos: SaveOnboarding): Observable<any> {
    //let url = `${ this.urlSaveOnboarding }`;
    let url = `${ environment.urlOnboarding }`;
    //let onboarding = this.MappingOnboarding(datos);

    return this.http.post(url, datos)
      .pipe(
        map( (response: any) => {
          console.log("save onboarding =>", response);
          return response;
        } )
      );
    
  }

  
  private ValidFaceVsToken(datos: RostroVsTokenRequest ): Observable<any>{
   //let url = `${ this.urlRostroVsToken}`;
   
   let url = `${ environment.urlRostroVsToken }`;
   console.log("face vs token " , url);
   return this.http.post(url, datos)
      .pipe(
        map( (response: any) => {
        this.cliente = response;
          return response;
        } )
      );
  }
  



}


export class DatosTocToken {

  apiKey: string;
  liveness: string;
  autocapture: string;

  constructor() {
    this.apiKey = "70488227ef50439d99a324219ea90a81";
    this.liveness = "true";
    this.autocapture = "true";
  }

}