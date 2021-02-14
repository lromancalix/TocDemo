export class TipoIdentificacion {
    id: string;
    name: string;
}

export class CapturaTOC {

    tipoIdentificacion: TipoIdentificacion;// en caso de ser identificacion
    token: string;
    capturaExitosa: boolean;
    imagen: string;
    
    constructor() {
        this.tipoIdentificacion = null;
        this.token = "";
        this.capturaExitosa = false;
        this.imagen = "";
    }
}

export class DatosOnboarding {
   nombre: string;
   app: string;
   apm: string;
   correo: string;
   tipoIdentificacion: TipoIdentificacion;

   selfie: CapturaTOC;
   identificacionFrontal: CapturaTOC;
   identificacionReverso: CapturaTOC;

   constructor() {
       this.app ="";
       this.apm ="";
       this.correo ="";
       this.nombre ="";
       this.tipoIdentificacion = new TipoIdentificacion();
       this.identificacionFrontal = new CapturaTOC();
       this.identificacionReverso = new CapturaTOC();
       this.selfie = new CapturaTOC();
   }
}



