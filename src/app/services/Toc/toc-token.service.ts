import { HttpClient } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { rejects } from 'assert';
import { on } from 'process';
import { promise } from 'protractor';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IdVsSelfie, DatosOnboarding, SaveOnboarding } from '../../interfaces/clases';

@Injectable({
  providedIn: 'root'
})
export class TocTokenService {

  private datos: DatosTocToken ;
  urlToc= "/session-manager/v1/session-id";
  urlIdVsSelfie = "/v2/face-and-document";
  public tokenGenerado: string;

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


  //Consumo de servicios
  private getToken(): Observable<string> {
    
    let url =`${environment.urlTocService}`;

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
    let url = `${ environment.urlOnboarding }`;
    //let onboarding = this.MappingOnboarding(datos);
    console.clear();
    console.log("url onbording => ", url);
    console.log("data onboarding => ", datos);

    return this.http.post(url, datos)
      .pipe(
        map( (response: any) => {
          console.log("save onboarding =>", response);
          return response;
        } )
      );
    
  }


  

  // private MappingOnboarding(datos: DatosOnboarding): SaveOnboarding {
  //   let onboarding = new SaveOnboarding();
  //   onboarding.nombre = datos.nombre;
  //   onboarding.app = datos.app;
  //   onboarding.apm = datos.apm;
  //   onboarding.correo = datos.correo;
  //   onboarding.claveIdentificacion = datos.identificacionFrontal.tipoIdentificacion.id;

  //   onboarding.idTipoIdentificacion = datos.tipoIdentificacion.id;
  //   onboarding.tokenFrontal = datos.identificacionFrontal.token;
  //   onboarding.imagenFrontal = datos.identificacionFrontal.imagen;

  //   onboarding.tokenReverso = datos.identificacionReverso.token;
  //   onboarding.imagenReverso = datos.identificacionReverso.imagen;
  //   onboarding.claveIdentificacion = datos.identificacionFrontal.tipoIdentificacion.id;
    

  //   onboarding.id = "0";
  //   onboarding.imagenSeilfie = datos.selfie.imagen;
  //   onboarding.tokenSelfie = datos.selfie.token;

  //   onboarding.tokenIDEVsSelfie = "token selfie vs ife desde app";

  //   return onboarding; 
  // }

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