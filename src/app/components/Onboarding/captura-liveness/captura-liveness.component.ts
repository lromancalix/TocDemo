import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TocTokenService } from '../../../services/Toc/toc-token.service';
import { eStatusCaptura } from '../../../interfaces/enums';
declare var $:any;

@Component({
  selector: 'app-captura-liveness',
  templateUrl: './captura-liveness.component.html',
  styleUrls: ['./captura-liveness.component.css']
})
export class CapturaLivenessComponent implements OnInit {

  public sesionToken: string;

  @Output()
  selfieToken = new EventEmitter<string>();
  
  cargando: boolean;
  imagenCapturada: string;
  tokenExitoso = false;
  selfieExitosa = false;

  eStatusCaptura= eStatusCaptura;
  statusCaptura: eStatusCaptura;


  @Output()
  propagarTokenSelfie = new EventEmitter<string>();
  
  @Output()
  propagarSelfie = new EventEmitter<string>();

  constructor(private serviceToc: TocTokenService) { 
    this.statusCaptura = this.eStatusCaptura.SinCapturar;
  }

  ngOnInit(): void {
  }


  capturar() {
    this.serviceToc.getTocTokenPromise().then(() => {
      this.cargando = false;
      this.sesionToken = this.serviceToc.tokenGenerado;
      this.MostrarModal( this.sesionToken );
    });
  }

  private MostrarModal( sesion: string ) {
    $(".modal").show();

   $("#liveness").liveness({
     locale: "es",
     session_id: sesion,
     http: true,
     callback: (token, image) => {

       this.imagenCapturada  = image;
       this.tokenExitoso = true;
       this.selfieExitosa = true;
       this.statusCaptura = this.eStatusCaptura.CapturaExitosa
       this.propagarTokenSelfie.emit(token);
       this.propagarSelfie.emit(image);
       $(".modal").hide();
       this.confirmar();
       
      },
     failure: (error) => {
      
      this.tokenExitoso = false;
      this.selfieExitosa = false;
      this.statusCaptura = this.eStatusCaptura.CarturaFallada;
      this.confirmar();
      $(".modal").hide();
     },
   });
 }

  confirmar() { $("#btn-confirmar").click(); }

}
