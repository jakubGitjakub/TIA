export const navigation = [
  {
    text: 'Úvod',             //uvodna stranka pre vsetkych
    path: '/home',
    icon: 'home',
    role: ["noAuth",""]
  },
  {
    text: 'Predaj lístkov',
    path: '/companies_sell',    //predaj ticketov v danom evente a podniku
    icon: 'money',
    role: ["Customer", "noAuth"]
  },
  {
    text: 'Nastavenie lístkov',
    path: '/companies_set',     //nastavenie eventu / ticketu do daneho podniku
    icon: 'columnchooser',
    role: ['User'],
  },
  {
    text: 'Firmy Eventy Tikety',
    path: '/companies_admin',     //nastavenie podniku / eventu / tiketu - Admin
    icon: 'columnchooser',
    role: ['Admin'],
  },
  {
    text: 'Používatelia',              //zoznam použivatelov
    path: '/users',
    icon: 'group',
    role: ["Admin"]
  },
  {
    text: 'Event kalendar',  //event kalendar s nastaveniami
    path: '/eventCalendar',
    icon: 'event',
    role: ["User"]
  },
  {
    text: 'História nákupov',        //historia nakupov
    path: '/history',
    icon: 'clock',
    role: ["Customer"]
  },
  {
    text: 'Schválenie',      //zoznam pouzivatelov a eventov cakajuci na schvalenie
    icon: 'check',
    role: ["Admin"],
    items: [
      {
        text: 'Používatelia',
        icon: 'group',
        path: '/confirmUser'
      },
      {
        text: 'Eventy',
        icon: 'columnchooser',
        path: '/confirmEvent'
      }
    ]
  },
  {
    text: 'Nastavenie',     //profil a zmena hesla pre každého
    icon: 'preferences',
    role: ["Customer","User","Admin"],
    items: [
      {
        text: 'Profil',
        path: '/profile'
      },
    ]
  }
];
