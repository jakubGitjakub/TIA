import { Component } from '@angular/core';

@Component({
  templateUrl: 'companies_sell.component.html',
  styleUrls: [ './companies_sell.component.scss' ]
})

export class Companies_sellComponent {

  dataSource: Employee[];

  constructor() {
    this.dataSource = employees;
  }

}

export class Employee {
  ID: number;
  Name: string;
  Date: Date;
  Capacity: string;
  AddInfo: string;
  Companies: string;
  Events: string;
}


const employees: Employee[] = [{
  ID: 0,
  Name: "Vstup",
  Date: new Date(1981, 3, 27),
  Capacity: "10",
  AddInfo: "Cena 10e",
  Companies: "Bar",
  Events: "Zima",
},{
  ID: 0,
  Name: "Drink",
  Date: new Date(1981, 3, 27),
  Capacity: "5",
  AddInfo: "Cena 10e",
  Companies: "Bar",
  Events: "Zima",
},{
  ID: 0,
  Name: "Napoj",
  Date: new Date(1981, 3, 27),
  Capacity: "5",
  AddInfo: "Cena 10e",
  Companies: "Bar",
  Events: "Leto",
},{
  ID: 1,
  Name: "Mlieko",
  Date: new Date(1981, 3, 27),
  Capacity: "20",
  AddInfo: "Cena 5e",
  Companies: "Potraviny",
  Events: "Leto",
},{
  ID: 2,
  Name: "Chlieb",
  Date: new Date(1981, 3, 25),
  Capacity: "20",
  AddInfo: "Cena 5e",
  Companies: "Potraviny",
  Events: "Leto",
},{
  ID: 3,
  Name: "Rozky",
  Date: new Date(1981, 3, 27),
  Capacity: "20",
  AddInfo: "Cena 1e",
  Companies: "Potraviny",
  Events: "Leto",
},{
  ID: 4,
  Name: "Paradajky",
  Date: new Date(1981, 3, 27),
  Capacity: "20",
  AddInfo: "Cena 10e",
  Companies: "Potraviny",
  Events: "Leto",
}]