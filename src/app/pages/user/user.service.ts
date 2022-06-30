
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';




import { environment } from '../../../environments/environment';
import { IUser } from '../../shared/services';

@Injectable()
export class UserService {
    private baseUrl = `${environment.url}/users`;
    currentUser: IUser;
    userList: IUser[];
    constructor(private _http: HttpClient) {}

    index(): Observable<any> {
        const url = `${this.baseUrl}`;
        const headers = new HttpHeaders({ Accept: 'application/json' });
        const options = { headers: headers };

        return this._http.get(url, options).pipe(
            tap(data => this.userList = data['data']),
            catchError(this.handleError)
        );
    }

    save(body: any, component: string = ''): Observable<any> {
        const headers = new HttpHeaders({ Accept: 'application/json' });
        const options = { headers: headers };

        if (body.id === 0) {
            return this.store(body, options);
        }
        return this.update(body, options, component);
    }

    private store(body: any, options: any): Observable<any> {
        const url = `${this.baseUrl}`;

        return this._http.post(url, body, options).pipe(
            tap(data => this.userList.push(data['data'])),
            catchError(this.handleError)
        );
    }

    private update(body: any, options: any, component: string): Observable<any> {
        const url = `${this.baseUrl}/${body.id}`;
        body.component = component;
        body._method = 'PUT';

        return this._http.post(url, body, options).pipe(
            catchError(this.handleError)
        );
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
