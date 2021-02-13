import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TipoIdentificacion } from '../../../interfaces/clases';
import { TocTokenService } from '../../../services/Toc/toc-token.service';
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

  cont = "";

  @Input() 
  identificacion: TipoIdentificacion;

  @Input() 
  lado: number;
  @Output()
  propagar = new EventEmitter<string>();

  constructor(private serviceToc: TocTokenService) { }

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
        $("#modalIDenti").hide();

        this.tokenFrontal = token;
        this.tokenFrontalExitoso = true;
        this.asignarImagen(lado,image, true);
        //this.ValidarToken(token, lado, image, true);
      },
      failure:  (error) => {
        $("#modalIDenti").hide();
        //this.ValidarToken(error, lado, "", false);
      },
    });

  }

  asignarImagen(lado: string, imagen:string ,tokenExitoso: boolean) {
    console.log("asignando imagen");
    
    this.imagenFrontal = imagen;
    this.propagar.emit(this.tokenFrontal);
    $("#btn-confirmar").click();
    console.log("asignando imagen =>", this.tokenFrontalExitoso);
  }

}
