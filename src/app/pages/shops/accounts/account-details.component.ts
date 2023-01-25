import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { AccountService } from './account.service';

declare let $: any;

@Component({
    template:
`
<app-profile-header
    [details]="details">
</app-profile-header>

<app-profile-shops
    [account]="account"
    [shops]="shops">
</app-profile-shops>
`
})
export class AccountDetailsComponent implements OnInit, OnDestroy {
    account: number;
    shops: any[];
    details: {};
    private sub: Subscription;

    constructor(private _route: ActivatedRoute, private _accountService: AccountService) {}


    ngOnInit(): void {
        // Read the data from the resolver.
        this.sub = this._route.data.subscribe(data => {
            this.account = data.response.data.account;
            this.details = data.response.data.details;
            this.shops = data.response.data.shops;
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}