import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import { DxoPagingComponent } from 'devextreme-angular/ui/nested';
import notify from 'devextreme/ui/notify';
import { CompanyService } from 'src/app/services/Company.Servis';
import { EventService } from 'src/app/services/Event.Servis';
import { TicketService } from 'src/app/services/Ticket.Servis';
import { User } from '../../users/users/users.component';

@Component({
  templateUrl: 'companies_admin.component.html',
  styleUrls: [ './companies_admin.component.scss' ]
})

export class Companies_adminComponent implements OnInit {

  @ViewChild('grid') grid: DxDataGridComponent;
  @ViewChild(DxoPagingComponent) pager: DxoPagingComponent;
  dataSource: CET[] = [];
  dataCompanies: Company[];
  dataEvents: Events[];
  dataTickets: Ticket[];

  constructor(private CompanyServices: CompanyService,
    private EventServices: EventService,
    private TicketServices: TicketService,
    private readonly router: Router) { 
  }

  ngOnInit(): void {
    let model = { 'name': "", 'name_company': "", 'name_event': "", 'name_ticket': "" }
    this.CompanyServices.getCompanies().subscribe(s => {
      this.dataCompanies = s; 
      for (let i = 0; i < s.length; i++) {
        if(s[i].events.length == 0){
          model = {'name': "", 'name_company': s[i].name, 'name_event': "", 'name_ticket': ""}
          this.dataSource.push(model);
        }
      }
    })
    this.EventServices.getEvents().subscribe(s => {
      this.dataEvents = s;     
      for (let i = 0; i < s.length; i++) {    //prechadzam eventy
        for(let x = 0; x < (s[i].companies.length); x++){
          if(s[i].tickets.length == 0){
            model = {'name': "", 'name_company': s[i].companies[x].name, 'name_event': s[i].name, 'name_ticket': ""}  
            this.dataSource.push(model);
          }
          for(let z = 0; z < (s[i].tickets.length); z++){
            model = {'name': s[i].tickets[z].name, 'name_company': s[i].companies[x].name, 'name_event': s[i].name, 'name_ticket': ""}
            this.dataSource.push(model);
          }
        }
      }
    })
    this.TicketServices.getTickets().subscribe(s => {
      this.dataTickets = s; 
    })
  }


  handleEditCompany = (e): void => {
    const companyId = e.row.key;
    this.router.navigate(['companies_admin', companyId, 'C'], { state: { page: this.pager.pageIndex } });
  }
  handleEditEvent = (e): void => {
    const eventId = e.row.key;
    this.router.navigate(['companies_admin', eventId, 'E' ], { state: { page: this.pager.pageIndex } }); 
  }
  handleEditTicket = (e): void => {
    const ticketId = e.row.key;
    this.router.navigate(['companies_admin', ticketId, 'T'], { state: { page: this.pager.pageIndex } });
  }

  deleteCompany = (e): void => {
    var result = confirm("Chcete firmu odstr??ni?? ?");
    if (result) {
      const companyId = e.row.key;
      this.CompanyServices.delete(companyId).subscribe(
        res => {
          if (res) {
            this.router.navigate(['companies_admin']);
          }
          window.location.reload();
        },
        err => {
          notify("Chyba pri odstr??nen?? firmy", "warning", 500);
        }
      );
    }
  }

  deleteEvent = (e): void => {
    var result = confirm("Chcete event odstr??ni?? ?");
    if (result) {
      const eventId = e.row.key;
      this.EventServices.delete(eventId).subscribe(
        res => {
          if (res) {
            this.router.navigate(['companies_admin']);
          }
          window.location.reload();
        },
        err => {
          notify("Chyba pri odstr??nen?? eventu", "warning", 500);
        }
      );
    }
  }

  deleteTicket = (e): void => {
    var result = confirm("Chcete tiket odstr??ni?? ?");
    if (result) {
      const ticketId = e.row.key;
      this.TicketServices.delete(ticketId).subscribe(
        res => {
          if (res) {
            this.router.navigate(['companies_admin']);
          }
          window.location.reload();
        },
        err => {
          notify("Chyba pri odstr??nen?? tiketu", "warning", 500);
        }
      );
    }
  }

  handleAddCompany = (e): void => {
    this.router.navigate(['companies_admin', 'newC']);
  }
  handleAddEvent = (e): void => {
    this.router.navigate(['companies_admin', 'newE']);
  }
  handleAddTicket = (e): void => {
    this.router.navigate(['companies_admin', 'newT']);
  }

}

export class CET{
  name : string
  name_company: string;
  name_event: string;
  name_ticket: string;
}

export class Company{
  id: number;
  name: string;
}

export class Events{
  Id: number;
  Name: string;
  Start_Date: Date;
  End_Date: Date;
  Status: string;
  Access: string;
  Users: User;
  Verify_Status: boolean;
  Companies: Company;
}

export class Ticket{
  id: number;
  name: string;
  start_date: Date;
  end_date: Date;
  capacity: number;
  add_info: string;
  status: string;
  user: User;
  Events: Events;
}

export class EventCalendar{
  id: number;
  startDate: Date;
  endDate: Date;
  capacity: number;
  company: Company;
  events: Events;
  tickets: Ticket;
  text: string;
  allDay: boolean;
  additional_Info: string;
}



