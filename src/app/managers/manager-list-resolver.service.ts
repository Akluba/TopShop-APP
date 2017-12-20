import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ManagerService } from './manager.service';

@Injectable()
export class ManagerListResolver implements Resolve<any> {
    constructor(private _managerService: ManagerService) {}

    resolve(): Observable<any> {
        return this._managerService.index();
    }
}