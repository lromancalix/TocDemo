import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TocTokenService } from '../../../services/Toc/toc-token.service';
declare var $:any;

@Component({
  selector: 'app-captura-selfie-liveness',
  templateUrl: './captura-selfie-liveness.component.html',
  styleUrls: ['./captura-selfie-liveness.component.css']
})
export class CapturaSelfieLivenessComponent implements OnInit {

  @Output()
  selfieToken = new EventEmitter<string>();
  
  @Output()
  imagenSelfie = new EventEmitter<string>();

  private tocToken = "";
  cargando: boolean;
  

  constructor(private serviceToc: TocTokenService) { }

  ngOnInit(): void {
  }


  capturar() {}

  private obtenerTocToken() {
    this.serviceToc.getTocTokenPromise().then(() => {
      this.cargando = false;
      this.tocToken = this.serviceToc.tokenGenerado;
      this.obtenerSelfie( this.tocToken );
    });
  }

  private obtenerSelfie(tokToken) {
    
  }

}
