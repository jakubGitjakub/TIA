import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DxDataGridComponent, DxFormComponent } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import { EventCalendarService } from 'src/app/services/EventCalendar.Servis';
import { HistoryService } from 'src/app/services/History.Servis';
import { UserService } from 'src/app/services/Users.Servis';
import { EventCalendar } from '../../companies_admin/companies_admin/companies_admin.component';
import { ShopingHistories } from '../../history/history.component';
import { User } from '../../users/users/users.component';


@Component({
  selector: 'pages-company_sell_buy',
  templateUrl: 'company_sell_buy.component.html',
  styleUrls: [ './company_sell_buy.component.scss' ]
})

export class Company_sell_buyComponent implements OnInit {

  @Input() eventCalendarName: string;
  @Input() public eventCalendar: EventCalendar;
  @ViewChild('grid') grid: DxDataGridComponent;
  @ViewChild(DxFormComponent) form: DxFormComponent;
  @ViewChild(DxFormComponent) form1: DxFormComponent;
  @ViewChild(DxFormComponent) form2: DxFormComponent;
  dataSource: BuyTicket[] = [];
  @Input() public shopingHistory: ShopingHistories;
  aktualDate: Date;
  user: User;
  formData: any = { min: 1, max: 100, value: 1 };    //nastavit max podla kapacity z event kalendaru
  payment = ["Debetná karta", "Kreditná karta", "Internet banking"];

  constructor(
    private readonly router: Router,
    private readonly eventCalendarService: EventCalendarService,
    private readonly historyService: HistoryService,
    private userService: UserService,
    private readonly activatedRoute: ActivatedRoute
    ) {  
  }

  ngOnInit(): void {
    this.initialize();
  }

  initialize(): void {
    this.shopingHistory = new ShopingHistories;
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
          notify("Chyba pri získaní event kalendáru", "warning", 500);
        })}
    });

    //ak je zakaznik prihlaseny
    if(Number(localStorage.getItem("user")) != undefined)    
    {
      var role = localStorage.getItem('rola');
      var userId = Number(localStorage.getItem('user'));
      if(userId != null && role == "Customer")
      {
        this.userService.get(userId).subscribe(s => {
          this.dataSource['first_Name'] = s.first_Name;
          this.dataSource['last_Name'] = s.last_Name;
          this.dataSource['email'] = s.email;
        });
      }
    }
    
  };

  public handleBack = () => {
    const navigationState = window.history.state || {};
    this.router.navigate(['companies_sell'], { state: navigationState });
  };

  onValueChanged (e) {
    this.dataSource['payment_type'] = e.value;
  }

  public handleBuy = () => {
    if (!this.form2.instance.validate().isValid) {
      return; 
    }

    //1.ulozit do historie nakupov podla id zakaznika ak je zakaznik prihlaseny
    this.aktualDate = new Date();
    var userId = Number(localStorage.getItem("user"));
    if(userId != null)
    {
      this.userService.get(userId).subscribe(s => { 
        this.user = s;
        this.shopingHistory.user = this.user;
        this.shopingHistory.date = this.aktualDate;
        this.shopingHistory.ticket = this.eventCalendar.tickets['name'];
        this.shopingHistory.count_Ticket = this.formData.value;
        this.historyService.add(this.shopingHistory).subscribe(
          res => {
            if (res) {
              console.log("pridalo");
            }
          },
          err => {
            notify("Chyba pri uložení historie nákupu", "warning", 500);
          }
        );
      })
    }

    //2.znizit kapacitu v event kalendari
    this.eventCalendar.capacity = (this.eventCalendar.capacity - this.formData.value);
    this.eventCalendarService.save(this.eventCalendar.id, this.eventCalendar).subscribe(
      res => {
      if (res) {; /*this.notifyService.success('eventCalendar_has_been_saved_successfully');*/ }},
      err => { /*this.notifyService.error('failed_to_save_eventCalendar'); */ }
    );

    //3.odoslat mail s tiketom
    //devextreme zatial nema build na odosielanie mailu (odoslat mail backendom C#)
 
    this.handleBack();
  }
};

export class BuyTicket{
  first_Name: string;
  last_Name: string
  email: string;
  payment_type: string;
  count_Tickets: number;
}



