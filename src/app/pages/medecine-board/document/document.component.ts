import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { DossierService }  from "src/app/services/patient/dossier/dossier.service";
import { AuthService }  from "src/app/services/auth/auth.service";
import { MatSelectChange } from '@angular/material/select';
import { FormBuilder, FormGroup, Validators,FormControl ,FormArray } from '@angular/forms';
import { Router, NavigationExtras , ActivatedRoute } from '@angular/router';
import { SelectAutocompleteComponent } from "select-autocomplete";
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {
  @ViewChild(SelectAutocompleteComponent) multiSelect: SelectAutocompleteComponent;
  public observation:boolean;
  public medicaments: FormArray;
  public documentForm: FormGroup; 
  constructor(public dialogRef: MatDialogRef<DocumentComponent>,
  			  private notificationService: NotificationService,
  			  private _auth: AuthService,
  			  private _dossier:DossierService,
  			  private router:Router,
  			  private route:ActivatedRoute,
  			  private fb : FormBuilder) {

  	this.documentForm=this.fb.group({
	    docType: [''],
	    observations: ['']	,
	    medicaments: this.fb.array([this.createMedic()])	        		 
  		});

  			   }

  ngOnInit(): void {
  }
  chargerDoc(event :MatSelectChange){
  	if(this.docTypeControls === '0' ){
  		this.observation=true;
  	}
  	else{
  		this.observation=false;
  	}
  }
  
  get docTypeControls(){
  	return this.documentForm.get('docType')['controls'];
  }
  get medicamentControls() {
    return this.documentForm.get('medicaments')['controls'];
  }

  createMedic(): FormGroup {
    return this.fb.group({
      nom: '',
      posologie: ''  
    });
  }

  addMedic(): void {
    this.medicaments = this.documentForm.get('medicaments') as FormArray;
    this.medicaments.push(this.createMedic());
  }

  removeMedic(i: number) {
    this.medicaments.removeAt(i);
  }
   onClose(){
    this.dialogRef.close();
  }

}
