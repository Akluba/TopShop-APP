import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import {throwError as observableThrowError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

export interface IUser {
  id: number;
  name: string;
  email: string;
  profile: string;
}

const defaultPath = '/';

@Injectable()
export class AuthService {
  private baseUrl = `${environment.url}/auth`;
  private _user: IUser;

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
        }),
        catchError(this.handleError)
      ).toPromise()
      // Get Current user
      .then(this.getUser);

      this.router.navigate([this._lastAuthenticatedPath]);

      return { isOk: true, data: this._user };
    }
    catch {
      return { isOk: false, message: 'Authentication failed' };
    }
  }

  async getUser() {
    try {
      const url = `${this.baseUrl}/currentUser`;
      const headers = new HttpHeaders({ Accept: 'application/json' });
      const options = { headers: headers };

      const resp = await this._http.get<IUser>(url, options).pipe(
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
        message: "Failed to change password"
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
        message: "Failed to reset password"
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
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = this.authService.loggedIn;
    const isAuthForm = [
      'login-form',
      'reset-password',
      'create-account',
      'change-password/:recoveryCode'
    ].includes(route.routeConfig?.path || defaultPath);

    if (isLoggedIn && isAuthForm) {
      this.authService.lastAuthenticatedPath = defaultPath;
      this.router.navigate([defaultPath]);
      return false;
    }

    if (!isLoggedIn && !isAuthForm) {
      this.router.navigate(['/login-form']);
    }

    if (isLoggedIn) {
      this.authService.lastAuthenticatedPath = route.routeConfig?.path || defaultPath;
    }

    return isLoggedIn || isAuthForm;
  }
}
