import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import { AuthService } from '../../services';


@Component({
  selector: 'app-create-account-form',
  templateUrl: './create-account-form.component.html',
  styleUrls: ['./create-account-form.component.scss']
})
export class CreateAccountFormComponent implements OnInit {
  loading = false;
  formData: any = {};
  rols : string[] = ['User','Customer']

  constructor(private authService: AuthService, private router: Router) { 
  }

  ngOnInit(): void {
    this.formData.roles = this.rols;
    console.log(this.rols);
  }

  async onSubmit(e) {
    e.preventDefault();
    const { login, password, roles } = this.formData;
    this.loading = true;
    this.authService.createAccount(login, password, roles);
    this.loading = false;

  }

  confirmPassword = (e: { value: string }) => {
    return e.value === this.formData.password;
  }


}
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DxFormModule,
    DxLoadIndicatorModule
  ],
  declarations: [ CreateAccountFormComponent ],
  exports: [ CreateAccountFormComponent ]
})
export class CreateAccountFormModule { }

