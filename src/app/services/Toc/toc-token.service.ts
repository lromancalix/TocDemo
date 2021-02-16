import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { promise } from 'protractor';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IdVsSelfie } from '../../interfaces/clases';

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
        resolve();
      } );
    });
    
    
  }

  IdentificacionVsSelfiePromise() {

  }


  //Consumo de servicios
  private getToken(  ): Observable<string> {
    
    let url =`${environment.urlTocService}`;

    // Convert to JSON  
    var stringifiedData = JSON.stringify(this.myData);  
    
    return this.http.get(url)
    .pipe(
      map( (response: any) => {
        console.log(`calix=> ${response.status}`);

        if( response.status == "200" ) {          
          return response.session_id;
        }
        return `Intente de nuevo: ${response.status}`;
      } ) 
    );
  }

  private getIndetificacionVsSelfie(datos: IdVsSelfie): Observable<any> {
   // let url =`${this.urlIdVsSelfie}`;
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