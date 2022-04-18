import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DxDataGridComponent, DxFormComponent } from 'devextreme-angular';
import { CompanyService } from 'src/app/services/Company.Servis';
import { EventService } from 'src/app/services/Event.Servis';
import { UserService } from 'src/app/services/Users.Servis';
import { User } from '../../users/users/users.component';
import { Company, Events } from '../companies_admin/companies_admin.component';


@Component({
  selector: 'pages-companies_admin_event',
  templateUrl: 'companies_admin_event.component.html',
  styleUrls: [ './companies_admin_event.component.scss' ],
})

export class Companies_admin_eventComponent implements OnInit {

  @Input() eventId: number;
  @ViewChild('grid') grid: DxDataGridComponent;
  @ViewChild(DxFormComponent) form: DxFormComponent;
  @Input() public event: Events;
  companies = [];
  dataCompanies: Company[];
  aktualCompany: string;
  user: User;

  constructor(
    private readonly router: Router,
    private readonly eventService: EventService,
    private CompanyServices: CompanyService,
    private userService: UserService,
    private readonly activatedRoute: ActivatedRoute
    ) {  
  }

  ngOnInit(): void {
    this.initialize();
  }

  public newEvent = 0;
  initialize(): void {

    this.CompanyServices.getCompanies().subscribe(s => {
      this.dataCompanies = s;
      for(let i = 0; i < s.length; i++){
        this.companies.push(s[i].name);
      }
    });
    
    this.event = new Events;

    this.activatedRoute.params.subscribe(params => {
      this.eventId = null;
      if (params['id'] && params['id'] !== 'new') {
        this.eventId = params['id'];
        this.eventService.get(this.eventId).subscribe(
          event => {
            this.event = event as Events;
        }, 
        err => {
          //this.notifyService.error('failed_to_load_data');    //pomocou notifyService upozornim na chybu
        });
      } else {
        //inicializovat select box pre vyber firmy ku ktorej bude event priradeni
        this.newEvent = 1;
        this.eventService.getNextNumber().subscribe(num => {
          this.eventId = num;
        });
      }
      })
    };

  public handleBack = () => {
    const navigationState = window.history.state || {};
    this.router.navigate(['companies_admin'], { state: navigationState });
  };

  onValueChanged (e) {
    this.aktualCompany = e.value; //nazov firmy
    //this.event.company_name = e.value;
  }

  public handleSave = () => {
    if (!this.form.instance.validate().isValid) {
      return;
    }
    //get usera
    this.userService.get(1).subscribe(s => { //dat id prihlaseneho
      this.user = s;
      this.event.Users = this.user;
      if(this.newEvent == 0)
      {
        this.eventService.save(this.eventId, this.event).subscribe(
          res => {
            if (res) {
              this.router.navigate([`/events/${res.eventId}`]);
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
        //inicializovat zo select box pre ktoru firmu bude event priradeni
        this.eventService.add(this.event).subscribe(
          res => {
            if (res) {
              this.router.navigate([`/events/${res.eventId}`]);
            }
            //this.notifyService.success('user_has_been_add_successfully');
            this.handleBack();
          },
          err => {
            //this.notifyService.error('failed_to_add_customer');
          }
        );  
      }
    })
  }
};



