import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DxDataGridComponent, DxFormComponent } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import { UserService } from 'src/app/services/Users.Servis';
import { User } from '../users/users.component';

@Component({
  selector: 'pages-users_detail',
  templateUrl: 'users_detail.component.html',
  styleUrls: [ './users_detail.component.scss' ],
})

export class Users_detailComponent implements OnInit {

  @Input() userId: number;
  @ViewChild('grid') grid: DxDataGridComponent;
  @ViewChild(DxFormComponent) form: DxFormComponent;
  @Input() public user: User;
  roles = [];

  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly activatedRoute: ActivatedRoute
    ) {  
  }

  ngOnInit(): void {
    this.initialize();
  }

  public newUser = 0;
  initialize(): void {
    this.user = new User;
  
    for(let i = 0; i < 3; i++){
      this.roles.push(UsersRole[i]);
    }

    this.activatedRoute.params.subscribe(params => {
      this.userId = null;
      if (params['id'] && params['id'] !== 'new') {
        this.userId = params['id'];
        this.userService.get(this.userId).subscribe(
          user => {
            this.user = user as User;
        }, 
        err => {
          notify("Chyba pri získaní používateľa", "warning", 500);
        });
      } else {
        this.newUser = 1;
        this.userService.getNextNumber().subscribe(num => {
          this.userId = num;
        });
      }
      })
    };

  public handleBack = () => {
    const navigationState = window.history.state || {};
    this.router.navigate(['users'], { state: navigationState });
  };

  onValueChanged (e) {
    this.user.role = e.value;
  };

  public handleSave = () => {
    if (!this.form.instance.validate().isValid) {
      return;
    }
    if(this.newUser == 0)
    {
      this.userService.save(this.userId, this.user).subscribe(
        res => {
          if (res) {
            this.router.navigate([`/users/${res.userId}`]);
          }
          this.handleBack();
        },
        err => {
          notify("Chyba pri uložení používateľa", "warning", 500);
        }
      );
    }
    else{
      this.userService.add(this.user).subscribe(    //add user nema velmi vyznam, lebo by trebalo nastavit heslo
        res => {                                    //dalo by sa to doriesit bez hesla a pridanim "prve prihlasenie" bez hesla, kde nasledne user vyplni heslo
          if (res) {                                //kedze je tam klasicka registracia, toto pridavanie nema teraz zmysel
            this.router.navigate([`/users/${res.userId}`]);
          }
          this.handleBack();
        },
        err => {
          notify("Chyba pri pridaní používateľa", "warning", 500);
        }
      );  
    }
  }
};

enum UsersRole {
  Customer = 0,
  User = 1,
  Admin = 2
}



