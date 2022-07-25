import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';
import { Medecin } from '../../models/medecin/medecin';
@Component({
  selector: 'medecin-layout',
  templateUrl: './medecin-layout.component.html',
  styleUrls: ['./medecin-layout.component.scss']
})
export class MedecinLayoutComponent implements OnInit {

    currentMedecin: Medecin;
  constructor(
        private router: Router,
        private authService: AuthService
    ) {
        this.authService.currentMedecin.subscribe(x => this.currentMedecin = x);
    }
    ngOnInit(){
    	
    }

}
