import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterModule } from '@angular/router';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import notify from 'devextreme/ui/notify';
import { navigation } from 'src/app/app-navigation';
import { UserService } from 'src/app/services/Users.Servis';
import { AuthService } from '../../services';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  loading = false;
  formData: any = {};

  constructor(private authService: AuthService,
    private readonly userServis: UserService, 
  private router: Router
  ) { 

  }

  route: ActivatedRouteSnapshot;

  async onSubmit(e) {
    e.preventDefault();
    const { login, password } = this.formData;
    this.loading = true;


    this.userServis.getUsersLogin(login, password).subscribe( s => {
      if(s)
      {
        var role = s.role;
        localStorage.setItem('rola', role);
      }
    },
    err => {
      localStorage.setItem('rola', "");
    });


    const result = await this.authService.logIn(login, password);
    if (!result.isOk) {
      this.loading = false;
      notify(result.message, 'error', 2000);
    }
  }
    

    /*
    e.preventDefault();
    const { login, password } = this.formData;
    this.loading = true;

    const result = await this.authService.logIn(login, password);
    if (!result.isOk) {
      this.loading = false;
      notify(result.message, 'error', 2000);
    }*/

  onCreateAccountClick = () => {
    this.router.navigate(['/create-account']);
  }
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DxFormModule,
    DxLoadIndicatorModule
  ],
  declarations: [ LoginFormComponent ],
  exports: [ LoginFormComponent ]
})
export class LoginFormModule { }
