import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DxDataGridComponent, DxFormComponent } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import { CompanyService } from 'src/app/services/Company.Servis';
import { Company } from '../companies_admin/companies_admin.component';


@Component({
  selector: 'pages-companies_admin_company',
  templateUrl: 'companies_admin_company.component.html',
  styleUrls: [ './companies_admin_company.component.scss' ],
})

export class Companies_admin_companyComponent implements OnInit {

  @Input() companyId: number;
  @ViewChild('grid') grid: DxDataGridComponent;
  @ViewChild(DxFormComponent) form: DxFormComponent;
  @Input() public company: Company;

  constructor(
    private readonly router: Router,
    private readonly companyService: CompanyService,
    private readonly activatedRoute: ActivatedRoute
    ) {  
  }

  ngOnInit(): void {
    this.initialize();
  }

  public newCompany = 0;
  initialize(): void {

    this.company = new Company;

    this.activatedRoute.params.subscribe(params => {
      this.companyId = null;
      if (params['id'] && params['id'] !== 'new') {
        this.companyId = params['id'];
        this.companyService.get(this.companyId).subscribe(
          company => {
            this.company = company as Company;
        }, 
        err => {
          notify("Chyba pri vyhladaní firmy", "warning", 500);
        });
      } else {
        this.newCompany = 1;
      }
      })
    };

  public handleBack = () => {
    const navigationState = window.history.state || {};
    this.router.navigate(['companies_admin'], { state: navigationState });
  };

  public handleSave = () => {
    
    if (!this.form.instance.validate().isValid) {
      return;
    }
    if(this.newCompany == 0)
    {
      this.companyService.save(this.companyId, this.company).subscribe(
        res => {
          if (res) {
            this.router.navigate([`/companies/${res.companyId}`]);
          }
          this.handleBack();
        },
        err => {
          notify("Chyba pri uložení firmy", "warning", 500);
        }
      );
    }
    else{
      this.companyService.add(this.company).subscribe(
        res => {
          if (res) {
            this.router.navigate([`/companies/${res.companyId}`]);
          }
          this.handleBack();
        },
        err => {
          notify("Chyba pri vytvorení firmy", "warning", 500);
        }
      );  
    }
  }
};



