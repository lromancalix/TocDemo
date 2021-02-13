import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { TocTokenService } from '../../services/Toc/toc-token.service';
import { TipoIdentificacion } from '../../interfaces/clases';
import { eStatusCaptura } from '../../interfaces/enums';
declare var $:any;

@Component({
  selector: 'app-identificacion',
  templateUrl: './identificacion.component.html',
  styleUrls: ['./identificacion.component.css']
})
export class IdentificacionComponent implements OnInit {

  cargando = false;
  sesionToken = "";
  imagenCapturada = "";

  public tokenFrontalExitoso = false;
  tokenReversoExitoso = false;

  imagenFrontal: string;
  imagenTrasera: string;

  statusFrontal: eStatusCaptura;
  statusTrasera: eStatusCaptura;
  statusCaptura= eStatusCaptura;

  tokenFrontal: string;


  @Output()
  propagar = new EventEmitter<string>();

  @Input() 
  identificacion: TipoIdentificacion;

  constructor(private serviceToc: TocTokenService) {
    
   }

  ngOnInit(): void {
    this.statusFrontal = eStatusCaptura.SinCapturar;
  }

  capturarID(lado: string) {
    this.obtenerToken(lado);
  }

  private obtenerToken(lado: string){
    this.serviceToc.getTocTokenPromise().then(() => {
      this.cargando = false;
      this.sesionToken = this.serviceToc.tokenGenerado;
      this.MostrarModalIdenti( this.sesionToken, lado );
    });
  }

  private MostrarModalIdenti( token: string, lado: string ) {

    $("#modalID").show();

    $("#conten-identificacion").autocapture({
      locale: "es",
      session_id: token,
      document_type: this.identificacion.id,
      document_side: lado,
      http: true,
      callback:  (token, image) => {
        $("#modalID").hide();
        this.ValidarToken(token, lado, image, true);
      },
      failure:  (error) => {
        $("#modalID").hide();
        this.ValidarToken(error, lado, "", false);
      },
    });

  }

  
  ValidarToken(token: string, side: string, image: string, tokenExitoso: boolean) {
    this.statusFrontal = eStatusCaptura.SinCapturar;
    if( tokenExitoso ) {
     
      if( side == 'front' ) {
        this.setDatosImagenFrontal(token, image, tokenExitoso);
      } 
      else if( side == 'back' ) {
        this.setDatosImagenTrasera(token, image, true);
      }

    } 
    else {
      if( side == 'front' ) {
        this.setDatosImagenFrontal(token, image, false);
      } else if( side == 'back' ) {
        this.setDatosImagenTrasera(token, image, false);
      }
      console.log('NO, Token NO Exitoso entró');
    }
      
  }

  setDatosImagenFrontal(token: string, imagen: string, exitoso: boolean) {
    
    if( exitoso ) {
      console.clear();
      console.log('hola frontal OK', imagen);      
      $("#img-frontal").attr('src', imagen);
      this.tokenFrontalExitoso = exitoso;
      this.imagenFrontal = imagen;
      this.statusFrontal = this.statusCaptura.CapturaExitosa;
      this.tokenFrontal = token;
      console.log("termina IF", this.statusFrontal );
      this.propagar.emit(token);
    } else {
      this.imagenFrontal = "";
      this.statusFrontal = this.statusCaptura.CarturaFallada;
      this.tokenFrontal = "";
      this.tokenFrontalExitoso = false;
    }
  }
  
  setDatosImagenTrasera(token: string, image: string, exitoso: boolean) {
    console.log("set trasera", exitoso);
    
    if( exitoso ) {
      this.imagenTrasera = image;
      this.statusTrasera = this.statusCaptura.CapturaExitosa;
      this.tokenFrontal = token;
      this.tokenReversoExitoso = true;
    } else {
      this.imagenTrasera = "";
      this.statusTrasera = this.statusCaptura.CarturaFallada;
      this.tokenFrontal = "";
      this.tokenReversoExitoso = false;
    }

  }


}
