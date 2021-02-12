import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TocTokenService } from '../../../services/Toc/toc-token.service';
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

  constructor(private serviceToc: TocTokenService) { 

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
       $(".modal").hide();

      },
     failure: (error) => {
      
      this.tokenExitoso = false;

       $(".modal").hide();
       console.log('Error => ', error);

      },
   });
 }

}
