import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import { DxoPagingComponent } from 'devextreme-angular/ui/nested';
import notify from 'devextreme/ui/notify';
import { CompanyService } from 'src/app/services/Company.Servis';
import { EventService } from 'src/app/services/Event.Servis';
import { TicketService } from 'src/app/services/Ticket.Servis';
import { CET, Company, Events, Ticket } from '../../companies_admin/companies_admin/companies_admin.component';
import { User } from '../../users/users/users.component';

@Component({
  templateUrl: 'companies_set.component.html',
  styleUrls: [ './companies_set.component.scss' ]
})

export class Companies_setComponent implements OnInit {

  @ViewChild('grid') grid: DxDataGridComponent;
  @ViewChild(DxoPagingComponent) pager: DxoPagingComponent;
  dataSource: CET[] = [];
  dataCompanies: Company[];
  dataEvents: Events[];
  dataTickets: Ticket[];
  dataEventsAccess: Events[];   //zoznam eventov dostupne pre daneho usera
  dataTicketsUser: Ticket[];    //zoznam tiketov daneho usera     
  user: User;          

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
    this.EventServices.getEventsVerify().subscribe(s => {
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

    //set eventov a tiketov pre daneho usera
    var id = Number(localStorage.getItem("user"));
    this.EventServices.getEventsByUser(id).subscribe(s => {   //get event ktore maju Access = open alebo su od daneho usera
      this.dataEventsAccess = s;
    });

    this.TicketServices.getTicketByUser(id).subscribe(s => {  //get user tiket
      this.dataTicketsUser = s;
    });


  }


  handleEditEvent = (e): void => {
    const eventId = e.row.key;
    if((e.row.values[4]) == "Open")
    {
      this.router.navigate(['companies_set', eventId, 'E' ], { state: { page: this.pager.pageIndex } }); 
    }
    else{
      confirm("Editácia tohto eventu je ukončená !");
    }
  }
  handleEditTicket = (e): void => {
    const ticketId = e.row.key;
    if((e.row.values[6]) == "Open")
    {
      this.router.navigate(['companies_set', ticketId, 'T'], { state: { page: this.pager.pageIndex } });
    }
    else{
      confirm("Editácia tohto tiketu je ukončená !");
    }
  }

  deleteTicket = (e): void => {
    var result = confirm("Chcete tiket odstrániť ?");
    if (result) {
      const ticketId = e.row.key;
      this.TicketServices.delete(ticketId).subscribe(
        res => {
          if (res) {
            this.router.navigate(['companies_set']);
          }
          window.location.reload();
        },
        err => {
          notify("Chyba pri odstránení tiketu", "warning", 500);
        }
      );
    }
  }

  handleAddEvent = (e): void => {
    this.router.navigate(['companies_set', 'newE']);
  }
  handleAddTicket = (e): void => {
    this.router.navigate(['companies_set', 'newT']);
  }

}



