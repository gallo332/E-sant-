import { Component, OnInit } from '@angular/core';
import { RvService } from 'src/app/services/patient/rv/rv.service';
import { BehaviorSubject ,Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import  { RendezvousResponse }  from 'src/app/models/rendezvousResponse/rendezvous-response';

@Component({
  selector: 'app-delete-rendez-vous',
  templateUrl: './delete-rendez-vous.component.html',
  styleUrls: ['./delete-rendez-vous.component.scss']
})
export class DeleteRendezVousComponent implements OnInit {
  rendezVous= new RendezvousResponse();
  busy:any;
  message:string;
  tester:boolean=false;
  constructor(private _rvService:RvService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  	this.busy=this._rvService.getRendezVous(this.route.snapshot.paramMap.get('id')).subscribe(data =>{
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

}
