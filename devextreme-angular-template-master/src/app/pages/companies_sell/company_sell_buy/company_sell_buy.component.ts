import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DxDataGridComponent, DxFormComponent } from 'devextreme-angular';
import { EventCalendarService } from 'src/app/services/EventCalendar.Servis';
import { TicketService } from 'src/app/services/Ticket.Servis';
import { EventCalendar, Ticket } from '../../companies_admin/companies_admin/companies_admin.component';


@Component({
  selector: 'pages-company_sell_buy',
  templateUrl: 'company_sell_buy.component.html',
  styleUrls: [ './company_sell_buy.component.scss' ],
})

export class Company_sell_buyComponent implements OnInit {

  @Input() eventCalendarName: string;
  @Input() public eventCalendar: EventCalendar;
  @ViewChild('grid') grid: DxDataGridComponent;
  @ViewChild(DxFormComponent) form: DxFormComponent;
  @ViewChild(DxFormComponent) form1: DxFormComponent;
  @ViewChild(DxFormComponent) form2: DxFormComponent;
  dataSource: BuyTicket[] = [];
  formData: any = { min: 1, max: 100, value: 1 };    //nastavit max podla kapacity z event kalendaru

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
            this.eventCalendar.additional_Info = eventCalendar[0].tickets['additional_Info'];
            this.formData.max = this.eventCalendar.capacity;
        }, 
        err => {
          //this.notifyService.error('failed_to_load_data');    //pomocou notifyService upozornim na chybu
        })}
    });
  };

  public handleBack = () => {
    const navigationState = window.history.state || {};
    this.router.navigate(['companies_sell'], { state: navigationState });
  };

  public handleBuy = () => {
    if (!this.form2.instance.validate().isValid) {
      return; //otazne je ci funguje validacia, zda sa ze nie
    }
    //( this.formData.value  );    //pocet kupovanych listkov

    //1.ulozit do historie nakupov podla id zakaznika
    //2.znizit kapacitu v event kalendari
    //3.odoslat mail s tiketom
 
    this.handleBack();
    /*
      this.userService.save(this.userId, this.user).subscribe(
        res => {
          if (res) {
            this.router.navigate([`/users/${res.userId}`]);
          }
          //this.notifyService.success('user_has_been_saved_successfully');
          this.handleBack();
        },
        err => {
          //this.notifyService.error('failed_to_save_customer');
        }
      );
    */
  }
};

export class BuyTicket{
  first_Name: string;
  last_Name: string
  email: string;
  payment_type: string;
  count_Tickets: number;
}



