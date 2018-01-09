import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class SetupService {
    children = [];
    private baseUrl = 'http://www.api.topshop-inc.com/api';

    constructor(private _http: HttpClient) {}

    index(source_class: string, route: string): Observable<any> {
        const url = `${this.baseUrl}/${route}`;
        const headers = new HttpHeaders({ 'Accept': 'application/json' });
        const params = new HttpParams().set('source_class', source_class);
        const options = { headers: headers, params: params };

        return this._http.get(url, options)
            .do(data => {
                this.children = data['data']['children'];
            })
            .catch(this.handleError);
    }

    show(id: number, route: string): Observable<any> {
        const url = `${this.baseUrl}/${route}/${id}`;
        const headers = new HttpHeaders({ 'Accept': 'application/json' });
        const options = { headers: headers };

        return this._http.get(url, options)
            .do(data => {
                this.children = data['data']['children'];
            })
            .catch(this.handleError);
    }

    destroy(id: number, route): Observable<Response> {
        const url = `${this.baseUrl}/${route}/${id}`;
        const headers = new HttpHeaders({ 'Accept': 'application/json' });
        const options = { headers: headers };

        return this._http.delete(url, options)
            .do(data => {
                this.children = this.children.filter(obj => obj.id !== data['data']['id']);
            })
            .catch(this.handleError);
    }

    save(body: any, route: string): Observable<any> {
        const headers = new HttpHeaders({ 'Accept': 'application/json' });
        const options = { headers: headers };

        if (body.id === 0) {
            return this.store(body, options, route);
        }
        return this.update(body, options, route);
    }

    private store(body: any, options: any, route: string): Observable<any> {
        const url = `${this.baseUrl}/${route}`;

        return this._http.post(url, body, options)
            .do(data => {
                this.children.push(data['data']);
            })
            .catch(this.handleError);
    }

    private update(body: any, options: any, route: string): Observable<any> {
        const url = `${this.baseUrl}/${route}/${body.id}`;

        return this._http.put(url, body, options)
            .do(data => data['method'] = 'update')
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
