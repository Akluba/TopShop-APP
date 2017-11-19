import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { SetupService } from './setup.service';

@Injectable()
export class SetupResolver implements Resolve<any> {
    constructor(private _setupService: SetupService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        let category_id = +route.params['category_id'];
        let field_id    = +route.params['field_id'];
        let column_id   = +route.params['column_id'];

        if (!isNaN(field_id) || !isNaN(column_id)) {
            if (!isNaN(column_id)) {
                return this._setupService.show(column_id, {route: 'column'});
            }

            return this._setupService.show(field_id, {route: 'field'});
        }

        return this._setupService.show(category_id, {route: 'category'});
    }
}