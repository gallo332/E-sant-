import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {LoginPatientComponent} from './pages/session/login/patient/patient.component';
import {RegisterComponent} from './pages/session/register/register.component';
import {PatientBoardComponent} from './pages/patient-board/patient-board.component';
import {RendezVousComponent} from './pages/patient-board/rendez-vous/rendez-vous.component';
import {MesRendezVousComponent} from './pages/patient-board/rendez-vous/mes-rendez-vous/mes-rendez-vous.component';
import {AjouterRendezVousComponent} from './pages/patient-board/rendez-vous/ajouter-rendez-vous/ajouter-rendez-vous.component';
import {DossierDetailsComponent} from './pages/patient-board/dossier-medical/dossier-details/dossier-details.component';
import {DossierMedicalComponent} from './pages/patient-board/dossier-medical/dossier-medical.component';
import {DossierMenuComponent} from './pages/patient-board/dossier-medical/dossier-menu/dossier-menu.component';
import {OverviewComponent} from './pages/patient-board/overview/overview.component';
import {SearchResultComponent} from './pages/search-result/search-result.component';
import {ProfileComponent} from './pages/medecine-board/profile/profile.component';
import {NewRdvComponent} from './pages/new-rdv/new-rdv.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DeleteRendezVousComponent } from './pages/patient-board/rendez-vous/delete-rendez-vous/delete-rendez-vous.component';
import { DashboardComponent } from './pages/medecine-board/dashboard/dashboard.component';
import { MedecineBoardComponent } from './pages/medecine-board/medecine-board.component';
import { CalendarComponent } from './pages/medecine-board/calendar/calendar.component';
import { PatientLayoutComponent } from './layout/patient-layout/patient-layout.component';
import { MedecinLoginComponent } from './pages/session/login/medecin/medecin.component';
import { MedecinLayoutComponent } from './layout/medecin-layout/medecin-layout.component';
import { ListRendezVousComponent } from './pages/medecine-board/list-rendez-vous/list-rendez-vous.component';
import { DetailsRdvComponent } from './pages/medecine-board/details-rdv/details-rdv.component';
import { PatientInfoComponent } from './pages/medecine-board/patient-info/patient-info.component';
import { OpenHoursComponent } from './pages/medecine-board/open-hours/open-hours.component';
import { AdminBoardComponent } from './pages/admin-board/admin-board.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';

const ADMIN_ROUTES:Routes=[
	
]
const PATIENT_ROUTES: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'overview'},
   	{ path: 'overview', component: OverviewComponent },
   	
    { path: 'dossier-medical', component: DossierMedicalComponent,
        children: [
        { path: '', component: DossierMenuComponent },
        { path: 'antecedent/:id', component: DossierDetailsComponent },
        { path: 'examen/:id', component: DossierDetailsComponent },
          ]},
    {path: 'delete-rendezvous/:id', component: DeleteRendezVousComponent }
    ]

const MEDECIN_ROUTES: Routes =[
	{ path: '', pathMatch: 'full', redirectTo: 'dashboard'},
	{ path: 'dashboard', component: DashboardComponent},
	{ path: 'calendar', component: CalendarComponent },
	{ path: 'gerer-creneau', component: OpenHoursComponent },	
	{ path: 'list-rendez-vous', component: ListRendezVousComponent },
	{ path: 'rendez-vous/:id', component: DetailsRdvComponent },
	{ path: 'info-patient/:id', component: PatientInfoComponent }
	
	]
const routes: Routes = [
	{
		path:'login-pro',
		component: MedecinLoginComponent
	},
	{
		path:'',
		component: MedecinLayoutComponent,
		children:[
			{	
				path:'pro',
				component : MedecineBoardComponent,
				children: MEDECIN_ROUTES
			}
		]	
	},
	{
		path:'',
		component: PatientLayoutComponent,
		children:[
			{
				path:'',
				pathMatch: 'full', 
				redirectTo: 'home'
			},
			{
				path:'home',
				component : HomeComponent
			},
			{
				path:'patient',
				component : PatientBoardComponent,
				children: PATIENT_ROUTES
				//outlet: 'patient'
				/* [
		          { path: '', pathMatch: 'full', redirectTo: 'overview' },
		          { path: 'overview', component: OverviewComponent },
		          {
		            path: 'dossier-medical', component: DossierMedicalComponent,
		            children: [
		              { path: '', pathMatch: 'full', redirectTo: 'carnet-menu' },
		              { path: 'dossier-menu', component: DossierMenuComponent },
		              { path: 'dossier-add', component: DossierAjoutInfoComponent },
		              { path: 'dossier-details/:id', component: DossierDetailsComponent },
		          ]},
		          {
		            path: 'rendez-vous', component: RendezVousComponent,
		             children: [
		              { path: '', pathMatch: 'full', redirectTo: 'mes-rendez-vous' },
		              { path: 'mes-rendez-vous', component: MesRendezVousComponent },
		              { path: 'ajouter-rendez-vous', component: AjouterRendezVousComponent },

		          ]}
		        ]*/

			},
			{
				path:"rdv/:id",
				component:RendezVousComponent, 
				outlet:"rdvdetails" 
			},
			{
				path:'login-patient',
				component: LoginPatientComponent
			},
			
			{
				path:'account/new',
				component: NewRdvComponent
			},
			{
				path:':specialite/:localite',
				component: SearchResultComponent
			},
			{
				path:':specialite/:localite/:identifiant',
				component: ProfileComponent
			},
			{
				path:'register',
				component: RegisterComponent
			}	

		]
	},
	{
		path:'',
		component: AdminLayoutComponent,
			children:[
				{
					path:'login-admin',component:AdminBoardComponent
				}
				
			]
	}
	
	/*{
		path:'',
		component : HomeComponent
	},
	{
		path:'home',
		component : HomeComponent
	},
	{
		path:'patient',
		component : PatientBoardComponent,
		children: PATIENT_ROUTES
		
		

	},
	{
		path:"rdv/:id",
		component:RendezVousComponent, 
		outlet:"rdvdetails" 
	},
	{
		path:'login-patient',
		component: LoginPatientComponent
	},
	{
		path:'account/new',
		component: NewRdvComponent
	},
	{
		path:':specialite/:localite',
		component: SearchResultComponent
	},
	{
		path:':specialite/:localite/:identifiant',
		component: ProfileComponent
	},
	{
		path:'register',
		component: RegisterComponent
	}*/

	
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
        onSameUrlNavigation: 'reload'
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
//platformBrowserDynamic().bootstrapModule(AppRoutingModule);
