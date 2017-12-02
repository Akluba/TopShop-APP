import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class ShopService {
    private baseUrl = 'http://localhost:8888/api/shops';
    private shopList = [];

    constructor(private _http: HttpClient) {}

    index(): Observable<any> {
        const url = `${this.baseUrl}`;
        let headers = new HttpHeaders({ 'Accept': 'application/json' });
        let options = { headers: headers };

        return this._http.get(url, options)
            .do(data => this.shopList = data['data'])
            .catch(this.handleError);
    }

    show(id: number): Observable<any> {
        const url = `${this.baseUrl}/${id}`;
        let headers = new HttpHeaders({ 'Accept': 'application/json' });
        let options = { headers: headers };

        return this._http.get(url, options)
            // .do(data => console.log(data))
            .catch(this.handleError);
    }

    save(body: any): Observable<any> {
        let headers = new HttpHeaders({ 'Accept': 'application/json' });
        let options = { headers: headers };

        if (body.id === 0) {
            return this.store(body, options);
        }
        // return this.update(body, options, config);
    }

    private store(body: any, options: any): Observable<any> {
        const url = `${this.baseUrl}`;
        return this._http.post(url, body, options)
            .do(data => this.shopList.push(data['data']))
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