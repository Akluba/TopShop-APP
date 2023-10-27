import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { ReportService } from './report.service';

@Injectable()
export class ReportResolver implements Resolve<any> {
    constructor(private _rs: ReportService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        const report = route.routeConfig.path;
        return this._rs.index(report);
    }
}
