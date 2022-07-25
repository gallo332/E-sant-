import { Component, OnInit } from '@angular/core';
import { AuthService }  from '../../services/auth/auth.service';
import { Patient } from '../../models/patient/patient'
declare const specialities: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUser: Patient;

  constructor(private authService: AuthService) {
    
    this.currentUser= this.authService.currentUserValue;
    this.loadScripts(); 
}

  ngOnInit() {
  	
  }

loadScripts() {
    const externalScriptArray = [
    	
      '../../../assets/js/scripts.js'

    ];
    for (let i = 0; i < externalScriptArray.length; i++) {
      const scriptTag = document.createElement('script');
      scriptTag.src = externalScriptArray[i];
      scriptTag.type = 'text/javascript';
      scriptTag.async = false;
      scriptTag.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(scriptTag);
    }
  }

}
