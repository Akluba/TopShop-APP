import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VendorListComponent } from './vendor-list.component';

import { VendorListResolver } from './vendor-resolve.service';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: VendorListComponent, resolve: {response: VendorListResolver } }
        ])
    ],
    exports: [ RouterModule ]
})
export class VendorRoutingModule {}
