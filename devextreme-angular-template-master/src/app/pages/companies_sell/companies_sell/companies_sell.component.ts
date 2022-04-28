import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import { DxoPagingComponent } from 'devextreme-angular/ui/nested';
import { EventCalendarService } from 'src/app/services/EventCalendar.Servis';
import { CET, Company, EventCalendar, Events, Ticket } from '../../companies_admin/companies_admin/companies_admin.component';

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
  dataEventCalendar: EventCalendar[];

  constructor( private EventCalendarServis: EventCalendarService,
    private readonly router: Router) {
  }

  ngOnInit(): void {

    let model = { 'name': "", 'name_company': "", 'name_event': "", 'name_ticket': "" }
    this.EventCalendarServis.getEventCalendar().subscribe(s => {
      this.dataEventCalendar = s;
      for (let i = 0; i < s.length; i++) {
        model = {'name': s[i].text, 'name_company': s[i].company['name'], 'name_event': s[i].events['name'], 'name_ticket': ""}
        this.dataSource.push(model);
      }
    })
  }

  handleInfo = (e): void => {
    const eventCalendarName = e.row.key.name;
    this.router.navigate(['companies_sell', eventCalendarName, 'I'], { state: { page: this.pager.pageIndex } });
  }

  handleBuy = (e): void => {
    const eventCalendarName = e.row.key.name;
    this.router.navigate(['companies_sell', eventCalendarName, 'B'], { state: { page: this.pager.pageIndex } });
  }



}




