import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { throwError as observableThrowError,  Observable} from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable()
export class ManagerService {
    private baseUrl = `${environment.url}/managers`;
    constructor(private _http: HttpClient) {}

    index(): Observable<any> {
        const url = `${this.baseUrl}`;
        const headers = new HttpHeaders({ Accept: 'application/json' });
        const options = { headers: headers };

        return this._http.get(url, options).pipe(
            catchError(this.handleError)
        );
    }

    effortsIndex(): Observable<any> {
        const url = `${environment.url}/efforts`;
        const headers = new HttpHeaders({ Accept: 'application/json' });
        const options = { headers: headers };

        return this._http.get(url, options).pipe(
            catchError(this.handleError)
        );
    }

    saveEfforts(body): Observable<any> {
        const headers = new HttpHeaders({ Accept: 'application/json' });
        const options = { headers: headers };

        console.log(body);

        if (body.id === 0) {
            return this.updateEfforts(body, options);
        }
        return this.storeEfforts(body, options);
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

        if (body.id === 0) {
            return this.store(body, options);
        }
        return this.update(body, options);
    }

    private store(body: any, options: any): Observable<any> {
        const url = `${this.baseUrl}`;

        return this._http.post(url, body, options).pipe(
            catchError(this.handleError)
        );
    }

    private update(body: any, options: any): Observable<any> {
        const url = `${this.baseUrl}/${body.id}`;
        body._method = 'PUT';

        return this._http.post(url, body, options).pipe(
            catchError(this.handleError)
        );
    }

    private storeEfforts(body: any, options: any): Observable<any> {
        const url = `${environment.url}/efforts`;

        return this._http.post(url, body, options).pipe(
            catchError(this.handleError)
        );
    }

    private updateEfforts(body, options: any): Observable<any> {
        const url = `${environment.url}/efforts/0`;
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

        // return Observable.throw(err.error.message);
    }
}
