import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DxDataGridComponent, DxFormComponent } from 'devextreme-angular';
import { AddressService } from 'src/app/services/Address.Servis';
import { UserService } from 'src/app/services/Users.Servis';
import { Address, User } from '../../users/users/users.component';


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
  addressNumber: number = 1;

  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly addressService: AddressService,
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
    //ulozenie adresy
    var address = new Address();
    address.city = this.user.id_Addresses['city'];
    address.country = this.user.id_Addresses['country'];
    address.house_Number = this.user.id_Addresses['house_Number'];
    address.street = this.user.id_Addresses['street'];
    address.zip_Code = this.user.id_Addresses['zip_Code'];
    
    this.addressService.getNextNumber().subscribe(num => {
      this.addressNumber = 1;
      if(num != null)
        this.addressNumber = num;  
      this.addressService.add(address).subscribe(
        res => {
          if (res) {
            this.addressService.get(this.addressNumber).subscribe( a => { 
              this.user.id_Addresses = a;
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
                  });
            })
          }
          //this.notifyService.success('user_has_been_add_successfully');
        },
        err => {
          //this.notifyService.error('failed_to_add_customer');
        });
    });
  }
};



