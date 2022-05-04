import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import { DxoPagingComponent } from 'devextreme-angular/ui/nested';
import notify from 'devextreme/ui/notify';
import { UserService } from 'src/app/services/Users.Servis';
import { User } from '../../users/users/users.component';


@Component({
  templateUrl: 'profile.component.html',
  styleUrls: [ './profile.component.scss' ]
})

export class ProfileComponent implements OnInit {
  
  @ViewChild('grid') grid: DxDataGridComponent;
  @ViewChild(DxoPagingComponent) pager: DxoPagingComponent;
  dataSource: User;

  galleryDataSource = [
    "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
  ];

  @Input() userId: number;
  @Input() public user: User;
  colCountByScreen: object;
  public image: string;

  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
  ) {   
    this.colCountByScreen = {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 3
    };
  }

  ngOnInit(): void {
    this.initialize();
  }

  initialize(): void {
    this.user = new User;
    this.userId = Number(localStorage.getItem("user"));
    this.userService.get(this.userId).subscribe(
      user => {
        this.dataSource = user;
        if(user.image_Path == null)
          this.image = "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png";
        else{
          this.image = user.image_Path;
        }
        this.user = user as User;
        this.galleryDataSource = [
          this.image
        ];
    }, 
    err => {
      notify("Chyba pri získaní používateľa", "warning", 500);
    });
  }

  handleEdit = (e): void => {
    const userId = this.userId;
    this.router.navigate(['profile', userId]);
  }



}
