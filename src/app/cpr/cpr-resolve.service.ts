import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { CPRService } from './cpr.service';

@Injectable()
export class CPRListResolver implements Resolve<any> {
    constructor(private cprService: CPRService) {}

    resolve(): Observable<any> {
        return this.cprService.index();
    }
}

@Injectable()
export class CPRDetailsResolver implements Resolve<any> {
    constructor(private cprService: CPRService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        const cpr_id = +route.params['cpr_id'];
        return this.cprService.show(cpr_id);
    }
}
