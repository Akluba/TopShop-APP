import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ShopService } from './shop.service';

@Injectable()
export class ShopDetailsResolver implements Resolve<any> {
    constructor(private _shopService: ShopService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        let shop_id = +route.params['shop_id'];
        return this._shopService.show(shop_id);
    }

}