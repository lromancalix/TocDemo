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
import { CapturaSelfieLivenessComponent } from './captura/captura-selfie-liveness/captura-selfie-liveness.component';



@NgModule({
  declarations: [NavbarComponent, FooteroneComponent, LivenesscamComponent, DatosPersonalesComponent, CapturaIdentificacionComponent, CapturaLivenessComponent, IdentificacionComponent, CapturaIdentiComponent, CapturaSelfieLivenessComponent],
  exports: [
    NavbarComponent,
    FooteroneComponent,
    DatosPersonalesComponent,
    CapturaIdentificacionComponent,
    CapturaLivenessComponent,
    IdentificacionComponent,
    CapturaIdentiComponent,
    CapturaSelfieLivenessComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ComponentsModule { }
