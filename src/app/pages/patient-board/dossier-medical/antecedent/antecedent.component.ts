import { Component, ViewChild , OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'angular-bootstrap-md';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DossierService }  from "src/app/services/patient/dossier/dossier.service";
import { AddFileComponent } from "../add-file/add-file.component";
import { Observable,of } from "rxjs";
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ConfirmComponent }  from 'src/app/components/confirm/confirm.component';
import { DialogService }  from 'src/app/services/dialog/dialog.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Antecedent }  from "src/app/models/antecedent/antecedent";
import { inflate, deflate }  from 'pako';
@Component({
  selector: 'antecedent',
  templateUrl: './antecedent.component.html',
  styleUrls: ['./antecedent.component.scss']
})
export class AntecedentComponent implements OnInit {

 antecedents:Antecedent[];
  @ViewChild('pdfViewerOnDemand') pdfViewerOnDemand;
  prescription:any;	
  busy : any;
  pdfSrc:any;
  message:string;
  tester:boolean=false;

  constructor(private _dossierService: DossierService,private dialog: MatDialog, private notification: NotificationService, 
  	private dialogService:DialogService, private router:Router, private route :ActivatedRoute){}	

  ngOnInit(){
  	this.busy=this._dossierService.allAntecedentByIdD().subscribe(data =>{
		    console.log("reponse all patient event ",data)
		    if(data!==null && data.length!==0){
		      this.antecedents=data;
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
  addAntecedent(){
  	this._dossierService.antecedentForm();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(AddFileComponent,dialogConfig);

  }
  displayFile(id:any){
  	let antecedent:Antecedent =this.antecedents.find(data => data.id == id);
  	let output= inflate(antecedent.data, { raw: true });
  	this.pdfViewerOnDemand.url="data:application/pdf;base64," + antecedent.data;
  	console.log(this.pdfViewerOnDemand.url);
  }
  /*fileDetail(antecedent :any){
  	this.router.navigate(['./dossier-details'] , { relativeTo : this.route});
  }*/

  deleteAntecedent(id:any){
  	this.dialogService.openConfirmDialog("Etes vous sur de supprimer ce fichier?")
  	.afterClosed().subscribe(res=>{
  		if(res){
  			console.log(id);
  			 this._dossierService.deleteAntecedent(id)
      			.subscribe( data => {
       			 this.antecedents = this.antecedents.filter(data => data.id !== id);
      		})		
  		}
  	}) ;
  }

}
