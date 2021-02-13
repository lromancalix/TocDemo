export class TipoIdentificacion {
    id: string;
    name: string;
}

export class IdentificacionCaptura {

    tipoIdentificacion: TipoIdentificacion;
    tokenIdentificacion: string;
    capturaExitosa: boolean;
    imagen: string;
    
    constructor() {
        this.tipoIdentificacion = null;
        this.tokenIdentificacion = "";
        this.capturaExitosa = false;
        this.imagen = "";
    }
}

export class DatosOnboarding {
   nombre: string;
   app: string;
   correo: string;
   tipoIdentificacion: TipoIdentificacion;
   tokenSelfie: string;
   imagenSelfie: string;

   identificacionFrontal: IdentificacionCaptura;
   identificacionReverso: IdentificacionCaptura;

   constructor() {
       this.app ="";
       this.correo ="";
       this.imagenSelfie ="";
       this.nombre ="";
       this.tipoIdentificacion = new TipoIdentificacion();
       this.identificacionFrontal = new IdentificacionCaptura();
       this.identificacionReverso = new IdentificacionCaptura();
       this.tokenSelfie ="";
   }
}



