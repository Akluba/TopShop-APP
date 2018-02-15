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
    cols: any[];
    columnOptions: any[];
    selectedShops: any[];
    private sub: Subscription;
    constructor (private _route: ActivatedRoute, public shopService: ShopService) {}

    ngOnInit(): void {
        this.sub = this._route.data.subscribe(data => {
            this.shops = data.response.data.shops;
            this.fields = data.response.data.fields;

            this.setCols();
            this.setColumnOptions();
        });
    }

    setCols(): void {
        this.cols = [];
        for (const field of Object.keys(this.fields)) {
            this.cols.push({field: field, header: this.fields[field]['title']});
        }
    }

    setColumnOptions(): void {
        this.columnOptions = [];
        for (let i = 0; i < this.cols.length; i++) {
            this.columnOptions.push({label: this.cols[i].header, value: this.cols[i]});
        }
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
