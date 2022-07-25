import { Component, ViewChild , OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'angular-bootstrap-md';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DossierService }  from "src/app/services/patient/dossier/dossier.service";
import { AddExamComponent } from "../add-exam/add-exam.component";
import { Observable,of } from "rxjs";
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ConfirmComponent }  from 'src/app/components/confirm/confirm.component';
import { DialogService }  from 'src/app/services/dialog/dialog.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Examen }  from "src/app/models/examen/examen";
import { inflate, deflate }  from 'pako';

@Component({
  selector: 'examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.scss']
})
export class ExamenComponent implements OnInit {

  examens:Examen[];
  @ViewChild('pdfViewerOnDemand') pdfViewerOnDemand;
  prescription:any;	
  busy : any;
  pdfSrc:any;
  message:string;
  tester:boolean=false;

  constructor(private _dossierService: DossierService,private dialog: MatDialog, private notification: NotificationService, 
  	private dialogService:DialogService, private router:Router, private route :ActivatedRoute){}	

  ngOnInit(){
  	this.busy=this._dossierService.allExamenByIdD().subscribe(data =>{
		    if(data!==null && data.length!==0){
		      this.examens=data;
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
  addExamen(){
  	this._dossierService.examenForm();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(AddExamComponent,dialogConfig);

  }
  displayFile(id:any){
  	let examen:Examen =this.examens.find(data => data.id == id);
  	//let output= inflate(antecedent.data, { raw: true });
  	this.pdfViewerOnDemand.url="data:application/pdf;base64," + examen.data;
  }
  /*fileDetail(antecedent :any){
  	this.router.navigate(['./dossier-details'] , { relativeTo : this.route});
  }*/

  deleteExamen(id:any){
  	this.dialogService.openConfirmDialog("Etes vous sur de supprimer ce fichier?")
  	.afterClosed().subscribe(res=>{
  		if(res){
  			console.log(id);
  			 this._dossierService.deleteExamen(id)
      			.subscribe( data => {
       			 this.examens = this.examens.filter(data => data.id !== id);
      		})		
  		}
  	}) ;
  }

}
