import { Component } from '@angular/core';

import { ShopService } from './shop.service';

@Component({
    templateUrl: 'shop-list.component.html'
})
export class ShopListComponent {
    constructor(private _shopService: ShopService) {}
}