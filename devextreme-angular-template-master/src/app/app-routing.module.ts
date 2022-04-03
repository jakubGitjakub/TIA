import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent, ResetPasswordFormComponent, CreateAccountFormComponent, ChangePasswordFormComponent } from './shared/components';
import { AuthGuardService } from './shared/services';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { Companies_setComponent } from './pages/companies_set/companies_set.component';
import { EventCalendarComponent } from './pages/eventCalendar/eventCalendar.component';
import { HistoryComponent } from './pages/history/history.component';
import { UsersComponent } from './pages/users/users/users.component';
import { ConfirmEventComponent } from './pages/confirm/confirmEvent/confirmEvent.component';
import { ConfirmUserComponent } from './pages/confirm/confirmUser/confirmUser.component';
import { Companies_sellComponent } from './pages/companies_sell/companies_sell.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Users_detailComponent } from './pages/users/users_detail/users_detail.component';
import { Companies_adminComponent } from './pages/companies_admin/companies_admin/companies_admin.component';
import { Companies_admin_companyComponent } from './pages/companies_admin/companies_admin_company/companies_admin_company.component';
import { Companies_admin_eventComponent } from './pages/companies_admin/companies_admin_event/companies_admin_event.component';
import { Companies_admin_ticketComponent } from './pages/companies_admin/companies_admin_ticket/companies_admin_ticket.component';


const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'companies_set',
    component: Companies_setComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'companies_sell',
    component: Companies_sellComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'companies_admin',
    component: Companies_adminComponent,
    children: [
      {
        path: 'newC',
        component: Companies_admin_companyComponent,
      },
      {
        path: 'C'+':id',
        component: Companies_admin_companyComponent,
      },
      {
        path: 'newE',
        component: Companies_admin_eventComponent,
      },
      {
        path: 'E'+':id',
        component: Companies_admin_eventComponent,
      },
      {
        path: 'newT',
        component: Companies_admin_ticketComponent,
      },
      {
        path: 'T'+':id',
        component: Companies_admin_ticketComponent,
      }
    ]
  },
  {
    path: 'eventCalendar',
    component: EventCalendarComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'history',
    component: HistoryComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'users',
    component: UsersComponent,
    children: [
      {
        path: 'new',
        component: Users_detailComponent,
      },
      {
        path: ':id',
        component: Users_detailComponent,
      }]
  },
  {
    path: 'confirmEvent',
    component: ConfirmEventComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'confirmUser',
    component: ConfirmUserComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'reset-password',
    component: ResetPasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'create-account',
    component: CreateAccountFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'change-password',
    component: ChangePasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'change-password/:recoveryCode',
    component: ChangePasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }), RouterModule.forChild(routes)],
  providers: [AuthGuardService],
  exports: [RouterModule],
})
export class AppRoutingModule { }

platformBrowserDynamic().bootstrapModule(AppRoutingModule);
