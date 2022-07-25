import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './services/auth/auth.service';
import { Patient } from './models/patient/patient';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'e-sante';

  constructor(
        private router: Router
    ) {
    }
    ngOnInit(){
    	this.router.routeReuseStrategy.shouldReuseRoute = function() {
            return false;
        };
    }

    

  
}
