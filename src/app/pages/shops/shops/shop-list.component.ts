import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import CustomStore from 'devextreme/data/custom_store';
import { Subscription, lastValueFrom, firstValueFrom } from 'rxjs';

import { ShopService } from './shop.service';

@Component({
    template:
`
<h2 class="content-block">Shop List</h2>
<app-data-list
    [fields] = 'fields'
    [defaultCols] = 'defaultColumns'
    [newObjFields] = []
    [data]='dataSource'
    (navigateTo)="navigate($event)">
</app-data-list>
`
})
export class ShopListComponent implements OnInit, OnDestroy {
    initLoad: boolean;
    fields: any;
    dataSource: any;

    readonly defaultColumns = [
        'name',
        'account.affiliation',
        'custom_7', // Phone
        'custom_9', // Email
        'location.address',
        'location.city',
        'location.state',
        'location.zip'
    ];

    private sub: Subscription;

    constructor (private _route: ActivatedRoute, private _router: Router, public _shopService: ShopService) {
        this.dataSource = new CustomStore({
            key: 'id',
            load: () => this.load(),
            insert: (values) => this.sendRequest('POST', {values}),
            remove: (key) => this.sendRequest('DELETE',{key})
        })
    }

    ngOnInit(): void {
        this.initLoad = true;
        this.sub = this._route.data.subscribe(data => {
            this.fields = data.response.data.fields;
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    load(): any {
        if (!this.initLoad) return this.sendRequest();

        this.initLoad = false;

        return firstValueFrom(this._route.data)
            .then((data: any) => data.response.data.shop_list)
            .catch((e) => {
                throw e && e.error && e.error.Message;
            });
    }

    sendRequest(method = 'GET', data: any = {}): any {
        let result;

        switch(method) {
            case 'GET':
                result = this._shopService.index();
                break;
            case 'POST':
                result = this._shopService.save({ id: 0 , ...data.values });
                break;
            case 'DELETE':
                result = this._shopService.destroy(data.key);
                break;
        }

        return lastValueFrom(result)
            .then((resp: any) => (method==='GET' ? resp.data.shop_list : resp.data))
            .catch((e) => {
                throw e && e.error && e.error.Message;
            });
    }

    navigate(id): void {
        this._router.navigate([ id ], { relativeTo: this._route });
    }
}
