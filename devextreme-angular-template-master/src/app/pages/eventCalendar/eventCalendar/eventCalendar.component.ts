import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import { DxoPagingComponent } from 'devextreme-angular/ui/nested';
import { CompanyService } from 'src/app/services/Company.Servis';
import { EventService } from 'src/app/services/Event.Servis';
import { TicketService } from 'src/app/services/Ticket.Servis';
import { Company } from '../../companies_admin/companies_admin/companies_admin.component';


@Component({
  templateUrl: 'eventCalendar.component.html',
  styleUrls: [ './eventCalendar.component.scss' ]
})

export class EventCalendarComponent implements OnInit {

  companies = [];
  @ViewChild('grid') grid: DxDataGridComponent;
  @ViewChild(DxoPagingComponent) pager: DxoPagingComponent;
  dataCompanies: Company[];

  constructor(private CompanyServices: CompanyService,
    private EventServices: EventService,
    private TicketServices: TicketService,
    private readonly router: Router) {

    }

  ngOnInit(): void {
    this.CompanyServices.getCompanies().subscribe(s => {
      this.dataCompanies = s;
      for(let i = 0; i < s.length; i++){
        this.companies.push(s[i].name);
      }
    });
  }

  onValueChanged (e) {
    console.log(e.value); //nazov firmy
    if(e.value == null){
      //skryt kalendar
    }
    else{
      //get firmy z databazy podla e.value == companies.name
      //get data eventCalendar podla Id firmy - tie nastavit do kalendaru
      //zobrazit kalendar
    }

    

}

  handleSetTicket = (e): void => {
    //get firmy z databazy
    //get eventy podla id firmy
    //get tikety podla id eventov 
    //nastavenie noveho tiketu
  }
}
