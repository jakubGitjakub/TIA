import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/Users.Servis';
import { User } from '../users/users/users.component';

@Component({
  templateUrl: 'profile.component.html',
  styleUrls: [ './profile.component.scss' ]
})

export class ProfileComponent {
  
  @Input() userId: number;
  @Input() public user: User;
  colCountByScreen: object;

  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly activatedRoute: ActivatedRoute
  ) {   
    this.colCountByScreen = {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 4
    };
  }

  ngOnInit(): void {
    this.initialize();
  }

  initialize(): void {
    this.user = new User;
    this.userService.get(this.userId).subscribe(
      user => {
        this.user = user as User;
        console.log(user);
    }, 
    err => {
      //this.notifyService.error('failed_to_load_data');    //pomocou notifyService upozornim na chybu
    });
  };


}
