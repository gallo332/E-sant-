import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable,of } from "rxjs";
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService }  from 'src/app/services/auth/auth.service';
import { Medecin}  from 'src/app/models/medecin/medecin';
import { Workday } from 'src/app/models/workday/workday';
import { TimePicker } from '@syncfusion/ej2-angular-calendars';
import { loadCldr, L10n } from '@syncfusion/ej2-base';
declare var require: any;

loadCldr(
    require('cldr-data/supplemental/numberingSystems.json'),
    require('cldr-data/main/de/ca-gregorian.json'),
    require('cldr-data/main/de/numbers.json'),
    require('cldr-data/supplemental/weekdata.json') // To load the culture based first day of week
);

 L10n.load({
            'de': {
                'timepicker': { placeholder: 'Wählen Sie Zeit' }
            }
        });
@Component({
  selector: 'app-open-hours',
  templateUrl: './open-hours.component.html',
  styleUrls: ['./open-hours.component.scss']
})
export class OpenHoursComponent implements OnInit {
 public locale: string = 'de';
  public breakDays: Workday[];
  public currentMed: Medecin;
  constructor(private _auth: AuthService) { 
  	this.currentMed=this._auth.currentMedecinValue;
  }

  ngOnInit(): void {
  	 let start=null;
	 let end= null;
	 let breakStart=null;
	 let breakEnd=null;
    for (let workday of this.currentMed.WorkDays) {
   		start= new Date(workday.workStartHour);
		end= new Date(workday.workEndHour);
		breakStart= new Date(workday.breakStartHour);
		breakEnd= new Date(workday.breakEndHour);
		workday.workStartHour=start;
		workday.workEndHour=end;
		workday.breakStartHour=breakStart;
		workday.breakEndHour=breakEnd;
	}

  	this.breakDays= this.currentMed.WorkDays;
  }

  onSaveClick() {
   	/*const formelement: HTMLInputElement[] = [].slice.call(document.querySelectorAll('.break-hour-dialog .e-field'));
    const workDays: { [key: string]: Object }[] = JSON.parse(JSON.stringify(this.breakDays));
    for (const curElement of formelement) {
      const dayName: string = curElement.parentElement.getAttribute('id').split('_')[0];
      const valueName: string = curElement.parentElement.getAttribute('id').split('_')[1];
      const instance: TimePicker = (curElement.parentElement as EJ2Instance).ej2_instances[0] as TimePicker;
      for (let i = 0; i < workDays.length; i++) {
        if (workDays[i].Day === dayName) {
          if (valueName === 'start') {
            workDays[i].BreakStartHour = instance.value;
            workDays[i].WorkStartHour = new Date(<Date>workDays[i].WorkStartHour);
          } else {
            workDays[i].BreakEndHour = instance.value;
            workDays[i].WorkEndHour = new Date(<Date>workDays[i].WorkEndHour);
          }
        }
        workDays[i].Enable = !(workDays[i].State === 'TimeOff');
      }
    }
    const availableDays: Array<number> = [];
    workDays.forEach(workDay => {
      if (workDay.Enable) {
        availableDays.push(<number>workDay['Index']);
      }
    });
    this.activeData.AvailableDays = availableDays;
    this.activeData.WorkDays = workDays;
    this.dataService.onUpdateData('WorkDays', workDays, 'doctor', this.activeData);
    this.breakHourObj.hide();*/
  }

  getStatus(state: string) {
    return state === 'RemoveBreak' ? false : true;
  }
   getDayName(day: string) {
    return day.split('')[0].toUpperCase();
  }
  onChangeStatus(args: any) {
    args.preventDefault();
    const activeState: string = args.target.getAttribute('data-state');
    const activeDay: string = args.target.getAttribute('id').split('_')[0];
    let newState: string = '';
    switch (activeState) {
      case 'TimeOff':
        newState = 'RemoveBreak';
        break;
      case 'RemoveBreak':
        newState = 'AddBreak';
        break;
      case 'AddBreak':
        newState = 'TimeOff';
        break;
    }
    for (let i = 0; i < this.breakDays.length ; i++) {
      if (this.breakDays[i].jour === activeDay) {
        this.breakDays[i].state = newState;
      }
    }
  }

}
