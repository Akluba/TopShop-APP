import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { ReportService } from './report.service';

@Injectable()
export class SHSResolver implements Resolve<any> {
    constructor(private _rs: ReportService) {}

    resolve(): Observable<any> {
        return this._rs.index();
    }
}
