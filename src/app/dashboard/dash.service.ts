import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { environment } from '../../environments/environment';

@Injectable()
export class DashService {
    private baseUrl = `${environment.url}/dash/notes`;
    constructor(private _http: HttpClient) {}

    index(): Observable<any> {
        const url = `${this.baseUrl}`;
        const headers = new HttpHeaders({ 'Accept': 'application/json' });
        const options = { headers: headers };

        return this._http.get(url, options)
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

@Injectable()
export class DashResolver implements Resolve<any> {
    constructor(private _dashService: DashService) {}

    resolve(): Observable<any> {
        return this._dashService.index();
    }
}
