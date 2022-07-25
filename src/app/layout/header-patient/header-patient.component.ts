import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Patient } from '../../models/patient/patient'


@Component({
  selector: 'header-patient',
  templateUrl: './header-patient.component.html',
  styleUrls: ['./header-patient.component.scss']
})
export class HeaderPatientComponent implements OnInit {
	currentUser: Patient;
  constructor(private authService: AuthService,private router: Router ) { 
  	this.authService.currentUser.subscribe(x => this.currentUser = x);
  
  }
  
  ngOnInit() {
  }

  isLogged():void{

  }
  logout() {
        this.authService.logout();
        this.router.navigate(['/login-patient']);
    }

 }
