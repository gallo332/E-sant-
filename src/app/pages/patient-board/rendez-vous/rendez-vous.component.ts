import { Component, OnInit , ViewChild } from '@angular/core';
import { RvService } from 'src/app/services/patient/rv/rv.service';
import { BehaviorSubject ,Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import  { RendezvousResponse }  from 'src/app/models/rendezvousResponse/rendezvous-response';

@Component({
  selector: 'rendez-vous',
  templateUrl: './rendez-vous.component.html',
  styleUrls: ['./rendez-vous.component.scss']
})
export class RendezVousComponent implements OnInit {
  rendezVous: RendezvousResponse= new RendezvousResponse();
  busy:any;
  message:string;
  tester:boolean=false;
  constructor(private router:Router, private route:ActivatedRoute, private _rvService:RvService) { 

  }

  ngOnInit() {
  	
  }

}
