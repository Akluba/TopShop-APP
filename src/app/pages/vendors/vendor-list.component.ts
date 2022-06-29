import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { VendorService } from './vendor.service';

@Component({
    template:
`
<h2 class="content-block">Vendor List</h2>
<app-data-table
    [fields]='fields'
    [data]='vendors'
    type='Vendor'
    (elementCreated)="save($event)"
    (elementRemoved)="delete($event)">
</app-data-table>
`
})
export class VendorListComponent implements OnInit, OnDestroy {
    vendors: any[];
    fields: any[];
    private sub: Subscription;
    constructor (private _route: ActivatedRoute, private _vendorService: VendorService) {}

    ngOnInit(): void {
        this.sub = this._route.data.subscribe(data => {
            this.vendors = data.response.data.vendor_list;
            this.fields = data.response.data.fields;
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    save(body): void {
        this._vendorService.save(body)
            .subscribe(res => {
                this.vendors.push(res['data']);
            });
    }

    delete(body): void {
        this._vendorService.destroy(body)
            .subscribe(res => {
                this.vendors = this.vendors.filter(obj => obj.id !== res['data']['id']);
            });
    }
}
