import { formatDate } from '@angular/common';
import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DxDataGridComponent, DxFormComponent } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import { CompanyService } from 'src/app/services/Company.Servis';
import { EventService } from 'src/app/services/Event.Servis';
import { EventCalendarService } from 'src/app/services/EventCalendar.Servis';
import { TicketService } from 'src/app/services/Ticket.Servis';
import { Company, EventCalendar, Events, Ticket } from '../../companies_admin/companies_admin/companies_admin.component';



@Component({
  selector: 'pages-eventCalendar_addTicket',
  templateUrl: 'eventCalendar_addTicket.component.html',
  styleUrls: [ './eventCalendar_addTicket.component.scss' ],
})

export class EventCalendar_addTicketComponent implements OnInit {

  @ViewChild('grid') grid: DxDataGridComponent;
  @ViewChild(DxFormComponent) form: DxFormComponent;
  @ViewChild(DxFormComponent) formControl: DxFormComponent;
  dataSource: DATA[] = [];
  dataStore: [];
  saveData: DATA[] = [];
  companies = [];
  events = [];
  tickets = [];
  aktualCompany: string;
  aktualEvent: string;
  aktualTicket: string;
  idCompany: number;
  idEvent: number;
  idTicket: number;
  eventCalendar: EventCalendar[];
  dataCompanies: Company[];
  dataEvents: Events[];
  dataTickets: Ticket[];
  isShown: boolean = false;
  isShownSave: boolean = false ;
  isShownEvents: boolean = false ;
  isShownTickets: boolean = false ;
  colCountByScreen: object;
  dateStart: Date;
  dateEnd: Date;
  @Input() public eventC: EventCalendar;
  @Input() public eventCId: number;
  aktualDate: Date;

  constructor(
    private CompanyServices: CompanyService,
    private EventServices: EventService,
    private TicketServices: TicketService,
    private EventCalendarServices: EventCalendarService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
    ) { 
      this.colCountByScreen = {
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3
      }; 
  }

  ngOnInit(): void {
    this.initialize();
  }

  initialize(): void {
    this.CompanyServices.getCompanies().subscribe(s => {
      this.dataCompanies = s;
      for(let i = 0; i < s.length; i++){
        this.companies.push(s[i].name);
      }
    });
  };

  onValueChanged (e) {
    this.aktualCompany = e.value; //nazov firmy
    this.events = [];
    if(e.value == null){
      this.isShownEvents = false;
      this.isShownTickets = false;
      this.isShownSave = false;
      this.isShown = false;
    }
    else{
      this.isShownEvents = true;
      this.CompanyServices.getCompanyByName(this.aktualCompany).subscribe(s => {
        this.idCompany = s[0].id;
        this.dataCompanies = s; //s - vybrana company
        for(let i = 0; i< s[0].events.length; i++){
          this.events.push(s[0].events[i].name);
        }
      })
    }
  }

  onValueChangedEvent(e){
    this.aktualEvent = e.value; //nazov eventu
    this.tickets = [];
    if(e.value == null){
      this.isShownTickets = false;
      this.isShownSave = false;
      this.isShown = false;
    }
    else{
      this.isShownTickets = true;
      this.EventServices.getEventByName(this.aktualEvent).subscribe(s => {
        this.idEvent = s[0].id;
        this.dataEvents = s; //s vybrany event 
        for(let i = 0; i< s[0].tickets.length; i++){
          this.tickets.push(s[0].tickets[i].name);
        }
      })
    }
  }

  onValueChangedTickets(e){
    this.aktualTicket = e.value;  //nazov tiketu
    if(e.value == null){
      this.isShownSave = false;
      this.isShown = false;
    }
    else{    
      this.TicketServices.getTicketByName(this.aktualTicket).subscribe(s => {
        this.idTicket = s[0].id;
        this.dataTickets = s; //(s) - vybrany ticket
        this.isShownSave = true;
        this.isShown = true; 
      })
    }
  }

  public handleBack = () => {
    const navigationState = window.history.state || {};
    this.router.navigate(['eventCalendar'], { state: navigationState });
  };

  public handleSave = () => {
    if (!this.formControl.instance.validate().isValid) {
      return;
    }
    else{  
      this.TicketServices.get(this.idTicket).subscribe(t => {
        var dateStartT = formatDate(t['start_Date'],'yyyy-MM-dd','en_US');
        var dateEndT = formatDate(t['end_Date'],'yyyy-MM-dd','en_US');
        var dateStartEC = formatDate(this.dateStart,'yyyy-MM-dd','en_US');
        var dateEndEC = formatDate(this.dateEnd,'yyyy-MM-dd','en_US');

        if( (dateStartEC > dateStartT || dateStartEC == dateStartT) && (dateEndEC < dateEndT || dateEndEC == dateEndT) && (dateStartEC < dateEndEC || dateStartEC == dateEndEC) )
          {
            let model = { 
              'text': this.dataSource['text'], 
              'startDate': this.dateStart, 
              'endDate': this.dateEnd, 
              'allDay': false, 
              'capacity': this.dataSource['capacity'], 
              'companyId': this.idCompany
            }
            this.saveData.push(model);
            this.eventC = new EventCalendar;
            this.eventC.startDate = this.saveData[0].startDate;
            this.eventC.endDate = this.saveData[0].endDate;
            this.eventC.capacity = this.saveData[0].capacity;
            this.eventC.text = this.saveData[0].text;
            this.eventC.allDay = false;
      
            //ulozenie do databazy
            this.CompanyServices.get(this.idCompany).subscribe(s => {
              this.eventC.company = s;  
              this.EventServices.get(this.idEvent).subscribe(a => {
                this.eventC.events = a;
                this.TicketServices.get(this.idTicket).subscribe(b => {
                  this.eventC.tickets = b;
                  this.EventCalendarServices.add(this.eventC).subscribe(    //ulozenie
                  res => {
                    if(res){
                      this.router.navigate(['eventCalendar']);
                    }
                    this.handleBack();
                  },
                  err => {
                    notify("Chyba pri pridaní event kalendáru", "warning", 500);
                  });
                });
              });
            });
          }
        else{
          var result = confirm("Zadali ste nespravny dátum tiketu. Dátum tiketu musí byť v rozmedzí dátumu eventu : Začiatok eventu : " + dateStartT +" Koniec Eventu : " + dateEndT + " !");
        }
      })     
    }
  } 
};

export class DATA{
  text: string;
  startDate: Date;
  endDate: Date;
  allDay: boolean;
  capacity: number;
  companyId: number;
}



