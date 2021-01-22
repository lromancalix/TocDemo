import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { FooteroneComponent } from './footerone/footerone.component';
import { LivenesscamComponent } from './livenesscam/livenesscam.component';



@NgModule({
  declarations: [NavbarComponent, FooteroneComponent, LivenesscamComponent],
  exports: [
    NavbarComponent,
    FooteroneComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ComponentsModule { }
