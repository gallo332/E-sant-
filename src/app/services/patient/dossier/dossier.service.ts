import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { Observable,of } from "rxjs";
import{ ApiService } from '../../api/api.service';
import { AuthService } from '../../auth/auth.service';
import { switchMap, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DossierService {

	antecedent: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
    
  });
  examen: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    structure: new FormControl('', Validators.required)
    
  });

  constructor(private _api: ApiService, private _auth:AuthService) { }

  antecedentForm() {
    this.antecedent.setValue({
     name:'',
     description:''
    });
  }
  examenForm(){
    this.examen.setValue({
      name:'',
      description:'',
      structure:''
    });
  }
  addExamen(data){
    return this._api.post('addexamen',data);
  }
  allExamenByIdD(){
    return  this._auth.currentUser.pipe(
      map(patient => patient.dossier.id),
      switchMap(patient => this._api.get(`examensbydoss?id=${patient}`))
    );
  }
  deleteExamen(id:any){
    return this._api.get(`delexamen?id=${id}`);
    
  }

   getExamenById(id){
      return this._api.get(`getexamenbyid?id=${id}`);
  }

  partagerExamen(data){
    return this._api.post('partagerexam',data);
  }
  partagerAntecedent(data){
    return this._api.post('partagerante',data);
  }
  addAntecedent(data) {
    return this._api.post('addantecedent',data);
  }
  allAntecedentByIdD(){
  	return  this._auth.currentUser.pipe(
      map(patient => patient.dossier.id),
      switchMap(patient => this._api.get(`antecedentsbydoss?id=${patient}`))
    );
  }
  getAntecedentById(id){
      return this._api.get(`getantecedentbyid?id=${id}`);
  }

  deleteAntecedent(id:any){
  	return this._api.get(`delantecedent?id=${id}`);
    
  }
}
