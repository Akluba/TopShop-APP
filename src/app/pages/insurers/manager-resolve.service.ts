import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

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
    constructor(private _managerService: ManagerService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        const manager_id = +route.params['manager_id'];
        return this._managerService.show(manager_id);
    }
}

@Injectable()
export class MarketingEffortsResolver implements Resolve<any> {
    constructor(private _managerService: ManagerService) {}

    resolve(): Observable<any> {
        return this._managerService.effortsIndex();
    }
}
