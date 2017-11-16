import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class FieldService {
    private baseUrl = 'http://localhost:8888/';
    private categoryUrl = `${this.baseUrl}api/category`;
    private fieldUrl = `${this.baseUrl}api/field`;

    constructor(private _http: HttpClient) {}

    getCategory(id: number): Observable<any> {
        const url = `${this.categoryUrl}/${id}`;
        let headers = new HttpHeaders({ 'Accept': 'application/json' });
        let options = { headers: headers };

        return this._http.get(url, options)
            .do(data => console.log(data))
            .catch(this.handleError);
    }

    deleteField(id: number): Observable<Response> {
        const url = `${this.fieldUrl}/${id}`;
        let headers = new HttpHeaders({ 'Accept': 'application/json' });
        let options = { headers: headers };
        
        return this._http.delete(url, options)
            .do(data => data['method'] = 'delete')
            .catch(this.handleError);
    }

    saveField(field: any): Observable<any> {
        let headers = new HttpHeaders({ 'Accept': 'application/json' });
        let options = { headers: headers };

        if (field.id === 0) {
            return this.createField(field, options);
        }
        return this.updateField(field, options);
    }

    private createField(field: any, options: any): Observable<any> {
        return this._http.post(this.fieldUrl, field, options)
        .do(data => data['method'] = 'create')
        .catch(this.handleError);
    }

    private updateField(field: any, options: any): Observable<any> {
        const url = `${this.fieldUrl}/${field.id}`;
        
        return this._http.put(url, field, options)
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