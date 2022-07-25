import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService} from 'src/app/services/alert/alert.service';
import { UserService } from 'src/app/services/user/user.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'medecin-login',
  templateUrl: './medecin.component.html',
  styleUrls: ['./medecin.component.scss']
})
export class MedecinLoginComponent implements OnInit {

  loginForm: FormGroup;
  loginerror = new BehaviorSubject(false);
  isLoggedIn = new BehaviorSubject(false);
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(private api: ApiService,private authService: AuthService, private alertService: AlertService, 
  	private formBuilder: FormBuilder,private route: ActivatedRoute, private router: Router,private user: UserService) { 
  	 if (this.authService.currentMedecinValue) {
            this.router.navigate(['/pro']);
        }
  }

  ngOnInit() {
  	this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

  	// get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['/pro'] || '/';
  }  

  // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }
  login() {
    	this.submitted = true;

        // reset alerts on submit
        //this.alertService.clear();
    		if(this.loginForm.invalid)
    		{
    			return;
    		}
    		this.authService.loginMed(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                	if(data!==null)
                    	{
                    		this.router.navigate(['/pro']);
                    	}
                    else{
                    	alert("Erreur de connexion"); 
                    	this.router.navigate(['./'], {relativeTo:this.route  }); 
                    	}         
                     },
                error => {
                    alert("Le serveur ne répond pas!!!");
                    this.loading = false;
                });
    		
          /*  const userdatasub = this.api.post('authpatient', {
            email: this.f.username.value,
            password: this.f.password.value
          })
            .subscribe((userdata) => {
            console.log(userdata);
            if (userdata.code === 1) {
              this.loginerror.next(true);
            } else if (userdata.code === 0) {
              userdata.user_type = 'patient';
              this.user.savePatient(userdata).then(() => {
              this.router.navigate(['home']);
          });
            }
              userdatasub.unsubscribe();
          });*/
        
      
  }


}
