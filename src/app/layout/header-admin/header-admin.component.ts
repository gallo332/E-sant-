import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Medecin }  from '../../models/medecin/medecin';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.scss']
})
export class HeaderAdminComponent implements OnInit {

  currentMedecin: Medecin;
  constructor(private authService: AuthService,private router: Router ) { 
  	this.authService.currentMedecin.subscribe(x => this.currentMedecin = x);
  
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logoutMed();
    this.router.navigate(['/login-admin']);
}


}
