import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ShopService } from './shop.service';

@Injectable()
export class ShopListResolver implements Resolve<any> {
    constructor(private _shopService: ShopService) {}

    resolve(): Observable<any> {
        return this._shopService.index();
    }
}

@Injectable()
export class ShopDetailsResolver implements Resolve<any> {
    constructor(private _shopService: ShopService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        const shop_id = +route.params['shop_id'];
        return this._shopService.show(shop_id);
    }
}

@Injectable()
export class MSNResolver implements Resolve<any> {
    constructor(private _shopService: ShopService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        return this._shopService.msnIndex();
    }
}

// @Injectable()
// export  class ShopDetailsGuard implements CanDeactivate<DetailsFormComponent> {
//     canDeactivate(component: DetailsFormComponent): boolean {
//         if (component.form.dirty) {
//             const name = component.formValues['name'];
//             return confirm(`Navigate away and lose all changes to ${name}?`);
//         }

//         return true;
//     }
// }
