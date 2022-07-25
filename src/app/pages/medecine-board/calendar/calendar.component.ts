import { Component, ViewEncapsulation, ViewChild, OnInit ,ElementRef} from '@angular/core';
import {
  remove, addClass, closest, Browser,loadCldr , L10n, Internationalization, extend, isNullOrUndefined, createElement
} from '@syncfusion/ej2-base';
import { Query, Predicate, DataManager, ODataV4Adaptor , WebApiAdaptor} from '@syncfusion/ej2-data';
import { ToastComponent } from '@syncfusion/ej2-angular-notifications';
import { ClickEventArgs, Button, CheckBox } from '@syncfusion/ej2-angular-buttons';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { ChangeEventArgs } from '@syncfusion/ej2-angular-inputs';
import { DatePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { ItemModel, TreeViewComponent, DragAndDropEventArgs } from '@syncfusion/ej2-angular-navigations';
import {
  DayService, WeekService, WorkWeekService, MonthService, AgendaService,
  ResizeService, DragAndDropService, EventSettingsModel, ActionEventArgs,
  ToolbarActionArgs, ScheduleComponent, CellClickEventArgs, TimeScaleModel,
  PopupOpenEventArgs, EJ2Instance, getWeekFirstDate, addDays, NavigatingEventArgs, WorkHoursModel
} from '@syncfusion/ej2-angular-schedule';
import { QuickPopups } from '@syncfusion/ej2-schedule/src/schedule/popups/quick-popups';
import { FieldValidator } from '@syncfusion/ej2-schedule/src/schedule/popups/form-validator';
import { DropDownList, ComboBox } from '@syncfusion/ej2-angular-dropdowns';
import { AddEditPatientComponent } from '../add-edit-patient/add-edit-patient.component';
import { CalendarSettings } from 'src/app/calendar-settings';
import { DataService } from 'src/app/services/data.service';
import { AuthService }  from 'src/app/services/auth/auth.service';
import { Medecin }   from 'src/app/models/medecin/medecin';
import { Patient }	from  'src/app/models/patient/patient';
import { EventResponse }  from 'src/app/models/evenresponse/eventresponse';
import { MedecinService } from 'src/app/services/medecin/medecin.service';
import { PatientService }  from 'src/app/services/patient/patient.service';
var numberingSystems = require ('cldr-data/supplemental/numberingSystems.json');
var gregorian = require ('cldr-data/main/fr-CH/ca-gregorian.json');
var numbers = require('cldr-data/main/fr-CH/numbers.json');
var timeZoneNames= require('cldr-data/main/fr-CH/timeZoneNames.json');
loadCldr(numberingSystems, gregorian, numbers, timeZoneNames);
L10n.load({
    'fr-CH': {
        'schedule': {
            'day': 'journée',
            'week': 'La semaine',
            'workWeek': 'Semaine de travail',
            'month': 'Mois',
            'today': 'Aujourd`hui'
        }
    }
});

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [
    DayService, WeekService, WorkWeekService, MonthService, AgendaService,
    ResizeService, DragAndDropService
  ],
  encapsulation: ViewEncapsulation.None
})
export class CalendarComponent implements OnInit {
   @ViewChild('scheduleObj')   public scheduleObj: ScheduleComponent;
   @ViewChild('subject') subjectObj: ElementRef;
  @ViewChild('location') locationObj: ElementRef;
  @ViewChild('startTime') startTimeObj: DatePickerComponent;
  @ViewChild('endTime') endTimeObj: DatePickerComponent;	
     public instance: Internationalization = new Internationalization();

