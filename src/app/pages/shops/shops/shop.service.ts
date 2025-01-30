
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { environment } from '../../../../environments/environment';

@Injectable()
export class ShopService {
    private baseUrl = `${environment.url}/shops`;
    constructor(private _http: HttpClient) {}

    index(): Observable<any> {
        const url = `${this.baseUrl}`;
        const headers = new HttpHeaders({ Accept: 'application/json' });
        const options = { headers: headers };

        return this._http.get(url, options).pipe(
            catchError(this.handleError)
        );
    }

    show(id: number): Observable<any> {
        const url = `${this.baseUrl}/${id}`;
        const headers = new HttpHeaders({ Accept: 'application/json' });
        const options = { headers: headers };

        return this._http.get(url, options).pipe(
            catchError(this.handleError)
        );
    }

    destroy(id: number): Observable<any> {
        const url = `${this.baseUrl}/${id}`;
        const headers = new HttpHeaders({ Accept: 'application/json' });
        const options = { headers: headers };

        return this._http.delete(url, options).pipe(
            catchError(this.handleError)
        );
    }

    save(body: any): Observable<any> {
        const headers = new HttpHeaders({ Accept: 'application/json' });
        const options = { headers: headers };

        if (!body.hasOwnProperty('id')) {
            return this.store(body, options);
        }
        
        return this.update(body, options);
    }

    saveLocation(body: any): Observable<any> {
        const headers = new HttpHeaders({ Accept: 'application/json' });
        const options = { headers: headers };

        const url = `${this.baseUrl}/location/${body.id}`;
        body._method = 'PUT';
        return this._http.post(url, body, options).pipe(
            catchError(this.handleError)
        );
    }

    locationIndex(): Observable<any> {
        const url = `${this.baseUrl}/locations/view`;
        const headers = new HttpHeaders({ Accept: 'application/json' });
        const options = { headers: headers };

        return this._http.get(url, options).pipe(
            catchError(this.handleError)
        );
    }

    msnIndex(): Observable<any> {
        const url = `${environment.url}/msn`;
        const headers = new HttpHeaders({ Accept: 'application/json' });
        const options = { headers: headers };

        return this._http.get(url, options).pipe(
            catchError(this.handleError)
        );
    }

    msnSave(body: any): Observable<any> {
        const headers = new HttpHeaders({ Accept: 'application/json' });
        const options = { headers: headers };

        const url = `${environment.url}/msn`;
        return this._http.post(url, body, options).pipe(
            catchError(this.handleError)
        );
    }

    private store(body: any, options: any): Observable<any> {
        const url = `${this.baseUrl}`;
        return this._http.post(url, body, options).pipe(
            catchError(this.handleError)
        );
    }

    // private updateShopLocation(body: any, options: any): Observable<any> {
    //     const url = `${this.baseUrl}/location/${body.id}`;
    //     body._method = 'PUT';
    //     return this._http.post(url, body, options).pipe(
    //         catchError(this.handleError)
    //     );
    // }

    private update(body: any, options: any): Observable<any> {
        const url = `${this.baseUrl}/${body.id}`;
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
