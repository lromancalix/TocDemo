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



export class IdVsSelfie {

    id_front: string;
    id_back: string;
    selfie: string;
    apiKey: string;
    documentType: string;

    constructor() {
        this.apiKey = "70488227ef50439d99a324219ea90a81";
        this.documentType ="";
        this.id_front = "";
        this.id_back = "";
        this.selfie = "";
    }
}

export class Response_IdVsSelfie {

    status: number;
    biometric_result: number;
    tok_token: string;
    information: string;

    constructor() {
        this.status = 0;
        this.biometric_result = 0;
        this.tok_token = "";
        this.information = "";
    }
}

