import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Medecin }  from '../../models/medecin/medecin';

@Component({
  selector: 'header-med',
  templateUrl: './header-med.component.html',
  styleUrls: ['./header-med.component.scss']
})
export class HeaderMedComponent implements OnInit {

 currentMedecin: Medecin;
  constructor(private authService: AuthService,private router: Router ) { 
  	this.authService.currentMedecin.subscribe(x => this.currentMedecin = x);
  
  }
  
  ngOnInit() {
  }
 
  logout() {
        this.authService.logoutMed();
        this.router.navigate(['/login-pro']);
    }

}
