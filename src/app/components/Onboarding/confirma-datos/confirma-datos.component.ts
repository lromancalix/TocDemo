import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatosOnboarding } from 'src/app/interfaces/clases';

@Component({
  selector: 'app-confirma-datos',
  templateUrl: './confirma-datos.component.html',
  styleUrls: ['./confirma-datos.component.css']
})
export class ConfirmaDatosComponent implements OnInit {

  @Input()
  datosCapturados: DatosOnboarding;

  constructor() { 
  }

  ngOnInit(): void {
  }

}
