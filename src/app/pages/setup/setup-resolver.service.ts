import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { SetupService } from './setup.service';

@Injectable()
export class SetupResolver implements Resolve<any> {
    constructor(private _setupService: SetupService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        const source_class = route.params['source_class'];
        const category_id  = +route.params['category_id'];
        const field_id     = +route.params['field_id'];
        const column_id    = +route.params['column_id'];

        if (!isNaN(category_id)) {
            if (!isNaN(field_id) || !isNaN(column_id)) {
                if (!isNaN(column_id)) {
                    // resolve column options list.
                    return this._setupService.show(column_id, 'column');
                }

                // resolve field options / columns list.
                return this._setupService.show(field_id, 'field');
            }

            // resolve category field list.
            return this._setupService.show(category_id, 'category');
        }

        // resolve catergoy list.
        return this._setupService.index(source_class, 'category');
    }
}
