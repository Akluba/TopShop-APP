import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { ShopService } from './shop.service';

@Component({
    template:
`
<app-msn-form>
`
})
export class MSNComponent implements OnInit, OnDestroy {
    private sub: Subscription;
    formElements: any[];
    shops: any[];

    constructor(private _route: ActivatedRoute, private _shopService: ShopService) {}

    ngOnInit(): void {
        // Read the data from the resolver.
        this.sub = this._route.data.subscribe(data => {
            this.formElements = data.response.data;
            this.shops = data.response.shops;
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

}
