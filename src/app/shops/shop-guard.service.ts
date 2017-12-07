import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, CanDeactivate } from '@angular/router';

import { ShopDetailsComponent } from './shop-details.component';

@Injectable()
export  class ShopDetailsGuard implements CanDeactivate<ShopDetailsComponent> {
    canDeactivate(component: ShopDetailsComponent): boolean {
        if (component.shopForm.dirty) {
            let shopName = component.shopName;
            return confirm(`Navigate away and lose all changes to ${shopName}?`);
        }
        return true;
    }
}