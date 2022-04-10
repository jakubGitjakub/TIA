import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DxDataGridComponent, DxFormComponent } from 'devextreme-angular';
import { TicketService } from 'src/app/services/Ticket.Servis';
import { Ticket } from '../../companies_admin/companies_admin/companies_admin.component';


@Component({
  selector: 'pages-company_sell_detail',
  templateUrl: 'company_sell_detail.component.html',
  styleUrls: [ './company_sell_detail.component.scss' ],
})

export class Company_sell_detailComponent implements OnInit {

  @Input() ticketName: string;
  @ViewChild('grid') grid: DxDataGridComponent;
  @ViewChild(DxFormComponent) form: DxFormComponent;
  @Input() public ticket: Ticket;

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
        }, 
        err => {
          //this.notifyService.error('failed_to_load_data');    //pomocou notifyService upozornim na chybu
        })}
    })};

  public handleBack = () => {
    const navigationState = window.history.state || {};
    this.router.navigate(['companies_sell'], { state: navigationState });
  };
};



