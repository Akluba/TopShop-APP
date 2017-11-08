import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import { ICurrentUser } from '../auth/CurrentUser';

@Injectable()
export class AuthService {
    currentUser: ICurrentUser;

    constructor(private _http: HttpClient) { }

        login(credentials): Promise<any>
        {
            return this
                .getAccessToken(credentials)
                .then(token => this.getCurrentUser(token))
                .then(user => this.currentUser = <ICurrentUser>user)
                .catch(this.handleError);
        }

        private getAccessToken(credentials)
        {
            let promise = new Promise((resolve, reject) => {
                let apiUrl = 'http://localhost:8888/api/login';
                let body = {
                    email:      credentials.email,
                    password:   credentials.password,
                };
                this._http.post(apiUrl, body, {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json',
                        'Accept':       'application/json'
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

        private getCurrentUser(token)
        {
            let promise = new Promise((resolve, reject) => {
                let apiUrl = 'http://localhost:8888/api/user';
                this._http.get(apiUrl,{
                    headers: new HttpHeaders({
                        'Accept':       'application/json',
                        'Authorization': `Bearer ${token['access_token']}`
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