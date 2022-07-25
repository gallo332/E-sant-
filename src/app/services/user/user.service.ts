import { Injectable } from '@angular/core';
import { } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  public userData = new BehaviorSubject(null);
  constructor() {
  }

  initUser(data) {
    this.userData.next(data);
  }

  async getUser() {
    return await localStorage.getItem('patient');
  }

  async savePatient(patient) {
    this.initUser(patient);
    return await localStorage.setItem('patient', patient);
      
  }

  async logOut() {
    return await localStorage.clear();
  }
}
