import { BrowserModule } from '@angular/platform-browser';
import { NgModule , LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {HttpClientModule ,  HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import {RouterModule} from '@angular/router';
import { LoginPatientComponent } from './pages/session/login/patient/patient.component';
import { LoginComponent } from './pages/session/login/login.component';
import { RegisterComponent } from './pages/session/register/register.component';
import { FormSliderComponent } from './form-slider/form-slider.component';
import { SearchComponent } from './components/search/search.component';
import { CardDoctorsComponent } from './components/card-doctors/card-doctors.component';
/*import { DashboardComponent } from './pages/medecin/dashboard/dashboard.component';
import { AppointmentsComponent } from './pages/medecin/appointments/appointments.component';
import { PlanificationComponent } from './pages/medecin/planification/planification.component';
import { ManageProfileComponent } from './pages/medecin/manage-profile/manage-profile.component';
import { MyPatientsComponent } from './pages/medecin/my-patients/my-patients.component';
import { TeleconsultationComponent } from './pages/medecin/teleconsultation/teleconsultation.component';
import { RendezVousComponent } from './pages/medecin/rendez-vous/rendez-vous.component';
import { VideoCallComponent } from './pages/video-call/video-call.component';
import { PatientComponent } from './pages/session/login/patient/patient.component';*/
import { MedecineBoardComponent } from './pages/medecine-board/medecine-board.component';
//import { AuthGuardComponent } from './guard/auth/auth.component';
import { PatientBoardComponent } from './pages/patient-board/patient-board.component';
import { AlertComponent } from './components/alert/alert.component'
import {ErrorInterceptor } from './helpers/error.interceptor';
import {JwtInterceptor } from './helpers/jwt.interceptor';
import { HeaderPatientComponent } from './layout/header-patient/header-patient.component';
import { RendezVousComponent } from './pages/patient-board/rendez-vous/rendez-vous.component';
import { MesRendezVousComponent } from './pages/patient-board/rendez-vous/mes-rendez-vous/mes-rendez-vous.component';
import { AjouterRendezVousComponent } from './pages/patient-board/rendez-vous/ajouter-rendez-vous/ajouter-rendez-vous.component';
import { DossierMedicalComponent } from './pages/patient-board/dossier-medical/dossier-medical.component';
import { OverviewComponent } from './pages/patient-board/overview/overview.component';
import { DossierDetailsComponent } from './pages/patient-board/dossier-medical/dossier-details/dossier-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
//Material Module
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatStepperModule} from '@angular/material/stepper'
import {MatRadioModule} from '@angular/material/radio';
import {MatTableModule} from '@angular/material/table';
import {MatListModule} from '@angular/material/list';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';
import { SelectAutocompleteModule } from 'select-autocomplete';
// End Material
import { SearchResultComponent } from './pages/search-result/search-result.component';
import { ProfileComponent } from './pages/medecine-board/profile/profile.component';
import { RdvCardComponent } from './components/rdv-card/rdv-card.component';
import { DatetimePickerComponent } from './components/datetime-picker/datetime-picker.component';
import { PickerUtilsComponent } from './components/picker-utils/picker-utils.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxDocViewerModule }   from 'ngx-doc-viewer';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

//import { ModalModule, TooltipModule, PopoverModule, ButtonsModule } from 'angular-bootstrap-md';
/* DatePicker */
import { CommonModule } from '@angular/common';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NewRdvComponent } from './pages/new-rdv/new-rdv.component';

