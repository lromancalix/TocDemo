import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { promise } from 'protractor';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TocTokenService {

  private datos: DatosTocToken ;
  urlToc= "/session-manager/v1/session-id";
  public tokenGenerado: string;

  // Object Data  
  myData = {     
    apiKey: "70488227ef50439d99a324219ea90a81",
    liveness: "true",
    autocapture: "true"
  };  

  constructor(private http: HttpClient) {  }

  getTocTokenPromise() {
    
    return new Promise( ( resolve, reject ) => {
     
      this.getToken()
      .subscribe( (response: any) => {
       
        
        this.tokenGenerado = response;
        resolve();
      } );
    });
    
    
  }

  private getToken(  ): Observable<string> {

    
    let url =`${this.urlToc}`;
    console.log("urlTOC: ", url);

    // Convert to JSON  
    var stringifiedData = JSON.stringify(this.myData);  
    console.log("With Stringify :" , stringifiedData);  
    
    return this.http.post(url, this.myData)
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