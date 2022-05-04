import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from 'src/app/pages/users/users/users.component';
import { UserService, environment } from 'src/app/services/Users.Servis';

const defaultPath = '/home';
const defaultUser = {
  Login: '',
  avatarUrl: ''
};

@Injectable()
export class AuthService {
  private user = User;
  get loggedIn(): boolean {
    return !!this.user;
  }

  private _lastAuthenticatedPath: string = defaultPath;
  set lastAuthenticatedPath(value: string) {
    this._lastAuthenticatedPath = value;
  }

  constructor(private router: Router,
    private UsersService : UserService,
    private http:HttpClient ) { }

  async logIn(Login: string, Password: string) {

    try {    
      this.UsersService.getUsersLogin(Login, Password).subscribe(s => {
        this.user = s;
      })
      this.router.navigate([this._lastAuthenticatedPath]);
      window.location.reload();

      return {
        isOk: true,
        data: this.user
      };
    }
    catch {
      return {
        isOk: false,
        message: "Authentication failed"
      };
    }
  }

  async getUser() {
    try {
      // Send request

      return {
        isOk: true,
        data: this.user
      };
    }
    catch {
      return {
        isOk: false
      };
    }
  }

  createAccount(login, password, roles) {
    try {
      
      //request na databzu
      var result = this.http.post<any>(`${environment.baseUrl}/api/auth/register`,{Login:login, Password:password, Role:roles}).subscribe(e => {
        this.router.navigate(['/login-form']);
      });
    }
    catch {
      return {
        isOk: false,
        message: "Failed to create account"
      };
    }
  }

  async changePassword(login: string, recoveryCode: string) {
    try {
      // Send request
      console.log(login, recoveryCode);

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to change password"
      }
    };
  }

  async resetPassword(login: string) {
    try {
      // Send request
      console.log(login);

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to reset password"
      };
    }
  }

  async logOut() {
    this.user = null;
    localStorage.clear();
    localStorage.setItem('rola', '');
    localStorage.setItem('user', '');
    localStorage.setItem('login', '');
    this.router.navigate(['/login-form']);
  }
}

@Injectable( {providedIn: 'root'} )
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = this.authService.loggedIn;
    const isAuthForm = [
      'login-form',
      'reset-password',
      'create-account',
      'change-password/:recoveryCode'
    ].includes(route.routeConfig.path);

    if (isLoggedIn && isAuthForm) {     //ak je prihlaseny a schvaleny
      this.authService.lastAuthenticatedPath = defaultPath;
      this.router.navigate([defaultPath]);
      return false;
    }

    if (!isLoggedIn && !isAuthForm) {   //prihlaseny a neschvaleny
      this.router.navigate(['/login-form']);
    }

    if (isLoggedIn) {  
      this.authService.lastAuthenticatedPath = route.routeConfig.path;
    }

    return isLoggedIn || isAuthForm;    //vrati stav prihlasenia a autentifikacie
  }
}
