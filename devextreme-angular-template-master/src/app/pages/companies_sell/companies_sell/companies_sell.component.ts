import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import { DxoPagingComponent } from 'devextreme-angular/ui/nested';
import { CompanyService } from 'src/app/services/Company.Servis';
import { EventService } from 'src/app/services/Event.Servis';
import { TicketService } from 'src/app/services/Ticket.Servis';
import { CET, Company, Events, Ticket } from '../../companies_admin/companies_admin/companies_admin.component';

@Component({
  templateUrl: 'companies_sell.component.html',
  styleUrls: [ './companies_sell.component.scss' ]
})

export class Companies_sellComponent implements OnInit {

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
    })
    this.EventServices.getEvents().subscribe(s => {
      this.dataEvents = s;        
      for (let i = 0; i < s.length; i++) {    //prechadzam eventy
        for(let x = 0; x < (s[i].companies.length); x++){
          for(let z = 0; z < (s[i].tickets.length); z++){   //osetrit zobrazenie aktualnych tiketov v danom evente
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

  handleInfo = (e): void => {
    const ticketName = e.row.key.name;
    this.router.navigate(['companies_sell', ticketName, 'I'], { state: { page: this.pager.pageIndex } });
  }

  handleBuy = (e): void => {
    const ticketName = e.row.key.name;
    this.router.navigate(['companies_sell', ticketName, 'B'], { state: { page: this.pager.pageIndex } });
  }



}




