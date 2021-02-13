import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { FooteroneComponent } from './footerone/footerone.component';
import { LivenesscamComponent } from './livenesscam/livenesscam.component';
import { DatosPersonalesComponent } from './onboarding/datos-personales/datos-personales.component';
import { CapturaLivenessComponent } from './onboarding/captura-liveness/captura-liveness.component';
import { CapturaIdentificacionComponent } from './Onboarding/captura-identificacion/captura-identificacion.component';
import { IdentificacionComponent } from './identificacion/identificacion.component';
import { CapturaIdentiComponent } from './Onboarding/captura-identi/captura-identi.component';



@NgModule({
  declarations: [NavbarComponent, FooteroneComponent, LivenesscamComponent, DatosPersonalesComponent, CapturaIdentificacionComponent, CapturaLivenessComponent, IdentificacionComponent, CapturaIdentiComponent],
  exports: [
    NavbarComponent,
    FooteroneComponent,
    DatosPersonalesComponent,
    CapturaIdentificacionComponent,
    CapturaLivenessComponent,
    IdentificacionComponent,
    CapturaIdentiComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ComponentsModule { }
