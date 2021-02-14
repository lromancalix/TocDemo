import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TipoIdentificacion } from '../../../interfaces/clases';
import { TocTokenService } from '../../../services/Toc/toc-token.service';
import { eStatusCaptura } from '../../../interfaces/enums';
declare var $: any;

@Component({
  selector: 'app-captura-identi',
  templateUrl: './captura-identi.component.html',
  styleUrls: ['./captura-identi.component.css']
})
export class CapturaIdentiComponent implements OnInit {

  tokToken = ";"
  tokenFrontal = "";
  imagenFrontal= "";
  tokenFrontalExitoso = false;

  eStatusCaptura= eStatusCaptura;
  statusCaptura: eStatusCaptura;

  cont = "";

  @Input() 
  identificacion: TipoIdentificacion;

  @Input() 
  lado: number;
  @Output()
  propagar = new EventEmitter<string>();

  constructor(private serviceToc: TocTokenService) {
    this.statusCaptura = this.eStatusCaptura.SinCapturar;
   }

  ngOnInit(): void {
  }

  capturaImagen(){
    
    this.serviceToc.getTocTokenPromise().then(() => {
      this.tokToken = this.serviceToc.tokenGenerado;
      let lado = this.obtenerLado();
      this.mostrarModal( lado );
    });
  }

  obtenerLado(){
    return (this.lado == 1) ? 'front': 'back';
  }

  mostrarModal(lado: string) {
    $("#modalIDenti").show();
    console.log("lado => ", lado);
    

    $("#conten-identificacion").autocapture({
      locale: "es",
      session_id: this.tokToken,
      document_type: this.identificacion.id,
      document_side: lado,
      http: true,
      callback:  (token, image) => {
        
        this.tokenFrontal = token;
        this.tokenFrontalExitoso = true;
        this.statusCaptura = this.eStatusCaptura.CapturaExitosa
        this.asignarImagen(lado,image, true);
        $("#modalIDenti").hide();
        //this.ValidarToken(token, lado, image, true);
      },
      failure:  (error) => {
        this.tokenFrontal = "";
        this.tokenFrontalExitoso = false;
        this.statusCaptura = this.eStatusCaptura.CarturaFallada;
        $("#modalIDenti").hide();
        $("#btn-confirmar").click();
      },
    });

  }

  asignarImagen(lado: string, imagen:string ,tokenExitoso: boolean) {
    
    this.imagenFrontal = imagen;
    this.propagar.emit(this.tokenFrontal);
    $("#btn-confirmar").click();

  }

}
