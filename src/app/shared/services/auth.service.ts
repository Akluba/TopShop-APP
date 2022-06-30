import { Injectable } from '@angular/core';
import { CanActivate, Router, Route, ActivatedRouteSnapshot, CanLoad } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import {throwError as observableThrowError, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
declare let $: any;

export interface IUser {
  id: number;
  name: string;
  email: string;
  profile: string;
  active?: boolean;
}

const defaultPath = '/dash';

@Injectable()
export class AuthService {
  private baseUrl = `${environment.url}/auth`;
  private _user: IUser | null;

  get loggedIn(): boolean {
    const helper = new JwtHelperService();
    const token = this._retrieveAccessToken();
    return token != null && !helper.isTokenExpired(token);
  }

  private _lastAuthenticatedPath: string = defaultPath;
  set lastAuthenticatedPath(value: string) {
    this._lastAuthenticatedPath = value;
  }

  constructor(private _http: HttpClient, private router: Router) { }

  async logIn(email: string, password: string) {
    try{
      const url = `${this.baseUrl}/login`;
      const body = { email: email, password: password };
      const headers = new HttpHeaders({ Accept: 'application/json' });
      const options = { headers: headers };

      await this._http.post<any>(url, body, options).pipe(
        tap(res => {
            // Set access token in LocalStorage.
            localStorage.setItem('access_token', res.access_token);
            this.router.navigate([this._lastAuthenticatedPath]);
        }),
        catchError(this.handleError)
      ).toPromise()
      .then(() => this.getUser());

      return { isOk: true };
    }
    catch {
      return { isOk: false, message: 'Authentication failed' };
    }
  }

  async getUser() {
    // if(!!this._user){
    //   return {data: this._user };
    // }

    try {
      const url = `${this.baseUrl}/currentUser`;
      const headers = new HttpHeaders({ Accept: 'application/json' });
      const options = { headers: headers };

      await this._http.get<IUser>(url, options).pipe(
        tap(currentUser => {
            if (!!currentUser['id']) {
              this._user = currentUser;
            }
        }),
        catchError(this.handleError)
      ).toPromise();

      return { isOk: true, data: this._user };
    }
    catch {
      return { isOk: false, data: null};
    }
  }

  async changePassword(email: string, recoveryCode: string) {
    try {
      // Send request
      console.log(email, recoveryCode);

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: 'Failed to change password'
      }
    };
  }

  async resetPassword(email: string) {
    try {
      // Send request
      console.log(email);

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: 'Failed to reset password'
      };
    }
  }


  async logOut() {
    const url = `${this.baseUrl}/logout`;
    const headers = new HttpHeaders({ Accept: 'application/json' });
    const options = { headers: headers };

    // Revoke the access token from the server.
    await this._http.post<any>(url, null, options).pipe(
      tap(() => {
          // Remove access_token from LocalStorage.
          localStorage.removeItem('access_token');
          // Remove the currentUser.
          this._user = null;
          this.router.navigate(['/login-form']);
      }),
      catchError(this.handleError)
    ).toPromise();
  }

  private _retrieveAccessToken() {
    return localStorage.getItem('access_token');
  }

  private handleError(err: HttpErrorResponse) {
    if (err.error instanceof Error) {
        console.log(`An error occurred: ${err.error.message}`);
    } else {
        console.log(`Backend returned code ${err.status}, body was: ${err.error.message}`);
    }
    return observableThrowError(err.error.message);
  }
}

@Injectable()
export class ProfileGuardService implements CanActivate, CanLoad {
  private authorizedProfiles: any[];
  private profile: string;

  constructor(private _router: Router, private _authService: AuthService) {}

  canLoad(route: Route): Promise<boolean> {
    this.authorizedProfiles = route.data.authorizedProfiles;
    return this._doCheck();
  }

  canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
      this.authorizedProfiles = route.data.authorizedProfiles;
      return this._doCheck();
  }

  private async _doCheck() {
    await this._authService.getUser().then((e) => this.profile = e.data.profile);

    if ($.inArray(this.profile, this.authorizedProfiles) !== -1) {
      return true;
    }

    this._router.navigate(['/unauthorized']);
    return false;
  }
}

@Injectable()
export class AuthGuardService implements CanActivate {
  private _route: string;
  constructor(private router: Router, private authService: AuthService) { }

  canLoad(route: Route): boolean {
    this._route = route?.path || defaultPath;
    return this._doCheck();
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    this._route = route.routeConfig?.path || defaultPath;
    return this._doCheck();
  }

  private _doCheck() {
    const isLoggedIn = this.authService.loggedIn;
    const isAuthForm = [
      'login-form'
      // 'reset-password',
      // 'change-password/:recoveryCode'
    ].includes(this._route);

    if (isLoggedIn && isAuthForm) {
      this.authService.lastAuthenticatedPath = defaultPath;
      this.router.navigate([defaultPath]);
      return false;
    }

    if (!isLoggedIn && !isAuthForm) {
      this.router.navigate(['/login-form']);
    }

    // if (isLoggedIn) {
    //   this.authService.lastAuthenticatedPath = this._route;
    // }

    return isLoggedIn || isAuthForm;
  }
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authHeader = `Bearer ${localStorage.getItem('access_token')}`;
    const authReq = req.clone({headers: req.headers.set('Authorization', authHeader)});
    return next.handle(authReq);
  }
}
