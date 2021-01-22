import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var $:any;

@Component({
  selector: 'app-validaciones',
  templateUrl: './validaciones.component.html',
  styleUrls: ['./validaciones.component.css']
})
export class ValidacionesComponent implements OnInit {

  form: FormGroup;

  

  constructor(private fb: FormBuilder) { }


  ngAfterViewInit(){
    $(document).ready(function(){

      $("#btn-foto-validaciones").click(function() {
        $("#liveness").liveness({
          locale: "es",
          session_id: "dba340d2230c4a7eb06582492d676242",
          http: true,
          callback: function (token) {
            alert(token);
          },
          failure: function (error) {
            alert(error);
          },
        });
      });

    });
}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      app: ['', [Validators.required]],
      apm: ['', [Validators.required]]
    });
  }

  get EsNombreValido() {
    return this.form.get('nombre').invalid && this.form.get('nombre').touched;
  }
  get EsAppValido() {
    return this.form.get('app').invalid && this.form.get('app').touched;
  }
  get EsApmValido() {
    return this.form.get('apm').invalid && this.form.get('apm').touched;
  }

  Guardar() {
    
  }

  CapturarImagen() {
    if ( this.form.valid ) {
      this.MostrarModal();
    }
  }

  private MostrarModal() {
    $(".modal").show();

   $("#liveness").liveness({
     locale: "es",
     session_id: $("#txt-nombre").val(),
     http: true,
     callback: function (token) {
       $(".modal").hide();
       alert("Usuario válido!");
     },
     failure: function (error) {
       alert( error);
       $(".modal").hide();
       alert("Ocurrió un error al capturar la imagen.");
     },
   });
 }


}
