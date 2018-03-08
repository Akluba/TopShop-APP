import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';

@Injectable()
export class SearchService {
    private baseUrl = `${environment.url}/search`;
    constructor(private _http: HttpClient) {}

    index(source_class: string): Observable<any> {
        const url = `${this.baseUrl}`;
        const headers = new HttpHeaders({ 'Accept': 'application/json' });
        const params = new HttpParams().set('source_class', source_class);
        const options = { headers: headers, params: params };

        return this._http.get(url, options)
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
