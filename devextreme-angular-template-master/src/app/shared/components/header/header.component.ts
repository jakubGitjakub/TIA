import { Component, NgModule, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services';
import { UserPanelModule } from '../user-panel/user-panel.component';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';

import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  @Output()
  menuToggle = new EventEmitter<boolean>();

  @Input()
  menuToggleEnabled = false;

  @Input()
  title: string;
  logIn: string;

  user: string | null =  '';

  
  userMenuItems = [{
    text: 'Profil', 
    icon: 'user',
    onClick: () => {
      this.router.navigate(['/profile']);
    }
  },
    {
      text: 'Odhlásiť sa',
      icon: 'runner',
      onClick: () => {
        this.authService.logOut();
      }
    }
  ];
  

  isAuthenticated() {
    if(localStorage.getItem("login") != null)
      return true;
    else
      return false;
  }

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.user = localStorage.getItem("login");
  }

  toggleMenu = () => {
    this.menuToggle.emit();
  }
}

@NgModule({
  imports: [
    CommonModule,
    DxButtonModule,
    UserPanelModule,
    DxToolbarModule
  ],
  declarations: [ HeaderComponent ],
  exports: [ HeaderComponent ]
})
export class HeaderModule { }
