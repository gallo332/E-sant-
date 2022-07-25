import { Injectable } from '@angular/core';
import { Observable,of } from "rxjs";
import{ ApiService } from '../../api/api.service';
import { AuthService } from '../../auth/auth.service';
import { switchMap, map } from 'rxjs/operators';
import { Medecin }  from  '../../../models/medecin/medecin';
@Injectable({
  providedIn: 'root'
})
export class RvService {

  constructor(private _auth: AuthService, private _api: ApiService) { }

   addPatientRv(data) {
    return this._api.post('addpatientRV', data);
  }

  getPatientRv() {
    return  this._auth.currentUser.pipe(
      map(patient => patient.idP),
      switchMap(patient => this._api.get(`patientrvbyidP?idP=${patient}`))
    );
  }

  getRendezVous(id){
    return this._api.get(`patientrvbyid?id=${id}`)
  }

  /*async annulerPatientRv(event_id: number) {
    const you = await this._user.getUser();
    return this._api.get(`  delevent?idE=${event_id}`);
  }*/

  /*getSpecialisations() {
    return this._api.get('specialites');
  }

  getMedecinBySpecialisations(specialisation: string): Observable<Medecin[]> {
  	 if(!specialisation) {
            return of([]);
        }
    return this._api.get(`getmedbyspe?groupe=${specialisation}`);
  }


  loadMedecinDates(idM: number) {
    return this._api.get(`geteventbyidM?idM=${idM}`);
  }


  dercementAvailableRv(newDates) {
    return this._api.put('modevent', newDates);
  }*/
  
}
