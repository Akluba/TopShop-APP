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
    [newObjFields] = 'newObjFields'
    [data]='dataSource'
    (navigateTo)="navigate($event)">
</app-data-list>
`
})
export class ShopListComponent implements OnInit, OnDestroy {
    initLoad: boolean;
    fields: any;
    dataSource: any;
    // readonly defaultColumns = [];
    readonly defaultColumns = [
        'name',
        'affiliation',
        'custom_7', // Phone
        'custom_9', // Email
        'location.address',
        'location.city',
        'location.state',
        'location.zip',
        // 'primary_contact.first_name',
        // 'primary_contact.last_name',
        // 'primary_contact.phone',
        // 'primary_contact.email'
    ];
    readonly newObjFields = [];
    readonly objFields = {
        name: {title: 'Shop Name',column: 'name', sort_order: 0},
        affiliation: {title: 'Affiliation',column: 'affiliation', sort_order: 1},
        "location.address": {title: 'Address',column: 'location.address', sort_order: 2},
        "location.city": {title: 'City',column: 'location.city', sort_order: 3},
        "location.state": {title: 'State',column: 'location.state', sort_order: 4},
        "location.zip": {title: 'Zip',column: 'location.zip', sort_order: 5}
        // first_name: {title: 'First',column: 'primary_contact.first_name'},
        // last_name: {title: 'Last',column: 'primary_contact.last_name'},
        // phone: {title: 'Phone',column: 'primary_contact.phone'},
        // email: {title: 'Email',column: 'primary_contact.email'}
    };
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
            this.fields = {};

            for (const field of Object.keys(this.objFields)) {
                this.fields[field] = {
                    title: this.objFields[field]['title'],
                    column_name: this.objFields[field]['column'],
                    sort_order: this.objFields[field]['sort_order']
                }
            }

            this.fields = { ...this.fields, ...data.response.data.fields }
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
