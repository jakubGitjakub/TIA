import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DxDataGridComponent, DxFormComponent } from 'devextreme-angular';
import { EventCalendarService } from 'src/app/services/EventCalendar.Servis';
import { EventCalendar } from '../../companies_admin/companies_admin/companies_admin.component';


@Component({
  selector: 'pages-company_sell_detail',
  templateUrl: 'company_sell_detail.component.html',
  styleUrls: [ './company_sell_detail.component.scss' ],
})

export class Company_sell_detailComponent implements OnInit {

  @Input() eventCalendarName: string;
  @ViewChild('grid') grid: DxDataGridComponent;
  @ViewChild(DxFormComponent) form: DxFormComponent;
  @Input() public eventCalendar: EventCalendar;

  constructor(
    private readonly router: Router,
    private readonly eventCalendarService: EventCalendarService,
    private readonly activatedRoute: ActivatedRoute
    ) {  
  }

  ngOnInit(): void {
    this.initialize();
  }

  initialize(): void {

    this.eventCalendar = new EventCalendar;
    this.activatedRoute.params.subscribe(params => {
      this.eventCalendarName = null;
      if (params['eventCalendarName']) {
        this.eventCalendarName = params['eventCalendarName'];
        this.eventCalendarService.getEventCalendarByName(this.eventCalendarName).subscribe(
          eventCalendar => {
            this.eventCalendar = eventCalendar[0] as EventCalendar;
        }, 
        err => {
          //this.notifyService.error('failed_to_load_data');    //pomocou notifyService upozornim na chybu
        })}
    });
  }

  public handleBack = () => {
    const navigationState = window.history.state || {};
    this.router.navigate(['companies_sell'], { state: navigationState });
  };
};



