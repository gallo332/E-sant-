import { Component, ChangeDetectionStrategy, OnInit, ElementRef, ViewChild } from '@angular/core';
import { RvService } from 'src/app/services/patient/rv/rv.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { tap } from 'rxjs/operators';
import { BehaviorSubject ,Observable, of } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { RendezVousComponent } from '../rendez-vous/rendez-vous.component';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DossierService }  from "src/app/services/patient/dossier/dossier.service";
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ConfirmComponent }  from 'src/app/components/confirm/confirm.component';
import { DialogService }  from 'src/app/services/dialog/dialog.service';
import { PartageDocComponent } from '../partage-doc/partage-doc.component';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']

})
export class OverviewComponent implements OnInit {
  rendezVous: any;	
  busy : any;
  occup:any;
  message: string;
  tester:boolean=false;
  display:boolean=false;
  displayFiles:boolean=false;
  @ViewChild(RendezVousComponent) rendezVousRef: RendezVousComponent;
  constructor(private _authService: AuthService, private _rvService: RvService, private router:Router, 
  		private route:ActivatedRoute, private _dossierService: DossierService,private dialog: MatDialog, 
  		private notification: NotificationService, private dialogService:DialogService) { 
  	this.message="";
  }

  ngOnInit() {
	    this.busy=this._rvService.getPatientRv().subscribe(data =>{
		    //console.log("reponse all patient event ",data)
		    if(data!==null && data.length!==0){
		      this.rendezVous=data;
		    }else{
		      this.message="Aucun rendez-vous à afficher!!!";
		      this.tester=true;
		    }
		  },
	  error =>{
	    this.busy=null;
	    alert("Le serveur ne répond pas!!!");
	    
	  }
	  )
	}

	viewRdv(id: any){
		//this.router.navigate(['../rdv'], {relativeTo: this.route});
		let rendezvous:any;
		this.occup=this._rvService.getRendezVous(id).subscribe(data =>{
		   
		    if(data!==null && data.length!==0){
		      rendezvous=data;
		      this.rendezVousRef.rendezVous=rendezvous;
			  
		    }else{
		      this.tester=true;
		      this.message="Liste Vide";
		     
		    }
		  },
	  error =>{
	    this.occup=null;
	    alert("Le serveur ne répond pas!!!");    
	  }
	  )
		this.display=true;
		console.log(id);
		
		//this.router.navigate([{ outlets: { rdvdetails: ['rdv', id] }}]);

	}

	partagerDoc(rv){
		const dialogConfig = new MatDialogConfig();
	    dialogConfig.disableClose = true;
	    dialogConfig.autoFocus = true;
	    dialogConfig.width = "60%";
	    dialogConfig.data=rv;
	    this.dialog.open(PartageDocComponent,dialogConfig);

	}
	sharedFiles(){
		this.displayFiles=!this.displayFiles;

	}
     
  

}
