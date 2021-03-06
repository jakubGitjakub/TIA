import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import { DxoPagingComponent } from 'devextreme-angular/ui/nested';
import notify from 'devextreme/ui/notify';
import { UserService } from 'src/app/services/Users.Servis';

@Component({
  selector: 'pages-users',
  templateUrl: 'users.component.html',
  styleUrls: [ './users.component.scss' ],
})

export class UsersComponent implements OnInit{

  @ViewChild('grid') grid: DxDataGridComponent;
  @ViewChild(DxoPagingComponent) pager: DxoPagingComponent;
  dataSource: User[];

  constructor(private UsersService : UserService, 
    private readonly router: Router, 
    ) { 

  }

  ngOnInit(): void {
    this.UsersService.getUsers().subscribe(s => {
      this.dataSource = s;
    })
  }

  handleEdit = (e): void => {
    const userId = e.row.key;
    this.router.navigate(['users', userId], { state: { page: this.pager.pageIndex } });
  }
  
  handleRowDblClick = (e): void => {
    const userId = e.key;
    this.router.navigate(['users', userId], { state: { page: this.pager.pageIndex } });
  }

  deleteEdit = (e): void => {
    var result = confirm("Chcete používateľa odstrániť ?");
    if (result) {
      const userId = e.row.key;
      this.UsersService.delete(userId).subscribe(
        res => {
          if (res) {
            this.router.navigate(['users']);
          }
          window.location.reload();
        },
        err => {
          notify("Chyba pri odstránení používateľa", "warning", 500);
        }
      );
    }
  }

  handleAdd = (e): void => {
    this.router.navigate(['users', 'new']);
  }

}

export class User {
  id: number;
  title: string;
  first_Name: string;
  last_Name: string;
  prefix: string;
  login: string;
  password: string;
  role: string;
  email: string;
  birthdate: Date;
  phone_Number: string;
  image_Path: string;
  id_Addresses: number;
  pathUrl: string;
  note: string;
  verify_Status: boolean;
}

export class Address {
  id: number;
  street: string;
  house_Number: string;
  city: string;
  country: string;
  zip_Code: string; 
}

