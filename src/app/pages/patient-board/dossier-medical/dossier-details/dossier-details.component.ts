import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DossierService }  from "src/app/services/patient/dossier/dossier.service";
import  { Antecedent }  from "src/app/models/antecedent/antecedent";
import  { Examen }  from "src/app/models/examen/examen";
import { inflate, deflate }  from 'pako';

@Component({
  selector: 'app-dossier-details',
  templateUrl: './dossier-details.component.html',
  styleUrls: ['./dossier-details.component.scss']
})
export class DossierDetailsComponent implements OnInit {

  file: any;
  url:string;
  arrayUrl:any;
  busy:any;	
  tester:boolean=false;
  message:string;
  fileType: string;
  doc:any;
  constructor(private router:Router, private route:ActivatedRoute, private _dossierService:DossierService) { 
  	this.url=this.router.url;
  	this.arrayUrl= this.url.split('/',4);
  	this.fileType=this.arrayUrl[3];
  }

  ngOnInit() {
  	if( this.fileType ==="antecedent" )
  	{
  		this.file= new Antecedent();
  		this.busy=this._dossierService.getAntecedentById(this.route.snapshot.paramMap.get("id")).subscribe(data =>{
		    
		    if(data!==null && data.length!==0){
		      this.file=data;
		      console.log(this.file.data);
		      /* let binary= atob(this.file.data);
		       let binaryChar=binary.split('').map(function (x) { return x.charCodeAt(0); });
		       let array=new Uint8Array(binaryChar);
		       let input = inflate(array);*/
 		 	   this.doc= this.file.data;	
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
  	else{
  		if (this.fileType === "examen") {
  			// code...
  			this.file= new Examen();
  			this.busy=this._dossierService.getExamenById(this.route.snapshot.paramMap.get("id"))
  			.subscribe(data =>{
		    
			    if(data!==null && data.length!==0){
			      this.file=data;
			      console.log(this.file.data);
			      /* let binary= atob(this.file.data);
			       let binaryChar=binary.split('').map(function (x) { return x.charCodeAt(0); });
			       let array=new Uint8Array(binaryChar);
			       let input = inflate(array);*/
	 		 	   this.doc= this.file.data;	
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
  	}
  	//let binary= window.atob(this.file.data);
  	//let binaryChar=binary.split('').map(function (x) { return x.charCodeAt(0); });
  	//let arrayBin=this.b64DecodeUnicode(this.file.data);
  	/*try {
 		 let output = inflate(this.file.data, {raw:true});
 		 this.doc="data:application/pdf;base64," + output;	

	} catch (err) {
  		console.log(err);
	}*/

  	
  }
  b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

}
