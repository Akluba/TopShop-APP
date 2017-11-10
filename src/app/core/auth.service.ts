import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {
    public currentUser;

    constructor(private _http: HttpClient) { }

    /**
     * Function to login a user.
     * @param credentials 
     */
    public login(credentials): Promise<any>
    {
        return this
            .getAccessToken(credentials)
            .then(() => this.getCurrentUser())
            .catch(this.handleError);
    }

    public refresh()
    {}

    /**
     * Function to logout a user.
     */
    public logout(): Promise<any>
    {
        return this
            .revokeAccessToken()
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
     * Get initial access token from the Passport server.
     * also set in LocalStorage.
     * @param credentials 
     */
    private getAccessToken(credentials)
    {
        let promise = new Promise((resolve, reject) => {
            let apiUrl = 'http://localhost:8888/api/auth/login';
            let body = {
                email:      credentials.email,
                password:   credentials.password,
            };
            this._http.post<any>(apiUrl, body, {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Accept':       'application/json'
                })      
            })
            .toPromise()
            .then(
                res => {
                    localStorage.setItem('access_token', res.access_token);
                    resolve(res);
                },
                err => reject(err)
            );
        });
        return promise;
    }

    private getCurrentUser()
    {
        let promise = new Promise((resolve, reject) => {
            let apiUrl = 'http://localhost:8888/api/auth/user';
            this._http.get(apiUrl,{
                headers: new HttpHeaders({
                    'Accept': 'application/json'
                })
            })
            .toPromise()
            .then(
                res => resolve(res),
                err => reject(err)
            );
        });
        return promise;
    }

    private refreshAccessToken()
    {}

    /**
     * Revoke the access token from the server.
     * also remove from LocalStorage.
     */
    private revokeAccessToken()
    {
        let promise = new Promise((resolve, reject) => {
            let apiUrl = 'http://localhost:8888/api/auth/logout';
            this._http.post<any>(apiUrl, null, {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Accept':       'application/json'
                })      
            })
            .toPromise()
            .then(
                res => {
                    localStorage.removeItem('access_token');
                    resolve(res)
                },
                err => reject(err)
            );
        });
        return promise;
    }

    /**
     * Return the error message to be displayed to the user.
     * also log to the console a more specific error message.
     * @param error 
     */
    private handleError(error: any): Promise<any>
    {
        if (error.error instanceof Error) {
            console.log(`An error occurred: ${error.error.message}`);
        }
        else {
            console.log(`Backend returned code ${error.status}, body was: ${error.error.message}`);
        }
        return Promise.reject(error.error.message);
    }
}