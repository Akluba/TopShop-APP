import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { tokenNotExpired } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import { ICurrentUser } from './currentUser';

@Injectable()
export class UserService {
    private baseUrl = 'http://localhost:8888/api/users';
    currentUser: ICurrentUser;
    userList: ICurrentUser[];
    constructor(private _http: HttpClient) {}

    index(): Observable<any> {
        const url = `${this.baseUrl}`;
        const headers = new HttpHeaders({ 'Accept': 'application/json' });
        const options = { headers: headers };

        return this._http.get(url, options)
            .do(data => this.userList = data['data'])
            .catch(this.handleError);
    }

    save(body: any, component: string = ''): Observable<any> {
        const headers = new HttpHeaders({ 'Accept': 'application/json' });
        const options = { headers: headers };

        if (body.id === 0) {
            return this.store(body, options);
        }
        return this.update(body, options, component);
    }

    private store(body: any, options: any): Observable<any> {
        const url = `${this.baseUrl}`;
        return this._http.post(url, body, options)
            .do(data => this.userList.push(data['data']))
            .catch(this.handleError);
    }

    private update(body: any, options: any, component: string): Observable<any> {
        const url = `${this.baseUrl}/${body.id}`;
        body.component = component;
        return this._http.put(url, body, options)
            .do(res => console.log(res))
            .catch(this.handleError);
    }

    private handleError(err: HttpErrorResponse) {
        if (err.error instanceof Error) {
            console.log(`An error occurred: ${err.error.message}`);
        } else {
            console.log(`Backend returned code ${err.status}, body was: ${err.error.message}`);
        }

        return Observable.throw(err.error.message);
    }

}
