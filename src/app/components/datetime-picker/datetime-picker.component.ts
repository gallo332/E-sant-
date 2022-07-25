import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { CalendarEvent, CalendarView, CalendarDateFormatter , DAYS_OF_WEEK} from 'angular-calendar';
import { CustomDateFormatter } from './custom-date-formatter.provider';
@Component({
  selector: 'datetime-picker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './datetime-picker.component.html',
  styleUrls: ['./datetime-picker.component.scss'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    },
  ],
})
export class DatetimePickerComponent implements OnInit {
  view: CalendarView = CalendarView.Week;

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];

  clickedDate: Date;
  locale: string = 'fr';
  clickedColumn: number;
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];

  CalendarView = CalendarView;
  @Output() rdvDate = new EventEmitter(); 
  constructor() { }

  ngOnInit() {
  }
  setView(view: CalendarView) {
    this.view = view;
  }
  sendDate(data) { 
  	this.clickedDate=data
    this.rdvDate.emit(this.clickedDate); 
    return this.clickedDate;

  } 
}

