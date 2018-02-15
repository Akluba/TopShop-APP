import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, CanActivate, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ShopDetailsComponent } from './shop-details.component';
import { ShopService } from './shop.service';

@Injectable()
export class ShopDetailsResolver implements Resolve<any> {
    constructor(private _shopService: ShopService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        const shop_id = +route.params['shop_id'];
        return this._shopService.show(shop_id);
    }
}

@Injectable()
export  class ShopDetailsGuard implements CanDeactivate<ShopDetailsComponent> {
    canDeactivate(component: ShopDetailsComponent): boolean {
        if (component.shopForm.dirty) {
            const shopName = component.shop['name'];
            return confirm(`Navigate away and lose all changes to ${shopName}?`);
        }
        return true;
    }
}
