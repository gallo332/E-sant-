import { Injectable } from '@angular/core';
import { Medecin }  from '../../models/medecin/medecin';
import { ApiService } from '../api/api.service';
import { Observable, of } from "rxjs";
import { switchMap, map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { RendezvousResponse }  from 'src/app/models/rendezvousResponse/rendezvous-response';
@Injectable({
  providedIn: 'root'
})
export class MedecinService {

  constructor(private _api: ApiService, private _auth:AuthService) { }

  getMedecins():Observable<Medecin[]> {
    return this._api.get('medecins');
  }
  getSpecialite(){
    return this._api.get('specialites');
  }
   getMedecinsBySpec(specialite: string) {
   		if(!specialite) {
            return of([]);
        }
    return this._api.get(`getmedbyspe?groupe=${specialite}`);
  }
   getMedecinsByPseudo(identifiant: string) :Observable<Medecin> {
    return this._api.get(`medecinbypseu?pseudo=${identifiant}`);
  }

   getMedecinById(id:number) :Observable<Medecin> {
    return this._api.get(`medecinByIdM?idM=${id}`);
            
  }

  getMedecinAllRv(){
    return  this._auth.currentMedecin.pipe(
      map(medecin => medecin.idM),
      switchMap(medecin => this._api.get(`patientrvIdMAv?idM=${medecin}`))
    );
    //return this._api.get(`patientrvIdMAv?idM=${id}`);
  }
  getMedecinAllEvents(){
    return  this._auth.currentMedecin.pipe(
      map(medecin => medecin.idM),
      switchMap(medecin => this._api.get(`geteventbyidM?idM=${medecin}`))
    );
  }
  
}
