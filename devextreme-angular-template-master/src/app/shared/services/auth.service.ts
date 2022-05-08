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
  isLoggedIn = false;
  private user = User;
  private _lastAuthenticatedPath: string = defaultPath;

  constructor(private router: Router,
    private UsersService : UserService,
    private http:HttpClient ) { 
  }

  get loggedIn(): boolean {
    let user = this.getUser()
    return user != null
  }

  set lastAuthenticatedPath(value: string) {
    this._lastAuthenticatedPath = value;
  }

  logIn() {
      this.isLoggedIn = true;
  }

  getUser() {
    try {
      return JSON.parse(<string>localStorage.getItem('user'));  
    }
    catch {
      return false;
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


  async logOut() {
    this.user = null;
    localStorage.clear();
    this.router.navigate(['/home']);
  }
}

@Injectable( {providedIn: 'root'} )
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, 
    private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let userRole = '';
    let roles = new Array<string>();
    if(route.data.hasOwnProperty("roles")){
      roles = route.data["roles"] as Array<string>;
    }
    const isLoggedIn = this.authService.loggedIn;
    if(isLoggedIn)
      userRole = localStorage.getItem("rola");

    const isAuthForm = [
      'login-form',
      'create-account',
    ].includes(route.routeConfig?.path || defaultPath); 

    if (isLoggedIn && isAuthForm) {
      this.authService.lastAuthenticatedPath = defaultPath;
      this.router.navigate([defaultPath]);
      return false;
    }

    if (!isLoggedIn && !isAuthForm && !roles.includes('')) { 
      this.router.navigate(['/login-form']);
    }

    if (isLoggedIn) {
      this.authService.lastAuthenticatedPath = route.routeConfig?.path || defaultPath;
    }
 
    if(isLoggedIn && !roles.includes(userRole)){
      this.router.navigate(['/home']);
    }

    if(isLoggedIn && route.params) {
      if (route.url[0].path == "profile" && route.params.hasOwnProperty("id") && localStorage.getItem('user') != route.params["id"]) {
        this.router.navigate(['/profile']);
      }
    }
    
    if(roles.includes(userRole)){
      return true;
    }

    return isLoggedIn || isAuthForm;   
  }
}
