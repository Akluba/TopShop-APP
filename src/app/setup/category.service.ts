import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { ICategory } from './category';

@Injectable()
export class CategoryService {
    private baseUrl = 'http://localhost:8888/';
    private categoryUrl = `${this.baseUrl}api/category`;

    constructor(private _http: HttpClient) {}

    getCategories(sourceClass): Observable<any> {
        let headers = new HttpHeaders({ 'Accept': 'application/json' });
        let params = new HttpParams().set('source_class', sourceClass);
        let options = { headers: headers, params: params };

        return this._http.get(this.categoryUrl, options)
            .do(data => console.log(data))
            .catch(this.handleError);
    }

    deleteCategory(id: number): Observable<Response> {
        const url = `${this.categoryUrl}/${id}`;
        let headers = new HttpHeaders({ 'Accept': 'application/json' });
        let options = { headers: headers };
        
        return this._http.delete(url, options)
            .do(data => data['method'] = 'delete')
            .catch(this.handleError);
    }

    saveCategory(category: ICategory): Observable<ICategory> {
        let headers = new HttpHeaders({ 'Accept': 'application/json' });
        let options = { headers: headers };

        if (category.id === 0) {
            return this.createCategory(category, options);
        }
        return this.updateCategory(category, options);
    }

    private createCategory(category: ICategory, options: any): Observable<ICategory> {
        return this._http.post(this.categoryUrl, category, options)
            .do(data => data['method'] = 'create')
            .catch(this.handleError);
    }

    private updateCategory(category: ICategory, options: any): Observable<ICategory> {
        const url = `${this.categoryUrl}/${category.id}`;
        
        return this._http.put(url, category, options)
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