import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { DossierService }  from "src/app/services/patient/dossier/dossier.service";
import { AuthService }  from "src/app/services/auth/auth.service";
import { Router, NavigationExtras , ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { RendezvousResponse } from 'src/app/models/rendezvousResponse/rendezvous-response';
import {MatSelectChange} from '@angular/material/select';
import { Antecedent } from 'src/app/models/antecedent/antecedent';
import { ExamenMedecin }  from 'src/app/models/examenmedecin/examenmedecin';

interface DocType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'partage-doc',
  templateUrl: './partage-doc.component.html',
  styleUrls: ['./partage-doc.component.scss']
})
export class PartageDocComponent implements OnInit {
	partageForm: FormGroup ;
	docs:any;
	busy:any;
	tester:boolean=false;
	message:string;
	rendezVous: RendezvousResponse;
	doctypes: DocType[] = [
    {value: 'antecedent', viewValue: 'Antecedent'},
    {value: 'examen', viewValue: 'Examen'},
    {value: 'prescription', viewValue: 'Prescription'}
  ];
	docTypeControl = new FormControl();
  	docControl = new FormControl();
	
  constructor(private service: DossierService,
  			  public dialogRef: MatDialogRef<PartageDocComponent>,
  			  private notificationService: NotificationService,
  			  private _auth: AuthService,
  			  private router:Router,
  			  private route:ActivatedRoute,
  			  @Inject(MAT_DIALOG_DATA) public data: RendezvousResponse) {
  		this.partageForm=new FormGroup({
  			docType: this.docTypeControl,
  			document: this.docControl,

  		});

  			   }

  ngOnInit(): void {
  	this.rendezVous=this.data;
  	this.docControl.disable();
  }

  onSubmit(){
	 if(this.docTypeControl.value=='examen')
  	 {	
	  	let identifiants=[this.docControl.value,this.rendezVous.idM,this.rendezVous.id];
	  	this.busy=this.service.partagerExamen(identifiants).subscribe(data =>{
			    //console.log("reponse all patient event ",data)
			   if( data !==null && data !==undefined)
                	{
                    	this.onClose();
                    	this.router.navigate(['./'], {relativeTo: this.route});
                    	this.notificationService.success(':: Succes: Fichier partag& avec succés');
                    }
                    else{
                    	this.onClose();
                    	this.router.navigate(['./'], {relativeTo: this.route});
                    	this.notificationService.warn(':: Erreur : Fichier non partagé');
                    }
			  },
		  error =>{
		    this.busy=null;
		    alert("Le serveur ne répond pas!!!");
		    
		  }
		  )
	 }else{
	 	if(this.docTypeControl.value=='antecedent')
  	 	{	
		  	let identifiants=[this.docControl.value,this.rendezVous.idM,this.rendezVous.id];
		  	this.busy=this.service.partagerAntecedent(identifiants).subscribe(data =>{
				    //console.log("reponse all patient event ",data)
				   if( data !==null && data !==undefined)
	                	{
	                    	this.onClose();
	                    	this.router.navigate(['./'], {relativeTo: this.route});
	                    	this.notificationService.success(':: Succes: Fichier partagé avec succés');
	                    }
	                    else{
	                    	this.onClose();
	                    	this.router.navigate(['./'], {relativeTo: this.route});
	                    	this.notificationService.warn(':: Erreur : Fichier non partagé');
	                    }
				  },
			  error =>{
			    this.busy=null;
			    alert("Le serveur ne répond pas!!!");
			    
			  }
			  )
	 	} 	
	 }

  }
  onClose(){
    this.dialogRef.close();
  }
  chargerDocs(event :MatSelectChange){
  	 if(this.docTypeControl.value==='antecedent')
  	 {
  	 	this.busy=this.service.allAntecedentByIdD().subscribe(data =>{
		    //console.log("reponse all patient event ",data)
		    if(data!==null && data.length!==0){
		      this.docs=data;
		      this.docControl.enable();
		    }else{
		      this.message="Aucun antecedents à afficher!!!";
		      this.tester=true;
		    }
		  },
	  error =>{
	    this.busy=null;
	    alert("Le serveur ne répond pas!!!");
	    
	  }
	  )
  	 }else{
	  	 	if(this.docTypeControl.value=='examen')
	  	 {
	  	 	this.busy=this.service.allExamenByIdD().subscribe(data =>{
			    //console.log("reponse all patient event ",data)
			    if(data!==null && data.length!==0){
			      this.docs=data;
			      this.docControl.enable();
			    }else{
			      this.message="Aucun antecedents à afficher!!!";
			      this.tester=true;
			    }
			  },
		  error =>{
		    this.busy=null;
		    alert("Le serveur ne répond pas!!!");
		    
		  }
		  )
	  	 }

  	 }

  }

}
