import { Component, Input, OnInit } from '@angular/core';
import { rejects } from 'assert';
import { promise } from 'protractor';
import { eStatusCaptura } from 'src/app/interfaces/enums';
import { TocTokenService } from '../../../services/Toc/toc-token.service';
import { TipoIdentificacion } from '../../../interfaces/clases';
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
  statusTrasera: eStatusCaptura;
  statusCaptura= eStatusCaptura;

  imagenFrontal: string;
  imagenTrasera: string;

  @Input() identificacion: TipoIdentificacion;

  
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

  CapturarIdentificacion(side: string) {
       
    var origen = $( "#myselect option:selected" ).val();
    
    $("#contenedor2").autocapture({
      locale: "es",
      session_id: $("#txt-token").val(),
      document_type: this.identificacion.id,
      document_side: side,
      http: true,
      callback:  (token, image) => {
        this.ValidarToken(token, side, image, true);
      },
      failure:  (error) => {
        this.ValidarToken(error, side, "", false);
      },
    });
    
    //this.tokenFrontal = tokenFrontal_;

  }

  ValidarToken(token: string, side: string, image: string, tokenExitoso: boolean) {
    
    if( tokenExitoso ) {
     
      if( side === 'front' ) {
        this.setDatosImagenFrontal(token, image, true);
      } else if( side === 'back' ) {
        this.setDatosImagenTrasera(token, image, true);
      }

    } else {
      if( side === 'front' ) {
        this.setDatosImagenFrontal(token, image, false);
      } else if( side === 'back' ) {
        this.setDatosImagenTrasera(token, image, false);
      }
      console.log('NO, Token NO Exitoso entró');
    }

  
  }

  setDatosImagenFrontal(token: string, image: string, exitoso: boolean) {
    console.clear();
    console.log("set frontal", exitoso);
    
    if( exitoso ) {
      console.log('imagen frontal OK', image);
      
      this.imagenFrontal = image;
      this.statusFrontal = this.statusCaptura.CapturaExitosa;
      this.tokenFrontal = token;
    } else {
      this.imagenFrontal = "";
      this.statusFrontal = this.statusCaptura.CarturaFallada;
      this.tokenFrontal = "";
    }
  }
  setDatosImagenTrasera(token: string, image: string, exitoso: boolean) {
    console.log("set trasera", exitoso);
    
    if( exitoso ) {
      this.imagenTrasera = image;
      this.statusTrasera = this.statusCaptura.CapturaExitosa;
      this.tokenFrontal = token;
    } else {
      this.imagenTrasera = "";
      this.statusTrasera = this.statusCaptura.CarturaFallada;
      this.tokenFrontal = "";
    }

  }


 
}
