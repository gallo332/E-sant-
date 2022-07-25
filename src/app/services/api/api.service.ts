import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_BASE = 'http://localhost:8080/ihealth-rest/telemedecine';
  tempObj: any;
  url = 'http://localhost:8080/ihealth-rest/telemedecine';

  private _errorObserver: any;
  public error: any;

  constructor(public http: HttpClient) {
    this._errorObserver = null;
    this.error = Observable.create(observer => {
      this._errorObserver = observer;
    });
  }

  get(endpoint: string, params?: any) {
    return this.http.get(this.url + '/' + endpoint).pipe(
      retry(3)
    ) as Observable<any>;
  }



  post(endpoint: string, body?: any) {
    return this.http.post(this.url + '/' + endpoint, body) as Observable<any>;
  }

  put(endpoint: string, body: any) {
    return this.http.put(this.url + '/' + endpoint, body ) as Observable<any>;
  }

  delete(endpoint: string) {
    return this.http.delete(this.url + '/' + endpoint) as Observable<any>;
  }

  patch(endpoint: string, body: any) {
    return this.http.put(this.url + '/' + endpoint, body) as Observable<any>;
  }

  _handleError(err) {
    console.log(err);
    this._errorObserver.next(err);
    // tslint:disable-next-line:quotemark
    return Observable.throw(err.message || "Server Error");
  }
}
