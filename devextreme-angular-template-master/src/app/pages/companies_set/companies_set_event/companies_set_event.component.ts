import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DxDataGridComponent, DxFormComponent } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import { CompanyService } from 'src/app/services/Company.Servis';
import { EventService } from 'src/app/services/Event.Servis';
import { UserService } from 'src/app/services/Users.Servis';
import { Company, Events } from '../../companies_admin/companies_admin/companies_admin.component';
import { User } from '../../users/users/users.component';



@Component({
  selector: 'pages-companies_set_event',
  templateUrl: 'companies_set_event.component.html',
  styleUrls: [ './companies_set_event.component.scss' ],
})

export class Companies_set_eventComponent implements OnInit {

  @Input() eventId: number;
  @ViewChild('grid') grid: DxDataGridComponent;
  @ViewChild(DxFormComponent) form: DxFormComponent;
  @Input() public event: Events;
  user: User;
  companies = [];
  dataCompanies: Company[];
  aktualCompany: string;

  constructor(
    private readonly router: Router,
    private readonly eventService: EventService,
    private userService: UserService,
    private CompanyServices: CompanyService,
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
          notify("Chyba pri získaní eventu", "warning", 500);
        });
      } else {
        this.newEvent = 1;
      }
      })
    };

  public handleBack = () => {
    const navigationState = window.history.state || {};
    this.router.navigate(['companies_set'], { state: navigationState });
  };

  onValueChanged (e) {
    this.aktualCompany = e.value; //nazov firmy
  }

  public handleSave = () => {
    if (!this.form.instance.validate().isValid) {
      return;
    }
    //get usera
    var userID = Number(localStorage.getItem("user"));
    this.userService.get(userID).subscribe(s => {
      this.user = s;
      this.event.Users = this.user;
      if(this.newEvent == 0)
      {
        this.eventService.save(this.eventId, this.event).subscribe(
          res => {
            if (res) {
              this.router.navigate([`/events/${res.eventId}`]);
            }
            this.handleBack();
          },
          err => {
            notify("Chyba pri uložení eventu", "warning", 500);
          }
        );
      }
      else{
        this.CompanyServices.getCompanyByName(this.aktualCompany).subscribe(s => {
          this.event.Companies = s;
          this.event.Verify_Status = false;
          this.eventService.add(this.event).subscribe(
            res => {
              if (res) {
                this.router.navigate([`/events/${res.eventId}`]);
              }
              this.handleBack();
            },
            err => {
              notify("Chyba pri pridaní eventu", "warning", 500);
            }
          ); 
        })   
      }
    });
  }
};



