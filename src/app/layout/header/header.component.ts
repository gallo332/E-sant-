import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	isLoggedIn= new BehaviorSubject(false);
  constructor(private authService: AuthService,private router: Router ) { 
  this.isLoggedIn=this.authService.isLoggedIn;
}
  
  ngOnInit() {
  }

  isLogged():void{

  }
  logout(): void{
  	this.authService.logout().then(() => {
      this.router.navigate(['/home']).then(() => {
        if (window) {
          window.location.reload();
        }
      });
    });

  }
}
