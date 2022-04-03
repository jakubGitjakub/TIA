import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule, SideNavInnerToolbarModule, SingleCardModule } from './layouts';
import { FooterModule, ResetPasswordFormModule, CreateAccountFormModule, ChangePasswordFormModule, LoginFormModule, ChangePasswordFormComponent, CreateAccountFormComponent, LoginFormComponent, ResetPasswordFormComponent } from './shared/components';
import { AuthService, ScreenService, AppInfoService, AuthGuardService } from './shared/services';
import { UnauthenticatedContentModule } from './unauthenticated-content';
import { HttpClientModule } from '@angular/common/http';
import { UsersComponent } from './pages/users/users/users.component';
import { HomeComponent } from './pages/home/home.component';
import { Companies_sellComponent } from './pages/companies_sell/companies_sell.component';
import { Companies_setComponent } from './pages/companies_set/companies_set.component';
import { ConfirmEventComponent } from './pages/confirm/confirmEvent/confirmEvent.component';
import { ConfirmUserComponent } from './pages/confirm/confirmUser/confirmUser.component';
import { EventComponent } from './pages/event/event.component';
import { EventCalendarComponent } from './pages/eventCalendar/eventCalendar.component';
import { EventsComponent } from './pages/events/events.component';
import { HistoryComponent } from './pages/history/history.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TicketComponent } from './pages/ticket/ticket.component';
import { TicketsComponent } from './pages/tickets/tickets.component';
import { Users_detailComponent } from './pages/users/users_detail/users_detail.component';
import { DxDataGridModule, DxDateBoxModule, DxFormModule, DxSelectBoxModule, DxTextAreaModule } from 'devextreme-angular';
import { RouterModule, Routes } from '@angular/router';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
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
    canActivate: [ AuthGuardService ]
  },
    {
      path: 'companies_admin/newC',
      component: Companies_admin_companyComponent,
    },
    {
      path: 'companies_admin/:id/C',
      component: Companies_admin_companyComponent,
    },
    {
      path: 'companies_admin/newE',
      component: Companies_admin_eventComponent,
    },
    {
      path: 'companies_admin/:id/E',
      component: Companies_admin_eventComponent,
    },
    {
      path: 'companies_admin/newT',
      component: Companies_admin_ticketComponent,
    },
    {
      path: 'companies_admin/:id/T',
      component: Companies_admin_ticketComponent,
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
  },
    {
      path: 'users/new',
      component: Users_detailComponent,
    },
    {
      path: 'users/:id',
      component: Users_detailComponent,
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
  declarations: [
    AppComponent, UsersComponent, HomeComponent, Companies_setComponent, Companies_sellComponent, Companies_adminComponent,
    ProfileComponent, EventComponent, EventCalendarComponent, EventsComponent, HistoryComponent, TicketComponent, 
    TicketsComponent, Users_detailComponent, ConfirmEventComponent, ConfirmUserComponent, Companies_admin_companyComponent,
    Companies_admin_eventComponent, Companies_admin_ticketComponent ],
  imports: [
    BrowserModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    SingleCardModule,
    FooterModule,
    ResetPasswordFormModule,
    CreateAccountFormModule,
    ChangePasswordFormModule,
    LoginFormModule,
    UnauthenticatedContentModule,
    HttpClientModule,
    DxDataGridModule, 
    BrowserModule, 
    DxFormModule,  
    DxSelectBoxModule,
    DxTextAreaModule,
    DxDateBoxModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  providers: [AuthService, ScreenService, AppInfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
