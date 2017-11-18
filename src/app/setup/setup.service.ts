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
    private baseUrl = 'http://localhost:8888/api';

    constructor(private _http: HttpClient) {}

    index(config?: {}): Observable<any> {
        const url = `${this.baseUrl}/${config['route']}`;
        let headers = new HttpHeaders({ 'Accept': 'application/json' });
        let params = new HttpParams().set('source_class', config['params']);
        let options = { headers: headers, params: params };

        return this._http.get(url, options)
            .do(data => console.log(data))
            .catch(this.handleError);
    }

    show(id: number, config?: {}): Observable<any> {
        const url = `${this.baseUrl}/${config['route']}/${id}`;
        let headers = new HttpHeaders({ 'Accept': 'application/json' });
        let options = { headers: headers };

        return this._http.get(url, options)
            .do(data => console.log(data))
            .catch(this.handleError);
    }

    destroy(id: number, config?: {}): Observable<Response> {
        const url = `${this.baseUrl}/${config['route']}/${id}`;
        let headers = new HttpHeaders({ 'Accept': 'application/json' });
        let options = { headers: headers };
        
        return this._http.delete(url, options)
            .do(data => data['method'] = 'delete')
            .catch(this.handleError);
    }

    save(body: any, config?: {}): Observable<any> {
        let headers = new HttpHeaders({ 'Accept': 'application/json' });
        let options = { headers: headers };

        if (body.id === 0) {
            return this.store(body, options, config);
        }
        return this.update(body, options, config);
    }

    private store(body: any, options: any, config?: {}): Observable<any> {
        const url = `${this.baseUrl}/${config['route']}`;

        return this._http.post(url, body, options)
            .do(data => data['method'] = 'create')
            .catch(this.handleError);
    }

    private update(body: any, options: any, config?: {}): Observable<any> {
        const url = `${this.baseUrl}/${config['route']}/${body.id}`;
        
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