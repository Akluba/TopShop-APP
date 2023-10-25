
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable()
export class ReportService {
    private baseUrl = `${environment.url}/reports`;
    private meUrl = `${environment.url}/efforts`;
    constructor(private _http: HttpClient) {}

    index(): Observable<any> {
        const url = `${this.baseUrl}/shs`;
        const headers = new HttpHeaders({ Accept: 'application/json' });
        const options = { headers: headers };

        return this._http.get(url, options).pipe(
            catchError(this.handleError)
        );
    }

    show(id: number): Observable<any> {
        const url = `${this.meUrl}/${id}`;
        const headers = new HttpHeaders({ Accept: 'application/json' });
        const options = { headers: headers };

        return this._http.get(url, options).pipe(
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
