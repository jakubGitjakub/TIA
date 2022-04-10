import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import { DxoPagingComponent } from 'devextreme-angular/ui/nested';
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
    "",
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
    this.userId = 1;      //nastavit ID prihlaseneho
    this.userService.get(this.userId).subscribe(
      user => {
        this.dataSource = user;
        this.image = user.image_Path;
        this.user = user as User;
        this.galleryDataSource = [
          this.image
        ];
    }, 
    err => {
      //this.notifyService.error('failed_to_load_data');    //pomocou notifyService upozornim na chybu
    });
  };

  handleEdit = (e): void => {
    const userId = this.userId; //= this.user.id
    this.router.navigate(['profile', userId]);
  }



}