import { Data } from './providers/data';
import { AngularSvgIconModule } from 'angular-svg-icon';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ConfirmComponent }  from  './components/confirm/confirm.component';
import { AddFileComponent } from './pages/patient-board/dossier-medical/add-file/add-file.component';
import { AntecedentComponent } from './pages/patient-board/dossier-medical/antecedent/antecedent.component';
import { PrescriptionComponent } from './pages/patient-board/dossier-medical/prescription/prescription.component';
import { DossierMenuComponent } from './pages/patient-board/dossier-medical/dossier-menu/dossier-menu.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DocViewerComponent } from './components/doc-viewer/doc-viewer.component';
import { DeleteRendezVousComponent } from './pages/patient-board/rendez-vous/delete-rendez-vous/delete-rendez-vous.component';
import { DashboardComponent } from './pages/medecine-board/dashboard/dashboard.component';
// import the ScheduleModule for the Schedule component
import { CalendarComponent } from './pages/medecine-board/calendar/calendar.component';
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService} from '@syncfusion/ej2-angular-schedule';
import { AddEditPatientComponent } from './pages/medecine-board/add-edit-patient/add-edit-patient.component';
import { ScheduleModule, RecurrenceEditorModule } from '@syncfusion/ej2-angular-schedule';
import { DropDownListModule, MultiSelectModule, ComboBoxModule } from '@syncfusion/ej2-angular-dropdowns';
import { CheckBoxModule, ButtonModule, SwitchModule, RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { TreeViewModule, SidebarModule } from '@syncfusion/ej2-angular-navigations';
import { ToastModule } from '@syncfusion/ej2-angular-notifications';
import { DatePickerModule, TimePickerModule, DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
// End Syncfusion
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { PatientLayoutComponent } from './layout/patient-layout/patient-layout.component';
import { MedecinLoginComponent } from './pages/session/login/medecin/medecin.component';
import { MedecinLayoutComponent } from './layout/medecin-layout/medecin-layout.component';
import { HeaderMedComponent } from './layout/header-med/header-med.component';
import { ListRendezVousComponent } from './pages/medecine-board/list-rendez-vous/list-rendez-vous.component';
import { DetailsRdvComponent } from './pages/medecine-board/details-rdv/details-rdv.component';
import { PatientInfoComponent } from './pages/medecine-board/patient-info/patient-info.component';
import { AddExamComponent } from './pages/patient-board/dossier-medical/add-exam/add-exam.component';
import { ExamenComponent } from './pages/patient-board/dossier-medical/examen/examen.component';
import { PartageDocComponent } from './pages/patient-board/partage-doc/partage-doc.component';
import { OpenHoursComponent } from './pages/medecine-board/open-hours/open-hours.component';
import { DocumentComponent } from './pages/medecine-board/document/document.component';
//End Calendar
registerLocaleData(localeFr);


/* DatePicker */

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginPatientComponent,
    LoginComponent,
    RegisterComponent,
    FormSliderComponent,
    SearchComponent,
    CardDoctorsComponent,
    /*DashboardComponent,
    AppointmentsComponent,
    PlanificationComponent,
    ManageProfileComponent,
    MyPatientsComponent,
    TeleconsultationComponent,
    RendezVousComponent,
    VideoCallComponent,
    PatientComponent,*/
    MedecineBoardComponent,
    //AuthComponent,
    PatientBoardComponent,
    AlertComponent,
    HeaderPatientComponent,
    RendezVousComponent,
    MesRendezVousComponent,
    AjouterRendezVousComponent,
    DossierMedicalComponent,
    OverviewComponent,
    DossierDetailsComponent,
    SearchResultComponent,
    ProfileComponent,
    RdvCardComponent,
    DatetimePickerComponent,
    PickerUtilsComponent,
    NewRdvComponent,
    AddFileComponent,
    AntecedentComponent,
    PrescriptionComponent,
    ConfirmComponent,
    DossierMenuComponent,
    DocViewerComponent,
    DeleteRendezVousComponent,
    DashboardComponent,
    CalendarComponent,
    AddEditPatientComponent,
    PatientLayoutComponent,
    MedecinLoginComponent,
    MedecinLayoutComponent,
    HeaderMedComponent,
    ListRendezVousComponent,
    DetailsRdvComponent,
    PatientInfoComponent,
    AddExamComponent,
    ExamenComponent,
    PartageDocComponent,
    OpenHoursComponent,
    DocumentComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CommonModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    MatCardModule,
    MatCardModule,
    MatIconModule, 
    MatInputModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatFormFieldModule,
    SelectAutocompleteModule,
    MatTabsModule,
    MatStepperModule,
    MatSnackBarModule,
    PdfViewerModule,
    MatListModule,
    MatRippleModule,
    NgxDocViewerModule,
    MDBBootstrapModule.forRoot(),
    MatRadioModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSortModule,
    NgxExtendedPdfViewerModule,
    AngularSvgIconModule.forRoot(),
    BrowserModule, 
    ScheduleModule,
    RecurrenceEditorModule ,
    DropDownListModule, 
    MultiSelectModule, 
    ComboBoxModule,
    CheckBoxModule, 
    ButtonModule, 
    SwitchModule,
    RadioButtonModule,
    TreeViewModule, 
    SidebarModule,
    DatePickerModule,
    TimePickerModule,
    ToastModule,
    DialogModule,
    TextBoxModule,
    DateTimePickerModule,
    ScrollingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'fr-FR'},
     Data,
     DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService],
  bootstrap: [AppComponent],
  entryComponents:[ConfirmComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
