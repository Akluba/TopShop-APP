import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { tokenNotExpired } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import { ICurrentUser } from '../auth/currentUser';

@Injectable()
export class AuthService {
    private baseUrl = 'http://localhost:8888/api/auth';
    currentUser: ICurrentUser;

    constructor(private _http: HttpClient) { }

    /**
     * Function to login a user.
     * @param credentials
     */
    login(credentials): Observable<any> {
        let apiUrl = 'http://localhost:8888/api/auth/login';
        let body = {
            email:      credentials.email,
            password:   credentials.password,
        };
        // Get initial access token from the Passport server.
        return this._http.post<any>(apiUrl, body, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept':       'application/json'
            })
        })
        .do(res => {
            // Set access token in LocalStorage.
            localStorage.setItem('access_token', res.access_token);
            // Get the current user.
            this.getCurrentUser();
        })
        .catch(this.handleError);
    }

    getCurrentUser() {
        const url = `${this.baseUrl}/currentUser`;
        let headers = new HttpHeaders({ 'Accept': 'application/json' });
        let options = { headers: headers };

        return this._http.get<ICurrentUser>(url, options)
        .do(currentUser => {
            if (!!currentUser['id']) {
                this.currentUser = currentUser;
            }
        })
        .catch(this.handleError)
        .subscribe();
    }

    refresh(): Observable<any> {
        let apiUrl = 'http://localhost:8888/api/auth/refresh';
        return this._http.post<any>(apiUrl, null, {
            headers: new HttpHeaders({
                'content-type': 'application/x-www-form-urlencoded',
                'Accept':       'application/json'
            })
        })
        .do(res => console.log(res))
        .catch(this.handleError);
    }

    /**
     * Function to logout a user.
     */
    logout(): Observable<any> {
        let apiUrl = 'http://localhost:8888/api/auth/logout';
        // Revoke the access token from the server.
        return this._http.post<any>(apiUrl, null, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept':       'application/json'
            })
        })
        .do(() => {
            // Remove access_token from LocalStorage.
            localStorage.removeItem('access_token');
            // Remove the currentUser.
            this.currentUser = undefined;
        })
        .catch(this.handleError);
    }

    /**
     * Retrieve the access token from LocalStorage.
     */
    public retrieveAccessToken()
    {
        return localStorage.getItem('access_token');
    }

    /**
     * Check if the access token is valid.
     */
    public isAuthenticated(): boolean
    {
        const token = this.retrieveAccessToken();

        return tokenNotExpired(null, token);
    }

    /**
     * Return the error message to be displayed to the user.
     * also log to the console a more specific error message.
     * @param error
     */
    private handleError(err: HttpErrorResponse) {
        if (err.error instanceof Error) {
            console.log(`An error occurred: ${err.error.message}`);
        } else {
            console.log(`Backend returned code ${err.status}, body was: ${err.error.message}`);
        }

        return Observable.throw(err.error.message);
    }

}