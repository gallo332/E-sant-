import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'angular-bootstrap-md';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Observable,of } from "rxjs";
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ConfirmComponent }  from 'src/app/components/confirm/confirm.component';
import { DialogService }  from 'src/app/services/dialog/dialog.service';
import { RvService }  from 'src/app/services/patient/rv/rv.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RendezvousResponse } from  'src/app/models/rendezvousResponse/rendezvous-response';
import { Antecedent } from 'src/app/models/antecedent/antecedent';
import { DocumentComponent } from '../document/document.component';

@Component({
  selector: 'details-rdv',
  templateUrl: './details-rdv.component.html',
  styleUrls: ['./details-rdv.component.scss']
})
export class DetailsRdvComponent implements OnInit {
  rendezVous : RendezvousResponse=new RendezvousResponse();
  busy:any;
  tester: boolean=false;
  message:string;
  antecedent: Antecedent;
  constructor(private _rvService: RvService, private route: ActivatedRoute, 
  		private router: Router,private dialog: MatDialog) { 

  }

  ngOnInit(): void {
  		this.busy=this._rvService.getRendezVous(this.route.snapshot.paramMap.get("id"))
  			.subscribe(data =>{	    
			    if(data!==null && data.length!==0){
			      this.rendezVous=data;

			    }else{
			      this.tester=true;
			      this.message="Liste Vide";
			     
			    }
		 	 },
			  	error =>{
			    this.busy=null;
			    alert("Le serveur ne répond pas!!!");
	    
	  			}
	 		 )
  }

  prescrire(rv){
		const dialogConfig = new MatDialogConfig();
	    dialogConfig.disableClose = true;
	    dialogConfig.autoFocus = true;
	    dialogConfig.width = "65%";
	    dialogConfig.data=rv;
	    this.dialog.open(DocumentComponent,dialogConfig);

	}

}
