import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';
import { Medecin } from '../../models/medecin/medecin';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  currentMedecin: Medecin;
  constructor(
        private router: Router,
        private authService: AuthService
    ) {
        this.authService.currentMedecin.subscribe(x => this.currentMedecin = x);
    }

  ngOnInit(): void {
  }

}
