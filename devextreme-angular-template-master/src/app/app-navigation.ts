import { getAttrsForDirectiveMatching } from "@angular/compiler/src/render3/view/util";

export const navigation = [
  {
    text: 'Predaj lístkov',
    path: '/companies_sell',    //predaj ticketov v danom evente a podniku
    icon: 'money',
    role: "customer"
  },
  {
    text: 'Nastavenie lístkov',
    path: '/companies_set',     //nastavenie eventu / ticketu do daneho podniku
    icon: 'columnchooser',
    role: 'user',
  },
  {
    text: 'Firmy Eventy Tikety',
    path: '/companies_admin',     //nastavenie podniku / eventu / tiketu - Admin
    icon: 'columnchooser',
    role: 'admin',
  },
  {
    text: 'Používatelia',              //zoznam použivatelov
    path: '/users',
    icon: 'group',
    role: "admin"
  },
  {
    text: 'Úvod',             //uvodna stranka pre vsetkych
    path: '/home',
    icon: 'home',
  },
  {
    text: 'Event kalendar',  //event kalendar s nastaveniami
    path: '/eventCalendar',
    icon: 'event',
    role: "user"
  },
  {
    text: 'História nákupov',        //historia nakupov
    path: '/history',
    icon: 'clock',
    role: "customer"
  },
  {
    text: 'Schválenie',      //zoznam pouzivatelov a eventov cakajuci na schvalenie
    icon: 'check',
    role: "admin",
    items: [
      {
        text: 'Používatelia',
        path: '/confirmUser'
      },
      {
        text: 'Eventy',
        path: '/confirmEvent'
      }
    ]
  },
  {
    text: 'Nastavenie',     //profil a zmena hesla pre každého
    icon: 'preferences',
    items: [
      {
        text: 'Profil',
        path: '/profile'
      },
      {
        text: 'Zmena hesla',
        path: '/change-password'                        //'/change-password/:recoveryCode'
      }
    ]
  }
];
