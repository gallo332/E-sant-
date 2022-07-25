import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras , ActivatedRoute } from '@angular/router';
import { Medecin }  from '../../models/medecin/medecin';
import { RendezVous }  from '../../models/rendezVous/rendez-vous';
import { Data } from "../../providers/data";
import { MedecinService } from '../../services/medecin/medecin.service';
import { AuthService } from  '../../services/auth/auth.service';
import { RvService } from  '../../services/patient/rv/rv.service';
import { BehaviorSubject ,Observable } from 'rxjs';
import { AlertService} from 'src/app/services/alert/alert.service';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Patient } from '../../models/patient/patient';


@Component({
  selector: 'app-new-rdv',
  templateUrl: './new-rdv.component.html',
  styleUrls: ['./new-rdv.component.scss']
})
export class NewRdvComponent implements OnInit {

  date: Date;
  type: string;
  idMedecin: string;
  medecin: Medecin;
  loginForm: FormGroup;
  inscription : boolean=false;
  connection : boolean=false; 
  currentUser: Patient;
  rv: RendezVous;
  constructor(private router: Router, private _medecinService : MedecinService, private route: ActivatedRoute,
  	private data: Data, private formBuilder: FormBuilder, private authService: AuthService, private rvService: RvService ) { 
  	this.medecin = new Medecin();
  	this.rv= new RendezVous();
  	this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
  	this.route.queryParams.subscribe(params => {
            this.date = this.data.storage.dateRdv ;
            this.type = this.data.storage.type ;
            this.idMedecin= this.data.storage.medecin;
        });
  	this._medecinService.getMedecinsByPseudo(this.idMedecin).subscribe(med => {
      this.medecin = med
      });

  	this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
  	
  }
   showLoginForm(){
   	this.connection=!this.connection;
   }

   showRegisterForm(){	
   	this.inscription=!this.inscription;
   }

   sendRdv(){
   		
   		let rdv={
   			start:this.date,
   			end: this.date,
   			title: this.type,
   			status:false,
   			patient: this.currentUser,
   			medecin: this.medecin,
   			notifier:false
   		}
   		/*this.rv.start= this.date;
   		this.rv.title= this.type;
   		this.rv.status= false;
   		this.rv.medecin= new Medecin();
   		this.rv.patient= new Patient();
   		this.rv.patient= this.currentUser;
   		this.rv.medecin=this.medecin;*/
   		console.log("PatientRV", JSON.stringify(rdv));
   		this.rvService.addPatientRv(rdv)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['patient/overview']);
                },
                error => {
                    
                });
   }

}
