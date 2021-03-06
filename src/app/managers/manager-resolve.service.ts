import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ManagerService } from './manager.service';

@Injectable()
export class ManagerListResolver implements Resolve<any> {
    constructor(private _managerService: ManagerService) {}

    resolve(): Observable<any> {
        return this._managerService.index();
    }
}

@Injectable()
export class ManagerDetailsResolver implements Resolve<any> {
    constructor(private _shopService: ManagerService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        const manager_id = +route.params['manager_id'];
        return this._shopService.show(manager_id);
    }
}
