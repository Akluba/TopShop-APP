
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable()
export class SetupService {
    children = [];
    private baseUrl = environment.url;

    constructor(private _http: HttpClient) {}

    index(source_class: string, route: string): Observable<any> {
        const url = `${this.baseUrl}/${route}`;
        const headers = new HttpHeaders({ Accept: 'application/json' });
        const params = new HttpParams().set('source_class', source_class);
        const options = { headers: headers, params: params };

        return this._http.get(url, options).pipe(
            tap(data => data['data']['children']),
            catchError(this.handleError)
        );
    }

    show(id: number, route: string): Observable<any> {
        const url = `${this.baseUrl}/${route}/${id}`;
        const headers = new HttpHeaders({ Accept: 'application/json' });
        const options = { headers: headers };

        return this._http.get(url, options).pipe(
            tap(data => this.children = data['data']['children']),
            catchError(this.handleError)
        );
    }

    destroy(id: number, route): Observable<Response> {
        const url = `${this.baseUrl}/${route}/${id}`;
        const headers = new HttpHeaders({ Accept: 'application/json' });
        const options = { headers: headers };

        return this._http.delete<any>(url, options).pipe(
            tap(data => {
                this.children = this.children.filter(obj => obj.id !== data['data']['id']);
            }),
            catchError(this.handleError)
        );
    }

    save(body: any, route: string): Observable<any> {
        const headers = new HttpHeaders({ Accept: 'application/json' });
        const options = { headers: headers };

        if (body.id === 0 && body.reorder !== true) {
            return this.store(body, options, route);
        }
        return this.update(body, options, route);
    }

    private store(body: any, options: any, route: string): Observable<any> {
        const url = `${this.baseUrl}/${route}`;

        return this._http.post(url, body, options).pipe(
            tap(data => {
                this.children.push(data['data']);
            }),
            catchError(this.handleError)
        );
    }

    private update(body: any, options: any, route: string): Observable<any> {
        const url = `${this.baseUrl}/${route}/${body.id}`;
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
