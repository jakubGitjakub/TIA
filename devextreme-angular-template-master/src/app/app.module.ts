import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule, SideNavInnerToolbarModule, SingleCardModule } from './layouts';
import { FooterModule, CreateAccountFormModule, LoginFormModule, CreateAccountFormComponent, LoginFormComponent } from './shared/components';
import { AuthService, ScreenService, AppInfoService, AuthGuardService } from './shared/services';
import { UnauthenticatedContentModule } from './unauthenticated-content';
import { HttpClientModule } from '@angular/common/http';
import { UsersComponent } from './pages/users/users/users.component';
import { HomeComponent } from './pages/home/home.component';
import { Companies_sellComponent } from './pages/companies_sell/companies_sell/companies_sell.component';
import { ConfirmEventComponent } from './pages/confirm/confirmEvent/confirmEvent.component';
import { ConfirmUserComponent } from './pages/confirm/confirmUser/confirmUser.component';
import { HistoryComponent } from './pages/history/history.component';
import { Users_detailComponent } from './pages/users/users_detail/users_detail.component';
import { DxDataGridModule, DxDateBoxModule, DxFormModule, DxGalleryModule, DxSchedulerModule, DxSelectBoxModule, DxTextAreaModule } from 'devextreme-angular';
import { RouterModule, Routes } from '@angular/router';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Companies_adminComponent } from './pages/companies_admin/companies_admin/companies_admin.component';
import { Companies_admin_companyComponent } from './pages/companies_admin/companies_admin_company/companies_admin_company.component';
import { Companies_admin_eventComponent } from './pages/companies_admin/companies_admin_event/companies_admin_event.component';
import { Companies_admin_ticketComponent } from './pages/companies_admin/companies_admin_ticket/companies_admin_ticket.component';
import { ProfileComponent } from './pages/profile/profile/profile.component';
import { Profile_detailComponent } from './pages/profile/profile_detail/profile_detail.component';
import { Company_sell_detailComponent } from './pages/companies_sell/company_sell_detail/company_sell_detail.component';
import { Company_sell_buyComponent } from './pages/companies_sell/company_sell_buy/company_sell_buy.component';
import { Companies_setComponent } from './pages/companies_set/companies_set/companies_set.component';
import { Companies_set_eventComponent } from './pages/companies_set/companies_set_event/companies_set_event.component';
import { Companies_set_ticketComponent } from './pages/companies_set/companies_set_ticket/companies_set_ticket.component';
import { EventCalendarComponent } from './pages/eventCalendar/eventCalendar/eventCalendar.component';
import { EventCalendar_addTicketComponent } from './pages/eventCalendar/eventCalendar_addTicket/eventCalendar_addTicket.component';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ AuthGuardService ],
    data: {roles: ['Admin', 'User', 'Customer']},
  },
  {
    path: 'profile/:id',
    component: Profile_detailComponent,
    canActivate: [ AuthGuardService ],
    data: {roles: ['Admin', 'User', 'Customer']},
  },
  {
    path: 'home',
    component: HomeComponent,
    data: {roles: ['Admin', 'User', 'Customer', '']},
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'companies_set',
    component: Companies_setComponent,
    data: {roles: ['User']},
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'companies_set/newE',
    component: Companies_set_eventComponent,
    canActivate: [ AuthGuardService ],
    data: {roles: ['User']}
  },
  {
    path: 'companies_set/:id/E',
    component: Companies_set_eventComponent,
    canActivate: [ AuthGuardService ],
    data: {roles: ['User']}
  },
  {
    path: 'companies_set/newT',
    component: Companies_set_ticketComponent,
    canActivate: [ AuthGuardService ],
    data: {roles: ['User']}
  },
  {
    path: 'companies_set/:id/T',
    component: Companies_set_ticketComponent,
    canActivate: [ AuthGuardService ],
    data: {roles: ['User']}
  },
  {
    path: 'companies_sell',
    component: Companies_sellComponent,
    canActivate: [ AuthGuardService ],
    data: {roles: ['Customer', '']},
  },
  {
    path: 'companies_sell/:eventCalendarName/I',
    component: Company_sell_detailComponent,
    canActivate: [ AuthGuardService ],
    data: {roles: ['Customer', '']},
  },
  {
    path: 'companies_sell/:eventCalendarName/B',
    component: Company_sell_buyComponent,
    canActivate: [ AuthGuardService ],
    data: {roles: ['Customer', '']},
  },
  {
    path: 'companies_admin',
    component: Companies_adminComponent,
    canActivate: [ AuthGuardService ],
    data: {roles: ['Admin']},
  },
    {
      path: 'companies_admin/newC',
      component: Companies_admin_companyComponent,
      canActivate: [ AuthGuardService ],
      data: {roles: ['Admin']},
    },
    {
      path: 'companies_admin/:id/C',
      component: Companies_admin_companyComponent,
      canActivate: [ AuthGuardService ],
      data: {roles: ['Admin']},
    },
    {
      path: 'companies_admin/newE',
      component: Companies_admin_eventComponent,
      canActivate: [ AuthGuardService ],
      data: {roles: ['Admin']},
    },
    {
      path: 'companies_admin/:id/E',
      component: Companies_admin_eventComponent,
      canActivate: [ AuthGuardService ],
      data: {roles: ['Admin']},
    },
    {
      path: 'companies_admin/newT',
      component: Companies_admin_ticketComponent,
      canActivate: [ AuthGuardService ],
      data: {roles: ['Admin']},
    },
    {
      path: 'companies_admin/:id/T',
      component: Companies_admin_ticketComponent,
      canActivate: [ AuthGuardService ],
      data: {roles: ['Admin']},
    },
  {
    path: 'eventCalendar',
    component: EventCalendarComponent,
    canActivate: [ AuthGuardService ],
    data: {roles: ['User']},
  },
  {
    path: 'eventCalendar/:id',
    component: EventCalendar_addTicketComponent,
    canActivate: [ AuthGuardService ],
    data: {roles: ['User']},
  },
  {
    path: 'history',
    component: HistoryComponent,
    canActivate: [ AuthGuardService ],
    data: {roles: ['Customer']},

  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [ AuthGuardService ],
    data: {roles: ['Admin']},
  },
  {
    path: 'users/new',
    component: Users_detailComponent,
    canActivate: [ AuthGuardService ],
    data: {roles: ['Admin']},
  },
  {
    path: 'users/:id',
    component: Users_detailComponent,
    canActivate: [ AuthGuardService ],
    data: {roles: ['Admin']},
  },
  {
    path: 'confirmEvent',
    component: ConfirmEventComponent,
    canActivate: [ AuthGuardService ],
    data: {roles: ['Admin']},
  },
  {
    path: 'confirmUser',
    component: ConfirmUserComponent,
    canActivate: [ AuthGuardService ],
    data: {roles: ['Admin']},
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'create-account',
    component: CreateAccountFormComponent,
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
    ProfileComponent, EventCalendarComponent, HistoryComponent, Users_detailComponent, ConfirmEventComponent, ConfirmUserComponent, 
    Companies_admin_companyComponent, Companies_admin_eventComponent, Companies_admin_ticketComponent, Profile_detailComponent, 
    Company_sell_detailComponent, Company_sell_buyComponent, Companies_set_eventComponent, Companies_set_ticketComponent,
    EventCalendar_addTicketComponent],
  imports: [
    BrowserModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    SingleCardModule,
    FooterModule,
    CreateAccountFormModule,
    LoginFormModule,
    UnauthenticatedContentModule,
    HttpClientModule,
    DxDataGridModule, 
    BrowserModule, 
    DxFormModule,  
    DxSelectBoxModule,
    DxTextAreaModule,
    DxDateBoxModule,
    DxGalleryModule,
    DxSchedulerModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  providers: [AuthService, ScreenService, AppInfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
