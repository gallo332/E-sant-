import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { DossierService }  from "src/app/services/patient/dossier/dossier.service";
import { AuthService }  from "src/app/services/auth/auth.service";
import { Router, NavigationExtras , ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.scss']
})
export class AddExamComponent implements OnInit {

  selectedFile: File;
  response: any;
  constructor(public service: DossierService,
  			  public dialogRef: MatDialogRef<AddExamComponent>,
  			  private notificationService: NotificationService,
  			  private _auth: AuthService,
  			  private _dossier:DossierService,
  			  private router:Router,
  			  private route:ActivatedRoute) { }

  ngOnInit(): void {
  }

   public onFileChanged(event) {
   if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      console.log("okk");
    }

  }
    onClear() {
    this.service.examen.reset();
    this.service.examenForm();
    this.notificationService.success(':: Submitted successfully');

  }
  get f() { return this.service.examen.controls; }
  onSubmit(){
  	let input = new FormData();
  	let examen={
  		name:this.selectedFile.name,
  		structure:this.f.structure.value,
  		description:this.f.description.value,
  		dossier:this._auth.currentUserValue.dossier.id.toString()
  	}
  	input.append('file',this.selectedFile, this.selectedFile.name);
  	if(examen !== undefined && examen !==null){
      for (var property in examen) {
          if (examen.hasOwnProperty(property)) {
              input.append(property, examen[property]);             
          }
      }
    }
  	console.log(this._auth.currentUserValue.dossier.id);
   		this._dossier.addExamen(input)
            .subscribe(
                data => {
                	if( data !==null && data !==undefined)
                	{
                		this.onClose();
                    	this.router.navigate(['./'], {relativeTo: this.route});
                    	this.notificationService.success(':: Succes: Fichier enregistré avec succés');
                    }
                    else{
                    	this.onClose();
                    	this.router.navigate(['./'], {relativeTo: this.route});
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
  	this.service.examen.reset();
    this.service.examenForm();
    this.dialogRef.close();
  }

}
