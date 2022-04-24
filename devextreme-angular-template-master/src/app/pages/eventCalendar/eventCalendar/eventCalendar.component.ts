import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import { DxoPagingComponent } from 'devextreme-angular/ui/nested';
import { CompanyService } from 'src/app/services/Company.Servis';
import { EventCalendarService } from 'src/app/services/EventCalendar.Servis';
import { Company } from '../../companies_admin/companies_admin/companies_admin.component';


@Component({
  templateUrl: 'eventCalendar.component.html',
  styleUrls: [ './eventCalendar.component.scss' ]
})

export class EventCalendarComponent implements OnInit {

  companies = [];
  aktualCompany: string;
  idCompany: number;
  @ViewChild('grid') grid: DxDataGridComponent;
  @ViewChild(DxoPagingComponent) pager: DxoPagingComponent;
  dataCompanies: Company[];
  currentDate: Date = new Date();
  eventCalendarData: EventCalendar[];
  isShown: boolean = false ;

  constructor(private CompanyServices: CompanyService,
    private EventCalendarServices: EventCalendarService,
    private readonly router: Router) {}

  ngOnInit(): void {
    this.CompanyServices.getCompanies().subscribe(s => {
      this.dataCompanies = s;
      for(let i = 0; i < s.length; i++){
        this.companies.push(s[i].name);
      }
    });
  }

  onValueChanged (e) {
    this.aktualCompany = e.value; //nazov firmy
    if(e.value == null){
      this.isShown = false ;
    }
    else{
      this.isShown = true;
      this.CompanyServices.getCompanyByName(this.aktualCompany).subscribe(s => {
        this.idCompany = s[0].id;
        this.EventCalendarServices.getByCompanyId(this.idCompany).subscribe(s =>{
          this.eventCalendarData = s;
        })
      })
    }
  }

  handlePropertyChange(e) { //ak by som chcel nastavovat predaj rovno v kalendary
  }

  handleSetTicket = (e): void => {
    this.CompanyServices.getCompanyByName(this.aktualCompany).subscribe(s => {
      this.idCompany = s[0].id;
      this.router.navigate(['eventCalendar', this.idCompany]);
    })
  }

}

export class EventCalendar {
  text: string;
  startDate: Date;
  endDate: Date;
  allDay?: boolean;
}



