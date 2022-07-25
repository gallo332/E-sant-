import { Component, OnInit, ViewChild , Input } from '@angular/core';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {MatRadioChange} from '@angular/material/radio';
import { MatStepper} from '@angular/material/stepper';
import { AuthService } from '../../services/auth/auth.service';
import { Router, NavigationExtras } from '@angular/router';
import { Medecin } from '../../models/medecin/medecin';
import { Data }  from '../../providers/data';
import {AbstractControl ,FormBuilder, FormGroup, FormArray,FormControl , Validators} from '@angular/forms';
@Component({
  selector: 'rdv-card',
  templateUrl: './rdv-card.component.html',
  styleUrls: ['./rdv-card.component.scss']
  
})
export class RdvCardComponent implements OnInit {

  object : Object;
  formGroup: FormGroup;
  @Input() medecin: string;
  isSubmitted=false;
  @ViewChild('stepper') private myStepper: MatStepper;
  /** Returns a FormArray with the name 'formArray'. */
  get formArray(): AbstractControl | null { return this.formGroup.get('formArray'); }

  constructor(private _formBuilder: FormBuilder, private _authService: AuthService, private router :Router, private data: Data) {
   }

  ngOnInit() {
	    this.formGroup = this._formBuilder.group({
	      formArray: this._formBuilder.array([
	        this._formBuilder.group({
	          typeConsultation: ['', Validators.required]
	        }),
	        this._formBuilder.group({
	          dateRdv: ['', Validators.required]
	        }),
	      ])
	    });
	}

    goForward(event : MatRadioChange){
    	console.log(this.formArray.value[0].typeConsultation);
    	this.myStepper.next();
    }

    retrieveData(date){
    	this.formArray.value.dateRdv= date;
    	console.log(this.formArray.value.dateRdv);
    	this.myStepper.next();
    }

    onSubmit(){
    	this.isSubmitted = true;
    	
    	console.log("okk")	;
			this.data.storage ={
			        "type": this.formArray.value[0].typeConsultation ,
			        "dateRdv": this.formArray.value.dateRdv,
			        "medecin": this.medecin 
			    }
  	
		// if(this._authService.currentUserValue === null)
	    		this.router.navigate(['account/new']);
   	   

    }
  
}
