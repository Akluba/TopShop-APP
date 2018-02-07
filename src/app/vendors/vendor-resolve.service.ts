import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { VendorService } from './vendor.service';

@Injectable()
export class VendorListResolver implements Resolve<any> {
    constructor(private vendorService: VendorService) {}

    resolve(): Observable<any> {
        return this.vendorService.index();
    }
}
