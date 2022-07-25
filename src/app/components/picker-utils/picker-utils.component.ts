import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CalendarView } from 'angular-calendar';

@Component({
  selector: 'picker-utils-header',
  templateUrl: './picker-utils.component.html',
  styleUrls: ['./picker-utils.component.scss']
})

export class PickerUtilsComponent implements OnInit {
  @Input() view: CalendarView | 'month' | 'week' | 'day';

  @Input() viewDate: Date;

  @Input() locale: string = 'en';

  @Output() viewChange: EventEmitter<string> = new EventEmitter();

  @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();

  constructor(){

  }


  ngOnInit(){

  }
}
