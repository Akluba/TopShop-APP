import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ShopService } from './shop.service';

@Component({
    template:
`
<h2 class="content-block">Shop List</h2>
<app-data-list
    [fields] = 'fields'
    [defaultCols] = 'defaultColumns'
    [data]='shops'
    key='id'
    [service]='_shopService'
    (navigateTo)="navigate($event)"
    (elementRemoved)="delete($event)"
>
</app-data-list>
`
})
export class ShopListComponent implements OnInit, OnDestroy {
    shops: any[];
    fields: any[];
    readonly defaultColumns = ['name','location.address','location.city','location.state','location.zip','primary_contact.first_name','primary_contact.last_name','primary_contact.phone','primary_contact.email'];
    readonly objFields = {
        name: {title: 'Shop Name',column: 'name'},
        address: {title: 'Address',column: 'location.address'},
        city: {title: 'City',column: 'location.city'},
        state: {title: 'State',column: 'location.state'},
        zip: {title: 'Zip',column: 'location.zip'},
        first_name: {title: 'First',column: 'primary_contact.first_name'},
        last_name: {title: 'Last',column: 'primary_contact.last_name'},
        phone: {title: 'Phone',column: 'primary_contact.phone'},
        email: {title: 'Email',column: 'primary_contact.email'}
    };
    private sub: Subscription;
    constructor (private _route: ActivatedRoute, private _router: Router, public _shopService: ShopService) {}

    ngOnInit(): void {
        this.sub = this._route.data.subscribe(data => {
            this.shops = data.response.data.shop_list;
            this.fields = data.response.data.fields;

            for (const field of Object.keys(this.objFields)) {
                this.fields[field] = {
                    title: this.objFields[field]['title'],
                    column_name: this.objFields[field]['column'],
                }
            }
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    navigate(id): void {
        this._router.navigate([ id ], { relativeTo: this._route });
    }

    save(body): void {
        this._shopService.save(body)
        .subscribe(res => {
            this.shops.push(res['data']);
        });
    }

    delete(id): void {
        console.log(id);
        this._shopService.destroy(id);
            // .subscribe(res => {
            //     console.log(res);
            //     // this.shops = this.shops.filter(obj => obj.id !== res['data']['id']);
            // });
    }
}
