import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { ShopService } from './shop.service';

@Component({
    template:
`
<h2 class="content-block">Shop List</h2>
<app-data-table
    [fields]='fields'
    [data]='shops'
    type='Shop'
    (elementCreated)="save($event)"
    (elementRemoved)="delete($event)">
</app-data-table>
`
})
export class ShopListComponent implements OnInit, OnDestroy {
    shops: any[];
    fields: any[];
    private sub: Subscription;
    constructor (private _route: ActivatedRoute, private _shopService: ShopService) {}

    ngOnInit(): void {
        this.sub = this._route.data.subscribe(data => {
            this.shops = data.response.data.shop_list;
            this.fields = data.response.data.fields;
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    save(body): void {
        this._shopService.save(body)
            .subscribe(res => {
                this.shops.push(res['data']);
            });
    }

    delete(body): void {
        this._shopService.destroy(body)
            .subscribe(res => {
                this.shops = this.shops.filter(obj => obj.id !== res['data']['id']);
            });
    }
}
