import { Component, OnInit } from '@angular/core';
import { rejects } from 'assert';
import { promise } from 'protractor';
import { eStatusCaptura } from 'src/app/interfaces/enums';
import { TocTokenService } from '../../../services/Toc/toc-token.service';
declare var $:any;

@Component({
  selector: 'app-captura-identificacion',
  templateUrl: './captura-identificacion.component.html',
  styleUrls: ['./captura-identificacion.component.css']
})
export class CapturaIdentificacionComponent implements OnInit {

  tocToken: string;
  tokenFrontal: string;

  statusFrontal: eStatusCaptura;
  statusCaptura= eStatusCaptura;

  
  constructor(private service: TocTokenService) {
    this.statusFrontal = eStatusCaptura.SinCapturar;
   }

  ngOnInit(): void {
  }

  ObtenerToken() {
    this.tocToken = "Espere un momento...";
     this.service.getTocTokenPromise().then(() => {
       this.tocToken = this.service.tokenGenerado;
     });
  }

  CapturarIdentificacion() {
       
    var origen = $( "#myselect option:selected" ).val();
    
    $("#contenedor2").autocapture({
      locale: "es",
      session_id: $("#txt-token").val(),
      document_type: origen,
      document_side: "front",
      http: true,
      callback:  (token, image) => {
        this.ValidarToken(token);
      },
      failure:  (error) => {
        this.ValidarToken(error);
      },
    });
    
    //this.tokenFrontal = tokenFrontal_;

  }

  ValidarToken(token: string) {
    
    console.log("token del componente => ", token);
    
    if( token.length < 5 ) {
      this.statusFrontal = eStatusCaptura.CarturaFallada;
      this.tokenFrontal = "";
    } else {
      this.statusFrontal = eStatusCaptura.CapturaExitosa;
      this.tokenFrontal = token;
    }
  
  }

 


}
