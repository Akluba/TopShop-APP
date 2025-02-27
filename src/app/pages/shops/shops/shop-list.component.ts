import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import CustomStore from 'devextreme/data/custom_store';
import { Subscription, lastValueFrom, firstValueFrom } from 'rxjs';

import { ShopService } from './shop.service';
import DataSource from 'devextreme/data/data_source';
import { DataListService } from 'src/app/shared/components/data-list/data-list.service';

@Component({
    template:
`
<h2 class="content-block">Shop List</h2>
<app-data-list
    [fields] = 'fields'
    [filters] = 'filters'
    [defaultCols] = 'defaultColumns'
    [newObjFields] = []
    [data]='dataSource'
    (navigateTo)="navigate($event)">
</app-data-list>
`
})
export class ShopListComponent implements OnInit, OnDestroy {
    initLoad: boolean;
    shop_list: [];
    fields: any;
    filters: any;
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
    private filterSub!: Subscription;

    constructor (private _route: ActivatedRoute, private _router: Router, public _shopService: ShopService, private _dlService: DataListService) {
        this.dataSource = new DataSource({
            key: 'id',
            load: () => { return Promise.resolve(this.shop_list) },
            // load: (options) => this.load(options),
            // insert: (values) => this.sendRequest('POST', {values}),
            // remove: (key) => this.sendRequest('DELETE',{key})
        })
    }

    ngOnInit(): void {
        this.initLoad = true;
        this.sub = this._route.data.subscribe(data => {
            this.shop_list = data.response.data.shop_list;
            this.fields = data.response.data.fields;
            this.filters = data.response.data.filters;
        });

        this.filterSub = this._dlService.remoteFilter$.subscribe(options => {
            if (options) { this.applyRemoteFilter(options); }
        })
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
        this.filterSub.unsubscribe();
    }

    applyRemoteFilter(options) {
        this._shopService.index(options).subscribe({
            next: (resp) => {
                this.shop_list = resp.data.shop_list;
                this._dlService.sendResponse({success: true});
            },
            error: (error) => {
                this._dlService.sendResponse({error: true, message: 'Failed to Filter'})
            }
        })
    }

    sendRequest(method = 'GET', data: any = {}): Promise<any> {
        let result;

        switch(method) {
            case 'GET':
                result = this._shopService.index(data);
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
