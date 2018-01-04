import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { ShopService } from './shop.service';

@Component({
    templateUrl: 'shop-list.component.html'
})
export class ShopListComponent implements OnInit, OnDestroy {
    listFilter: string;
    shops: any[];
    private sub: Subscription;
    constructor (private _route: ActivatedRoute, private _shopService: ShopService) {}

    ngOnInit(): void {
        this.sub = this._route.data.subscribe(data => {
            this.shops = data.response.data;
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
