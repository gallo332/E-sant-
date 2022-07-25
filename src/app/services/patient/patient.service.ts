import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Patient } from '../../models/patient/patient';
import { User } from '../../models/user/user'
import { ApiService } from '../api/api.service';
import { AuthService } from '../auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class PatientService {
	/*patient :Patient;
	user: User;
  constructor(private authService :AuthService, private api :ApiService) { 
  	this.user= this.authService.currentUserValue;
  }*/
  constructor(private authService :AuthService, private api :ApiService) { 
  }
  /*getPatient(): Observable<Patient>
  {
  	return this.api.get('patientrvbyidP',this.user.id);
  }*/
   getPatientById(id:number) :Observable<Patient> {
    return this.api.get(`patientByIdP?idP=${id}`);
            
  }
}
