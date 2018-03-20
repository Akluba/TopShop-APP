import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { CompanyService, CompanyRequirementsService } from './company.service';

@Injectable()
export class CompanyListResolver implements Resolve<any> {
    constructor(private _companyService: CompanyService) {}

    resolve(): Observable<any> {
        return this._companyService.index();
    }
}

@Injectable()
export class CompanyDetailsResolver implements Resolve<any> {
    constructor(private _companyService: CompanyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        const company_id = +route.params['company_id'];
        return this._companyService.show(company_id);
    }
}

@Injectable()
export class CompanyRequirementsResolver implements Resolve<any> {
    constructor(private _companyService: CompanyRequirementsService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        const company_id = +route.params['company_id'];
        return this._companyService.show(company_id);
    }
}
