import { Component, ViewChild , OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dossier-medical',
  templateUrl: './dossier-medical.component.html',
  styleUrls: ['./dossier-medical.component.scss']
})
export class DossierMedicalComponent implements OnInit{

  constructor(private route :ActivatedRoute){}	

  ngOnInit(){
  	
  }

}
