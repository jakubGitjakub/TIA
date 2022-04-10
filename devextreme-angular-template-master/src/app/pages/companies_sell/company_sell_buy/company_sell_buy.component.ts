import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DxDataGridComponent, DxFormComponent } from 'devextreme-angular';
import { TicketService } from 'src/app/services/Ticket.Servis';
import { Ticket } from '../../companies_admin/companies_admin/companies_admin.component';


@Component({
  selector: 'pages-company_sell_buy',
  templateUrl: 'company_sell_buy.component.html',
  styleUrls: [ './company_sell_buy.component.scss' ],
})

export class Company_sell_buyComponent implements OnInit {

  @Input() ticketName: string;
  @Input() ticketId: number;
  @ViewChild('grid') grid: DxDataGridComponent;
  @ViewChild(DxFormComponent) form: DxFormComponent;
  @ViewChild(DxFormComponent) form1: DxFormComponent;
  @ViewChild(DxFormComponent) form2: DxFormComponent;
  @Input() public ticket: Ticket;
  dataSource: BuyTicket[] = [];
  formData: any = { min: 1, max: 10, value: 1 };    //nastavit max podla kapacity z event kalendaru

  constructor(
    private readonly router: Router,
    private readonly ticketService: TicketService,
    private readonly activatedRoute: ActivatedRoute
    ) {  
  }

  ngOnInit(): void {
    this.initialize();
  }

  initialize(): void {
    this.ticket = new Ticket;

    this.activatedRoute.params.subscribe(params => {
      this.ticketName = null;
      if (params['ticketName']) {
        this.ticketName = params['ticketName'];
        this.ticketService.getTicketByName(this.ticketName).subscribe(
          ticket => {
            this.ticket = ticket[0] as Ticket;
            this.formData.max= 3;    //set max capacity from event calendar
        }, 
        err => {
          //this.notifyService.error('failed_to_load_data');    //pomocou notifyService upozornim na chybu
        })}
    })};

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



