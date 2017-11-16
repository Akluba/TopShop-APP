import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { FieldService } from './field.service';

@Injectable()
export class FieldResolver implements Resolve<any>{
    constructor(private _fieldService: FieldService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        let id = +route.params['category_id'];
        return this._fieldService.getCategory(id);
    }
}