  public eventData: Object[];
  busy: any;
  tester:boolean=false;
  message:string;
  doctorData: EventResponse[] ;
  patient: Patient;
  currentMed: Medecin;
  startHour:string;
  endHour: string;
  color: string;
  selectedDate: Date= new Date();
  eventSettings: EventSettingsModel;
  public views: Array<string> = ['Day', 'Week', 'WorkWeek', 'Month'];
  workDays: Array<number>= new Array() ;
  workHours: WorkHoursModel = { start: '08:00', end: '21:00' };
  private dataManager: DataManager = new DataManager({
    url: 'https://js.syncfusion.com/demos/ejservices/api/Schedule/LoadData',
    adaptor: new WebApiAdaptor,
    crossDomain: true
  });
  constructor(private _auth: AuthService, private _medService: MedecinService) {
  	(QuickPopups.prototype as any).applyFormValidation = () => { };
	this.currentMed= this._auth.currentMedecinValue;
	  
  }

 

  ngOnInit() {
  	for(let workDay of this.currentMed.WorkDays)
  	{
  		if(workDay.active===true)
  		{
  			this.workDays.push(workDay.numIndex);
  		}
  	}
  	console.log(this.workDays);
  	this.busy=this._medService.getMedecinAllEvents()
  			.subscribe(data =>{	    
			    if(data!==null && data.length!==0){
			      this.doctorData=data;
			      let start=null;
			      let end= null;
			      for (let event of this.doctorData) {
   					 start= new Date(event.start);
			      	 end= new Date(event.end);
			      	 event.start=start;
			      	 event.end=end;
					}			      
			      console.log(this.doctorData[0].start);
				    this.eventSettings={
				      	dataSource:this.doctorData,
				      	fields: {
				            id: 'id',
				            subject: { name: 'title', title: 'Motif',validation: { required: true } },
				            location: { name: 'lieu', title: 'Structure', validation: { required: true } },
				            startTime: { name: 'start', title:'Début' },
				            endTime: { name: 'end' , title: 'Fin'},
				        }
				      };
				     
			    }else{
			      this.tester=true;
			      this.message="Liste Vide";
			     
			    }
		 	 },
			  	error =>{
			    this.busy=null;
			    alert("Le serveur ne répond pas!!!");
	    
	  			}
	 		 ) 
  	this.color=this.currentMed.color;
  	this.startHour=this.currentMed.startHour;
	this.endHour= this.currentMed.endHour;


  }

  onPopupOpen(args: PopupOpenEventArgs) {

  	if (args.type === 'QuickInfo') {
      if (args.target.classList.contains('e-work-cells') || args.target.classList.contains('e-header-cells')) {
        this.scheduleObj.quickPopup.quickPopupHide(true);
        args.cancel = true;
      } else if (args.target.classList.contains('e-appointment')) {
        (<HTMLElement>args.element).style.boxShadow = `1px 2px 5px 0 ${(<HTMLElement>args.target).style.backgroundColor}`;
      }
    }
    if (args.type === 'EventContainer') {
      const eventElements: NodeListOf<HTMLElement> = args.element.querySelectorAll('.e-appointment');
      eventElements.forEach((element: HTMLElement) => {
        const colors: Array<string> = ['rgb(96, 242, 56)', 'rgb(254, 194, 0)'];
        if (colors.indexOf(element.style.backgroundColor) !== -1) {
          (element.querySelector('.e-subject') as HTMLElement).style.color = 'black';
        }
      });
    }
  }

