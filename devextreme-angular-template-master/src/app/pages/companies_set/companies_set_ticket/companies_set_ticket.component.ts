import { formatDate } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DxDataGridComponent, DxFormComponent } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import { EventService } from 'src/app/services/Event.Servis';
import { TicketService } from 'src/app/services/Ticket.Servis';
import { UserService } from 'src/app/services/Users.Servis';
import { Events, Ticket } from '../../companies_admin/companies_admin/companies_admin.component';
import { User } from '../../users/users/users.component';



@Component({
  selector: 'pages-companies_set_ticket',
  templateUrl: 'companies_set_ticket.component.html',
  styleUrls: [ './companies_set_ticket.component.scss' ],
})

export class Companies_set_ticketComponent implements OnInit {

  @Input() ticketId: number;
  @ViewChild('grid') grid: DxDataGridComponent;
  @ViewChild(DxFormComponent) form: DxFormComponent;
  @Input() public ticket: Ticket;
  user: User;
  events = [];
  dataEvents: Events[];
  aktualEvent: string;

  constructor(
    private readonly router: Router,
    private readonly ticketService: TicketService,
    private readonly eventService: EventService,
    private userService: UserService,
    private readonly activatedRoute: ActivatedRoute
    ) {  
  }

  ngOnInit(): void {
    this.initialize();
  }

  public newTicket = 0;
  initialize(): void {
    
    this.eventService.getEvents().subscribe(s => {
      this.dataEvents = s;
      for(let i = 0; i < s.length; i++){
        this.events.push(s[i].name);
      }
    });

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
          notify("Chyba pri získaní tiketu", "warning", 500);
        });
      } else {
        this.newTicket = 1;
        this.ticketService.getNextNumber().subscribe(num => {
          this.ticketId = num;
        });
      }
      })
    };

  public handleBack = () => {
    const navigationState = window.history.state || {};
    this.router.navigate(['companies_set'], { state: navigationState });
  };

  onValueChanged (e) {
    this.aktualEvent = e.value; //nazov eventu
  }

  public handleSave = () => {   
    if (!this.form.instance.validate().isValid) {
      return;
    }
    this.userService.get(1).subscribe(s => {  //dat id prihlaseneho
      this.user = s;
      this.ticket.user = this.user;
      if(this.newTicket == 0)
      {
        this.ticketService.save(this.ticketId, this.ticket).subscribe(
          res => {
            if (res) {
              this.router.navigate([`/tickets/${res.ticketId}`]);
            }
            this.handleBack();
          },
          err => {
            notify("Chyba pri uložení tiketu", "warning", 500);
          }
        );
      }
      else{
        this.eventService.getEventByName(this.aktualEvent).subscribe(s => {
          //kontrola dátumu
          var dateStartE = formatDate(s[0].start_Date,'yyyy-MM-dd','en_US');
          var dateEndE = formatDate(s[0].end_Date,'yyyy-MM-dd','en_US');
          var dateStartT = formatDate(this.ticket['start_Date'],'yyyy-MM-dd','en_US');
          var dateEndT = formatDate(this.ticket['end_Date'],'yyyy-MM-dd','en_US');

          if( (dateStartT > dateStartE || dateStartT == dateStartE) && (dateEndT < dateEndE || dateEndT == dateEndE) && (dateStartT < dateEndT || dateStartT == dateEndT) )
          {
            this.ticket.Events = s;
            this.ticketService.add(this.ticket).subscribe(
            res => {
              if (res) {
                this.router.navigate([`/tickets/${res.ticketId}`]);
              }
              this.handleBack();
            },
            err => {
              notify("Chyba pri pridaní tiketu", "warning", 500);
            });  
          }
          else{
            var result = confirm("Zadali ste nespravny dátum tiketu. Dátum tiketu musí byť v rozmedzí dátumu eventu : Začiatok eventu : " + dateStartE +" Koniec Eventu : " + dateEndE + " !");
          }
        })
      } 
    })
  }
};



