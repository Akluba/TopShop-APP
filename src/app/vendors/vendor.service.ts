import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/observable/of';

import { environment } from '../../environments/environment';

@Injectable()
export class VendorService {
    vendors = [];
    private baseUrl = `${environment.url}/vendors`;
    constructor(private _http: HttpClient) {}

    index(): Observable<any> {
        const url = `${this.baseUrl}`;
        const headers = new HttpHeaders({ 'Accept': 'application/json' });
        const options = { headers: headers };

        return this._http.get(url, options)
            .do(res => this.vendors = res['data']['vendor_list'])
            .catch(this.handleError);
    }

    show(id: number): Observable<any> {
        const url = `${this.baseUrl}/${id}`;
        const headers = new HttpHeaders({ 'Accept': 'application/json' });
        const options = { headers: headers };

        return this._http.get(url, options)
            .catch(this.handleError);
    }

    save(body: any): Observable<any> {
        const headers = new HttpHeaders({ 'Accept': 'application/json' });
        const options = { headers: headers };

        if (body.id === 0) {
            return this.store(body, options);
        }
        // return this.update(body, options);
    }

    private store(body: any, options: any): Observable<any> {
        const url = `${this.baseUrl}`;
        return this._http.post(url, body, options)
            .do(data => this.vendors.push(data['data']))
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