    getEventDetails(data: EventResponse) {
    return (this.instance.formatDate(new Date(data.start), { type: 'date', skeleton: 'long' }) +
      '(' + this.getString(new Date(data.start), 'hm') + '-' + this.getString(new Date(data.end), 'hm') + ')');
  }
  getString(value: Date, type: string) {
    return this.instance.formatDate(new Date(value), { type: 'dateTime', skeleton: type });
  }
  getBackGroundColor(data: any) {
    let color: string= data.color;
    let fontColor: string;
   
    const colors: Array<string> = ['#60F238', '#fec200'];
    if (colors.indexOf(color) !== -1) {
      fontColor = '#333333';
    } else {
      fontColor = '#FFFFFF';
    }
    return { 'background-color': color, color: fontColor };
  }
  getPatientName(data: EventResponse) {
    return data.rendezVous.patient.prenom+' '+ data.rendezVous.patient.nom;
  }
  reminderCustom(args) {
        alert("Rappel : Votre prochain rendez-vous arrive dans 10 min");
    }
  /*globalSearch(args: KeyboardEvent): void {
    let searchString: string = (args.target as HTMLInputElement).value;
    if (searchString !== '') {
      new DataManager(this.scheduleObj.getEvents(null, null, true)).executeQuery(new Query().
        search(searchString, ['Subject', 'Location', 'Description'], null, true, true)).then((e: ReturnOption) => {
          if ((e.result as any).length > 0) {
            this.showSearchEvents('show', e.result);
          } else {
            this.showSearchEvents('hide');
          }
        });
    } else {
      this.showSearchEvents('hide');
    }
  }

  searchOnClick(): void {
    let searchObj: { [key: string]: any }[] = [];
    let endDate: Date;
    let formElements: HTMLInputElement[] = [
      this.subjectObj.nativeElement,
      this.locationObj.nativeElement
    ];
    formElements.forEach((node: HTMLInputElement) => {
      if (node.value && node.value !== '') {
        searchObj.push({
          field: node.name, operator: 'contains', value: node.value, predicate: 'or',
          matchcase: 'true'
        });
      }
    });
    if (this.startTimeObj.value) {
      searchObj.push({
        field: 'StartTime', operator: 'greaterthanorequal', value: this.startTimeObj.value, predicate: 'and',
        matchcase: false
      });
    }
    if (this.endTimeObj.value) {
      let date: Date = new Date(+this.endTimeObj.value);
      endDate = new Date(date.setDate(date.getDate() + 1));
      searchObj.push({
        field: 'EndTime', operator: 'lessthanorequal', value: endDate, predicate: 'and',
        matchcase: false
      });
    }
    if (searchObj.length > 0) {
      let filterCondition: { [key: string]: any } = searchObj[0];
      let predicate: Predicate = new Predicate(
        filterCondition.field, filterCondition.operator, filterCondition.value, filterCondition.matchcase);
      for (let i: number = 1; i < searchObj.length; i++) {
        predicate = predicate.and(searchObj[i].field, searchObj[i].operator, searchObj[i].value, searchObj[i].matchcase);
      }
      let result: Object[] = new DataManager(this.scheduleObj.getEvents(this.startTimeObj.value, endDate, true))
        .executeLocal(new Query().where(predicate));
      this.showSearchEvents('show', result);
    } else {
      this.showSearchEvents('hide');
    }
  }

  clearOnClick(): void {
    document.getElementById('schedule').style.display = 'block';
    (document.getElementById('form-search') as HTMLFormElement).reset();
    this.showSearchEvents('hide');
  }

  private showSearchEvents(type: string, data?: Object): void {
    if (type === 'show') {
      if (document.getElementById('grid').classList.contains('e-grid')) {
        let gridObj: Grid = (document.querySelector('#grid') as EJ2Instance).ej2_instances[0] as Grid;
        gridObj.dataSource = data;
        gridObj.dataBind();
      } else {
        let gridObj: Grid = new Grid({
          dataSource: data,
          height: 505,
          width: 'auto',
          columns: [
            { field: 'Subject', headerText: 'Subject', width: 120 },
            { field: 'Location', headerText: 'Location', width: 120 },
            { field: 'StartTime', headerText: 'StartTime', width: 120, format: { type: 'dateTime', format: 'M/d/y hh:mm a' } },
            { field: 'EndTime', headerText: 'EndTime', width: 120, format: { type: 'dateTime', format: 'M/d/y hh:mm a' } },
          ]
        });
        gridObj.appendTo(document.querySelector('#grid') as HTMLElement);
        this.scheduleObj.element.style.display = 'none';
      }
    } else {
      let gridObj: Object[] = (document.querySelector('#grid') as EJ2Instance).ej2_instances;
      if (gridObj && gridObj.length > 0 && !(gridObj[0] as Grid).isDestroyed) {
        (gridObj[0] as Grid).destroy();
      }
      this.scheduleObj.element.style.display = 'block';
    }
  }
	*/
 
}
