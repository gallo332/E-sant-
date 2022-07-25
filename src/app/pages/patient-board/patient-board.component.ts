import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Patient } from '../../models/patient/patient'

@Component({
  selector: 'app-patient-board',
  templateUrl: './patient-board.component.html',
  styleUrls: ['./patient-board.component.scss']
})
export class PatientBoardComponent implements OnInit {
   user: Patient;
  constructor(private authService: AuthService) { 
  	this.user= this.authService.currentUserValue;
  }

  ngOnInit() {
  }

  getPatient(): void{

  }
}
