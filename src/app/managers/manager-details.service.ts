import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, CanActivate, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ManagerDetailsComponent } from './manager-details.component';
import { ManagerService } from './manager.service';

@Injectable()
export class ManagerDetailsResolver implements Resolve<any> {
    constructor(private _managerService: ManagerService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        let manager_id = +route.params['manager_id'];
        return this._managerService.show(manager_id);
    }
}

@Injectable()
export  class ManagerDetailsGuard implements CanDeactivate<ManagerDetailsComponent> {
    canDeactivate(component: ManagerDetailsComponent): boolean {
        if (component.managerForm.dirty) {
            let managerName = component.manager['manager_name'];
            return confirm(`Navigate away and lose all changes to ${managerName}?`);
        }
        return true;
    }
}