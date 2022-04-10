import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DxDataGridComponent, DxFormComponent } from 'devextreme-angular';
import { TicketService } from 'src/app/services/Ticket.Servis';
import { Ticket } from '../companies_admin/companies_admin.component';


@Component({
  selector: 'pages-companies_admin_ticket',
  templateUrl: 'companies_admin_ticket.component.html',
  styleUrls: [ './companies_admin_ticket.component.scss' ],
})

export class Companies_admin_ticketComponent implements OnInit {

  @Input() ticketId: number;
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

  public newTicket = 0;
  initialize(): void {
    
    this.ticket = new Ticket;

    this.activatedRoute.params.subscribe(params => {
      this.ticketId = null;
      if (params['id'] && params['id'] !== 'new') {
        this.ticketId = params['id'];
        this.ticketService.get(this.ticketId).subscribe(
          ticket => {
            this.ticket = ticket as Ticket;
        }, 
        err => {
          //this.notifyService.error('failed_to_load_data');    //pomocou notifyService upozornim na chybu
        });
      } else {
        //inicializovat select box pre vyber eventu ku ktoremu bude ticket priradeni
        this.newTicket = 1;
        this.ticketService.getNextNumber().subscribe(num => {
          this.ticketId = num;
        });
      }
      })
    };

  public handleBack = () => {
    const navigationState = window.history.state || {};
    this.router.navigate(['companies_admin'], { state: navigationState });
  };

  public handleSave = () => {   
    if (!this.form.instance.validate().isValid) {
      return;
    }
    if(this.newTicket == 0)
    {
      this.ticketService.save(this.ticketId, this.ticket).subscribe(
        res => {
          if (res) {
            this.router.navigate([`/tickets/${res.ticketId}`]);
          }
          //this.notifyService.success('user_has_been_saved_successfully');
          this.handleBack();
        },
        err => {
          //this.notifyService.error('failed_to_save_customer');
        }
      );
    }
    else{
      //inicializovat zo select box pre ktory event bude ticket priradeni
      this.ticketService.add(this.ticket).subscribe(
        res => {
          if (res) {
            this.router.navigate([`/tickets/${res.ticketId}`]);
          }
          //this.notifyService.success('user_has_been_add_successfully');
          this.handleBack();
        },
        err => {
          //this.notifyService.error('failed_to_add_customer');
        }
      );  
    }
  }
};



