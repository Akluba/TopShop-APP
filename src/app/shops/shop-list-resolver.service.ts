import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ShopService } from './shop.service';

@Injectable()
export class ShopListResolver implements Resolve<any> {
    constructor(private _shopService: ShopService) {}

    resolve(): Observable<any> {
        return this._shopService.index();
    }
}
