import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { SetupService } from './setup.service';

@Injectable()
export class CategoryResolver implements Resolve<any> {
    constructor(private _setupService: SetupService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        let id = +route.params['category_id'];
        return this._setupService.show(id, {route: 'category'});
    }
}