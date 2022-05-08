import { Component, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, ScreenService, AppInfoService } from './shared/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  @HostBinding('class') get getClass() {
    return Object.keys(this.screen.sizes).filter(cl => this.screen.sizes[cl]).join(' ');
  }

  constructor(private authService: AuthService, 
    private screen: ScreenService, 
    public appInfo: AppInfoService,
    private router: Router) { }

  isAuthenticated() {
    return this.authService.loggedIn;
  }

  getCurrentRoute() {
    return this.router.url;
  }
}
