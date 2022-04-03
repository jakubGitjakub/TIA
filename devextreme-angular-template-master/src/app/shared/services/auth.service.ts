import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from 'src/app/pages/users/users/users.component';

const defaultPath = '/';
const defaultUser = {
  Login: '',
  avatarUrl: '' //path to picture (https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png)
};

@Injectable()
export class AuthService {
  private user = User;
  private Login;
  get loggedIn(): boolean {
    return !!this.user;
  }

  private _lastAuthenticatedPath: string = defaultPath;
  set lastAuthenticatedPath(value: string) {
    this._lastAuthenticatedPath = value;
  }

  constructor(private router: Router) { }

  async logIn(Login: string, Password: string) {

    try {
      // Send request

      this.router.navigate([this._lastAuthenticatedPath]);
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

  async createAccount(login, password) {
    try {
      // Send request
      console.log(login, password);

      this.router.navigate(['/create-account']);
      return {
        isOk: true
      };
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

    if (isLoggedIn && isAuthForm) {
      this.authService.lastAuthenticatedPath = defaultPath;
      this.router.navigate([defaultPath]);
      return false;
    }

    if (!isLoggedIn && !isAuthForm) {
      this.router.navigate(['/login-form']);
    }

    if (isLoggedIn) {
      this.authService.lastAuthenticatedPath = route.routeConfig.path;
    }

    return isLoggedIn || isAuthForm;
  }
}
