import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { DossierService }  from "src/app/services/patient/dossier/dossier.service";
import { AuthService }  from "src/app/services/auth/auth.service";
import { Router, NavigationExtras , ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { IpfsDaemonService } from 'src/app/services/ipfs/ipfs.service';
@Component({
  selector: 'app-add-file',
  templateUrl: './add-file.component.html',
  styleUrls: ['./add-file.component.scss']
})
export class AddFileComponent implements OnInit {
  selectedFile: File;
  response: any;
  constructor( public service: DossierService,
  			  public dialogRef: MatDialogRef<AddFileComponent>,
  			  private notificationService: NotificationService,
  			  private _auth: AuthService,
  			  private router:Router,
  			  private route:ActivatedRoute) { }

  ngOnInit(): void {
  }

   public onFileChanged(event) {
   if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      //this.ipfs.addFile(event);
      console.log("okk");
    }

  }

  onClear(){
    this.service.antecedent.reset();
    this.service.antecedentForm();
    this.notificationService.success(':: Submitted successfully');

  }
  onSubmit(){
  	let input = new FormData();
  	let antecedent={
  		name:this.selectedFile.name,
      description:this.service.antecedent.controls.description.value,
  		dossier:this._auth.currentUserValue.dossier.id.toString()
  	}
  	input.append('file',this.selectedFile, this.selectedFile.name);
  	console.log(this.selectedFile.name);
  	if(antecedent !== undefined && antecedent !==null){
      for (var property in antecedent) {
          if (antecedent.hasOwnProperty(property)) {
              input.append(property, antecedent[property]);
              
          }
      }
    }
  	console.log(this._auth.currentUserValue.dossier.id);
   		this.service.addAntecedent(input)
            .subscribe(
                data => {
                	if( data !==null && data !==undefined)
                	{
                		this.onClose();
                    	this.router.navigate(['./'], {relativeTo: this.route});
                    	this.notificationService.success(':: Succes: Fichier enregistré avec succés');
                    }
                    else{
                    	this.notificationService.warn(':: Erreur : Fichier non enregistré');
                    }
                    
                },
                error => {
                    this.notificationService.warn(':: Erreur : Le serveur ne repond pas');
                });
  	/*input.append('name',this.selectedFile.name);
  	input.append('file',this.selectedFile);
  	input.append('dossier', this._auth.currentUserValue.dossier.id)
	*/

  }

  onClose(){
  	this.service.antecedent.reset();
    this.service.antecedentForm();
    this.dialogRef.close();
  }

}
