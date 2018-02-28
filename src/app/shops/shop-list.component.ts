import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { ShopService } from './shop.service';

@Component({
    templateUrl: 'shop-list.component.html'
})
export class ShopListComponent implements OnInit, OnDestroy {
    shops: any[];
    fields: any[];
    private sub: Subscription;
    constructor (private _route: ActivatedRoute, public shopService: ShopService) {}

    ngOnInit(): void {
        this.sub = this._route.data.subscribe(data => {
            this.shops = data.response.data.shop_list;
            this.fields = data.response.data.fields;
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    delete(shop): void {
        if (confirm(`Are you sure you want to delete: ${shop.name}?`)) {
            this.shopService.destroy(shop.id)
                .subscribe();
        }
    }
}
