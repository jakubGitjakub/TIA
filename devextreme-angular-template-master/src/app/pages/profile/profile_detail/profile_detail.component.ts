import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DxDataGridComponent, DxFormComponent } from 'devextreme-angular';
import { UserService } from 'src/app/services/Users.Servis';
import { User } from '../../users/users/users.component';


@Component({
  selector: 'pages-profile_detail',
  templateUrl: 'profile_detail.component.html',
  styleUrls: [ './profile_detail.component.scss' ],
})

export class Profile_detailComponent implements OnInit {

  @Input() userId: number;
  @ViewChild('grid') grid: DxDataGridComponent;
  @ViewChild(DxFormComponent) form: DxFormComponent;
  @Input() public user: User;

  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly activatedRoute: ActivatedRoute
    ) {  
  }

  ngOnInit(): void {
    this.initialize();
  }

  initialize(): void {
    this.user = new User;

    this.activatedRoute.params.subscribe(params => {
      this.userId = null;
      if (params['id']) {
        this.userId = params['id'];
        this.userService.get(this.userId).subscribe(
          user => {
            this.user = user as User;
        }, 
        err => {
          //this.notifyService.error('failed_to_load_data');    //pomocou notifyService upozornim na chybu
        });
      }
    })
  };

  public handleBack = () => {
    const navigationState = window.history.state || {};
    this.router.navigate(['profile'], { state: navigationState });
  };

  public handleSave = () => {
    if (!this.form.instance.validate().isValid) {
      return;
    }
    this.userService.save(this.userId, this.user).subscribe(
      res => {
        if (res) {
          this.router.navigate([`/profile/${res.userId}`]);
        }
        //this.notifyService.success('user_has_been_saved_successfully');
        this.handleBack();
        },
        err => {
          //this.notifyService.error('failed_to_save_customer');
        }
      );
  }
};



