import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { VendorService } from './vendor.service';

class Vendor {
    id = 0;
    name: string = null;
}

@Component({
    templateUrl: './vendor-list.component.html'
})
export class VendorListComponent implements OnInit, OnDestroy {
    newVendor: Vendor;
    private sub: Subscription;
    constructor(public vendorService: VendorService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.sub = this.route.data.subscribe(data => {

        });

        this.newVendor = new Vendor();
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    save(): void {
        if (this.newVendor['name']) {
            this.vendorService.save(this.newVendor)
                .subscribe(
                    () => this.newVendor = new Vendor()
                );
        }
    }
}
