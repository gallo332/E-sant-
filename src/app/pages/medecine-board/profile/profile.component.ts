import { Component, OnInit, ViewChild, Output, ElementRef, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl } from "@angular/forms";
import { RvService } from '../../../services/patient/rv/rv.service';
import { map, startWith, tap, debounceTime, distinctUntilChanged, switchMap, flatMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from "@angular/router";
import { Medecin }  from  "../../../models/medecin/medecin";
import { Specialite }  from '../../../models/specialite/specialite'
import { MedecinService }  from '../../../services/medecin/medecin.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
   
})
export class ProfileComponent implements OnInit {


  medecin = new Medecin();
  constructor(private _rvService : RvService, private _medecinService : MedecinService, private route :ActivatedRoute, 
  		private router :Router) {
  			console.log(this.route.snapshot.paramMap.get("identifiant"));
  		 }

  ngOnInit() {
  	this._medecinService.getMedecinsByPseudo(this.route.snapshot.paramMap.get("identifiant")).subscribe(med => {
      this.medecin = med

    });
  }

}
