import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import { DxoPagingComponent } from 'devextreme-angular/ui/nested';
import { UserService } from 'src/app/services/Users.Servis';

@Component({
  templateUrl: 'confirmUser.component.html',
  styleUrls: [ './confirmUser.component.scss' ]
})

export class ConfirmUserComponent implements OnInit{
  
  @ViewChild('grid') grid: DxDataGridComponent;
  @ViewChild(DxoPagingComponent) pager: DxoPagingComponent;
  dataSource: User[];
  @Input() public user: User;
  @Input() userId: number;

  constructor(
    private usersService : UserService, 
    private readonly router: Router, 
  ) {}

  ngOnInit(): void {
    this.usersService.GetUsersByConfirm("verify").subscribe(s => {
      this.dataSource = s;
    })
  }

  handleConfirm = (e): void => {
    var result = confirm("Chcete používateľa schváliť ?");
    if(result){
      this.userId = e.row.key;
      //get user
      this.user = new User;
      this.usersService.get(this.userId).subscribe(
        user => {
          this.user = user as User;
          //set user
          this.usersService.confirmUser(this.userId, user).subscribe();
      });
    }
  }

  refresh = (e): void => {
    window.location.reload();
  }
}

export class User {
  ID: number;
  FirstName: string;
  LastName: string;
  Login: string;
  Role: string;
  Email: string;
  VerifyStatus: boolean;
}