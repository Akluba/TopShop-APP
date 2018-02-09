import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { VendorService } from './vendor.service';

@Injectable()
export class VendorListResolver implements Resolve<any> {
    constructor(private vendorService: VendorService) {}

    resolve(): Observable<any> {
        return this.vendorService.index();
    }
}

@Injectable()
export class VendorDetailsResolver implements Resolve<any> {
    constructor(private vendorService: VendorService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        const vendor_id = +route.params['vendor_id'];
        return this.vendorService.show(vendor_id);
    }
}
