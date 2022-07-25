import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { BehaviorSubject ,Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { map } from 'rxjs/operators';
import { Patient }  from 'src/app/models/patient/patient';
import { Medecin }  from 'src/app/models/Medecin/medecin'


@Injectable({
  providedIn: 'root'
})
export class AuthService {
	isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedInMed = new BehaviorSubject<boolean>(false);
	private currentUserSubject: BehaviorSubject<Patient>;
  public currentUser: Observable<Patient>;
  private currentMedecinSubject: BehaviorSubject<Medecin>;    
  public currentMedecin: Observable<Medecin>;
    patient: Patient;
    medecin: Medecin;
  constructor(private api: ApiService, private router: Router) {

  	this.currentUserSubject = new BehaviorSubject<Patient>(JSON.parse(localStorage.getItem('patient')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.currentMedecinSubject = new BehaviorSubject<Medecin>(JSON.parse(localStorage.getItem('medecin')));
    this.currentMedecin = this.currentMedecinSubject.asObservable();
   }

    public get currentUserValue(): Patient {
        return this.currentUserSubject.value;
    }
    public get currentMedecinValue(): Medecin {
        return this.currentMedecinSubject.value;
    }

  ngOnInit() {

  }  
  login(username: any, password: any) {
    
    return this.api.post('authpatient', { email:username, password:password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                	this.patient={
                		idP:user.id,
                		prenom:user.prenom,
                		nom:user.nom,
                		adresse: user.adresse,
                		tel:user.tel,
                		email:user.email,
                		password:user.password,
                		dossier:user.dossier,
                		token:user.token
                		
                	}
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('patient', JSON.stringify(this.patient));
                    this.currentUserSubject.next(this.patient);
                }
                return this.patient;
            }));
          
  }
  async logout() {
        // remove user from local storage to log user out
        this.isLoggedIn.next(false);
        localStorage.removeItem('patient');
        this.currentUserSubject.next(null);
        this.currentUserSubject.next(null);
    }

    loginMed(username: any, password: any) {
    
    return this.api.post('authmedecin', { email:username, password:password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                  this.medecin={
                    idM:user.id,
                    prenom:user.prenom,
                    nom:user.nom,
                    tel:user.tel,
                    email:user.email,
                    identifiant:user.identifiant,
                    description:user.description,
                    groupe:user.groupe,
                    password:user.password,
                    token:user.token,
                    structure: user.structure,
                    color: user.color,
                    startHour:user.startHour,
                    endHour:user.endHour,
                    WorkDays:user.workDays
                 
                    
                  }
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('medecin', JSON.stringify(this.medecin));
                    this.currentMedecinSubject.next(this.medecin);
                }
                return this.medecin;
            }));
          
  }
  async logoutMed() {
        // remove user from local storage to log user out
        this.isLoggedInMed.next(false);
        localStorage.removeItem('medecin');
        this.currentMedecinSubject.next(null);
        //this.currentUserSubject.next(null);
    }
}
