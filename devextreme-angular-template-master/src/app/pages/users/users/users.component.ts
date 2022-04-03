import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import { DxoPagingComponent } from 'devextreme-angular/ui/nested';
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
          //this.notifyService.success('user_has_been_delete_successfully');
        },
        err => {
          //this.notifyService.error('failed_to_delete_customer');
        }
      );
    }
  }

  handleAdd = (e): void => {
    this.router.navigate(['users', 'new']);
  }

}

export class User {
  ID: number;
  FirstName: string;
  LastName: string;
  Prefix: string;
  Login: string;
  Password: string;
  Role: string;
  Email: string;
  BirthDate: string;
  PhoneNumber: string;
  Address: string;
  PathUrl: string;
  Notes: string;
}

