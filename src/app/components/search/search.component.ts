import { Component, OnInit, ViewChild, Output, ElementRef, AfterViewInit, EventEmitter} from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { FormControl } from "@angular/forms";
import { RvService } from '../../services/patient/rv/rv.service';
import { map, startWith, tap, debounceTime, distinctUntilChanged, switchMap, flatMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from "@angular/router";
import { Medecin }  from '../../models/medecin/medecin';
import { Specialite }  from '../../models/specialite/specialite';
import { MedecinService }  from '../../services/medecin/medecin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements  OnInit {

  searchForm = new FormGroup({
  		medecinSpec : new FormControl(''),
	    location : new FormControl(''),
  })
  defaultSpec='Generaliste';
  defaultLocalite='Senegal';
  medecins: Medecin[];
  specialites: Specialite[];
  medecinsLoading = false;
  filteredMedecins: Observable<Medecin[]>;
  autoCompleteList: any[];
  specialiteComplete :any[];
  @ViewChild('autocompleteInput') autocompleteInput: ElementRef;  
  @Output() onSelectedOption = new EventEmitter();

  constructor(private _rvService : RvService, private _medecinService : MedecinService, private route :ActivatedRoute, 
  		private router :Router) { }

  ngOnInit() {
   
     this.f.location.setValue('Senegal');
    this._medecinService.getMedecins().subscribe(medecin => {
      this.medecins = medecin

    });
    this._medecinService.getSpecialite().subscribe(specialite => {
      this.specialites = specialite

    });


   /* this.filteredMedecins = this.medecinSpec.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterMedecins(state) : this.medecins.slice())
      );
*/
    this.f.medecinSpec.valueChanges.subscribe(userInput => {
            this.autoCompleteExpenseList(userInput);
        })
       
    
	 }
  /* ngAfterViewInit(){
       this.f.location.setValue('Senegal');
    this._medecinService.getMedecins().subscribe(medecin => {
      this.medecins = medecin

    });
    this._medecinService.getSpecialite().subscribe(specialite => {
      this.specialites = specialite

    });

    this.f.medecinSpec.valueChanges.subscribe(userInput => {
            this.autoCompleteExpenseList(userInput);
        })
    }*/
	 get f() { return this.searchForm.controls; }
	 private autoCompleteExpenseList(input) {
        let categoryList = this.filterCategoryList(input)
        this.autoCompleteList = categoryList;
        let specialiteList = this.filterCategoryList2(input)
        this.specialiteComplete=specialiteList;

    }

     filterCategoryList(val) {
        var categoryList = []
        if (typeof val != "string") {
            return [];
        }
        if (val === '' || val === null) {
            return [];
        }
        return val ? this.medecins.filter(s => s.prenom.toLowerCase().indexOf(val.toLowerCase()) != -1)
            : this.medecins;
    }
    filterCategoryList2(val) {
        var categoryList = []
        if (typeof val != "string") {
            return [];
        }
        if (val === '' || val === null) {
            return [];
        }
        return val ? this.specialites.filter(s => s.nom.toLowerCase().indexOf(val.toLowerCase()) != -1)
            : this.specialites;
    }

    // after you clicked an autosuggest option, this function will show the field you want to show in input
    displayFn(specialite: Specialite) {
        let k = specialite ? specialite.nom : specialite;
        return k;
    }
    searchFill(event) {
    let spec= event.source.value;
        if(spec) {
          this.f.medecinSpec.setValue(spec);
        }       
    }

    search(){
    	if(this.specialites.indexOf(this.f.medecinSpec.value) === -1)
    	{
	    	if(this.f.location.value === '' || this.f.location.value.toLowerCase() === 'senegal' )
	    	{    	       
	    	       this.router.navigate(['',this.defaultSpec,'Senegal']);
	               
	    	}
   		}else{
   			if(this.f.location.value === '' || this.f.location.value.toLowerCase() === 'senegal' )
	    	{    	       
	    	       this.router.navigate(['',this.f.medecinSpec.value.nom, this.defaultLocalite]);
	               
	    	}
   		}
    }


	focusOnPlaceInput() {
  		this.autocompleteInput.nativeElement.focus();
  		this.autocompleteInput.nativeElement.value = '';
	}

 

}
