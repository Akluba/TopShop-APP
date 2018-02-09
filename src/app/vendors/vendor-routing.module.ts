import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VendorListComponent } from './vendor-list.component';
import { VendorDetailsComponent } from './vendor-details.component';

import { VendorListResolver } from './vendor-resolve.service';
import { VendorDetailsResolver } from './vendor-resolve.service';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: VendorListComponent, resolve: {response: VendorListResolver } },
            {
                path: ':vendor_id',
                component: VendorDetailsComponent,
                resolve: { response: VendorDetailsResolver }
            }
        ])
    ],
    exports: [ RouterModule ]
})
export class VendorRoutingModule {}
