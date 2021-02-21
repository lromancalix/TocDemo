import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TocTokenService } from '../../services/Toc/toc-token.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  constructor(public http: TocTokenService,  private router: Router, ) {
    if( http.cliente == null ) {
      this.router.navigate(['/home']);
    }
   }

  ngOnInit(): void {
  }

}
